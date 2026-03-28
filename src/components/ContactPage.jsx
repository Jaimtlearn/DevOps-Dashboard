import { useState, useCallback } from 'react';
import { Mail, Github, Linkedin, Instagram, AlertCircle, Copy, Check, Send } from 'lucide-react';
import Toast from './Toast';
import MapView from './MapView';

const MAX_MESSAGE_LENGTH = 500;

function validateField(name, value) {
  switch (name) {
    case 'name':
      if (!value.trim()) return 'Name is required';
      if (value.trim().length < 2) return 'Name must be at least 2 characters';
      return '';
    case 'email':
      if (!value.trim()) return 'Email is required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email address';
      return '';
    case 'message':
      if (!value.trim()) return 'Message is required';
      if (value.trim().length < 10) return 'Message must be at least 10 characters';
      if (value.length > MAX_MESSAGE_LENGTH) return `Message exceeds ${MAX_MESSAGE_LENGTH} characters`;
      return '';
    default:
      return '';
  }
}

function FormField({ type = 'text', name, label, placeholder, value, error, touched, onChange, onBlur }) {
  const isTextarea = type === 'textarea';
  const Tag = isTextarea ? 'textarea' : 'input';
  const hasValue = value.length > 0;
  const isValid = touched && !error && hasValue;
  const isInvalid = touched && error;

  let stateClass = '';
  if (isInvalid) stateClass = isTextarea ? 'form-textarea--error' : 'form-input--error';
  else if (isValid) stateClass = isTextarea ? 'form-textarea--success' : 'form-input--success';

  return (
    <div className="form-group">
      <label className="form-label" htmlFor={name}>{label}</label>
      <Tag
        className={`${isTextarea ? 'form-textarea' : 'form-input'} ${stateClass}`}
        type={isTextarea ? undefined : type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder || label}
        maxLength={isTextarea ? MAX_MESSAGE_LENGTH : undefined}
        aria-invalid={isInvalid ? 'true' : 'false'}
        aria-describedby={isInvalid ? `${name}-error` : undefined}
      />
      {isInvalid && (
        <div className="form-error" id={`${name}-error`} role="alert">
          <AlertCircle aria-hidden="true" />
          {error}
        </div>
      )}
      {isTextarea && (
        <div className={`form-char-count ${
          value.length > MAX_MESSAGE_LENGTH * 0.9
            ? value.length >= MAX_MESSAGE_LENGTH
              ? 'form-char-count--error'
              : 'form-char-count--warn'
            : ''
        }`}>
          {value.length}/{MAX_MESSAGE_LENGTH}
        </div>
      )}
    </div>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const addToast = useCallback((type, message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, message }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    const allTouched = {};
    Object.keys(form).forEach((key) => {
      newErrors[key] = validateField(key, form[key]);
      allTouched[key] = true;
    });
    setErrors(newErrors);
    setTouched(allTouched);

    if (Object.values(newErrors).some((err) => err)) return;

    setSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1800));

    setSubmitting(false);
    setForm({ name: '', email: '', message: '' });
    setTouched({});
    setErrors({});
    addToast('success', 'Message sent successfully! We\'ll get back to you soon.');
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('jaimitpatel.1432@gmail.com');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      addToast('error', 'Failed to copy email address');
    }
  };

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Get in Touch</h1>
        <p className="page-subtitle">
          Have a question or want to work together? Drop us a message.
        </p>
      </div>

      <div className="contact-page">
        <div className="contact-grid">
          {/* Left — Info & Social */}
          <div className="contact-info-section">
            <div
              className="contact-info-card"
              onClick={handleCopyEmail}
              role="button"
              tabIndex={0}
              aria-label="Copy email address"
              onKeyDown={(e) => e.key === 'Enter' && handleCopyEmail()}
            >
              <div className="contact-info-icon">
                {copiedEmail ? <Check /> : <Mail />}
              </div>
              <div>
                <div className="contact-info-label">Email</div>
                <div className="contact-info-value">
                  {copiedEmail ? (
                    <span className="copied-feedback">Copied!</span>
                  ) : (
                    'jaimitpatel.1432@gmail.com'
                  )}
                </div>
                {!copiedEmail && (
                  <div className="copy-hint">
                    <Copy size={10} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 3 }} />
                    Click to copy
                  </div>
                )}
              </div>
            </div>

            <MapView />

            <div className="social-links">
              <a
                className="social-link"
                href="https://github.com/jaimtlearn"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github />
              </a>
              <a
                className="social-link"
                href="https://linkedin.com/in/jaimit2002"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin />
              </a>
              <a
                className="social-link"
                href="https://instagram.com/jaimit2002"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Instagram />
              </a>
            </div>
          </div>

          {/* Right — Form */}
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <FormField
              name="name"
              label="Your Name"
              placeholder="Enter your full name"
              value={form.name}
              error={errors.name}
              touched={touched.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <FormField
              type="email"
              name="email"
              label="Email Address"
              placeholder="you@example.com"
              value={form.email}
              error={errors.email}
              touched={touched.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <FormField
              type="textarea"
              name="message"
              label="Message"
              placeholder="Write your message here..."
              value={form.message}
              error={errors.message}
              touched={touched.message}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <button
              type="submit"
              className={`btn btn--primary btn--lg ${submitting ? 'btn--loading' : ''}`}
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <span className="btn-spinner" aria-hidden="true" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={16} aria-hidden="true" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Toast Container */}
      {toasts.length > 0 && (
        <div className="toast-container">
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              type={toast.type}
              message={toast.message}
              onClose={() => removeToast(toast.id)}
            />
          ))}
        </div>
      )}
    </>
  );
}
