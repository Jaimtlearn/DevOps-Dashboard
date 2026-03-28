import { Sun, Moon, LayoutDashboard, Mail, BarChart3, GitBranch, Clock } from 'lucide-react';

const navItems = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'analytics', label: 'Analytics', icon: BarChart3 },
  { key: 'pipelines', label: 'Pipelines', icon: GitBranch },
  { key: 'activity', label: 'Activity', icon: Clock },
  { key: 'contact', label: 'Contact', icon: Mail },
];

export default function Header({ theme, toggleTheme, currentPage, onNavigate }) {
  return (
    <header className="header" role="banner">
      <div className="container header-inner">
        <div className="logo" onClick={() => onNavigate('dashboard')} tabIndex={0} role="button" aria-label="Go to dashboard">
          <div className="logo-icon" aria-hidden="true">D</div>
          <span>DevOps Dashboard</span>
        </div>

        <nav className="nav" aria-label="Main navigation">
          {navItems.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              className={`nav-link ${currentPage === key ? 'nav-link--active' : ''}`}
              onClick={() => onNavigate(key)}
            >
              <Icon aria-hidden="true" />
              <span className="nav-link-label">{label}</span>
            </button>
          ))}
        </nav>

        <div className="header-actions">
          <span className="badge badge--success">
            <span className="badge-dot" aria-hidden="true" />
            System Online
          </span>

          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            role="switch"
            aria-checked={theme === 'dark'}
          >
            <div className="theme-toggle-bg" aria-hidden="true" />
            <div className="theme-toggle-thumb">
              {theme === 'dark' ? <Moon /> : <Sun />}
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
