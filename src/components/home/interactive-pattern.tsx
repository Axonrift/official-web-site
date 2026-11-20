"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Icon } from "@/components/icon";

type ShapeType = "ring" | "x" | "arch" | "crescent" | "cup";
type ColorTone = "cyan" | "white" | "darkTeal";

interface GlyphConfig {
  shape: ShapeType;
  tone: ColorTone;
}

// Exact 3x3 repeating pattern matrix from the reference
const PATTERN_MATRIX: GlyphConfig[][] = [
  // Row 0
  [
    { shape: "ring", tone: "cyan" },
    { shape: "x", tone: "white" },
    { shape: "arch", tone: "darkTeal" },
  ],
  // Row 1
  [
    { shape: "crescent", tone: "white" },
    { shape: "ring", tone: "darkTeal" },
    { shape: "x", tone: "cyan" },
  ],
  // Row 2
  [
    { shape: "x", tone: "cyan" },
    { shape: "cup", tone: "cyan" },
    { shape: "ring", tone: "white" },
  ],
];

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  strength: number;
  speed: number;
}

interface GlyphParticle {
  gridCol: number;
  gridRow: number;
  shape: ShapeType;
  tone: ColorTone;
  baseX: number;
  baseY: number;
  currentX: number;
  currentY: number;
  vx: number;
  vy: number;
  isMorphTarget: boolean;
  targetX: number;
  targetY: number;
}

const BTN_WIDTH = 204;
const BTN_HEIGHT = 46;
const BTN_RADIUS = 23;
const BUTTON_APPEAR_MS = 400; // Swift, elegant, non-prolonged morph
const TEXT_DELAY_MS = 10; // 0.01 sec after button appearance completes

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function easeOutBackSubtle(x: number): number {
  const c1 = 0.6;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}

function easeOutQuad(t: number): number {
  return 1 - (1 - t) * (1 - t);
}

export function InteractivePattern() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [buttonReady, setButtonReady] = useState(false);
  const [textVisible, setTextVisible] = useState(false);

  const isTransitionStartedRef = useRef(false);
  const transitionStartRef = useRef(0);
  const buttonReadyRef = useRef(false);
  const textVisibleRef = useRef(false);

  const handleButtonClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const contact = document.getElementById("contact");
    if (contact) {
      contact.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", "#contact");
    }
  }, []);

  const triggerTransition = useCallback((clickX: number, clickY: number) => {
    if (isTransitionStartedRef.current) return;
    isTransitionStartedRef.current = true;
    transitionStartRef.current = performance.now();

    // 1. Button appearance finishes at BUTTON_APPEAR_MS (400ms)
    setTimeout(() => {
      buttonReadyRef.current = true;
      setButtonReady(true);
    }, BUTTON_APPEAR_MS);

    // 2. Text appears 0.01 sec after button appearance finishes (410ms)
    setTimeout(() => {
      textVisibleRef.current = true;
      setTextVisible(true);
    }, BUTTON_APPEAR_MS + TEXT_DELAY_MS);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let isVisible = false;
    let width = 0;
    let height = 0;
    let particles: GlyphParticle[] = [];
    const ripples: Ripple[] = [];

    const pointer = {
      x: -9999,
      y: -9999,
      prevX: -9999,
      prevY: -9999,
      vx: 0,
      vy: 0,
      active: false,
    };

    const STEP_X = 48;
    const STEP_Y = 48;
    const RADIUS = 12.5;
    const STROKE_WIDTH = 6.5;

    function initParticles() {
      if (!canvas || !container) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = container.getBoundingClientRect() || { width: 400, height: 234 };
      width = rect.width;
      height = rect.height;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cols = Math.ceil(width / STEP_X) + 3;
      const rows = Math.ceil(height / STEP_Y) + 3;

      const offsetX = (width - (cols - 1) * STEP_X) / 2;
      const offsetY = (height - (rows - 1) * STEP_Y) / 2;

      const cx = width / 2;
      const cy = height / 2;

      particles = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const modR = ((r % 3) + 3) % 3;
          const modC = ((c % 3) + 3) % 3;
          const config = PATTERN_MATRIX[modR][modC];

          const bx = offsetX + c * STEP_X;
          const by = offsetY + r * STEP_Y;

          // Only shapes that would be covered by the button
          const isCovered =
            Math.abs(bx - cx) <= (BTN_WIDTH / 2 + 10) &&
            Math.abs(by - cy) <= (BTN_HEIGHT / 2 + 8);

          // Graceful convergence destination toward the pill centerline
          let targetX = bx;
          let targetY = cy;
          if (isCovered) {
            const relX = bx - cx;
            targetX = cx + relX * 0.45;
            targetY = cy;
          }

          particles.push({
            gridCol: c,
            gridRow: r,
            shape: config.shape,
            tone: config.tone,
            baseX: bx,
            baseY: by,
            currentX: bx,
            currentY: by,
            vx: 0,
            vy: 0,
            isMorphTarget: isCovered,
            targetX,
            targetY,
          });
        }
      }
    }

    initParticles();

    const ro = new ResizeObserver(() => {
      initParticles();
    });
    ro.observe(container);

    const io = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible && !animId) {
        lastTime = performance.now();
        animId = requestAnimationFrame(render);
      }
    });
    io.observe(container);

    function onPointerMove(e: PointerEvent) {
      const rect = container?.getBoundingClientRect();
      if (!rect) return;
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;

      if (pointer.prevX !== -9999) {
        pointer.vx = (px - pointer.prevX) * 0.45;
        pointer.vy = (py - pointer.prevY) * 0.45;
      }
      pointer.x = px;
      pointer.y = py;
      pointer.prevX = px;
      pointer.prevY = py;
      pointer.active = true;
    }

    function onPointerEnter(e: PointerEvent) {
      onPointerMove(e);
      pointer.active = true;
    }

    function onPointerLeave() {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
      pointer.prevX = -9999;
      pointer.prevY = -9999;
      pointer.vx = 0;
      pointer.vy = 0;
    }

    function onPointerDown(e: PointerEvent) {
      const rect = container?.getBoundingClientRect();
      if (!rect) return;
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;

      // Soft physical ripple
      ripples.push({
        x: px,
        y: py,
        radius: 0,
        maxRadius: Math.max(width, height) * 1.1,
        strength: 22,
        speed: 460,
      });

      triggerTransition(px, py);
    }

    container.addEventListener("pointermove", onPointerMove, { passive: true });
    container.addEventListener("pointerenter", onPointerEnter, { passive: true });
    container.addEventListener("pointerleave", onPointerLeave, { passive: true });
    container.addEventListener("pointerdown", onPointerDown, { passive: true });

    let lastTime = performance.now();
    let time = 0;

    function drawShape(
      c: CanvasRenderingContext2D,
      shape: ShapeType,
      r: number,
      w: number
    ) {
      c.lineWidth = w;
      c.lineCap = "butt";

      switch (shape) {
        case "ring":
          c.beginPath();
          c.arc(0, 0, r, 0, Math.PI * 2);
          c.stroke();
          break;

        case "x": {
          const d = r * 0.94;
          c.beginPath();
          c.moveTo(-d, -d);
          c.lineTo(d, d);
          c.moveTo(-d, d);
          c.lineTo(d, -d);
          c.stroke();
          break;
        }

        case "arch":
          c.beginPath();
          c.arc(0, 0, r, Math.PI, Math.PI * 2);
          c.stroke();
          break;

        case "crescent":
          c.beginPath();
          c.arc(0, 0, r, -Math.PI / 2, Math.PI / 2);
          c.stroke();
          break;

        case "cup":
          c.beginPath();
          c.arc(0, 0, r, 0, Math.PI);
          c.stroke();
          break;
      }
    }

    function render(now: number) {
      if (!ctx || !isVisible) {
        animId = 0;
        return;
      }

      const rawDt = (now - lastTime) / 1000;
      lastTime = now;
      const dt = Math.min(rawDt, 0.05);
      time += dt;

      const isMorphed = isTransitionStartedRef.current;
      const elapsed = isMorphed ? now - transitionStartRef.current : 0;
      const cx = width / 2;
      const cy = height / 2;

      // Reliable state trigger fallbacks
      if (isMorphed && elapsed >= BUTTON_APPEAR_MS && !buttonReadyRef.current) {
        buttonReadyRef.current = true;
        setButtonReady(true);
      }
      if (isMorphed && elapsed >= BUTTON_APPEAR_MS + TEXT_DELAY_MS && !textVisibleRef.current) {
        textVisibleRef.current = true;
        setTextVisible(true);
      }

      // Decay pointer velocity
      pointer.vx *= 0.88;
      pointer.vy *= 0.88;

      // Update ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.radius += rp.speed * dt;
        if (rp.radius > rp.maxRadius) {
          ripples.splice(i, 1);
        }
      }

      // Clear frame with background
      ctx.fillStyle = "#070b0e";
      ctx.fillRect(0, 0, width, height);

      const SPRING = 0.09;
      const DAMPING = 0.82;
      const INFLUENCE_RADIUS = 135;

      // Subtle negative space push on outer shapes around the pill
      const haloT = isMorphed ? Math.min(1, elapsed / 360) : 0;
      const haloEase = easeOutQuad(haloT);

      // Render non-morphing outer particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (p.isMorphTarget && isMorphed) {
          continue;
        }

        // Target position calculation
        let targetX = p.baseX;
        let targetY = p.baseY;

        // Subtle ambient wave
        const ambientX = Math.cos(time * 1.2 + p.baseX * 0.025 + p.baseY * 0.018) * 1.5;
        const ambientY = Math.sin(time * 1.2 + p.baseX * 0.018 + p.baseY * 0.025) * 1.5;
        targetX += ambientX;
        targetY += ambientY;

        let proximityFactor = 0;

        // Outer shapes repelled outward softly
        if (haloEase > 0 && !p.isMorphTarget) {
          const dxBtn = p.baseX - cx;
          const dyBtn = p.baseY - cy;
          const distBtn = Math.sqrt(dxBtn * dxBtn + dyBtn * dyBtn);
          if (distBtn < 150 && distBtn > 0.001) {
            const push = (1 - distBtn / 150) * 18 * haloEase;
            targetX += (dxBtn / distBtn) * push;
            targetY += (dyBtn / distBtn) * push;
          }
        }

        // Pointer fluid magnetic deflection
        if (pointer.active) {
          const dx = p.baseX - pointer.x;
          const dy = p.baseY - pointer.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < INFLUENCE_RADIUS && dist > 0.001) {
            const norm = dist / INFLUENCE_RADIUS;
            proximityFactor = Math.pow(1 - norm, 2);

            const repel = proximityFactor * 24;
            const dirX = dx / dist;
            const dirY = dy / dist;

            const wakeFactor = proximityFactor * 0.12;
            const wakeX = pointer.vx * wakeFactor;
            const wakeY = pointer.vy * wakeFactor;

            targetX += dirX * repel + wakeX;
            targetY += dirY * repel + wakeY;
          }
        }

        // Ripple displacement
        for (let j = 0; j < ripples.length; j++) {
          const rp = ripples[j];
          const rx = p.baseX - rp.x;
          const ry = p.baseY - rp.y;
          const rDist = Math.sqrt(rx * rx + ry * ry);
          const waveDist = Math.abs(rDist - rp.radius);

          if (waveDist < 42 && rDist > 0.001) {
            const waveNorm = 1 - waveDist / 42;
            const waveDecay = 1 - rp.radius / rp.maxRadius;
            const wavePush = Math.sin(waveNorm * Math.PI) * rp.strength * waveDecay;

            targetX += (rx / rDist) * wavePush;
            targetY += (ry / rDist) * wavePush;
            proximityFactor = Math.max(proximityFactor, waveNorm * waveDecay * 0.6);
          }
        }

        // Spring integration
        const ax = (targetX - p.currentX) * SPRING;
        const ay = (targetY - p.currentY) * SPRING;
        p.vx = (p.vx + ax) * DAMPING;
        p.vy = (p.vy + ay) * DAMPING;
        p.currentX += p.vx;
        p.currentY += p.vy;

        // Velocity stretch
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const stretch = Math.min(speed * 0.024, 0.22);

        // Natural color tones (clean, elegant, no neon bloom)
        let strokeColor: string;
        if (p.tone === "cyan") {
          strokeColor = "#28ccef";
        } else if (p.tone === "white") {
          strokeColor = "#ffffff";
        } else {
          strokeColor = "#225968";
        }

        // Draw shape with elastic stretch
        ctx.save();
        ctx.translate(p.currentX, p.currentY);

        if (stretch > 0.02) {
          const angle = Math.atan2(p.vy, p.vx);
          ctx.rotate(angle);
          ctx.scale(1 + stretch, 1 / (1 + stretch));
          ctx.rotate(-angle);
        }

        ctx.strokeStyle = strokeColor;
        drawShape(ctx, p.shape, RADIUS, STROKE_WIDTH);
        ctx.restore();
      }

      // =========================================================================
      // CLEAN, MINIMALIST & REFINED BUTTON CONVERGENCE
      // =========================================================================
      if (isMorphed) {
        const morphTargets = particles.filter((p) => p.isMorphTarget);

        // 1. Shapes glide smoothly to center and dissolve into the pill (0ms -> 300ms)
        if (elapsed < 320) {
          const moveT = Math.min(1, elapsed / 280);
          const easeMove = easeInOutCubic(moveT);
          const fadeAlpha = Math.max(0, 1 - moveT * 1.3);

          for (let i = 0; i < morphTargets.length; i++) {
            const p = morphTargets[i];
            const curX = p.baseX + (p.targetX - p.baseX) * easeMove;
            const curY = p.baseY + (p.targetY - p.baseY) * easeMove;

            ctx.save();
            ctx.translate(curX, curY);
            ctx.globalAlpha = fadeAlpha;
            ctx.strokeStyle = p.tone === "cyan" ? "#28ccef" : p.tone === "white" ? "#ffffff" : "#225968";
            drawShape(ctx, p.shape, RADIUS, STROKE_WIDTH);
            ctx.restore();
          }
        }

        // 2. White pill seamlessly expands into place (80ms -> 400ms)
        if (elapsed >= 80) {
          const emergeT = Math.min(1, (elapsed - 80) / (BUTTON_APPEAR_MS - 80));
          const scale = easeOutBackSubtle(emergeT);
          const curW = BTN_WIDTH * Math.min(1, scale);
          const curH = BTN_HEIGHT * Math.min(1, scale);
          const curR = Math.min(BTN_RADIUS, curH / 2);

          ctx.save();
          // Clean, natural elevation shadow (no cyber glow)
          ctx.shadowColor = "rgba(0, 0, 0, 0.32)";
          ctx.shadowBlur = 18 * emergeT;
          ctx.shadowOffsetY = 4 * emergeT;
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.roundRect(cx - curW / 2, cy - curH / 2, curW, curH, curR);
          ctx.fill();
          ctx.restore();
        }
      }

      animId = requestAnimationFrame(render);
    }

    lastTime = performance.now();
    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      io.disconnect();
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerenter", onPointerEnter);
      container.removeEventListener("pointerleave", onPointerLeave);
      container.removeEventListener("pointerdown", onPointerDown);
    };
  }, [triggerTransition]);

  return (
    <div
      ref={containerRef}
      className="interactive-pattern-container"
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#070b0e",
        cursor: buttonReady ? "default" : "pointer",
        touchAction: "none",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
        }}
      />
      {buttonReady && (
        <a
          href="#contact"
          className={`feel-interested-btn ${textVisible ? "text-active" : ""}`}
          onClick={handleButtonClick}
          aria-label="Feel Interested? Go to inquiry section"
        >
          <span className="btn-text-wrapper">
            <span className="btn-label">Feel Interested ?</span>
            <Icon name="up-right" />
          </span>
        </a>
      )}
    </div>
  );
}
