import { InquiryForm } from "@/components/home/inquiry-form";
import { ContactEmail } from "@/components/home/contact-email";

export function Contact() {
  return (
    <section className="section wrap" id="contact" aria-labelledby="contact-title">
      <div className="contact-panel">
        <div className="contact-copy" data-reveal>
          <h2 id="contact-title">Big idea.<br />Small question.<br /><span className="text-accent">Start here.</span></h2>
          <p className="contact-lede">A rough idea is a good place to start. Tell us what you have in mind, and we'll work out the next step together.</p>
          <ContactEmail />
          <div className="contact-next">
            <p className="micro-label">What happens next</p>
            <p>We'll read your brief and get back to you to talk through the possibilities.</p>
          </div>
        </div>
        <div className="contact-form" data-reveal><InquiryForm /></div>
      </div>
    </section>
  );
}
