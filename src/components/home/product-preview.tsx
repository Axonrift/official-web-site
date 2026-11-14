"use client";

import Image from "next/image";
import { useState } from "react";

import { Icon } from "@/components/icon";

const views = ["Overview", "Activity"] as const;

const stats = [
  { label: "Planned", value: "04" },
  { label: "In progress", value: "02" },
  { label: "Completed", value: "08" },
];

const projects = [
  { title: "Website refresh", status: "In progress", icon: "window" },
  { title: "New onboarding flow", status: "Planned", icon: "box" },
] as const;

const activity = [
  { title: "Website refresh moved to In progress", icon: "window" },
  { title: "New onboarding flow added to Planned", icon: "box" },
  { title: "Dashboard layouts marked complete", icon: "layers" },
] as const;

export function ProductPreview() {
  const [view, setView] = useState<(typeof views)[number]>("Overview");

  return (
    <div className="app-preview">
      <div className="preview-bar">
        <span className="preview-mark">
          <Image src="/brand/axonrift-mark.png" alt="" width={13} height={12} unoptimized />
        </span>
        <strong>Workspace</strong><span className="preview-badge"><span className="dot" />Illustrative preview</span>
      </div>
      <div className="preview-content">
        <div className="preview-options" role="group" aria-label="Sample workspace view">
          {views.map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={view === option}
              aria-controls={`product-${option.toLowerCase()}`}
              onClick={() => setView(option)}
            >
              {option}
            </button>
          ))}
        </div>
        <div className="preview-view" role="region" aria-label="Sample workspace content" aria-live="polite">
          <div id="product-overview" hidden={view !== "Overview"}>
            <p className="preview-title">Project overview</p>
            <div className="preview-stats">
              {stats.map(({ label, value }) => (
                <div key={label}><span>{label}</span><strong>{value}</strong></div>
              ))}
            </div>
            {projects.map(({ title, status, icon }) => (
              <div className="preview-row" key={title}>
                <span className="row-icon"><Icon name={icon} /></span>
                <span>{title}</span><span className="row-status">{status}</span>
              </div>
            ))}
          </div>
          <div id="product-activity" hidden={view !== "Activity"}>
            <p className="preview-title">Recent activity</p>
            {activity.map(({ title, icon }) => (
              <div className="preview-row" key={title}>
                <span className="row-icon"><Icon name={icon} /></span><span>{title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
