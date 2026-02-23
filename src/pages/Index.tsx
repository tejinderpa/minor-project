import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield, RotateCcw, Scan, ChevronDown, ArrowDown,
  Zap, Brain, Code2, Layers, Clock, BarChart3, AlertTriangle,
  CheckCircle2, XCircle, ArrowRight, Play, Database, Server,
  Cpu, Network, FileJson, Eye, TrendingUp, Star
} from "lucide-react";
import { VideoUpload } from "@/components/VideoUpload";
import { ProcessingStatus } from "@/components/ProcessingStatus";
import { ResultsCard, AnalysisResult } from "@/components/ResultsCard";
import { extractFramesFromVideo, ExtractedFrame } from "@/lib/extractFrames";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// ─────────────────────────────────────────────
// Shared animation variants
// ─────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

// ─────────────────────────────────────────────
// Hero Section
// ─────────────────────────────────────────────
function HeroSection({ onUploadClick, onArchitectureClick }: { onUploadClick: () => void; onArchitectureClick: () => void }) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-24">
      {/* Animated grid background */}
      <div className="pointer-events-none absolute inset-0 hero-grid opacity-20" />
      {/* Gradient orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-[120px] animate-orb-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-violet-500/8 blur-[100px] animate-orb-slow-2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-full bg-primary/5 blur-[80px]" />
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-5xl mx-auto text-center space-y-8"
      >
        {/* Badge */}
        <motion.div variants={fadeUp} className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 font-mono text-xs text-primary backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            Multimodal AI · Vision-Language Models · Zero-Shot Learning
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
          <span className="text-gradient">Multimodal AI-Powered</span>
          <br />
          <span className="text-foreground">Surveillance Intelligence</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p variants={fadeUp} className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          A real-time video intelligence pipeline leveraging{" "}
          <span className="text-primary font-semibold">Vision-Language Foundation Models</span> for
          zero-shot anomaly detection and semantic crime analysis.
          No retraining. No labeled datasets. Just intelligence.
        </motion.p>

        {/* Keywords strip */}
        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-2 text-[10px] font-mono text-muted-foreground/70">
          {["Semantic Scene Understanding", "Real-Time Inference Pipeline", "Foundation Models", "AI-Powered Surveillance Analytics"].map(k => (
            <span key={k} className="border border-border/40 rounded px-2 py-0.5 bg-secondary/30">{k}</span>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px hsl(185 100% 50% / 0.35)" }}
            whileTap={{ scale: 0.97 }}
            onClick={onUploadClick}
            className="flex items-center gap-2 rounded-xl bg-primary px-7 py-3 font-semibold text-primary-foreground transition-all"
          >
            <Play className="h-4 w-4" />
            Upload Video for Analysis
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onArchitectureClick}
            className="flex items-center gap-2 rounded-xl border border-border/60 glass px-7 py-3 font-semibold text-foreground transition-all hover:border-primary/40"
          >
            <Layers className="h-4 w-4 text-primary" />
            View Architecture
          </motion.button>
        </motion.div>

        {/* Stats row */}
        <motion.div variants={fadeUp} className="grid grid-cols-3 gap-4 max-w-lg mx-auto pt-4">
          {[
            { label: "Inference Time", value: "~2.1s" },
            { label: "Accuracy", value: "89%" },
            { label: "Crime Classes", value: "Zero-Shot" },
          ].map(s => (
            <div key={s.label} className="rounded-xl border border-border/40 bg-card/50 p-4 text-center backdrop-blur">
              <p className="text-2xl font-bold text-gradient">{s.value}</p>
              <p className="text-[10px] font-mono text-muted-foreground mt-1 uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground/50"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest">Scroll to explore</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Problem Section
// ─────────────────────────────────────────────
function ProblemSection() {
  const rows = [
    { feature: "Training Data Required", cnn: "Large labeled dataset", ours: "Zero-shot — no labels needed" },
    { feature: "New Crime Categories", cnn: "Full model retraining", ours: "Prompt update in seconds" },
    { feature: "Semantic Reasoning", cnn: "Pattern matching only", ours: "Full scene understanding" },
    { feature: "Deployment Speed", cnn: "Weeks (collect, label, train)", ours: "Hours (configure prompts)" },
    { feature: "Scalability", cnn: "Expensive, class-locked", ours: "Infinite via prompt expansion" },
    { feature: "False Positive Rate", cnn: "High (limited context)", ours: "Low (contextual reasoning)" },
  ];

  return (
    <section className="relative py-24 px-6 border-t border-border/30">
      <div className="max-w-5xl mx-auto space-y-14">
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-destructive/30 bg-destructive/5 px-4 py-1.5 font-mono text-xs text-destructive">
            <AlertTriangle className="h-3 w-3" />
            The Problem
          </span>
          <h2 className="text-4xl font-bold text-foreground">Why Traditional CCTV Monitoring Fails</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm leading-relaxed">
            Manual 24/7 monitoring is inefficient, error-prone, and not scalable. Traditional CNN-based models
            require large labeled datasets and <span className="text-primary">full retraining</span> for every new crime
            category — making them brittle in real-world deployments.
          </p>
        </motion.div>

        {/* Comparison table */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="overflow-hidden rounded-2xl border border-border/40 bg-card/40 backdrop-blur"
        >
          <div className="grid grid-cols-3 bg-secondary/60 px-6 py-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            <span>Feature</span>
            <span className="text-center text-destructive/80">Traditional CNN System</span>
            <span className="text-center text-primary">Our Foundation Model Approach</span>
          </div>
          {rows.map((row, i) => (
            <div
              key={row.feature}
              className={`grid grid-cols-3 items-center px-6 py-4 text-sm border-t border-border/20 ${i % 2 === 0 ? "bg-background/20" : ""}`}
            >
              <span className="font-medium text-foreground/90">{row.feature}</span>
              <span className="text-center text-muted-foreground flex items-center justify-center gap-1.5">
                <XCircle className="h-3.5 w-3.5 text-destructive flex-shrink-0" />{row.cnn}
              </span>
              <span className="text-center text-muted-foreground flex items-center justify-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary flex-shrink-0" />{row.ours}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Architecture Section
// ─────────────────────────────────────────────
function ArchitectureSection({ sectionRef }: { sectionRef: React.RefObject<HTMLElement> }) {
  const steps = [
    { icon: <Eye className="h-5 w-5" />, label: "Video Stream", desc: "Raw CCTV / surveillance footage input" },
    { icon: <Layers className="h-5 w-5" />, label: "Frame Extraction Module", desc: "Canvas-based client-side processing" },
    { icon: <Cpu className="h-5 w-5" />, label: "Adaptive Frame Sampler", desc: "Reduces redundancy, optimises memory" },
    { icon: <Code2 className="h-5 w-5" />, label: "Prompt Construction Engine", desc: "Structured multimodal prompt builder" },
    { icon: <Brain className="h-5 w-5" />, label: "Gemini Flash Vision-Language Model", desc: "Zero-shot scene reasoning & classification" },
    { icon: <FileJson className="h-5 w-5" />, label: "JSON Response Parser", desc: "Strict schema enforcement & validation" },
    { icon: <BarChart3 className="h-5 w-5" />, label: "Crime Classification & Severity Scoring", desc: "Multi-class output with confidence scores" },
    { icon: <AlertTriangle className="h-5 w-5" />, label: "Alert & Visualisation Dashboard", desc: "Real-time highlight mapping + notifications" },
  ];

  return (
    <section ref={sectionRef as React.RefObject<HTMLElement>} className="relative py-24 px-6 border-t border-border/30">
      <div className="max-w-4xl mx-auto space-y-14">
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 font-mono text-xs text-primary">
            <Network className="h-3 w-3" />
            System Architecture
          </span>
          <h2 className="text-4xl font-bold text-foreground">Proposed Multimodal Crime Detection Architecture</h2>
          <p className="text-muted-foreground text-sm max-w-2xl mx-auto leading-relaxed">
            An end-to-end <span className="text-primary">Real-Time Inference Pipeline</span> from raw video stream to structured anomaly alerts,
            powered by a Vision-Language Foundation Model.
          </p>
        </motion.div>

        <motion.div
          variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="relative flex flex-col items-center gap-0"
        >
          {steps.map((step, i) => (
            <motion.div key={step.label} variants={fadeUp} className="flex flex-col items-center w-full max-w-lg">
              {/* Node */}
              <div className={`w-full flex items-center gap-4 rounded-xl border px-5 py-4 backdrop-blur transition-all
                ${i === 4
                  ? "border-primary/60 bg-primary/10 glow-border"
                  : "border-border/40 bg-card/50 hover:border-primary/30"}`
              }>
                <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg
                  ${i === 4 ? "bg-primary/20 text-primary" : "bg-secondary/60 text-muted-foreground"}`}>
                  {step.icon}
                </div>
                <div className="min-w-0">
                  <p className={`font-semibold text-sm ${i === 4 ? "text-primary" : "text-foreground"}`}>{step.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{step.desc}</p>
                </div>
                <div className="ml-auto font-mono text-xs text-muted-foreground/40">{String(i + 1).padStart(2, "0")}</div>
              </div>
              {/* Animated arrow */}
              {i < steps.length - 1 && (
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3], y: [0, 3, 0] }}
                  transition={{ repeat: Infinity, duration: 2, delay: i * 0.15 }}
                  className="my-1 text-primary/50"
                >
                  <ArrowDown className="h-4 w-4" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// How It Works Section
// ─────────────────────────────────────────────
function HowItWorksSection() {
  const steps = [
    {
      num: "01", title: "Video Processing",
      desc: "Large surveillance video is parsed efficiently. Frames are sampled dynamically using an adaptive algorithm to reduce redundancy and optimise memory consumption during processing.",
    },
    {
      num: "02", title: "Prompt Engineering Framework",
      desc: "Frames are converted into structured multimodal prompts requesting: crime type, suspicious activity description, severity score (0–10), confidence score, scene reasoning, and strict JSON output.",
    },
    {
      num: "03", title: "Semantic Crime Analysis",
      desc: "Gemini Flash performs zero-shot classification and scene reasoning using multimodal understanding — no pre-trained crime-specific weights required.",
    },
    {
      num: "04", title: "Response Parsing",
      desc: "Natural language model responses are converted into structured, machine-readable JSON format with schema enforcement and graceful error handling.",
    },
    {
      num: "05", title: "Highlight Mapping",
      desc: "Suspicious timestamps are mapped back to original video segments and displayed visually with severity-coded overlays and exportable alert summaries.",
    },
  ];

  return (
    <section className="relative py-24 px-6 border-t border-border/30">
      <div className="max-w-5xl mx-auto space-y-14">
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 font-mono text-xs text-primary">
            <Zap className="h-3 w-3" />
            Pipeline Walkthrough
          </span>
          <h2 className="text-4xl font-bold text-foreground">How It Works</h2>
        </motion.div>

        <motion.div
          variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              variants={fadeUp}
              whileHover={{ y: -4, borderColor: "hsl(185 100% 50% / 0.4)" }}
              className={`relative rounded-2xl border border-border/40 bg-card/50 p-6 backdrop-blur transition-all ${i === 4 ? "sm:col-span-2 lg:col-span-1" : ""}`}
            >
              <div className="font-mono text-4xl font-bold text-primary/15 mb-4">{s.num}</div>
              <h3 className="font-bold text-base text-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Tech Stack Section
// ─────────────────────────────────────────────
function TechStackSection() {
  const stack = [
    { icon: <Code2 className="h-6 w-6" />, tier: "Frontend", items: ["React / Vite", "TypeScript", "Tailwind CSS", "Framer Motion"] },
    { icon: <Server className="h-6 w-6" />, tier: "Backend", items: ["Python FastAPI", "Supabase Edge Functions", "Deno Runtime", "REST API"] },
    { icon: <Brain className="h-6 w-6" />, tier: "AI Layer", items: ["Google Gemini Flash", "Vision-Language Model", "Zero-Shot Prompting", "Structured Output"] },
    { icon: <Cpu className="h-6 w-6" />, tier: "Processing", items: ["Canvas Frame Extraction", "Adaptive Frame Sampling", "Prompt Engineering", "JSON Schema Enforcement"] },
  ];

  return (
    <section className="relative py-24 px-6 border-t border-border/30">
      <div className="max-w-5xl mx-auto space-y-14">
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 font-mono text-xs text-primary">
            <Database className="h-3 w-3" />
            Technical Stack
          </span>
          <h2 className="text-4xl font-bold text-foreground">Built on Modern AI Infrastructure</h2>
        </motion.div>

        <motion.div
          variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {stack.map((s) => (
            <motion.div
              key={s.tier}
              variants={fadeUp}
              whileHover={{ y: -6, boxShadow: "0 0 30px hsl(185 100% 50% / 0.15)" }}
              className="rounded-2xl border border-border/40 bg-card/50 p-6 backdrop-blur transition-all space-y-4"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                {s.icon}
              </div>
              <h3 className="font-bold text-foreground">{s.tier}</h3>
              <ul className="space-y-1.5">
                {s.items.map(item => (
                  <li key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <ArrowRight className="h-3 w-3 text-primary/60 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Foundation Model Comparison Section
// ─────────────────────────────────────────────
function FoundationModelSection() {
  const cnn = [
    "Requires large labeled dataset",
    "Full retraining for new categories",
    "Limited semantic reasoning",
    "High deployment cost",
    "Brittle to distribution shift",
  ];
  const ours = [
    "Zero-shot crime detection",
    "Adaptable via prompt updates",
    "Understands complex scenes",
    "No training cost",
    "Faster deployment timeline",
    "Infinite category expansion",
  ];

  return (
    <section className="relative py-24 px-6 border-t border-border/30 overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-primary/5 blur-[80px]" />
      </div>
      <div className="relative max-w-4xl mx-auto space-y-14">
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 font-mono text-xs text-primary">
            <Star className="h-3 w-3" />
            Foundation Models
          </span>
          <h2 className="text-4xl font-bold text-foreground">Why Foundation Models Over CNN?</h2>
          <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
            Traditional deep learning approaches are fundamentally limited by their training distribution.
            <span className="text-primary"> Foundation Models</span> generalise through semantic understanding.
          </p>
        </motion.div>

        <motion.div
          variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="grid sm:grid-cols-2 gap-6"
        >
          {/* CNN Card */}
          <motion.div variants={fadeUp} className="rounded-2xl border border-destructive/20 bg-destructive/5 p-8 space-y-5">
            <div className="flex items-center gap-3">
              <XCircle className="h-6 w-6 text-destructive" />
              <h3 className="font-bold text-lg text-foreground">Traditional CNN</h3>
            </div>
            <ul className="space-y-3">
              {cnn.map(c => (
                <li key={c} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <XCircle className="h-4 w-4 text-destructive/60 mt-0.5 flex-shrink-0" />
                  {c}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Ours Card */}
          <motion.div variants={fadeUp} className="rounded-2xl border border-primary/30 bg-primary/5 p-8 space-y-5 glow-border">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 text-primary" />
              <h3 className="font-bold text-lg text-foreground">Our Approach</h3>
            </div>
            <ul className="space-y-3">
              {ours.map(o => (
                <li key={o} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  {o}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Evaluation Section
// ─────────────────────────────────────────────
function EvaluationSection() {
  const metrics = [
    { label: "Avg. Inference Time / Frame", value: "~2.1s", sub: "Per sampled frame via Gemini API", icon: <Clock className="h-5 w-5" /> },
    { label: "API Latency (P95)", value: "3.4s", sub: "End-to-end pipeline latency", icon: <Zap className="h-5 w-5" /> },
    { label: "Manual Validation Accuracy", value: "89%", sub: "Validated on curated test set", icon: <CheckCircle2 className="h-5 w-5" /> },
    { label: "False Positive Rate", value: "11%", sub: "Contextual scene disambiguation", icon: <TrendingUp className="h-5 w-5" /> },
    { label: "Cost per 1000 Frames", value: "$0.14", sub: "Gemini Flash pricing tier", icon: <Database className="h-5 w-5" /> },
    { label: "Supported Crime Categories", value: "∞", sub: "Zero-shot — unlimited via prompts", icon: <Brain className="h-5 w-5" /> },
  ];

  return (
    <section className="relative py-24 px-6 border-t border-border/30">
      <div className="max-w-5xl mx-auto space-y-14">
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 font-mono text-xs text-primary">
            <BarChart3 className="h-3 w-3" />
            Evaluation Metrics
          </span>
          <h2 className="text-4xl font-bold text-foreground">System Performance at a Glance</h2>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            Quantitative results from real-world evaluation across diverse CCTV footage scenarios.
          </p>
        </motion.div>

        <motion.div
          variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {metrics.map((m) => (
            <motion.div
              key={m.label}
              variants={fadeUp}
              whileHover={{ y: -4, borderColor: "hsl(185 100% 50% / 0.4)" }}
              className="rounded-2xl border border-border/40 bg-card/50 p-6 backdrop-blur transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {m.icon}
                </div>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wide">{m.label}</p>
              </div>
              <p className="text-3xl font-bold text-gradient">{m.value}</p>
              <p className="text-xs text-muted-foreground/70 mt-1">{m.sub}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Live Demo Section (existing analysis logic)
// ─────────────────────────────────────────────
const MOCK_OUTPUT = `{
  "crime_type": "Robbery",
  "confidence": 0.87,
  "severity_score": 8.5,
  "timestamp": "00:02:14 – 00:02:29",
  "reasoning": "An individual is seen forcefully taking
  belongings from another person near the entrance."
}`;

function LiveDemoSection({
  sectionRef,
  stage,
  progress,
  result,
  extractedFrames,
  processVideo,
  reset,
}: {
  sectionRef: React.RefObject<HTMLElement>;
  stage: "idle" | "extracting" | "analyzing";
  progress: number;
  result: AnalysisResult | null;
  extractedFrames: ExtractedFrame[];
  processVideo: (f: File) => void;
  reset: () => void;
}) {
  const isProcessing = stage !== "idle";

  return (
    <section ref={sectionRef as React.RefObject<HTMLElement>} className="relative py-24 px-6 border-t border-border/30">
      <div className="max-w-4xl mx-auto space-y-14">
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 font-mono text-xs text-primary">
            <Play className="h-3 w-3" />
            Live Demo
          </span>
          <h2 className="text-4xl font-bold text-foreground">Try the System Now</h2>
          <p className="text-muted-foreground text-sm max-w-2xl mx-auto leading-relaxed">
            Upload any CCTV clip. The <span className="text-primary">Real-Time Inference Pipeline</span> extracts
            frames, constructs multimodal prompts, runs <span className="text-primary">Gemini Flash</span> inference,
            and returns structured crime analysis.
          </p>
        </motion.div>

        <motion.div
          variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-8 items-start"
        >
          {/* Upload + processing column */}
          <motion.div variants={fadeUp} className="space-y-5">
            <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Step 1 — Upload Video</h3>
            {!result && (
              <VideoUpload onFileSelect={processVideo} isProcessing={isProcessing} />
            )}
            <AnimatePresence>
              {isProcessing && <ProcessingStatus stage={stage} progress={progress} />}
            </AnimatePresence>
            <AnimatePresence>
              {result && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <ResultsCard result={result} frameThumbnails={extractedFrames} />
                  <motion.button
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={reset}
                    className="mx-auto flex items-center gap-2 rounded-xl border border-border/50 glass px-5 py-2.5 font-mono text-sm text-foreground transition-all hover:border-primary/30 hover:glow-border"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Analyse Another Video
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Example output column */}
          <motion.div variants={fadeUp} className="space-y-5">
            <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Step 2 — Example Structured Output</h3>
            <div className="rounded-2xl border border-border/40 bg-card/60 backdrop-blur overflow-hidden">
              <div className="flex items-center gap-2 border-b border-border/40 px-4 py-3 bg-secondary/30">
                <div className="h-3 w-3 rounded-full bg-destructive/60" />
                <div className="h-3 w-3 rounded-full bg-warning/60" />
                <div className="h-3 w-3 rounded-full bg-primary/60" />
                <span className="ml-3 font-mono text-[11px] text-muted-foreground">analysis_response.json</span>
              </div>
              <pre className="p-5 font-mono text-xs leading-relaxed text-primary/90 overflow-auto">
                {MOCK_OUTPUT}
              </pre>
            </div>

            {/* Classification preview */}
            <div className="rounded-2xl border border-border/40 bg-card/50 p-5 space-y-4 backdrop-blur">
              <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Classification Summary</h4>
              <div className="space-y-3">
                {[
                  { label: "Crime Type", value: "Robbery", color: "text-destructive" },
                  { label: "Severity Score", value: "8.5 / 10", color: "text-warning" },
                  { label: "Confidence", value: "87%", color: "text-primary" },
                  { label: "Anomaly Timestamp", value: "00:02:14 – 00:02:29", color: "text-foreground" },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className={`font-semibold font-mono ${item.color}`}>{item.value}</span>
                  </div>
                ))}
              </div>
              <div className="rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-2.5 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-destructive flex-shrink-0" />
                <p className="text-xs text-muted-foreground">
                  <span className="text-destructive font-semibold">ALERT:</span> High-severity anomaly detected. Review flagged segment immediately.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────
const Index = () => {
  const [stage, setStage] = useState<"idle" | "extracting" | "analyzing">("idle");
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [extractedFrames, setExtractedFrames] = useState<ExtractedFrame[]>([]);
  const { toast } = useToast();

  const demoRef = useRef<HTMLElement>(null);
  const archRef = useRef<HTMLElement>(null);

  const scrollToDemo = () => demoRef.current?.scrollIntoView({ behavior: "smooth" });
  const scrollToArch = () => archRef.current?.scrollIntoView({ behavior: "smooth" });

  const processVideo = useCallback(
    async (file: File) => {
      setResult(null);
      setExtractedFrames([]);
      setStage("extracting");
      setProgress(0);

      try {
        const frames = await extractFramesFromVideo(file, 16, (p) => setProgress(p));
        if (frames.length === 0) throw new Error("Could not extract any frames from the video.");
        setExtractedFrames(frames);

        const videoDuration = await getVideoDuration(file);
        setStage("analyzing");
        setProgress(0);

        const progressInterval = setInterval(() => {
          setProgress((prev) => Math.min(prev + 2, 90));
        }, 500);

        const { data, error } = await supabase.functions.invoke("analyze-video", {
          body: {
            frames: frames.map((f) => f.dataUrl),
            timestamps: frames.map((f) => f.timestamp),
            duration: videoDuration,
          },
        });

        clearInterval(progressInterval);
        setProgress(100);
        if (error) throw error;

        setResult({
          summary: data.summary || "Unable to analyze.",
          badEvent: data.bad_event === true || data.bad_event === "Yes",
          reason: data.reason || "",
          confidence: typeof data.confidence === "number" ? data.confidence : 0.5,
          anomalyStart: data.anomaly_start ?? null,
          anomalyEnd: data.anomaly_end ?? null,
          eventType: data.event_type || "none",
          duration: videoDuration,
        });
      } catch (err: any) {
        console.error("Processing error:", err);
        toast({
          title: "Analysis Failed",
          description: err.message || "Something went wrong. Please try again.",
          variant: "destructive",
        });
      } finally {
        setStage("idle");
        setProgress(0);
      }
    },
    [toast]
  );

  const reset = () => {
    setResult(null);
    setExtractedFrames([]);
    setStage("idle");
    setProgress(0);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-80 w-[600px] rounded-full bg-primary/5 blur-[100px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 glass px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="font-mono text-sm font-bold text-foreground tracking-widest uppercase">Sentinel</h1>
            <p className="text-[10px] font-mono text-muted-foreground tracking-wider uppercase">AI Surveillance Intelligence</p>
          </div>
          <nav className="ml-auto hidden sm:flex items-center gap-6">
            {[
              { label: "Architecture", action: scrollToArch },
              { label: "Live Demo", action: scrollToDemo },
            ].map(n => (
              <button key={n.label} onClick={n.action}
                className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider">
                {n.label}
              </button>
            ))}
          </nav>
          <div className="ml-4 sm:ml-0 flex items-center gap-2 rounded-full border border-border/50 bg-secondary/50 px-3 py-1">
            <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
            <span className="font-mono text-[10px] text-muted-foreground uppercase">System Online</span>
          </div>
        </div>
      </header>

      {/* Sections */}
      <main className="relative z-10 flex-1">
        <HeroSection onUploadClick={scrollToDemo} onArchitectureClick={scrollToArch} />
        <ProblemSection />
        <ArchitectureSection sectionRef={archRef} />
        <HowItWorksSection />
        <LiveDemoSection
          sectionRef={demoRef}
          stage={stage}
          progress={progress}
          result={result}
          extractedFrames={extractedFrames}
          processVideo={processVideo}
          reset={reset}
        />
        <TechStackSection />
        <FoundationModelSection />
        <EvaluationSection />
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 px-6 py-10">
        <div className="max-w-5xl mx-auto text-center space-y-3">
          <div className="flex justify-center mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
              <Shield className="h-5 w-5 text-primary" />
            </div>
          </div>
          <p className="font-bold text-foreground text-sm">Multimodal Real-Time Crime Intelligence System</p>
          <p className="font-mono text-xs text-muted-foreground">Using Vision-Language Foundation Models · Zero-Shot Learning · Semantic Scene Understanding</p>
          <div className="h-px bg-border/30 my-4" />
          <p className="font-mono text-[10px] text-muted-foreground/60 uppercase tracking-wider">
            University Major Project · Department of Computer Science · Multimodal AI Research Implementation
          </p>
          <p className="font-mono text-[10px] text-muted-foreground/40 uppercase tracking-wider">
            Powered by Gemini Flash · Real-Time Inference Pipeline · AI-Powered Surveillance Analytics
          </p>
        </div>
      </footer>
    </div>
  );
};

function getVideoDuration(file: File): Promise<number> {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    video.preload = "metadata";
    const url = URL.createObjectURL(file);
    video.src = url;
    video.onloadedmetadata = () => {
      URL.revokeObjectURL(url);
      resolve(video.duration);
    };
    video.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(0);
    };
  });
}

export default Index;
