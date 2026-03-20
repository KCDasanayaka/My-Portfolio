"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import styles from "../../styles/ContactSection.module.css";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  /* ── Form state ── */
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  /* ── Scroll-reveal ── */
  useEffect(() => {
    const targets = sectionRef.current?.querySelectorAll(
      `.${styles.fadeUp}`
    );
    if (!targets) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* ── Scroll-to-top ── */
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ── Form submit ── */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      /* Replace with your actual API route or email service */
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("sent");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const btnLabel =
    status === "sending"
      ? "Sending…"
      : status === "sent"
      ? "Message Sent ✓"
      : status === "error"
      ? "Something went wrong"
      : "Submit Now";

  return (
    <section
      className={styles.contact}
      id="contact"
      ref={sectionRef}
    >
      {/* ── Meta bar ── */}
      <div className={styles.metaBar}>
        <span className={styles.metaLeft}>© Get in touch</span>
        <span className={styles.metaRight}>Connect</span>
      </div>

      {/* ── Main 2-col grid ── */}
      <div className={styles.contentGrid}>

        {/* ── Left column ── */}
        <div className={`${styles.leftCol} ${styles.fadeUp}`}>

          {/* Headline */}
          <div className={styles.headlineWrap}>
            <h2 className={styles.headline}>
              Let&apos;s create something amazing together!
            </h2>
            <p className={styles.subtext}>
              Reach out we&apos;d love to hear about your project and ideas.
            </p>
          </div>

          {/* Stay connected */}
          <div className={styles.stayBlock}>
            <p className={styles.stayTitle}>Stay connected®</p>
            <a
              href="mailto:sakcdasanayaka@gmail.com"
              className={styles.emailLink}
            >
              sakcdasanayaka@gmail.com
            </a>
          </div>
        </div>

        {/* ── Right column — Form ── */}
        <form
          className={`${styles.rightCol} ${styles.fadeUp}`}
          onSubmit={handleSubmit}
          noValidate
        >
          {/* Name */}
          <div className={styles.fieldGroup}>
            <input
              type="text"
              className={styles.input}
              placeholder="Name*"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              required
              autoComplete="name"
            />
          </div>

          {/* Email */}
          <div className={styles.fieldGroup}>
            <input
              type="email"
              className={styles.input}
              placeholder="Email*"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              required
              autoComplete="email"
            />
          </div>

          {/* Message */}
          <div className={styles.fieldGroup}>
            <textarea
              className={styles.textarea}
              placeholder="Message*"
              value={formData.message}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  message: e.target.value,
                }))
              }
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className={`${styles.submitBtn} ${
              status === "sent" ? styles.success : ""
            }`}
            disabled={status === "sending"}
          >
            {btnLabel}
          </button>
        </form>
      </div>

      {/* ── Scroll-to-top button ── */}
      <div className={styles.scrollTopWrap}>
        <button
          className={styles.scrollTopBtn}
          onClick={handleScrollTop}
          aria-label="Scroll to top"
        >
          {/* Up arrow */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 19V5M5 12l7-7 7 7"
              stroke="#ffffff"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
