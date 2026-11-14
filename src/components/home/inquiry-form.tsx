"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

import { Icon } from "@/components/icon";
import { inquiryTopics } from "@/content/home";

export function InquiryForm() {
  const [ready, setReady] = useState(false);
  const [topic, setTopic] = useState("");
  const [draft, setDraft] = useState("");
  const [status, setStatus] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const draftText = useRef<HTMLPreElement>(null);

  useEffect(() => {
    function selectTopic(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>("a[data-inquiry-topic]");
      const topicId = link?.dataset.inquiryTopic;
      if (topicId && inquiryTopics.some(({ id }) => id === topicId)) setTopic(topicId);
    }

    setReady(true);
    document.addEventListener("click", selectTopic);
    return () => document.removeEventListener("click", selectTopic);
  }, []);

  function previewInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const topicLabel = inquiryTopics.find(({ id }) => id === topic)?.topic ?? "General inquiry";
    setDraft([
      `Name: ${String(form.get("name")).trim()}`,
      `Email: ${String(form.get("email")).trim()}`,
      `Topic: ${topicLabel}`,
      "",
      String(form.get("message")).trim(),
    ].join("\n"));
    setStatus("");
    dialog.current?.showModal();
  }

  async function copyInquiry() {
    try {
      await navigator.clipboard.writeText(draft);
      setStatus("Inquiry copied.");
    } catch {
      const selection = window.getSelection();
      if (!selection || !draftText.current) return;
      const range = document.createRange();
      range.selectNodeContents(draftText.current);
      selection.removeAllRanges();
      selection.addRange(range);
      setStatus("Draft selected. Use your browser’s copy command.");
    }
  }

  return (
    <>
      <form id="inquiry" aria-describedby="form-note" onSubmit={previewInquiry}>
        <div className="form-pair">
          <label>
            Name
            <input name="name" autoComplete="name" placeholder="Your name" maxLength={100} required />
          </label>
          <label>
            Email
            <input type="email" name="email" autoComplete="email" placeholder="you@company.com" maxLength={200} required />
          </label>
        </div>
        <label>
          What can we help with? <span className="optional">(optional)</span>
          <select name="service" value={topic} onChange={(event) => setTopic(event.target.value)}>
            <option value="">Select a service</option>
            {inquiryTopics.map(({ id, topic }) => <option key={id} value={id}>{topic}</option>)}
          </select>
        </label>
        <label>
          Tell us about the problem
          <textarea name="message" rows={4} placeholder="A few sentences are enough." maxLength={3000} required />
        </label>
        <div className="form-actions">
          <button className="button button-arrow" type="submit" disabled={!ready}>
            Preview inquiry <span><Icon name="arrow" /></span>
          </button>
          <p id="form-note">Sample form. Your inquiry stays in this tab.</p>
          <noscript>Enable JavaScript to preview your inquiry.</noscript>
        </div>
      </form>
      <dialog ref={dialog} aria-labelledby="inquiry-preview-title">
        <form method="dialog" className="dialog-top">
          <h2 id="inquiry-preview-title">Your inquiry preview</h2>
          <button className="close-button" aria-label="Close preview" autoFocus>×</button>
        </form>
        <p>Review or copy your draft. This sample keeps it in your browser.</p>
        <pre ref={draftText} tabIndex={0}>{draft}</pre>
        <button className="button" type="button" onClick={copyInquiry}>Copy inquiry</button>
        <p id="copy-status" role="status">{status}</p>
      </dialog>
    </>
  );
}
