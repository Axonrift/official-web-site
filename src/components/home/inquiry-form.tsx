"use client";

import { track } from "@vercel/analytics";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Icon } from "@/components/icon";
import { contactEmail, inquiryTopics } from "@/content/home";

export function InquiryForm() {
  const [topics, setTopics] = useState<string[]>([]);
  const [sendStatus, setSendStatus] = useState("");
  const [sendState, setSendState] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const submissionPending = useRef(false);
  const isSending = sendState === "sending";

  useEffect(() => {
    function selectTopic(event: MouseEvent) {
      if (submissionPending.current) return;
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>(
        "a[data-inquiry-topic]",
      );
      const topicId = link?.dataset.inquiryTopic;
      if (topicId && inquiryTopics.some(({ id }) => id === topicId)) {
        setTopics((selected) =>
          selected.includes(topicId) ? selected : [...selected, topicId],
        );
      }
    }

    document.addEventListener("click", selectTopic);
    return () => document.removeEventListener("click", selectTopic);
  }, []);

  function toggleTopic(topicId: string) {
    setTopics((selected) =>
      selected.includes(topicId)
        ? selected.filter((id) => id !== topicId)
        : [...selected, topicId],
    );
  }

  async function sendInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submissionPending.current) return;

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID?.trim();
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID?.trim();
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY?.trim();

    if (!serviceId || !templateId || !publicKey) {
      setSendState("error");
      setSendStatus(
        `Please email us directly at ${contactEmail} while the contact form is unavailable.`,
      );
      return;
    }

    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    const company = String(form.get("company") ?? "").trim();
    const budget = String(form.get("budget") ?? "").trim();
    const selected = form.getAll("services");
    const selectedTopics = inquiryTopics.filter(({ id }) => selected.includes(id));
    const services = selectedTopics.map(({ topic }) => topic);
    if (!name || !email || !message) {
      setSendState("error");
      setSendStatus("Please enter your name, email, and message.");
      return;
    }

    submissionPending.current = true;
    setSendState("sending");
    setSendStatus("");
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(
        "https://api.emailjs.com/api/v1.0/email/send",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            service_id: serviceId,
            template_id: templateId,
            user_id: publicKey,
            template_params: {
              name,
              email,
              from_name: name,
              reply_to: email,
              company: company || "Not specified",
              currency: budget ? String(form.get("currency") ?? "USD") : "",
              budget: budget || "Not specified",
              services: services.length ? services.join(", ") : "Not specified",
              message,
            },
          }),
        },
      );

      if (!response.ok) throw new Error("EmailJS request failed");

      formElement.reset();
      setTopics([]);
      setSendState("success");
      setSendStatus(
        "Thanks! Your message has been sent. We’ll be in touch soon.",
      );
      if (process.env.NEXT_PUBLIC_VERCEL_INQUIRY_EVENTS === "true") {
        track("inquiry_submitted", {
          services: selectedTopics.map(({ id }) => id).join(","),
        });
      }
    } catch {
      setSendState("error");
      setSendStatus(
        `We couldn’t send your message. Please try again or email ${contactEmail}.`,
      );
    } finally {
      window.clearTimeout(timeout);
      submissionPending.current = false;
    }
  }

  return (
    <form
      id="inquiry"
      action={`mailto:${contactEmail}`}
      method="post"
      encType="text/plain"
      aria-busy={isSending}
      onSubmit={sendInquiry}
    >
      <fieldset
        className="inquiry-section inquiry-project"
        disabled={isSending}
      >
        <legend>
          <span className="inquiry-index">01</span>What are we building?
        </legend>
        <p className="inquiry-help" id="services-hint">
          Choose what fits. It’s okay if you’re still figuring it out.
        </p>
        <div
          className="service-options"
          role="group"
          aria-label="Services"
          aria-describedby="services-hint"
        >
          {inquiryTopics.map(({ id, label, icon }) => (
            <label className="service-option" key={id}>
              <input
                type="checkbox"
                name="services"
                value={id}
                checked={topics.includes(id)}
                onChange={() => toggleTopic(id)}
              />
              <span className="service-choice">
                <span className="service-choice-icon">
                  <Icon name={icon} />
                </span>
                <span className="service-choice-label">{label}</span>
                <span className="service-choice-check">
                  <Icon name="check" />
                </span>
              </span>
            </label>
          ))}
        </div>
        <label className="inquiry-message">
          Tell us a little more{" "}
          <span className="field-required" aria-hidden="true">
            *
          </span>
          <textarea
            name="message"
            rows={4}
            placeholder="What would you like to build, improve, or figure out?"
            maxLength={3000}
            disabled={isSending}
            required
          />
        </label>
      </fieldset>
      <fieldset
        className="inquiry-section inquiry-details"
        disabled={isSending}
      >
        <legend>
          <span className="inquiry-index">02</span>Let’s make the connection.
        </legend>
        <div className="form-pair">
          <label>
            Your name{" "}
            <span className="field-required" aria-hidden="true">
              *
            </span>
            <input
              name="name"
              autoComplete="name"
              placeholder="Alex Morgan"
              maxLength={100}
              disabled={isSending}
              required
            />
          </label>
          <label>
            Email address{" "}
            <span className="field-required" aria-hidden="true">
              *
            </span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="alex@company.com"
              maxLength={200}
              disabled={isSending}
              required
            />
          </label>
        </div>
        <div className="form-pair">
          <label>
            Company <span className="optional">(optional)</span>
            <input
              name="company"
              autoComplete="organization"
              placeholder="Where you work"
              maxLength={160}
              disabled={isSending}
            />
          </label>
          <div className="budget-field">
            <label htmlFor="inquiry-budget">
              Budget <span className="optional">(optional)</span>
            </label>
            <div className="budget-control">
              <div className="budget-currency">
                <select
                  name="currency"
                  aria-label="Budget currency"
                  defaultValue="USD"
                  disabled={isSending}
                >
                  <option value="USD">USD</option>
                  <option value="LKR">LKR</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </select>
                <Icon name="chevron-down" />
              </div>
              <input
                id="inquiry-budget"
                type="number"
                name="budget"
                min="0"
                step="any"
                placeholder="Your estimate"
                disabled={isSending}
              />
            </div>
          </div>
        </div>
      </fieldset>
      <div className="form-actions">
        <button
          className="button contact-submit"
          type="submit"
          disabled={isSending}
        >
          {isSending ? "Sending…" : "Send project brief"}
          <Icon name="up-right" />
        </button>
        <p id="form-note">
          Your details are only used to reply to your inquiry.
        </p>
      </div>
      <p
        className="contact-status"
        data-state={sendState}
        role="status"
        aria-atomic="true"
        hidden={!sendStatus}
      >
        {sendStatus}
      </p>
    </form>
  );
}
