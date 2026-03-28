export default function Footer({ onNavigate }) {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer-inner">
        <span>DevOps Dashboard v1.0.0</span>
        <nav className="footer-links" aria-label="Footer navigation">
          <a href="#docs">Docs</a>
          <a href="#status">Status</a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('contact');
            }}
          >
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
}
