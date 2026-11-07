'use client';

import { useState, FormEvent } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form.entries());

    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.error || 'Submission failed.');

      setMessage('Thank you. Your application has been received and is under review. The BFAF team will contact you.');
      e.currentTarget.reset();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page-shell">
      <header className="topbar">
        <div className="brand-mark">BFAF.</div>
        <div className="top-label">BAYELSA FOOD & ART FESTIVAL</div>
      </header>

      <section className="hero">
        <div className="eyebrow">MEDIA ACCREDITATION 2026</div>
        <h1>Tell the<br />story of <em>BFAF.</em></h1>
        <p className="intro">
          We are inviting journalists, photographers, filmmakers, content creators
          and storytellers to be part of the media experience at Bayelsa Food & Art Festival.
        </p>
        <div className="rule">
          <span>APPLICATION FORM</span>
          <span>2026 EDITION</span>
        </div>
      </section>

      <section className="form-section">
        <div className="section-heading">
          <div className="number">01</div>
          <div>
            <h2>Applicant information</h2>
            <p>Tell us who you are and how you intend to contribute.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <label>FULL NAME <b>*</b>
            <input name="full_name" required placeholder="Your full name" />
          </label>

          <div className="two-col">
            <label>EMAIL ADDRESS <b>*</b>
              <input name="email" type="email" required placeholder="you@example.com" />
            </label>
            <label>PHONE / WHATSAPP <b>*</b>
              <input name="phone" type="tel" required placeholder="+234..." />
            </label>
          </div>

          <label>YOUR ROLE <b>*</b>
            <select name="applicant_type" required defaultValue="">
              <option value="" disabled>Select your role</option>
              <option>Journalist / Reporter</option>
              <option>Photographer</option>
              <option>Videographer / Filmmaker</option>
              <option>Content Creator / Influencer</option>
              <option>Media Organisation</option>
              <option>PR / Communications Professional</option>
              <option>Other</option>
            </select>
          </label>

          <div className="two-col">
            <label>INSTAGRAM PROFILE
              <input name="instagram" placeholder="@yourhandle or link" />
            </label>
            <label>TIKTOK PROFILE
              <input name="tiktok" placeholder="@yourhandle or link" />
            </label>
          </div>

          <label>HOW DO YOU PLAN TO CONTRIBUTE? <b>*</b>
            <textarea name="contribution" required rows={5}
              placeholder="Tell us about your coverage plans, experience and what you hope to bring to BFAF." />
          </label>

          <p className="privacy-note">
            Submitting this form does not guarantee accreditation.
            Every application will be reviewed by the BFAF team against
            its established benchmarks. Successful applicants will be contacted.
          </p>

          <button className="submit" type="submit" disabled={loading}>
            {loading ? 'SUBMITTING...' : 'SUBMIT APPLICATION →'}
          </button>

          {message && <div className="feedback" role="status">{message}</div>}
        </form>
      </section>

      <footer>
        <span>BFAF 2026</span>
        <span>FOOD · ART · CULTURE</span>
      </footer>
    </main>
  );
}