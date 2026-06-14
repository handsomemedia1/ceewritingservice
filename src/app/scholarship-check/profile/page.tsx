'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useScholarship } from '@/lib/ScholarshipContext';
import {
  DAAD_ELIGIBLE_COUNTRIES,
  DEGREE_OPTIONS,
  GPA_SCALE_OPTIONS,
  LANGUAGE_TEST_OPTIONS,
} from '../constants';
import type { OnboardingProfile, DegreeLevel, GPAScale, LanguageTest } from '../types';

/* ── Extra countries not in DAAD list ── */
const EXTRA_COUNTRIES = [
  'Australia','Austria','Belgium','Canada','Croatia','Cyprus','Czech Republic',
  'Denmark','Estonia','Finland','France','Germany','Greece','Hungary','Iceland',
  'Ireland','Israel','Italy','Japan','Latvia','Lithuania','Luxembourg','Malta',
  'Netherlands','New Zealand','Norway','Poland','Portugal','Romania','Singapore',
  'Slovakia','Slovenia','South Korea','Spain','Sweden','Switzerland',
  'Taiwan','United Arab Emirates','United Kingdom','United States',
];

const ALL_COUNTRIES = [
  ...new Set([...DAAD_ELIGIBLE_COUNTRIES, ...EXTRA_COUNTRIES]),
].sort();

interface FormErrors {
  [key: string]: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const { state, dispatch } = useScholarship();
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  // Form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [highestDegree, setHighestDegree] = useState<DegreeLevel | ''>('');
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [graduationYear, setGraduationYear] = useState<string>('');
  const [institution, setInstitution] = useState('');
  const [gpaValue, setGpaValue] = useState<string>('');
  const [gpaScale, setGpaScale] = useState<GPAScale | ''>('');
  const [languageTest, setLanguageTest] = useState<LanguageTest | ''>('');
  const [languageScore, setLanguageScore] = useState<string>('');
  const [yearsExperience, setYearsExperience] = useState<string>('');
  const [consent, setConsent] = useState(false);

  // Pre-fill from context if returning
  useEffect(() => {
    if (state.profile) {
      const p = state.profile;
      setFullName(p.fullName);
      setEmail(p.email);
      setPhone(p.phone);
      setCountry(p.country);
      setHighestDegree(p.highestDegree);
      setFieldOfStudy(p.fieldOfStudy);
      setGraduationYear(String(p.graduationYear));
      setInstitution(p.institution);
      if (p.gpaValue) setGpaValue(String(p.gpaValue));
      if (p.gpaScale) setGpaScale(p.gpaScale);
      if (p.languageTest) setLanguageTest(p.languageTest);
      if (p.languageScore) setLanguageScore(String(p.languageScore));
      if (p.yearsExperience !== undefined) setYearsExperience(String(p.yearsExperience));
      setConsent(p.consent);
    }
  }, [state.profile]);

  // IntersectionObserver for reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    setTimeout(() => {
      document
        .querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
        .forEach((el) => observer.observe(el));
    }, 100);
    return () => observer.disconnect();
  }, []);

  function validate(): boolean {
    const errs: FormErrors = {};
    if (!fullName.trim()) errs.fullName = 'Full name is required';
    if (!email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Enter a valid email';
    if (!phone.trim()) errs.phone = 'Phone number is required';
    if (!country) errs.country = 'Country is required';
    if (!highestDegree) errs.highestDegree = 'Degree level is required';
    if (!fieldOfStudy.trim()) errs.fieldOfStudy = 'Field of study is required';
    if (!graduationYear) errs.graduationYear = 'Graduation year is required';
    else {
      const yr = parseInt(graduationYear);
      if (isNaN(yr) || yr < 1970 || yr > 2030) errs.graduationYear = 'Enter a valid year (1970–2030)';
    }
    if (!institution.trim()) errs.institution = 'Institution is required';
    if (!consent) errs.consent = 'You must provide consent to continue';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    const profile: OnboardingProfile = {
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      country,
      highestDegree: highestDegree as DegreeLevel,
      fieldOfStudy: fieldOfStudy.trim(),
      graduationYear: parseInt(graduationYear),
      institution: institution.trim(),
      gpaValue: gpaValue ? parseFloat(gpaValue) : undefined,
      gpaScale: gpaScale || undefined,
      languageTest: languageTest || undefined,
      languageScore: languageScore ? parseFloat(languageScore) : undefined,
      yearsExperience: yearsExperience ? parseInt(yearsExperience) : undefined,
      consent: true,
    };

    dispatch({ type: 'SET_PROFILE', payload: profile });

    try {
      const res = await fetch('/api/scholarship/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });
      const data = await res.json();
      if (data.success && data.leadId) {
        dispatch({ type: 'SET_LEAD_ID', payload: data.leadId });
      }
    } catch {
      // Non-blocking — lead storage failure shouldn't block the user
    }

    router.push('/scholarship-check/tracks');
  }

  const currentYear = new Date().getFullYear();

  return (
    <main>
      <Navbar />

      <section
        style={{
          background: 'var(--cream)',
          minHeight: '100vh',
          padding: '120px 24px 80px',
        }}
      >
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          {/* Progress Bar */}
          <div className="sc-progress-bar reveal">
            <div className="sc-progress-step active" />
            <div className="sc-progress-step" />
            <div className="sc-progress-step" />
          </div>
          <p className="sc-progress-label reveal">Step 1 of 3 — About You</p>

          {/* Intro */}
          <div className="reveal" style={{ marginBottom: '32px' }}>
            <h1
              className="section-title"
              style={{ color: 'var(--navy)', fontSize: 'clamp(24px, 4vw, 36px)', marginBottom: '12px' }}
            >
              Tell us about yourself
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.7 }}>
              We collect this once to personalise your readiness score. Your contact details are
              stored securely and never shared with third parties.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* ── Mandatory Fields ── */}
            <div className="sc-section-card reveal">
              <h3 className="sc-section-title">Required Information</h3>

              <div className="sc-form-group">
                <label>Full Name<span className="sc-required">*</span></label>
                <input
                  type="text"
                  className={`sc-input ${errors.fullName ? 'error' : ''}`}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your full name"
                />
                {errors.fullName && <span className="sc-error-text">{errors.fullName}</span>}
              </div>

              <div className="sc-form-group">
                <label>Email Address<span className="sc-required">*</span></label>
                <input
                  type="email"
                  className={`sc-input ${errors.email ? 'error' : ''}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
                {errors.email && <span className="sc-error-text">{errors.email}</span>}
              </div>

              <div className="sc-form-group">
                <label>Phone Number<span className="sc-required">*</span></label>
                <input
                  type="tel"
                  className={`sc-input ${errors.phone ? 'error' : ''}`}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+234 800 000 0000"
                />
                {errors.phone && <span className="sc-error-text">{errors.phone}</span>}
              </div>

              <div className="sc-form-group">
                <label>Country<span className="sc-required">*</span></label>
                <select
                  className={`sc-select ${errors.country ? 'error' : ''}`}
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value="">Select your country</option>
                  {ALL_COUNTRIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                {errors.country && <span className="sc-error-text">{errors.country}</span>}
              </div>

              <div className="sc-form-group">
                <label>Highest Degree<span className="sc-required">*</span></label>
                <select
                  className={`sc-select ${errors.highestDegree ? 'error' : ''}`}
                  value={highestDegree}
                  onChange={(e) => setHighestDegree(e.target.value as DegreeLevel)}
                >
                  <option value="">Select degree level</option>
                  {DEGREE_OPTIONS.map((d) => (
                    <option key={d.value} value={d.value}>
                      {d.label}
                    </option>
                  ))}
                </select>
                {errors.highestDegree && <span className="sc-error-text">{errors.highestDegree}</span>}
              </div>

              <div className="sc-form-group">
                <label>Field of Study<span className="sc-required">*</span></label>
                <input
                  type="text"
                  className={`sc-input ${errors.fieldOfStudy ? 'error' : ''}`}
                  value={fieldOfStudy}
                  onChange={(e) => setFieldOfStudy(e.target.value)}
                  placeholder="e.g. Computer Science, Public Administration"
                />
                {errors.fieldOfStudy && <span className="sc-error-text">{errors.fieldOfStudy}</span>}
              </div>

              <div className="sc-form-group">
                <label>Graduation Year<span className="sc-required">*</span></label>
                <input
                  type="number"
                  className={`sc-input ${errors.graduationYear ? 'error' : ''}`}
                  value={graduationYear}
                  onChange={(e) => setGraduationYear(e.target.value)}
                  placeholder={String(currentYear)}
                  min={1970}
                  max={2030}
                />
                {errors.graduationYear && <span className="sc-error-text">{errors.graduationYear}</span>}
              </div>

              <div className="sc-form-group">
                <label>Institution Name<span className="sc-required">*</span></label>
                <input
                  type="text"
                  className={`sc-input ${errors.institution ? 'error' : ''}`}
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  placeholder="University of Lagos"
                />
                {errors.institution && <span className="sc-error-text">{errors.institution}</span>}
              </div>
            </div>

            {/* ── Optional Fields ── */}
            <div className="sc-section-card reveal" style={{ marginTop: '24px' }}>
              <h3 className="sc-section-title">Optional Details</h3>
              <p
                style={{
                  fontSize: '13px',
                  color: 'var(--muted)',
                  lineHeight: 1.6,
                  marginBottom: '20px',
                  marginTop: '-12px',
                }}
              >
                These optional details reduce the number of questions in the assessment and improve
                your score accuracy.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="sc-form-group">
                  <label>GPA Scale</label>
                  <select
                    className="sc-select"
                    value={gpaScale}
                    onChange={(e) => setGpaScale(e.target.value as GPAScale)}
                  >
                    <option value="">Select scale</option>
                    {GPA_SCALE_OPTIONS.map((g) => (
                      <option key={g.value} value={g.value}>
                        {g.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sc-form-group">
                  <label>GPA Value</label>
                  <input
                    type="number"
                    step="0.01"
                    className="sc-input"
                    value={gpaValue}
                    onChange={(e) => setGpaValue(e.target.value)}
                    placeholder="e.g. 3.8"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="sc-form-group">
                  <label>Language Test</label>
                  <select
                    className="sc-select"
                    value={languageTest}
                    onChange={(e) => setLanguageTest(e.target.value as LanguageTest)}
                  >
                    <option value="">Select test</option>
                    {LANGUAGE_TEST_OPTIONS.map((l) => (
                      <option key={l.value} value={l.value}>
                        {l.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sc-form-group">
                  <label>Score</label>
                  <input
                    type="number"
                    step="0.5"
                    className="sc-input"
                    value={languageScore}
                    onChange={(e) => setLanguageScore(e.target.value)}
                    placeholder={
                      languageTest === 'ielts' ? 'e.g. 7.0' :
                      languageTest === 'toefl' ? 'e.g. 100' :
                      languageTest === 'duolingo' ? 'e.g. 120' : 'Score'
                    }
                  />
                </div>
              </div>

              <div className="sc-form-group">
                <label>Years of Post-Graduation Work Experience</label>
                <input
                  type="number"
                  className="sc-input"
                  value={yearsExperience}
                  onChange={(e) => setYearsExperience(e.target.value)}
                  placeholder="e.g. 3"
                  min={0}
                  max={40}
                />
              </div>
            </div>

            {/* ── Consent ── */}
            <div className="reveal" style={{ marginTop: '24px' }}>
              <div className={`sc-consent-row ${errors.consent ? 'error' : ''}`}
                style={errors.consent ? { border: '1px solid var(--red)' } : undefined}
              >
                <input
                  type="checkbox"
                  id="consent"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                />
                <label htmlFor="consent">
                  I consent to Cee Writing storing my contact details to send me my results report
                  and relevant scholarship resources. I understand my uploaded documents will be
                  permanently deleted after processing.
                </label>
              </div>
              {errors.consent && (
                <span className="sc-error-text" style={{ marginTop: '8px', display: 'block' }}>
                  {errors.consent}
                </span>
              )}
            </div>

            {/* ── CTA ── */}
            <div className="reveal" style={{ marginTop: '32px', textAlign: 'center' }}>
              <button
                type="submit"
                className="btn-gold"
                disabled={submitting}
                style={{
                  padding: '16px 48px',
                  fontSize: '15px',
                  borderRadius: '50px',
                  opacity: submitting ? 0.6 : 1,
                }}
              >
                <span>{submitting ? 'Saving...' : 'Continue to Track Selection →'}</span>
              </button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
