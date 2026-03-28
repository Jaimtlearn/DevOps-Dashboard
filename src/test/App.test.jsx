import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import App from '../App';

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('renders the dashboard heading', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'Dashboard' })).toBeInTheDocument();
  });

  it('renders the logo', () => {
    render(<App />);
    expect(screen.getByText('DevOps Dashboard')).toBeInTheDocument();
  });

  it('renders stats cards', () => {
    render(<App />);
    expect(screen.getByText('Deployments')).toBeInTheDocument();
    expect(screen.getByText('Pipelines')).toBeInTheDocument();
    expect(screen.getByText('Security Score')).toBeInTheDocument();
    expect(screen.getByText('Avg Build Time')).toBeInTheDocument();
  });

  it('renders pipeline section', () => {
    render(<App />);
    expect(screen.getByText('Recent Pipelines')).toBeInTheDocument();
    expect(screen.getByText('frontend-deploy')).toBeInTheDocument();
  });

  it('renders activity feed', () => {
    render(<App />);
    expect(screen.getByText('Activity Feed')).toBeInTheDocument();
  });

  it('toggles theme on button click', () => {
    render(<App />);
    const toggle = screen.getByRole('switch');
    expect(toggle).toBeInTheDocument();

    fireEvent.click(toggle);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');

    fireEvent.click(toggle);
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('persists theme preference in localStorage', () => {
    render(<App />);
    const toggle = screen.getByRole('switch');

    fireEvent.click(toggle);
    expect(localStorage.getItem('theme')).toBe('dark');

    fireEvent.click(toggle);
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('shows system online badge', () => {
    render(<App />);
    expect(screen.getByText('System Online')).toBeInTheDocument();
  });

  it('renders footer', () => {
    render(<App />);
    expect(screen.getByText(/DevOps Dashboard v1.0.0/)).toBeInTheDocument();
  });

  it('has skip to content link for accessibility', () => {
    render(<App />);
    expect(screen.getByText('Skip to main content')).toBeInTheDocument();
  });

  // Navigation tests
  it('navigates to contact page', () => {
    render(<App />);
    const contactNav = screen.getByRole('button', { name: /contact/i });
    fireEvent.click(contactNav);
    expect(screen.getByText('Get in Touch')).toBeInTheDocument();
  });

  it('navigates back to dashboard from contact', () => {
    render(<App />);
    const contactNav = screen.getByRole('button', { name: /contact/i });
    fireEvent.click(contactNav);
    expect(screen.getByText('Get in Touch')).toBeInTheDocument();

    const dashNav = screen.getByRole('button', { name: 'Dashboard' });
    fireEvent.click(dashNav);
    expect(screen.getByRole('heading', { name: 'Dashboard' })).toBeInTheDocument();
  });

  // Contact form tests
  it('shows validation errors on empty form submission', async () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /contact/i }));

    const submitBtn = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Message is required')).toBeInTheDocument();
    });
  });

  it('validates email format', async () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /contact/i }));

    const emailInput = screen.getByLabelText('Email Address');
    fireEvent.change(emailInput, { target: { value: 'bad-email', name: 'email' } });
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(screen.getByText('Enter a valid email address')).toBeInTheDocument();
    });
  });

  it('submits the contact form successfully', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /contact/i }));

    fireEvent.change(screen.getByLabelText('Your Name'), { target: { value: 'Test User', name: 'name' } });
    fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'test@example.com', name: 'email' } });
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'This is a test message for the form.', name: 'message' } });

    const submitBtn = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitBtn);

    expect(screen.getByText('Sending...')).toBeInTheDocument();

    await vi.advanceTimersByTimeAsync(2000);

    await waitFor(() => {
      expect(screen.getByText(/message sent successfully/i)).toBeInTheDocument();
    });

    vi.useRealTimers();
  });
});
