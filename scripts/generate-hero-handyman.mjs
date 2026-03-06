import { createCanvas } from '@napi-rs/canvas';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const W = 630;
const H = 882;

const canvas = createCanvas(W, H);
const ctx = canvas.getContext('2d');

// Brand colors
const NAVY = '#0f145b';
const TEAL = '#008560';
const TEAL_LIGHT = '#00a876';
const GOLD = '#fac142';
const SKIN = '#e8b88a';
const SKIN_SHADOW = '#d49a6a';
const WHITE = '#ffffff';
const LIGHT_GRAY = '#e2e8f0';
const MEDIUM_GRAY = '#94a3b8';
const DARK_GRAY = '#475569';

// Clear background (transparent)
ctx.clearRect(0, 0, W, H);

// === AC UNIT (right side, on ground) ===
const acX = 380;
const acY = 440;
const acW = 200;
const acH = 280;

// AC unit shadow
ctx.fillStyle = 'rgba(0,0,0,0.1)';
ctx.beginPath();
ctx.ellipse(acX + acW / 2, acY + acH + 10, acW / 2 + 20, 20, 0, 0, Math.PI * 2);
ctx.fill();

// AC unit body
ctx.fillStyle = LIGHT_GRAY;
ctx.strokeStyle = MEDIUM_GRAY;
ctx.lineWidth = 2;
roundRect(ctx, acX, acY, acW, acH, 8);
ctx.fill();
ctx.stroke();

// AC unit front panel with fan grill
ctx.fillStyle = WHITE;
roundRect(ctx, acX + 15, acY + 15, acW - 30, acH - 80, 6);
ctx.fill();
ctx.strokeStyle = '#cbd5e1';
ctx.lineWidth = 1;
roundRect(ctx, acX + 15, acY + 15, acW - 30, acH - 80, 6);
ctx.stroke();

// Fan grill (concentric circles)
const fanCx = acX + acW / 2;
const fanCy = acY + 100;
for (let r = 70; r > 10; r -= 12) {
  ctx.beginPath();
  ctx.arc(fanCx, fanCy, r, 0, Math.PI * 2);
  ctx.strokeStyle = r % 24 === 0 ? MEDIUM_GRAY : '#cbd5e1';
  ctx.lineWidth = 1.5;
  ctx.stroke();
}

// Fan blades
ctx.fillStyle = DARK_GRAY;
for (let i = 0; i < 5; i++) {
  const angle = (i * Math.PI * 2) / 5 - Math.PI / 6;
  ctx.save();
  ctx.translate(fanCx, fanCy);
  ctx.rotate(angle);
  ctx.beginPath();
  ctx.ellipse(0, -30, 8, 30, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

// Fan center hub
ctx.beginPath();
ctx.arc(fanCx, fanCy, 10, 0, Math.PI * 2);
ctx.fillStyle = DARK_GRAY;
ctx.fill();

// AC unit brand label
ctx.fillStyle = '#f1f5f9';
roundRect(ctx, acX + 40, acY + acH - 55, acW - 80, 30, 4);
ctx.fill();
ctx.fillStyle = MEDIUM_GRAY;
ctx.font = 'bold 11px Arial';
ctx.textAlign = 'center';
ctx.fillText('COOLING UNIT', acX + acW / 2, acY + acH - 35);

// AC unit status light
ctx.beginPath();
ctx.arc(acX + acW - 25, acY + acH - 40, 5, 0, Math.PI * 2);
ctx.fillStyle = TEAL;
ctx.fill();

// Copper pipes coming from top
ctx.strokeStyle = '#d97706';
ctx.lineWidth = 6;
ctx.lineCap = 'round';
ctx.beginPath();
ctx.moveTo(acX + 50, acY);
ctx.lineTo(acX + 50, acY - 40);
ctx.lineTo(acX + 30, acY - 60);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(acX + 80, acY);
ctx.lineTo(acX + 80, acY - 30);
ctx.lineTo(acX + 60, acY - 50);
ctx.stroke();

// Pipe insulation wraps
ctx.strokeStyle = '#78716c';
ctx.lineWidth = 8;
ctx.beginPath();
ctx.moveTo(acX + 50, acY - 5);
ctx.lineTo(acX + 50, acY + 5);
ctx.stroke();
ctx.beginPath();
ctx.moveTo(acX + 80, acY - 5);
ctx.lineTo(acX + 80, acY + 5);
ctx.stroke();

// === HANDYMAN ===
const manX = 180; // center X of person
const manY = 250; // top of head

// Person shadow
ctx.fillStyle = 'rgba(0,0,0,0.08)';
ctx.beginPath();
ctx.ellipse(manX + 20, 730, 100, 18, 0, 0, Math.PI * 2);
ctx.fill();

// --- Legs ---
// Left leg
ctx.fillStyle = '#1e3a5f'; // dark work pants
ctx.beginPath();
ctx.moveTo(manX - 30, 560);
ctx.lineTo(manX - 45, 710);
ctx.lineTo(manX - 15, 710);
ctx.lineTo(manX - 10, 560);
ctx.closePath();
ctx.fill();

// Right leg
ctx.beginPath();
ctx.moveTo(manX + 10, 560);
ctx.lineTo(manX + 15, 710);
ctx.lineTo(manX + 45, 710);
ctx.lineTo(manX + 30, 560);
ctx.closePath();
ctx.fill();

// Work boots
ctx.fillStyle = '#57534e';
roundRect(ctx, manX - 50, 705, 42, 22, 4);
ctx.fill();
roundRect(ctx, manX + 12, 705, 42, 22, 4);
ctx.fill();

// Boot soles
ctx.fillStyle = '#44403c';
roundRect(ctx, manX - 52, 720, 46, 8, 3);
ctx.fill();
roundRect(ctx, manX + 10, 720, 46, 8, 3);
ctx.fill();

// --- Torso (work shirt) ---
ctx.fillStyle = TEAL;
ctx.beginPath();
ctx.moveTo(manX - 55, 370); // left shoulder
ctx.lineTo(manX + 55, 370); // right shoulder
ctx.lineTo(manX + 40, 570); // right hip
ctx.lineTo(manX - 40, 570); // left hip
ctx.closePath();
ctx.fill();

// Shirt collar
ctx.fillStyle = TEAL_LIGHT;
ctx.beginPath();
ctx.moveTo(manX - 15, 365);
ctx.lineTo(manX, 390);
ctx.lineTo(manX + 15, 365);
ctx.closePath();
ctx.fill();

// Pocket on shirt
ctx.strokeStyle = 'rgba(255,255,255,0.3)';
ctx.lineWidth = 1.5;
roundRect(ctx, manX - 35, 410, 28, 32, 3);
ctx.stroke();

// Pen in pocket
ctx.strokeStyle = GOLD;
ctx.lineWidth = 2;
ctx.beginPath();
ctx.moveTo(manX - 25, 412);
ctx.lineTo(manX - 25, 398);
ctx.stroke();

// Tool belt
ctx.fillStyle = '#78716c';
ctx.fillRect(manX - 42, 545, 84, 18);

// Belt buckle
ctx.fillStyle = GOLD;
roundRect(ctx, manX - 10, 547, 20, 14, 2);
ctx.fill();

// Tools hanging from belt
ctx.fillStyle = '#ef4444'; // red screwdriver handle
roundRect(ctx, manX - 38, 558, 8, 25, 2);
ctx.fill();
ctx.fillStyle = MEDIUM_GRAY; // screwdriver shaft
ctx.fillRect(manX - 36, 578, 4, 15);

ctx.fillStyle = GOLD; // measuring tape
ctx.beginPath();
ctx.arc(manX + 32, 572, 10, 0, Math.PI * 2);
ctx.fill();
ctx.fillStyle = '#d97706';
ctx.beginPath();
ctx.arc(manX + 32, 572, 6, 0, Math.PI * 2);
ctx.fill();

// --- Right arm (reaching toward AC unit, holding tool) ---
ctx.fillStyle = TEAL;
ctx.beginPath();
ctx.moveTo(manX + 55, 375); // shoulder
ctx.quadraticCurveTo(manX + 120, 400, manX + 160, 420);
ctx.lineTo(manX + 155, 445);
ctx.quadraticCurveTo(manX + 110, 425, manX + 50, 400);
ctx.closePath();
ctx.fill();

// Right forearm (rolled up sleeve showing skin)
ctx.fillStyle = SKIN;
ctx.beginPath();
ctx.moveTo(manX + 155, 420);
ctx.quadraticCurveTo(manX + 200, 430, manX + 220, 450);
ctx.lineTo(manX + 215, 470);
ctx.quadraticCurveTo(manX + 190, 455, manX + 150, 445);
ctx.closePath();
ctx.fill();

// Right hand holding multimeter/gauge
ctx.fillStyle = SKIN;
ctx.beginPath();
ctx.arc(manX + 225, 460, 14, 0, Math.PI * 2);
ctx.fill();

// Multimeter/diagnostic tool
ctx.fillStyle = '#1e293b';
roundRect(ctx, manX + 210, 440, 40, 55, 5);
ctx.fill();
// Screen
ctx.fillStyle = '#22d3ee';
roundRect(ctx, manX + 215, 447, 30, 18, 2);
ctx.fill();
// Reading on screen
ctx.fillStyle = '#0f172a';
ctx.font = 'bold 10px monospace';
ctx.textAlign = 'center';
ctx.fillText('72°F', manX + 230, 460);
// Dial
ctx.beginPath();
ctx.arc(manX + 230, 478, 8, 0, Math.PI * 2);
ctx.fillStyle = DARK_GRAY;
ctx.fill();
ctx.beginPath();
ctx.arc(manX + 230, 478, 3, 0, Math.PI * 2);
ctx.fillStyle = '#ef4444';
ctx.fill();

// --- Left arm (at side, hand on hip) ---
ctx.fillStyle = TEAL;
ctx.beginPath();
ctx.moveTo(manX - 55, 375); // shoulder
ctx.quadraticCurveTo(manX - 80, 430, manX - 70, 480);
ctx.lineTo(manX - 50, 480);
ctx.quadraticCurveTo(manX - 60, 430, manX - 40, 385);
ctx.closePath();
ctx.fill();

// Left forearm
ctx.fillStyle = SKIN;
ctx.beginPath();
ctx.moveTo(manX - 68, 470);
ctx.quadraticCurveTo(manX - 60, 510, manX - 50, 540);
ctx.lineTo(manX - 35, 535);
ctx.quadraticCurveTo(manX - 45, 505, manX - 50, 475);
ctx.closePath();
ctx.fill();

// Left hand on hip
ctx.fillStyle = SKIN;
ctx.beginPath();
ctx.arc(manX - 42, 545, 12, 0, Math.PI * 2);
ctx.fill();

// --- Neck ---
ctx.fillStyle = SKIN;
ctx.fillRect(manX - 12, 340, 24, 35);

// --- Head ---
ctx.fillStyle = SKIN;
ctx.beginPath();
ctx.arc(manX, 300, 52, 0, Math.PI * 2);
ctx.fill();

// Hair
ctx.fillStyle = '#44403c';
ctx.beginPath();
ctx.arc(manX, 290, 54, Math.PI, Math.PI * 2);
ctx.fill();

// Side hair
ctx.beginPath();
ctx.arc(manX, 290, 54, 0.8 * Math.PI, 0.2 * Math.PI);
ctx.fill();

// Hard hat / cap
ctx.fillStyle = GOLD;
ctx.beginPath();
ctx.ellipse(manX, 272, 58, 20, 0, Math.PI, Math.PI * 2);
ctx.fill();
// Cap top
ctx.beginPath();
ctx.ellipse(manX, 265, 48, 25, 0, Math.PI, Math.PI * 2);
ctx.fill();
// Cap brim
ctx.fillStyle = '#d97706';
ctx.beginPath();
ctx.ellipse(manX + 5, 275, 62, 8, -0.05, Math.PI, Math.PI * 2);
ctx.fill();

// Eyes
ctx.fillStyle = WHITE;
ctx.beginPath();
ctx.ellipse(manX - 16, 302, 10, 8, 0, 0, Math.PI * 2);
ctx.fill();
ctx.beginPath();
ctx.ellipse(manX + 16, 302, 10, 8, 0, 0, Math.PI * 2);
ctx.fill();

// Pupils
ctx.fillStyle = '#1e293b';
ctx.beginPath();
ctx.arc(manX - 14, 303, 5, 0, Math.PI * 2); // looking right toward AC
ctx.fill();
ctx.beginPath();
ctx.arc(manX + 18, 303, 5, 0, Math.PI * 2);
ctx.fill();

// Pupil highlights
ctx.fillStyle = WHITE;
ctx.beginPath();
ctx.arc(manX - 12, 301, 2, 0, Math.PI * 2);
ctx.fill();
ctx.beginPath();
ctx.arc(manX + 20, 301, 2, 0, Math.PI * 2);
ctx.fill();

// Eyebrows
ctx.strokeStyle = '#44403c';
ctx.lineWidth = 2.5;
ctx.beginPath();
ctx.moveTo(manX - 26, 292);
ctx.quadraticCurveTo(manX - 16, 287, manX - 6, 292);
ctx.stroke();
ctx.beginPath();
ctx.moveTo(manX + 6, 292);
ctx.quadraticCurveTo(manX + 16, 287, manX + 26, 292);
ctx.stroke();

// Nose
ctx.strokeStyle = SKIN_SHADOW;
ctx.lineWidth = 2;
ctx.beginPath();
ctx.moveTo(manX, 305);
ctx.quadraticCurveTo(manX + 5, 318, manX, 320);
ctx.stroke();

// Smile
ctx.strokeStyle = '#c2410c';
ctx.lineWidth = 2.5;
ctx.beginPath();
ctx.arc(manX, 320, 16, 0.15 * Math.PI, 0.85 * Math.PI);
ctx.stroke();

// Slight stubble/chin definition
ctx.strokeStyle = 'rgba(68, 64, 60, 0.2)';
ctx.lineWidth = 1;
ctx.beginPath();
ctx.arc(manX, 335, 20, 0.3 * Math.PI, 0.7 * Math.PI);
ctx.stroke();

// --- Name patch on shirt ---
ctx.fillStyle = WHITE;
roundRect(ctx, manX + 5, 395, 45, 18, 3);
ctx.fill();
ctx.fillStyle = NAVY;
ctx.font = 'bold 9px Arial';
ctx.textAlign = 'center';
ctx.fillText('AP CREW', manX + 27, 408);

// --- AP Logo on cap ---
ctx.fillStyle = NAVY;
ctx.font = 'bold 16px Arial';
ctx.textAlign = 'center';
ctx.fillText('AP', manX, 268);

// === CLIPBOARD / CHECKLIST floating near left ===
const clipX = 30;
const clipY = 350;

ctx.fillStyle = '#fef3c7';
roundRect(ctx, clipX, clipY, 90, 120, 6);
ctx.fill();
ctx.strokeStyle = '#d97706';
ctx.lineWidth = 1.5;
roundRect(ctx, clipX, clipY, 90, 120, 6);
ctx.stroke();

// Clipboard clip at top
ctx.fillStyle = '#78716c';
roundRect(ctx, clipX + 28, clipY - 8, 34, 16, 4);
ctx.fill();

// Checklist items
const checks = [
  { y: clipY + 25, checked: true },
  { y: clipY + 48, checked: true },
  { y: clipY + 71, checked: true },
  { y: clipY + 94, checked: false },
];

for (const item of checks) {
  // Checkbox
  ctx.strokeStyle = item.checked ? TEAL : MEDIUM_GRAY;
  ctx.lineWidth = 1.5;
  roundRect(ctx, clipX + 10, item.y, 14, 14, 2);
  ctx.stroke();

  if (item.checked) {
    ctx.strokeStyle = TEAL;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(clipX + 13, item.y + 7);
    ctx.lineTo(clipX + 17, item.y + 11);
    ctx.lineTo(clipX + 23, item.y + 4);
    ctx.stroke();
  }

  // Text line
  ctx.fillStyle = item.checked ? '#64748b' : '#cbd5e1';
  roundRect(ctx, clipX + 30, item.y + 3, 48, 7, 2);
  ctx.fill();
}

// === WRENCH icon floating top right ===
ctx.save();
ctx.translate(520, 200);
ctx.rotate(0.3);
ctx.fillStyle = MEDIUM_GRAY;
// Wrench handle
roundRect(ctx, -5, 0, 10, 60, 3);
ctx.fill();
// Wrench head
ctx.beginPath();
ctx.arc(0, 0, 16, 0, Math.PI * 2);
ctx.fill();
ctx.fillStyle = 'rgba(255,255,255,0.3)';
ctx.beginPath();
ctx.arc(0, 0, 7, 0, Math.PI * 2);
ctx.fill();
ctx.restore();

// === THERMOMETER icon floating ===
ctx.save();
ctx.translate(80, 220);
// Thermometer body
ctx.fillStyle = WHITE;
ctx.strokeStyle = MEDIUM_GRAY;
ctx.lineWidth = 1.5;
roundRect(ctx, -6, -40, 12, 60, 6);
ctx.fill();
ctx.stroke();
// Thermometer bulb
ctx.beginPath();
ctx.arc(0, 25, 10, 0, Math.PI * 2);
ctx.fillStyle = '#ef4444';
ctx.fill();
// Mercury
ctx.fillStyle = '#ef4444';
ctx.fillRect(-3, -15, 6, 40);
ctx.restore();

// === SNOWFLAKE icon near AC ===
drawSnowflake(ctx, acX + acW + 30, acY + 40, 18, 'rgba(56,189,248,0.6)');

// === GEAR icon ===
ctx.save();
ctx.translate(530, 350);
drawGear(ctx, 0, 0, 20, 8, MEDIUM_GRAY);
ctx.restore();

// Export
const buffer = canvas.toBuffer('image/png');
const outPath = join(__dirname, '..', 'public', 'images', 'people', 'hero-handyman.png');
writeFileSync(outPath, buffer);
console.log(`✅ hero-handyman.png generated (${(buffer.length / 1024).toFixed(1)} KB)`);

// Also generate the jpg version
const jpgCanvas = createCanvas(W, H);
const jpgCtx = jpgCanvas.getContext('2d');
// White background for JPG
jpgCtx.fillStyle = '#f0f9ff';
jpgCtx.fillRect(0, 0, W, H);
jpgCtx.drawImage(canvas, 0, 0);
const jpgBuffer = jpgCanvas.toBuffer('image/jpeg');
const jpgPath = join(__dirname, '..', 'public', 'images', 'people', 'hero-handyman.jpg');
writeFileSync(jpgPath, jpgBuffer);
console.log(`✅ hero-handyman.jpg generated (${(jpgBuffer.length / 1024).toFixed(1)} KB)`);

// Utility functions
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function drawSnowflake(ctx, cx, cy, size, color) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    const ex = cx + Math.cos(angle) * size;
    const ey = cy + Math.sin(angle) * size;
    ctx.lineTo(ex, ey);
    ctx.stroke();
    // Branch tips
    for (const branchOffset of [-0.4, 0.4]) {
      const bx = cx + Math.cos(angle) * size * 0.6;
      const by = cy + Math.sin(angle) * size * 0.6;
      ctx.beginPath();
      ctx.moveTo(bx, by);
      ctx.lineTo(
        bx + Math.cos(angle + branchOffset) * size * 0.3,
        by + Math.sin(angle + branchOffset) * size * 0.3
      );
      ctx.stroke();
    }
  }
}

function drawGear(ctx, cx, cy, outerR, teeth, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  const step = (Math.PI * 2) / teeth;
  for (let i = 0; i < teeth; i++) {
    const a1 = i * step;
    const a2 = a1 + step * 0.3;
    const a3 = a1 + step * 0.5;
    const a4 = a1 + step * 0.8;
    ctx.lineTo(cx + Math.cos(a1) * (outerR - 4), cy + Math.sin(a1) * (outerR - 4));
    ctx.lineTo(cx + Math.cos(a2) * outerR, cy + Math.sin(a2) * outerR);
    ctx.lineTo(cx + Math.cos(a3) * outerR, cy + Math.sin(a3) * outerR);
    ctx.lineTo(cx + Math.cos(a4) * (outerR - 4), cy + Math.sin(a4) * (outerR - 4));
  }
  ctx.closePath();
  ctx.fill();
  // Inner circle
  ctx.fillStyle = 'rgba(255,255,255,0.4)';
  ctx.beginPath();
  ctx.arc(cx, cy, outerR * 0.4, 0, Math.PI * 2);
  ctx.fill();
}
