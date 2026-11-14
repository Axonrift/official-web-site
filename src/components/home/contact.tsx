import { InquiryForm } from "@/components/home/inquiry-form";

export function Contact() {
  return (
    <section className="section wrap" id="contact" aria-labelledby="contact-title">
      <div className="contact-panel">
        <div className="contact-copy" data-reveal>
          <p className="eyebrow"><span className="section-number">07 /</span>Start a conversation</p>
          <h2 id="contact-title">What are you<br /><span className="text-accent">trying to solve?</span></h2>
          <p className="contact-lede">Tell us what’s happening today and what you’d like to be able to do.</p>
        </div>
        <div className="contact-form" data-reveal><InquiryForm /></div>
      </div>
    </section>
  );
}
