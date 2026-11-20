"use client";

import { useEffect, useRef, useState } from "react";

import { Icon } from "@/components/icon";
import { contactEmail } from "@/content/home";

export function ContactEmail() {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState("");
  const emailLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(false), 2500);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setCopied(true);
      setStatus("Email address copied.");
    } catch {
      setCopied(false);
      const selection = window.getSelection();
      if (selection && emailLink.current) {
        const range = document.createRange();
        range.selectNodeContents(emailLink.current);
        selection.removeAllRanges();
        selection.addRange(range);
      }
      setStatus("Email selected. Use your browser’s copy command.");
    }
  }

  return (
    <div className="contact-direct">
      <p className="micro-label">Or, write to us directly</p>
      <div className="contact-address">
        <a ref={emailLink} href={`mailto:${contactEmail}`}>
          {contactEmail}
          <Icon name="up-right" />
        </a>
        <button
          className="copy-email"
          type="button"
          onClick={copyEmail}
          aria-label={copied ? "Email address copied" : "Copy email address"}
          title={copied ? "Copied!" : "Copy email address"}
        >
          <Icon name={copied ? "check" : "copy"} />
        </button>
      </div>
      <p className="contact-copy-status" role="status" aria-atomic="true">
        {status}
      </p>
    </div>
  );
}
