import { createCanvas } from '@napi-rs/canvas';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const W = 800;
const H = 600;

const canvas = createCanvas(W, H);
const ctx = canvas.getContext('2d');

// Colors
const NAVY = '#0f145b';
const TEAL = '#008560';
const TEAL_LIGHT = '#10b981';
const GOLD = '#fac142';
const SKIN = '#e8b88a';
const WHITE = '#ffffff';
const LIGHT_GRAY = '#e2e8f0';
const MEDIUM_GRAY = '#94a3b8';
const DARK_GRAY = '#475569';
const SKY_BLUE = '#e0f2fe';

// Background - interior wall
const wallGrad = ctx.createLinearGradient(0, 0, 0, H);
wallGrad.addColorStop(0, '#faf5ff');
wallGrad.addColorStop(0.6, '#f8fafc');
wallGrad.addColorStop(1, '#f1f5f9');
ctx.fillStyle = wallGrad;
ctx.fillRect(0, 0, W, H);

// Baseboard
ctx.fillStyle = '#e2e8f0';
ctx.fillRect(0, H - 50, W, 50);
ctx.fillStyle = '#cbd5e1';
ctx.fillRect(0, H - 55, W, 8);

// Floor
ctx.fillStyle = '#d1d5db';
ctx.fillRect(0, H - 50, W, 50);
// Floor pattern
ctx.strokeStyle = '#c4c9cf';
ctx.lineWidth = 0.5;
for (let x = 0; x < W; x += 80) {
  ctx.beginPath();
  ctx.moveTo(x, H - 50);
  ctx.lineTo(x, H);
  ctx.stroke();
}

// === WALL-MOUNTED AC / HVAC UNIT ===
const unitX = 450;
const unitY = 100;
const unitW = 280;
const unitH = 150;

// Unit shadow
ctx.fillStyle = 'rgba(0,0,0,0.06)';
roundRect(ctx, unitX + 5, unitY + 5, unitW, unitH, 10);
ctx.fill();

// Main unit body
ctx.fillStyle = WHITE;
ctx.strokeStyle = '#cbd5e1';
ctx.lineWidth = 2;
roundRect(ctx, unitX, unitY, unitW, unitH, 10);
ctx.fill();
ctx.stroke();

// Front vent slats
for (let i = 0; i < 8; i++) {
  const y = unitY + 35 + i * 12;
  ctx.fillStyle = i % 2 === 0 ? '#f8fafc' : '#f1f5f9';
  ctx.fillRect(unitX + 15, y, unitW - 30, 9);
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 0.5;
  ctx.strokeRect(unitX + 15, y, unitW - 30, 9);
}

// Unit top panel
ctx.fillStyle = '#f1f5f9';
roundRect(ctx, unitX, unitY, unitW, 30, 10);
ctx.fill();
ctx.strokeStyle = '#cbd5e1';
ctx.lineWidth = 1;
roundRect(ctx, unitX, unitY, unitW, 30, 10);
ctx.stroke();

// Status display
ctx.fillStyle = '#0f172a';
roundRect(ctx, unitX + 15, unitY + 7, 55, 18, 4);
ctx.fill();
ctx.fillStyle = '#22d3ee';
ctx.font = 'bold 11px monospace';
ctx.textAlign = 'left';
ctx.fillText('72°F', unitX + 22, unitY + 20);

// Power LED
ctx.beginPath();
ctx.arc(unitX + unitW - 20, unitY + 16, 4, 0, Math.PI * 2);
ctx.fillStyle = TEAL_LIGHT;
ctx.fill();

// Brand label on unit
ctx.fillStyle = MEDIUM_GRAY;
ctx.font = '10px Arial';
ctx.textAlign = 'center';
ctx.fillText('ASSUREDAIR PRO', unitX + unitW / 2, unitY + 20);

// Air flow lines
ctx.strokeStyle = 'rgba(56,189,248,0.3)';
ctx.lineWidth = 1.5;
ctx.setLineDash([6, 4]);
for (let i = 0; i < 4; i++) {
  const startX = unitX + 40 + i * 55;
  ctx.beginPath();
  ctx.moveTo(startX, unitY + unitH + 5);
  ctx.quadraticCurveTo(startX - 10, unitY + unitH + 40, startX - 20, unitY + unitH + 60);
  ctx.stroke();
}
ctx.setLineDash([]);

// Ducts/pipe from wall
ctx.fillStyle = '#d1d5db';
ctx.fillRect(unitX + unitW - 10, unitY + 30, 45, 20);
ctx.fillRect(unitX + unitW + 25, unitY + 20, 20, 80);
ctx.strokeStyle = '#94a3b8';
ctx.lineWidth = 1;
ctx.strokeRect(unitX + unitW - 10, unitY + 30, 45, 20);

// === HANDYMAN (crouching/inspecting) ===
const manX = 280;
const manBaseY = H - 55;

// Person shadow
ctx.fillStyle = 'rgba(0,0,0,0.06)';
ctx.beginPath();
ctx.ellipse(manX, manBaseY, 70, 12, 0, 0, Math.PI * 2);
ctx.fill();

// --- Legs (slightly bent, working stance) ---
ctx.fillStyle = '#1e3a5f';
// Left leg
ctx.beginPath();
ctx.moveTo(manX - 25, manBaseY - 130);
ctx.lineTo(manX - 40, manBaseY - 20);
ctx.lineTo(manX - 15, manBaseY - 20);
ctx.lineTo(manX - 5, manBaseY - 130);
ctx.closePath();
ctx.fill();
// Right leg
ctx.beginPath();
ctx.moveTo(manX + 5, manBaseY - 130);
ctx.lineTo(manX + 15, manBaseY - 20);
ctx.lineTo(manX + 40, manBaseY - 20);
ctx.lineTo(manX + 25, manBaseY - 130);
ctx.closePath();
ctx.fill();

// Boots
ctx.fillStyle = '#57534e';
roundRect(ctx, manX - 45, manBaseY - 25, 36, 18, 4);
ctx.fill();
roundRect(ctx, manX + 12, manBaseY - 25, 36, 18, 4);
ctx.fill();

// --- Torso ---
ctx.fillStyle = TEAL;
ctx.beginPath();
ctx.moveTo(manX - 45, manBaseY - 260);
ctx.lineTo(manX + 45, manBaseY - 260);
ctx.lineTo(manX + 30, manBaseY - 125);
ctx.lineTo(manX - 30, manBaseY - 125);
ctx.closePath();
ctx.fill();

// Shirt collar V
ctx.fillStyle = '#059669';
ctx.beginPath();
ctx.moveTo(manX - 12, manBaseY - 262);
ctx.lineTo(manX, manBaseY - 240);
ctx.lineTo(manX + 12, manBaseY - 262);
ctx.closePath();
ctx.fill();

// Name badge
ctx.fillStyle = WHITE;
roundRect(ctx, manX + 5, manBaseY - 245, 36, 15, 3);
ctx.fill();
ctx.fillStyle = NAVY;
ctx.font = 'bold 8px Arial';
ctx.textAlign = 'center';
ctx.fillText('AP CREW', manX + 23, manBaseY - 235);

// Tool belt
ctx.fillStyle = '#78716c';
ctx.fillRect(manX - 32, manBaseY - 135, 64, 12);
ctx.fillStyle = GOLD;
roundRect(ctx, manX - 8, manBaseY - 134, 16, 10, 2);
ctx.fill();

// --- Right arm (extended up toward AC unit, holding tool) ---
ctx.fillStyle = TEAL;
ctx.beginPath();
ctx.moveTo(manX + 45, manBaseY - 256);
ctx.quadraticCurveTo(manX + 100, manBaseY - 280, manX + 150, manBaseY - 310);
ctx.lineTo(manX + 145, manBaseY - 285);
ctx.quadraticCurveTo(manX + 95, manBaseY - 260, manX + 42, manBaseY - 240);
ctx.closePath();
ctx.fill();

// Forearm
ctx.fillStyle = SKIN;
ctx.beginPath();
ctx.moveTo(manX + 148, manBaseY - 308);
ctx.quadraticCurveTo(manX + 180, manBaseY - 330, manX + 200, manBaseY - 345);
ctx.lineTo(manX + 195, manBaseY - 325);
ctx.quadraticCurveTo(manX + 175, manBaseY - 310, manX + 143, manBaseY - 288);
ctx.closePath();
ctx.fill();

// Hand
ctx.fillStyle = SKIN;
ctx.beginPath();
ctx.arc(manX + 202, manBaseY - 340, 11, 0, Math.PI * 2);
ctx.fill();

// Screwdriver in hand
ctx.strokeStyle = '#ef4444';
ctx.lineWidth = 5;
ctx.lineCap = 'round';
ctx.beginPath();
ctx.moveTo(manX + 208, manBaseY - 348);
ctx.lineTo(manX + 225, manBaseY - 370);
ctx.stroke();
ctx.strokeStyle = MEDIUM_GRAY;
ctx.lineWidth = 3;
ctx.beginPath();
ctx.moveTo(manX + 225, manBaseY - 370);
ctx.lineTo(manX + 238, manBaseY - 388);
ctx.stroke();

// --- Left arm (holding flashlight toward unit) ---
ctx.fillStyle = TEAL;
ctx.beginPath();
ctx.moveTo(manX - 45, manBaseY - 256);
ctx.quadraticCurveTo(manX - 75, manBaseY - 270, manX - 50, manBaseY - 310);
ctx.lineTo(manX - 30, manBaseY - 305);
ctx.quadraticCurveTo(manX - 55, manBaseY - 260, manX - 35, manBaseY - 240);
ctx.closePath();
ctx.fill();

// Left forearm reaching up
ctx.fillStyle = SKIN;
ctx.beginPath();
ctx.moveTo(manX - 48, manBaseY - 305);
ctx.quadraticCurveTo(manX - 30, manBaseY - 340, manX - 10, manBaseY - 350);
ctx.lineTo(manX - 5, manBaseY - 335);
ctx.quadraticCurveTo(manX - 25, manBaseY - 325, manX - 35, manBaseY - 295);
ctx.closePath();
ctx.fill();

// Left hand
ctx.fillStyle = SKIN;
ctx.beginPath();
ctx.arc(manX - 5, manBaseY - 345, 10, 0, Math.PI * 2);
ctx.fill();

// Flashlight
ctx.fillStyle = GOLD;
roundRect(ctx, manX - 12, manBaseY - 368, 14, 30, 3);
ctx.fill();
// Flashlight beam
ctx.fillStyle = 'rgba(250,193,66,0.15)';
ctx.beginPath();
ctx.moveTo(manX - 10, manBaseY - 370);
ctx.lineTo(manX - 40, manBaseY - 430);
ctx.lineTo(manX + 30, manBaseY - 430);
ctx.lineTo(manX + 10, manBaseY - 370);
ctx.closePath();
ctx.fill();

// --- Neck ---
ctx.fillStyle = SKIN;
ctx.fillRect(manX - 10, manBaseY - 280, 20, 22);

// --- Head (looking up toward unit) ---
ctx.fillStyle = SKIN;
ctx.beginPath();
ctx.arc(manX, manBaseY - 310, 38, 0, Math.PI * 2);
ctx.fill();

// Hair
ctx.fillStyle = '#44403c';
ctx.beginPath();
ctx.arc(manX, manBaseY - 318, 40, Math.PI, Math.PI * 2);
ctx.fill();

// Hard hat
ctx.fillStyle = GOLD;
ctx.beginPath();
ctx.ellipse(manX, manBaseY - 328, 44, 16, -0.1, Math.PI, Math.PI * 2);
ctx.fill();
ctx.beginPath();
ctx.ellipse(manX, manBaseY - 333, 36, 20, -0.1, Math.PI, Math.PI * 2);
ctx.fill();
// Brim
ctx.fillStyle = '#d97706';
ctx.beginPath();
ctx.ellipse(manX + 3, manBaseY - 326, 48, 7, -0.05, Math.PI, Math.PI * 2);
ctx.fill();

// AP on hat
ctx.fillStyle = NAVY;
ctx.font = 'bold 13px Arial';
ctx.textAlign = 'center';
ctx.fillText('AP', manX, manBaseY - 334);

// Eyes (looking up)
ctx.fillStyle = WHITE;
ctx.beginPath();
ctx.ellipse(manX - 12, manBaseY - 310, 8, 7, 0, 0, Math.PI * 2);
ctx.fill();
ctx.beginPath();
ctx.ellipse(manX + 12, manBaseY - 310, 8, 7, 0, 0, Math.PI * 2);
ctx.fill();

ctx.fillStyle = '#1e293b';
ctx.beginPath();
ctx.arc(manX - 11, manBaseY - 312, 4, 0, Math.PI * 2);
ctx.fill();
ctx.beginPath();
ctx.arc(manX + 13, manBaseY - 312, 4, 0, Math.PI * 2);
ctx.fill();

// Pupil highlights
ctx.fillStyle = WHITE;
ctx.beginPath();
ctx.arc(manX - 9, manBaseY - 313, 1.5, 0, Math.PI * 2);
ctx.fill();
ctx.beginPath();
ctx.arc(manX + 15, manBaseY - 313, 1.5, 0, Math.PI * 2);
ctx.fill();

// Eyebrows (focused look)
ctx.strokeStyle = '#44403c';
ctx.lineWidth = 2;
ctx.beginPath();
ctx.moveTo(manX - 20, manBaseY - 322);
ctx.quadraticCurveTo(manX - 12, manBaseY - 326, manX - 4, manBaseY - 322);
ctx.stroke();
ctx.beginPath();
ctx.moveTo(manX + 4, manBaseY - 322);
ctx.quadraticCurveTo(manX + 12, manBaseY - 326, manX + 20, manBaseY - 322);
ctx.stroke();

// Nose
ctx.strokeStyle = '#d49a6a';
ctx.lineWidth = 1.5;
ctx.beginPath();
ctx.moveTo(manX, manBaseY - 308);
ctx.quadraticCurveTo(manX + 4, manBaseY - 298, manX, manBaseY - 296);
ctx.stroke();

// Smile
ctx.strokeStyle = '#c2410c';
ctx.lineWidth = 2;
ctx.beginPath();
ctx.arc(manX, manBaseY - 292, 12, 0.15 * Math.PI, 0.85 * Math.PI);
ctx.stroke();

// === TOOLBOX on floor ===
const tbX = 80;
const tbY = manBaseY - 55;

// Toolbox shadow
ctx.fillStyle = 'rgba(0,0,0,0.05)';
ctx.beginPath();
ctx.ellipse(tbX + 50, tbY + 42, 55, 8, 0, 0, Math.PI * 2);
ctx.fill();

// Toolbox body
ctx.fillStyle = '#dc2626';
roundRect(ctx, tbX, tbY, 100, 40, 4);
ctx.fill();
ctx.strokeStyle = '#b91c1c';
ctx.lineWidth = 1.5;
roundRect(ctx, tbX, tbY, 100, 40, 4);
ctx.stroke();

// Toolbox lid
ctx.fillStyle = '#ef4444';
roundRect(ctx, tbX - 3, tbY - 8, 106, 12, 3);
ctx.fill();
ctx.strokeStyle = '#b91c1c';
ctx.lineWidth = 1;
roundRect(ctx, tbX - 3, tbY - 8, 106, 12, 3);
ctx.stroke();

// Handle
ctx.strokeStyle = '#78716c';
ctx.lineWidth = 3;
ctx.beginPath();
ctx.moveTo(tbX + 30, tbY - 8);
ctx.quadraticCurveTo(tbX + 50, tbY - 25, tbX + 70, tbY - 8);
ctx.stroke();

// Toolbox latch
ctx.fillStyle = GOLD;
roundRect(ctx, tbX + 44, tbY - 2, 12, 8, 2);
ctx.fill();

// Tools sticking out
ctx.fillStyle = MEDIUM_GRAY;
ctx.fillRect(tbX + 80, tbY - 30, 4, 25);
ctx.fillStyle = GOLD;
roundRect(ctx, tbX + 76, tbY - 35, 12, 10, 2);
ctx.fill();

// === GAUGES/MANIFOLD on floor near toolbox ===
const gaugeX = 30;
const gaugeY = manBaseY - 35;

// Gauge body
ctx.fillStyle = '#1e293b';
ctx.beginPath();
ctx.arc(gaugeX, gaugeY, 20, 0, Math.PI * 2);
ctx.fill();
ctx.fillStyle = WHITE;
ctx.beginPath();
ctx.arc(gaugeX, gaugeY, 15, 0, Math.PI * 2);
ctx.fill();

// Gauge needle
ctx.strokeStyle = '#ef4444';
ctx.lineWidth = 1.5;
ctx.beginPath();
ctx.moveTo(gaugeX, gaugeY);
ctx.lineTo(gaugeX + 10, gaugeY - 8);
ctx.stroke();

// Gauge markings
ctx.strokeStyle = '#64748b';
ctx.lineWidth = 0.5;
for (let i = 0; i < 8; i++) {
  const angle = (-Math.PI * 0.8) + (i * Math.PI * 1.6) / 7;
  ctx.beginPath();
  ctx.moveTo(gaugeX + Math.cos(angle) * 12, gaugeY + Math.sin(angle) * 12);
  ctx.lineTo(gaugeX + Math.cos(angle) * 14, gaugeY + Math.sin(angle) * 14);
  ctx.stroke();
}

// Hose from gauge
ctx.strokeStyle = '#3b82f6';
ctx.lineWidth = 4;
ctx.beginPath();
ctx.moveTo(gaugeX + 18, gaugeY + 5);
ctx.quadraticCurveTo(gaugeX + 50, gaugeY + 30, gaugeX + 60, gaugeY + 10);
ctx.stroke();

// === DECORATIVE ELEMENTS ===

// Snowflakes floating near AC
drawSnowflake(ctx, unitX + 60, unitY + unitH + 50, 10, 'rgba(56,189,248,0.4)');
drawSnowflake(ctx, unitX + 150, unitY + unitH + 70, 8, 'rgba(56,189,248,0.3)');
drawSnowflake(ctx, unitX + 230, unitY + unitH + 45, 12, 'rgba(56,189,248,0.35)');

// Temperature readout bubble
ctx.fillStyle = 'rgba(255,255,255,0.9)';
ctx.strokeStyle = TEAL;
ctx.lineWidth = 1.5;
roundRect(ctx, unitX + 90, unitY - 45, 100, 35, 8);
ctx.fill();
ctx.stroke();
// Bubble arrow
ctx.fillStyle = 'rgba(255,255,255,0.9)';
ctx.beginPath();
ctx.moveTo(unitX + 130, unitY - 10);
ctx.lineTo(unitX + 140, unitY + 2);
ctx.lineTo(unitX + 150, unitY - 10);
ctx.closePath();
ctx.fill();
ctx.strokeStyle = TEAL;
ctx.beginPath();
ctx.moveTo(unitX + 130, unitY - 10);
ctx.lineTo(unitX + 140, unitY + 2);
ctx.lineTo(unitX + 150, unitY - 10);
ctx.stroke();

ctx.fillStyle = TEAL;
ctx.font = 'bold 14px Arial';
ctx.textAlign = 'center';
ctx.fillText('✓ All Clear!', unitX + 140, unitY - 22);

// Export
const buffer = canvas.toBuffer('image/jpeg');
const outPath = join(__dirname, '..', 'public', 'images', 'people', 'hvac-inspection.jpg');
writeFileSync(outPath, buffer);
console.log(`✅ hvac-inspection.jpg generated (${(buffer.length / 1024).toFixed(1)} KB)`);

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
  ctx.lineWidth = 1.5;
  ctx.lineCap = 'round';
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(angle) * size, cy + Math.sin(angle) * size);
    ctx.stroke();
    for (const bo of [-0.4, 0.4]) {
      const bx = cx + Math.cos(angle) * size * 0.6;
      const by = cy + Math.sin(angle) * size * 0.6;
      ctx.beginPath();
      ctx.moveTo(bx, by);
      ctx.lineTo(bx + Math.cos(angle + bo) * size * 0.3, by + Math.sin(angle + bo) * size * 0.3);
      ctx.stroke();
    }
  }
}
