import { useState, useCallback, lazy, Suspense } from 'react';
import { useTheme } from './hooks/useTheme';
import Header from './components/Header';
import StatsGrid from './components/StatsGrid';
import PipelineCard from './components/PipelineCard';
import ActivityCard from './components/ActivityCard';
import ContactPage from './components/ContactPage';
import PipelinesPage from './components/PipelinesPage';
import ActivityPage from './components/ActivityPage';
import Footer from './components/Footer';

const AnalyticsPage = lazy(() => import('./components/AnalyticsPage'));

function DashboardPage({ onNavigate }) {
  return (
    <div className="page-transition" key="dashboard">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">
          Monitor deployments, pipelines, and infrastructure health.
        </p>
      </div>

      <StatsGrid />

      <div className="content-grid">
        <PipelineCard onNavigate={onNavigate} />
        <ActivityCard onNavigate={onNavigate} />
      </div>
    </div>
  );
}

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleNavigate = useCallback((page) => {
    if (page === currentPage) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <div className="app">
      <a href="#main-content" className="sr-only">
        Skip to main content
      </a>

      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      <main className="main" id="main-content">
        <div className="container">
          {currentPage === 'dashboard' && <DashboardPage onNavigate={handleNavigate} />}
          {currentPage === 'analytics' && (
            <Suspense fallback={<div className="page-transition" key="analytics-loading"><p className="page-subtitle">Loading analytics...</p></div>}>
              <div className="page-transition" key="analytics-wrap">
                <AnalyticsPage />
              </div>
            </Suspense>
          )}
          {currentPage === 'pipelines' && (
            <div className="page-transition" key="pipelines-wrap">
              <PipelinesPage />
            </div>
          )}
          {currentPage === 'activity' && (
            <div className="page-transition" key="activity-wrap">
              <ActivityPage />
            </div>
          )}
          {currentPage === 'contact' && (
            <div className="page-transition" key="contact">
              <ContactPage />
            </div>
          )}
        </div>
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
