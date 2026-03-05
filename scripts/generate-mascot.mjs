// ============================================================
// scripts/generate-mascot.mjs
// Generates AP Superhero mascot sprite sheet (1024x1024, 8x8)
// and static mascot image (512x512).
//
// Character: Muscular, chiseled superhero with strong jawline,
//            "AP" emblem on chest, teal cape, navy suit.
//
// Run:  node scripts/generate-mascot.mjs
// ============================================================

import { createCanvas } from '@napi-rs/canvas';
import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// ── Constants ──────────────────────────────────────────────
const FRAME = 128;
const GRID = 8;
const SHEET = FRAME * GRID; // 1024

const C = {
  suit:        '#0F145B',
  suitMid:     '#161D6E',
  suitLight:   '#1C2580',
  suitHighlight: '#2A35A0',
  cape:        '#008560',
  capeDark:    '#005E44',
  capeLight:   '#00A074',
  boots:       '#008560',
  bootsDark:   '#005E44',
  emblem:      '#FAC142',
  emblemEdge:  '#D4A030',
  emblemLight: '#FFD76A',
  skin:        '#E8B87A',
  skinLight:   '#F4C88E',
  skinShade:   '#C89558',
  skinDark:    '#B0804A',
  eyeWhite:    '#FFFFFF',
  pupil:       '#1A1A2E',
  irisBlue:    '#3A7BCC',
  mouth:       '#A03030',
  mouthDark:   '#802020',
  belt:        '#FAC142',
  beltDark:    '#D4A030',
  outline:     '#080C38',
  white:       '#FFFFFF',
};

// ── Math helpers ───────────────────────────────────────────
const lerp  = (a, b, t) => a + (b - a) * t;
const ease  = (t) => t < 0.5 ? 2*t*t : 1 - Math.pow(-2*t + 2, 2) / 2;
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const PI = Math.PI;

// ── Layout: heroic proportions ─────────────────────────────
// Head centre ~y=20, shoulders ~y=36, chest ~y=44,
// waist ~y=68, hips ~y=72, knees ~y=92, feet ~y=116
// Character is ~108px tall, centred horizontally at x=64

// ── Drawing: Cape ──────────────────────────────────────────
function drawCape(ctx, pose) {
  const fl = pose.capeFlutter || 0;
  ctx.save();

  // Inner cape shadow
  ctx.beginPath();
  ctx.moveTo(42, 36);
  ctx.lineTo(86, 36);
  ctx.bezierCurveTo(94, 60, 92 + fl*0.6, 88, 86 + fl*0.7, 114);
  ctx.lineTo(42 - fl*0.7, 114);
  ctx.bezierCurveTo(36 - fl*0.6, 88, 34, 60, 42, 36);
  ctx.closePath();
  ctx.fillStyle = C.capeDark;
  ctx.fill();

  // Outer cape
  ctx.beginPath();
  ctx.moveTo(44, 36);
  ctx.lineTo(84, 36);
  ctx.bezierCurveTo(92, 58, 90 + fl*0.7, 86, 84 + fl*0.8, 112);
  ctx.quadraticCurveTo(64 + fl*0.2, 118, 44 - fl*0.8, 112);
  ctx.bezierCurveTo(38 - fl*0.7, 86, 36, 58, 44, 36);
  ctx.closePath();
  const capeGrad = ctx.createLinearGradient(64, 36, 64 + fl*0.3, 112);
  capeGrad.addColorStop(0, C.cape);
  capeGrad.addColorStop(0.6, C.cape);
  capeGrad.addColorStop(1, C.capeLight);
  ctx.fillStyle = capeGrad;
  ctx.fill();
  ctx.strokeStyle = C.capeDark;
  ctx.lineWidth = 0.8;
  ctx.stroke();

  ctx.restore();
}

// ── Drawing: Muscular Leg ──────────────────────────────────
function drawLeg(ctx, hipX, hipY, angle, kneeAngle) {
  const upperLen = 20, lowerLen = 20;
  ctx.save();
  ctx.translate(hipX, hipY);
  ctx.rotate(angle);

  // Upper thigh - muscular taper
  ctx.beginPath();
  ctx.moveTo(-7, 0);
  ctx.quadraticCurveTo(-8, 10, -6, upperLen);
  ctx.lineTo(6, upperLen);
  ctx.quadraticCurveTo(8, 10, 7, 0);
  ctx.closePath();
  const thighGrad = ctx.createLinearGradient(-7, 0, 7, 0);
  thighGrad.addColorStop(0, C.suit);
  thighGrad.addColorStop(0.3, C.suitLight);
  thighGrad.addColorStop(0.7, C.suitLight);
  thighGrad.addColorStop(1, C.suit);
  ctx.fillStyle = thighGrad;
  ctx.fill();
  ctx.strokeStyle = C.outline;
  ctx.lineWidth = 0.5;
  ctx.stroke();

  // Lower leg
  ctx.translate(0, upperLen);
  ctx.rotate(kneeAngle);

  ctx.beginPath();
  ctx.moveTo(-6, 0);
  ctx.quadraticCurveTo(-7, 8, -5.5, lowerLen);
  ctx.lineTo(5.5, lowerLen);
  ctx.quadraticCurveTo(7, 8, 6, 0);
  ctx.closePath();
  const shinGrad = ctx.createLinearGradient(-6, 0, 6, 0);
  shinGrad.addColorStop(0, C.suit);
  shinGrad.addColorStop(0.4, C.suitMid);
  shinGrad.addColorStop(1, C.suit);
  ctx.fillStyle = shinGrad;
  ctx.fill();
  ctx.strokeStyle = C.outline;
  ctx.lineWidth = 0.5;
  ctx.stroke();

  // Boot
  ctx.beginPath();
  ctx.moveTo(-6.5, lowerLen - 5);
  ctx.lineTo(6.5, lowerLen - 5);
  ctx.lineTo(7.5, lowerLen + 2);
  ctx.quadraticCurveTo(7.5, lowerLen + 6, 3, lowerLen + 6);
  ctx.lineTo(-3, lowerLen + 6);
  ctx.quadraticCurveTo(-7.5, lowerLen + 6, -7.5, lowerLen + 2);
  ctx.closePath();
  ctx.fillStyle = C.boots;
  ctx.fill();
  ctx.strokeStyle = C.bootsDark;
  ctx.lineWidth = 0.6;
  ctx.stroke();

  // Boot top trim
  ctx.beginPath();
  ctx.moveTo(-6.5, lowerLen - 5);
  ctx.lineTo(6.5, lowerLen - 5);
  ctx.strokeStyle = C.emblem;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.restore();
}

// ── Drawing: Muscular Arm ──────────────────────────────────
function drawArm(ctx, sx, sy, upperA, foreA, handRotation) {
  const uLen = 16, fLen = 15;
  ctx.save();
  ctx.translate(sx, sy);
  ctx.rotate(upperA);

  // Bicep - muscular bulge
  ctx.beginPath();
  ctx.moveTo(-5, 0);
  ctx.quadraticCurveTo(-7, 6, -5.5, uLen);
  ctx.lineTo(5.5, uLen);
  ctx.quadraticCurveTo(7, 6, 5, 0);
  ctx.closePath();
  const bicepGrad = ctx.createLinearGradient(-6, 0, 6, 0);
  bicepGrad.addColorStop(0, C.suit);
  bicepGrad.addColorStop(0.35, C.suitHighlight);
  bicepGrad.addColorStop(0.65, C.suitHighlight);
  bicepGrad.addColorStop(1, C.suit);
  ctx.fillStyle = bicepGrad;
  ctx.fill();
  ctx.strokeStyle = C.outline;
  ctx.lineWidth = 0.5;
  ctx.stroke();

  // Forearm
  ctx.translate(0, uLen);
  ctx.rotate(foreA);

  ctx.beginPath();
  ctx.moveTo(-5, 0);
  ctx.quadraticCurveTo(-5.5, 5, -4, fLen);
  ctx.lineTo(4, fLen);
  ctx.quadraticCurveTo(5.5, 5, 5, 0);
  ctx.closePath();
  const foreGrad = ctx.createLinearGradient(-5, 0, 5, 0);
  foreGrad.addColorStop(0, C.suit);
  foreGrad.addColorStop(0.4, C.suitMid);
  foreGrad.addColorStop(1, C.suit);
  ctx.fillStyle = foreGrad;
  ctx.fill();
  ctx.strokeStyle = C.outline;
  ctx.lineWidth = 0.5;
  ctx.stroke();

  // Gloved fist
  ctx.translate(0, fLen);
  if (handRotation) ctx.rotate(handRotation);
  ctx.beginPath();
  ctx.roundRect(-5, -2, 10, 9, 3);
  ctx.fillStyle = C.skin;
  ctx.fill();
  ctx.strokeStyle = C.skinShade;
  ctx.lineWidth = 0.8;
  ctx.stroke();
  // knuckle line
  ctx.beginPath();
  ctx.moveTo(-3, 2);
  ctx.lineTo(3, 2);
  ctx.strokeStyle = C.skinDark;
  ctx.lineWidth = 0.5;
  ctx.stroke();

  ctx.restore();
}

// ── Drawing: Muscular V-Torso ──────────────────────────────
function drawTorso(ctx) {
  ctx.save();

  // Main torso shape — broad shoulders, narrow waist
  ctx.beginPath();
  ctx.moveTo(40, 36);    // left shoulder (wide)
  ctx.lineTo(88, 36);    // right shoulder
  ctx.lineTo(86, 42);    // right upper chest
  ctx.quadraticCurveTo(84, 62, 76, 70); // right side taper
  ctx.lineTo(74, 74);    // right waist
  ctx.lineTo(54, 74);    // left waist
  ctx.lineTo(52, 70);    // left side
  ctx.quadraticCurveTo(44, 62, 42, 42); // left side taper
  ctx.closePath();

  const torsoGrad = ctx.createLinearGradient(40, 36, 88, 36);
  torsoGrad.addColorStop(0, C.suit);
  torsoGrad.addColorStop(0.2, C.suitMid);
  torsoGrad.addColorStop(0.5, C.suitLight);
  torsoGrad.addColorStop(0.8, C.suitMid);
  torsoGrad.addColorStop(1, C.suit);
  ctx.fillStyle = torsoGrad;
  ctx.fill();
  ctx.strokeStyle = C.outline;
  ctx.lineWidth = 0.7;
  ctx.stroke();

  // Pec muscle definition — centre line
  ctx.beginPath();
  ctx.moveTo(64, 40);
  ctx.lineTo(64, 56);
  ctx.strokeStyle = C.outline;
  ctx.lineWidth = 0.6;
  ctx.globalAlpha = 0.3;
  ctx.stroke();
  ctx.globalAlpha = 1;

  // Pec curve left
  ctx.beginPath();
  ctx.moveTo(48, 42);
  ctx.quadraticCurveTo(54, 50, 62, 48);
  ctx.strokeStyle = C.outline;
  ctx.lineWidth = 0.5;
  ctx.globalAlpha = 0.25;
  ctx.stroke();
  ctx.globalAlpha = 1;

  // Pec curve right
  ctx.beginPath();
  ctx.moveTo(80, 42);
  ctx.quadraticCurveTo(74, 50, 66, 48);
  ctx.strokeStyle = C.outline;
  ctx.lineWidth = 0.5;
  ctx.globalAlpha = 0.25;
  ctx.stroke();
  ctx.globalAlpha = 1;

  // Ab hint lines
  ctx.globalAlpha = 0.15;
  ctx.strokeStyle = C.outline;
  ctx.lineWidth = 0.5;
  for (const y of [58, 63, 68]) {
    ctx.beginPath();
    ctx.moveTo(57, y);
    ctx.lineTo(71, y);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  // Shoulder cap — left
  ctx.beginPath();
  ctx.ellipse(42, 37, 7, 5, 0.2, 0, PI * 2);
  const lShGrad = ctx.createRadialGradient(42, 36, 1, 42, 37, 6);
  lShGrad.addColorStop(0, C.suitHighlight);
  lShGrad.addColorStop(1, C.suit);
  ctx.fillStyle = lShGrad;
  ctx.fill();
  ctx.strokeStyle = C.outline;
  ctx.lineWidth = 0.5;
  ctx.stroke();

  // Shoulder cap — right
  ctx.beginPath();
  ctx.ellipse(86, 37, 7, 5, -0.2, 0, PI * 2);
  const rShGrad = ctx.createRadialGradient(86, 36, 1, 86, 37, 6);
  rShGrad.addColorStop(0, C.suitHighlight);
  rShGrad.addColorStop(1, C.suit);
  ctx.fillStyle = rShGrad;
  ctx.fill();
  ctx.strokeStyle = C.outline;
  ctx.lineWidth = 0.5;
  ctx.stroke();

  ctx.restore();
}

// ── Drawing: Belt ──────────────────────────────────────────
function drawBelt(ctx) {
  ctx.save();

  // Belt strap
  ctx.beginPath();
  ctx.moveTo(53, 72);
  ctx.lineTo(75, 72);
  ctx.lineTo(74, 77);
  ctx.lineTo(54, 77);
  ctx.closePath();
  const beltGrad = ctx.createLinearGradient(54, 72, 54, 77);
  beltGrad.addColorStop(0, C.emblemLight);
  beltGrad.addColorStop(0.5, C.belt);
  beltGrad.addColorStop(1, C.beltDark);
  ctx.fillStyle = beltGrad;
  ctx.fill();
  ctx.strokeStyle = C.beltDark;
  ctx.lineWidth = 0.6;
  ctx.stroke();

  // Belt buckle
  ctx.beginPath();
  ctx.roundRect(59, 70, 10, 9, 2);
  ctx.fillStyle = C.emblem;
  ctx.fill();
  ctx.strokeStyle = C.emblemEdge;
  ctx.lineWidth = 0.8;
  ctx.stroke();

  ctx.restore();
}

// ── Drawing: AP Shield Emblem ──────────────────────────────
function drawEmblem(ctx) {
  ctx.save();
  ctx.translate(64, 50);

  // Outer glow
  ctx.beginPath();
  ctx.moveTo(0, -13);
  ctx.lineTo(12, 0);
  ctx.lineTo(0, 13);
  ctx.lineTo(-12, 0);
  ctx.closePath();
  ctx.fillStyle = 'rgba(250,193,66,0.2)';
  ctx.fill();

  // Diamond shield
  ctx.beginPath();
  ctx.moveTo(0, -11);
  ctx.lineTo(10, 0);
  ctx.lineTo(0, 11);
  ctx.lineTo(-10, 0);
  ctx.closePath();
  const embGrad = ctx.createLinearGradient(0, -11, 0, 11);
  embGrad.addColorStop(0, C.emblemLight);
  embGrad.addColorStop(0.4, C.emblem);
  embGrad.addColorStop(1, C.emblemEdge);
  ctx.fillStyle = embGrad;
  ctx.fill();
  ctx.strokeStyle = C.emblemEdge;
  ctx.lineWidth = 1.2;
  ctx.stroke();

  // Inner border
  ctx.beginPath();
  ctx.moveTo(0, -8);
  ctx.lineTo(7, 0);
  ctx.lineTo(0, 8);
  ctx.lineTo(-7, 0);
  ctx.closePath();
  ctx.strokeStyle = 'rgba(255,255,255,0.3)';
  ctx.lineWidth = 0.6;
  ctx.stroke();

  // AP text — bold
  ctx.fillStyle = C.suit;
  ctx.font = 'bold 11px Arial, Helvetica, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('AP', 0, 0.5);

  ctx.restore();
}

// ── Drawing: Head with Strong Jawline ──────────────────────
function drawHead(ctx, pose) {
  const hx = 64, hy = 20;
  ctx.save();
  ctx.translate(hx, hy);
  ctx.rotate(pose.headTilt || 0);

  // Jaw + cranium shape — angular, heroic
  ctx.beginPath();
  ctx.moveTo(0, -14);                     // top of head
  ctx.bezierCurveTo(13, -14, 15, -8, 15, -2);  // right cranium
  ctx.lineTo(14, 4);                      // right cheek
  ctx.lineTo(10, 10);                     // right jaw angle (chiseled)
  ctx.lineTo(5, 14);                      // right chin
  ctx.quadraticCurveTo(0, 16, -5, 14);    // chin point (strong square)
  ctx.lineTo(-10, 10);                    // left jaw angle
  ctx.lineTo(-14, 4);                     // left cheek
  ctx.lineTo(-15, -2);                    // left cranium
  ctx.bezierCurveTo(-15, -8, -13, -14, 0, -14);
  ctx.closePath();

  const headGrad = ctx.createLinearGradient(-10, 0, 12, 0);
  headGrad.addColorStop(0, C.skinShade);
  headGrad.addColorStop(0.3, C.skinLight);
  headGrad.addColorStop(0.6, C.skin);
  headGrad.addColorStop(1, C.skinShade);
  ctx.fillStyle = headGrad;
  ctx.fill();
  ctx.strokeStyle = C.skinDark;
  ctx.lineWidth = 0.8;
  ctx.stroke();

  // Jaw shadow for definition
  ctx.beginPath();
  ctx.moveTo(-12, 6);
  ctx.quadraticCurveTo(-8, 10, -5, 12);
  ctx.strokeStyle = C.skinDark;
  ctx.lineWidth = 0.6;
  ctx.globalAlpha = 0.35;
  ctx.stroke();
  ctx.globalAlpha = 1;

  ctx.beginPath();
  ctx.moveTo(12, 6);
  ctx.quadraticCurveTo(8, 10, 5, 12);
  ctx.strokeStyle = C.skinDark;
  ctx.lineWidth = 0.6;
  ctx.globalAlpha = 0.35;
  ctx.stroke();
  ctx.globalAlpha = 1;

  // Chin cleft
  ctx.beginPath();
  ctx.moveTo(0, 12);
  ctx.lineTo(0, 14);
  ctx.strokeStyle = C.skinDark;
  ctx.lineWidth = 0.5;
  ctx.globalAlpha = 0.3;
  ctx.stroke();
  ctx.globalAlpha = 1;

  ctx.restore();
}

// ── Drawing: Cowl/Mask ─────────────────────────────────────
function drawCowl(ctx, pose) {
  const hx = 64, hy = 20;
  ctx.save();
  ctx.translate(hx, hy);
  ctx.rotate(pose.headTilt || 0);

  // Cowl covers upper portion — leaves jaw and lower face exposed
  ctx.beginPath();
  ctx.moveTo(0, -15);
  ctx.bezierCurveTo(14, -15, 16, -8, 16, -2);
  ctx.lineTo(15, 2);
  // Face opening — angular to match jaw
  ctx.quadraticCurveTo(12, 5, 9, 4);
  ctx.quadraticCurveTo(5, 2, 0, 2);
  ctx.quadraticCurveTo(-5, 2, -9, 4);
  ctx.quadraticCurveTo(-12, 5, -15, 2);
  ctx.lineTo(-16, -2);
  ctx.bezierCurveTo(-16, -8, -14, -15, 0, -15);
  ctx.closePath();

  const cowlGrad = ctx.createLinearGradient(-10, -10, 10, 5);
  cowlGrad.addColorStop(0, C.suitLight);
  cowlGrad.addColorStop(0.5, C.suit);
  cowlGrad.addColorStop(1, C.outline);
  ctx.fillStyle = cowlGrad;
  ctx.fill();

  // Pointed ear — left (taller, more angular)
  ctx.beginPath();
  ctx.moveTo(-11, -10);
  ctx.lineTo(-16, -27);
  ctx.lineTo(-8, -12);
  ctx.closePath();
  ctx.fillStyle = C.suit;
  ctx.fill();
  ctx.strokeStyle = C.outline;
  ctx.lineWidth = 0.5;
  ctx.stroke();

  // Pointed ear — right
  ctx.beginPath();
  ctx.moveTo(11, -10);
  ctx.lineTo(16, -27);
  ctx.lineTo(8, -12);
  ctx.closePath();
  ctx.fillStyle = C.suit;
  ctx.fill();
  ctx.strokeStyle = C.outline;
  ctx.lineWidth = 0.5;
  ctx.stroke();

  // Brow ridge across cowl
  ctx.beginPath();
  ctx.moveTo(-12, -4);
  ctx.quadraticCurveTo(-6, -7, 0, -6);
  ctx.quadraticCurveTo(6, -7, 12, -4);
  ctx.strokeStyle = C.outline;
  ctx.lineWidth = 1.5;
  ctx.lineCap = 'round';
  ctx.stroke();

  ctx.restore();
}

// ── Drawing: Heroic Face ───────────────────────────────────
function drawFace(ctx, pose) {
  const hx = 64, hy = 20;
  ctx.save();
  ctx.translate(hx, hy);
  ctx.rotate(pose.headTilt || 0);

  // Eye whites — angular, determined
  // Left eye
  ctx.beginPath();
  ctx.moveTo(-11, -4);
  ctx.quadraticCurveTo(-7, -6.5, -3, -3.5);
  ctx.quadraticCurveTo(-7, -1, -11, -2.5);
  ctx.closePath();
  ctx.fillStyle = C.eyeWhite;
  ctx.fill();

  // Right eye
  ctx.beginPath();
  ctx.moveTo(11, -4);
  ctx.quadraticCurveTo(7, -6.5, 3, -3.5);
  ctx.quadraticCurveTo(7, -1, 11, -2.5);
  ctx.closePath();
  ctx.fillStyle = C.eyeWhite;
  ctx.fill();

  // Irises
  ctx.fillStyle = C.irisBlue;
  ctx.beginPath();
  ctx.arc(-7, -3.5, 2.2, 0, PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(7, -3.5, 2.2, 0, PI * 2);
  ctx.fill();

  // Pupils
  ctx.fillStyle = C.pupil;
  ctx.beginPath();
  ctx.arc(-7, -3.5, 1.2, 0, PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(7, -3.5, 1.2, 0, PI * 2);
  ctx.fill();

  // Eye shine
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  ctx.beginPath();
  ctx.arc(-8, -4.5, 0.7, 0, PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(6, -4.5, 0.7, 0, PI * 2);
  ctx.fill();

  // Nose — subtle
  ctx.beginPath();
  ctx.moveTo(0, -1);
  ctx.lineTo(-1.5, 4);
  ctx.lineTo(1.5, 4);
  ctx.closePath();
  ctx.fillStyle = C.skinShade;
  ctx.globalAlpha = 0.25;
  ctx.fill();
  ctx.globalAlpha = 1;

  // Nostrils
  ctx.beginPath();
  ctx.arc(-1.5, 4.5, 0.6, 0, PI * 2);
  ctx.arc(1.5, 4.5, 0.6, 0, PI * 2);
  ctx.fillStyle = C.skinDark;
  ctx.globalAlpha = 0.3;
  ctx.fill();
  ctx.globalAlpha = 1;

  // Mouth — confident, closed
  ctx.beginPath();
  ctx.moveTo(-5, 8);
  ctx.quadraticCurveTo(-2, 9, 0, 8.5);
  ctx.quadraticCurveTo(2, 9, 5, 8);
  ctx.strokeStyle = C.mouthDark;
  ctx.lineWidth = 1.2;
  ctx.lineCap = 'round';
  ctx.stroke();

  // Slight smirk upturn on right
  ctx.beginPath();
  ctx.moveTo(5, 8);
  ctx.quadraticCurveTo(6, 7.5, 6.5, 7);
  ctx.strokeStyle = C.mouthDark;
  ctx.lineWidth = 0.8;
  ctx.stroke();

  ctx.restore();
}

// ── Drawing: Neck ──────────────────────────────────────────
function drawNeck(ctx) {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(58, 32);
  ctx.lineTo(70, 32);
  ctx.lineTo(72, 38);
  ctx.lineTo(56, 38);
  ctx.closePath();
  const neckGrad = ctx.createLinearGradient(58, 32, 70, 32);
  neckGrad.addColorStop(0, C.skinShade);
  neckGrad.addColorStop(0.5, C.skin);
  neckGrad.addColorStop(1, C.skinShade);
  ctx.fillStyle = neckGrad;
  ctx.fill();
  ctx.restore();
}

// ── Drawing: Back view ─────────────────────────────────────
function drawBack(ctx, pose) {
  const fl = pose.capeFlutter || 0;

  // Large cape (back view)
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(38, 34);
  ctx.lineTo(90, 34);
  ctx.bezierCurveTo(96, 62, 94 + fl*0.5, 92, 88 + fl*0.6, 118);
  ctx.quadraticCurveTo(64 + fl*0.1, 122, 40 - fl*0.6, 118);
  ctx.bezierCurveTo(34 - fl*0.5, 92, 32, 62, 38, 34);
  ctx.closePath();
  const backCapeGrad = ctx.createLinearGradient(64, 34, 64 + fl*0.3, 118);
  backCapeGrad.addColorStop(0, C.cape);
  backCapeGrad.addColorStop(0.7, C.cape);
  backCapeGrad.addColorStop(1, C.capeLight);
  ctx.fillStyle = backCapeGrad;
  ctx.fill();
  ctx.strokeStyle = C.capeDark;
  ctx.lineWidth = 0.8;
  ctx.stroke();
  ctx.restore();

  // Legs behind cape
  drawLeg(ctx, 57, 76, pose.lLegAngle || 0, 0);
  drawLeg(ctx, 71, 76, pose.rLegAngle || 0, 0);

  // Upper back/shoulders visible above cape
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(42, 36);
  ctx.lineTo(86, 36);
  ctx.lineTo(84, 44);
  ctx.lineTo(44, 44);
  ctx.closePath();
  ctx.fillStyle = C.suit;
  ctx.fill();
  ctx.restore();

  // Arms
  drawArm(ctx, 40, 38, pose.lArmAngle || -0.15, -0.3, 0);
  drawArm(ctx, 88, 38, pose.rArmAngle || -0.15, -0.3, 0);

  // Neck
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(58, 28, 12, 10, 2);
  ctx.fillStyle = C.skinShade;
  ctx.fill();
  ctx.restore();

  // Back of head (all cowl)
  ctx.save();
  ctx.translate(64, 20);
  ctx.beginPath();
  ctx.moveTo(0, -14);
  ctx.bezierCurveTo(14, -14, 16, -6, 16, 0);
  ctx.lineTo(14, 6);
  ctx.quadraticCurveTo(10, 12, 0, 14);
  ctx.quadraticCurveTo(-10, 12, -14, 6);
  ctx.lineTo(-16, 0);
  ctx.bezierCurveTo(-16, -6, -14, -14, 0, -14);
  ctx.closePath();
  ctx.fillStyle = C.suit;
  ctx.fill();

  // Ear tips
  ctx.beginPath();
  ctx.moveTo(-11, -10); ctx.lineTo(-16, -27); ctx.lineTo(-8, -12);
  ctx.closePath();
  ctx.fillStyle = C.suit;
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(11, -10); ctx.lineTo(16, -27); ctx.lineTo(8, -12);
  ctx.closePath();
  ctx.fillStyle = C.suit;
  ctx.fill();

  ctx.restore();
}

// ── Master draw (front-facing) ─────────────────────────────
function drawCharacter(ctx, pose) {
  ctx.save();
  ctx.translate(0, pose.bodyY || 0);

  drawCape(ctx, pose);
  drawLeg(ctx, 57, 76, pose.lLegAngle || 0, pose.lKnee || 0);
  drawLeg(ctx, 71, 76, pose.rLegAngle || 0, pose.rKnee || 0);
  drawNeck(ctx);
  drawTorso(ctx);
  drawBelt(ctx);
  drawEmblem(ctx);
  drawArm(ctx, 38, 38, pose.lArmAngle || -0.15, pose.lForearm || -0.3, 0);
  drawArm(ctx, 90, 38, pose.rArmAngle || -0.15, pose.rForearm || -0.3, pose.handWave || 0);
  drawHead(ctx, pose);
  drawCowl(ctx, pose);
  drawFace(ctx, pose);

  // Foot shadow
  ctx.beginPath();
  ctx.ellipse(64, 120, 20, 4, 0, 0, PI * 2);
  ctx.fillStyle = 'rgba(0,0,0,0.12)';
  ctx.fill();

  ctx.restore();
}

// ── Spin drawing (pseudo-3D) ───────────────────────────────
function drawCharacterSpin(ctx, pose) {
  const angle = pose.facingAngle || 0;
  const cosA = Math.cos(angle);
  const absCos = Math.abs(cosA);
  const isBack = Math.abs(angle - PI) < PI / 3;

  ctx.save();
  ctx.translate(64, 0);
  ctx.scale(Math.max(0.35, absCos), 1);
  ctx.translate(-64, 0);
  ctx.translate(0, pose.bodyY || 0);

  if (isBack) {
    drawBack(ctx, pose);
  } else {
    drawCape(ctx, pose);
    drawLeg(ctx, 57, 76, 0, 0);
    drawLeg(ctx, 71, 76, 0, 0);
    drawNeck(ctx);
    drawTorso(ctx);
    drawBelt(ctx);
    if (absCos > 0.5) drawEmblem(ctx);
    drawArm(ctx, 38, 38, -0.35, -0.3, 0);
    drawArm(ctx, 90, 38, -0.35, -0.3, 0);
    drawHead(ctx, pose);
    drawCowl(ctx, pose);
    if (absCos > 0.4) drawFace(ctx, pose);
  }

  // Foot shadow
  ctx.beginPath();
  ctx.ellipse(64, 120, 20 * Math.max(0.5, absCos), 4, 0, 0, PI * 2);
  ctx.fillStyle = 'rgba(0,0,0,0.12)';
  ctx.fill();

  ctx.restore();
}

// ── Pose generators ────────────────────────────────────────

function walkPose(i) {
  const t = (i / 16) * PI * 2;
  const legSwing = Math.sin(t) * 0.35;
  const armSwing = Math.sin(t + PI) * 0.3;
  const bounce = -Math.abs(Math.sin(t)) * 2.5;

  return {
    bodyY: bounce,
    headTilt: Math.sin(t) * 0.03,
    lArmAngle: -0.2 + armSwing,
    rArmAngle: -0.2 - armSwing,
    lForearm: -0.3,
    rForearm: -0.3,
    lLegAngle: legSwing,
    rLegAngle: -legSwing,
    lKnee: Math.max(0, -Math.sin(t)) * 0.4,
    rKnee: Math.max(0, Math.sin(t)) * 0.4,
    capeFlutter: Math.sin(t + 0.5) * 4,
    handWave: 0,
  };
}

function salutePose(i) {
  let rArm, rFore;

  if (i <= 4) {
    const t = ease(i / 4);
    rArm  = lerp(-0.15, -2.6, t);
    rFore = lerp(-0.3, -1.0, t);
  } else if (i <= 10) {
    rArm  = -2.6;
    rFore = -1.0;
  } else {
    const t = ease((i - 11) / 4);
    rArm  = lerp(-2.6, -0.15, t);
    rFore = lerp(-1.0, -0.3, t);
  }

  return {
    bodyY: 0,
    headTilt: 0,
    lArmAngle: -0.15,
    rArmAngle: rArm,
    lForearm: -0.3,
    rForearm: rFore,
    lLegAngle: -0.04,
    rLegAngle:  0.04,
    lKnee: 0,
    rKnee: 0,
    capeFlutter: 0,
    handWave: 0,
  };
}

function wavePose(i) {
  let rArm, hw = 0;

  if (i <= 3) {
    rArm = lerp(-0.15, -2.3, ease(i / 3));
  } else if (i <= 12) {
    rArm = -2.3;
    const wt = (i - 4) / 8;
    hw = Math.sin(wt * PI * 3) * 0.4;
  } else {
    rArm = lerp(-2.3, -0.15, ease((i - 13) / 2));
  }

  return {
    bodyY: 0,
    headTilt: Math.sin((i / 16) * PI * 2) * 0.03,
    lArmAngle: -0.15,
    rArmAngle: rArm,
    lForearm: -0.3,
    rForearm: -0.6,
    lLegAngle: -0.04,
    rLegAngle:  0.04,
    lKnee: 0,
    rKnee: 0,
    capeFlutter: Math.sin(i * 0.35) * 2.5,
    handWave: hw,
  };
}

function spinPose(i) {
  const angle = (i / 16) * PI * 2;
  return {
    bodyY: -2,
    headTilt: 0,
    lArmAngle: -0.4,
    rArmAngle: -0.4,
    lForearm: -0.3,
    rForearm: -0.3,
    lLegAngle: 0,
    rLegAngle: 0,
    lKnee: 0,
    rKnee: 0,
    capeFlutter: Math.sin(angle) * 8,
    handWave: 0,
    facingAngle: angle,
  };
}

// ── Generate all 64 poses ──────────────────────────────────
function allPoses() {
  const p = [];
  for (let i = 0; i < 16; i++) p.push(walkPose(i));
  for (let i = 0; i < 16; i++) p.push(salutePose(i));
  for (let i = 0; i < 16; i++) p.push(wavePose(i));
  for (let i = 0; i < 16; i++) p.push(spinPose(i));
  return p;
}

// ── Sprite sheet assembly ──────────────────────────────────
function generateSheet() {
  const canvas = createCanvas(SHEET, SHEET);
  const ctx = canvas.getContext('2d');
  const poses = allPoses();

  for (let i = 0; i < 64; i++) {
    const col = i % GRID;
    const row = Math.floor(i / GRID);

    ctx.save();
    ctx.translate(col * FRAME, row * FRAME);
    ctx.beginPath();
    ctx.rect(0, 0, FRAME, FRAME);
    ctx.clip();

    if (poses[i].facingAngle !== undefined) {
      drawCharacterSpin(ctx, poses[i]);
    } else {
      drawCharacter(ctx, poses[i]);
    }

    ctx.restore();
  }

  return canvas;
}

// ── Static image ───────────────────────────────────────────
function generateStatic() {
  const SIZE = 512;
  const canvas = createCanvas(SIZE, SIZE);
  const ctx = canvas.getContext('2d');

  ctx.scale(SIZE / FRAME, SIZE / FRAME);
  const pose = {
    bodyY: 0,
    headTilt: 0,
    lArmAngle: -0.25,
    rArmAngle: -0.1,
    lForearm: -0.35,
    rForearm: -0.2,
    lLegAngle: -0.04,
    rLegAngle: 0.04,
    lKnee: 0,
    rKnee: 0,
    capeFlutter: 2,
    handWave: 0,
  };
  drawCharacter(ctx, pose);
  return canvas;
}

// ── Main ───────────────────────────────────────────────────
const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'public', 'images');

console.log('Generating AP Superhero mascot (muscular build)...');

const sheet = generateSheet();
const sheetBuf = sheet.toBuffer('image/png');
writeFileSync(join(outDir, 'mascot-sprite.png'), sheetBuf);
console.log(`  ✓ mascot-sprite.png  (${(sheetBuf.length / 1024).toFixed(1)} KB)`);

const stat = generateStatic();
const statBuf = stat.toBuffer('image/png');
writeFileSync(join(outDir, 'mascot.png'), statBuf);
console.log(`  ✓ mascot.png         (${(statBuf.length / 1024).toFixed(1)} KB)`);

console.log('Done!');
