import { NextRequest, NextResponse } from "next/server";

const FORT_POINT_SECURITY_KEY = process.env.FORT_POINT_SECURITY_KEY;
const FORT_POINT_GATEWAY_URL = "https://secure.fppgateway.com/api/transact.php";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { transactionId, amount, paymentType, subscriptionid, autoDetails } = body;

    if (!amount || !transactionId) {
      return NextResponse.json(
        { error: 'Missing required payment parameters' },
        { status: 400 }
      );
    }

    const captureParams = new URLSearchParams();
    captureParams.append("type", "capture");
    captureParams.append("security_key", FORT_POINT_SECURITY_KEY || "");
    captureParams.append("transactionid", transactionId);
    captureParams.append("amount", amount);
    captureParams.append("merchant_defined_field_1", "This transaction was processed through the AssuredPartners website");
    
    if (autoDetails && Array.isArray(autoDetails) && autoDetails.length > 0) {
      // collect all contract numbers from autoDetails
      const contractNumbers = autoDetails
        .map((item: Record<string, unknown>) => {
          const data = item?.data as Record<string, unknown> | undefined;
          const contracts = (data?.contracts as Record<string, unknown>[] | undefined);
          const contract = contracts?.[0]?.contract as Record<string, unknown> | undefined;
          return contract?.contractNumber as string | undefined;
        })
        .filter((n: string | undefined) => !!n);

      if (contractNumbers.length > 0) {
        const contractString = contractNumbers.join("\n");
        captureParams.append(
          "merchant_defined_field_2",
          "PCRS Contract Number(s):\n" + contractString
        );
      }
    }
    if (paymentType === "full") {
      captureParams.append("merchant_defined_field_4", "This user paid the transaction in full");
    }
    else if (paymentType === "buydown") {
      captureParams.append("merchant_defined_field_4", "This user paid using the buydown feature");
      captureParams.append("merchant_defined_field_5", "FortPoint Subscription ID:\n" + subscriptionid);
    }
    

    const capRes = await fetch(FORT_POINT_GATEWAY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: captureParams.toString(),
    });

    const capText = await capRes.text();
    const parsedCapRes = Object.fromEntries(
      new URLSearchParams(capText)
    );
    const responseCode = parseInt(parsedCapRes.response || "0", 10);
    const responseCodeValue = parseInt(
      parsedCapRes.response_code || "0",
      10
    );

    let success = false;
    let statusMessage = "Unknown response";

    if (responseCode === 1 && responseCodeValue === 100) {
      success = true;
      statusMessage = "Transaction approved and coverage setup";
    } else if (responseCode === 2) {
      statusMessage = "Transaction ID incorrect or payment amount over original charge";
    } else if (responseCode === 3) {
      statusMessage = "System error during finalizing";
    }

    return NextResponse.json({
      success,
      response: parsedCapRes.response,
      response_code: parsedCapRes.response_code,
      transactionid: parsedCapRes.transactionid,
      statusMessage,
    });

  } catch (error) {
    console.error("Payment finalization error:", error);
    return NextResponse.json(
      { error: "Internal server error while finalizing payment through FortPoint" },
      { status: 500 }
    );
  }
}