import { NextRequest, NextResponse } from "next/server";
import { getAutoAccessToken } from "@/lib/pcrs-auth";

const PCRS_AUTO_API_URL = process.env.PCRS_AUTO_API_URL;

export async function POST(request: NextRequest) {
  try {

    const body = await request.json();
    const { paymentType, transactionid, subscriptionid, autoDetails } = body;

    if (!Array.isArray(autoDetails) || !(autoDetails.length > 0)) {
      return NextResponse.json(
        { error: 'Auto contract responses missing or empty array' },
        { status: 400 }
      );
    }

    const contractNumbers = autoDetails
      .map((item: Record<string, unknown>) => {
        const data = item?.data as Record<string, unknown> | undefined;
        const contracts = (data?.contracts as Record<string, unknown>[] | undefined);
        const contract = contracts?.[0]?.contract as Record<string, unknown> | undefined;
        return contract?.contractNumber as string | undefined;
      })
      .filter((n: string | undefined) => !!n);

    if (!(contractNumbers.length > 0)) {
      return NextResponse.json(
        { error: 'Auto contract numbers not found' },
        { status: 400 }
      );
    }

    const accessToken = await getAutoAccessToken();
    const results = await Promise.all(
      contractNumbers.map(async (number, index) => {
          try {
            const payload = {
              note: {
                contractNumber: number,
                type: "Information",
                text: `This contract was created using the AssuredPartners website.\n The transaction was processed through FortPoint with transactionID: ${transactionid}`,
              }
            }

            const response = await fetch(
              `${PCRS_AUTO_API_URL}/contracts/AddNote`,
              {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(payload)
              }
            );

            const data = await response.json();

            if (!response.ok) {
              return {
                index,
                success: false,
                status: response.status,
                error: data,
              };
            }

            return {
              index,
              success: true,
              data,
            };

          } catch (err) {
            return {
              index,
              success: false,
              error: err instanceof Error ? err.message : "Unknown error"
            };
          }
        })

    );

    const allNotesAdded = results.every((r) => r.success);

    return NextResponse.json(
      {results},
      {status: allNotesAdded ? 200 : 207}
    );

  } catch (error) {
    console.error("Contract creation error:", error);
    return NextResponse.json(
      { error: "Internal server error while adding notes to contracts" },
      { status: 500}
    );
  }
}