import { useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Loader, Clock, Filter, Search } from 'lucide-react';

const allPipelines = [
  { id: 1, name: 'frontend-deploy', branch: 'main', status: 'success', time: '2 min ago', duration: '1m 42s', commit: 'a3f9e12', author: 'Jaimit' },
  { id: 2, name: 'api-tests', branch: 'feat/auth', status: 'failed', time: '15 min ago', duration: '3m 12s', commit: 'b7c4d89', author: 'Jaimit' },
  { id: 3, name: 'docker-build', branch: 'main', status: 'warning', time: '32 min ago', duration: '4m 08s', commit: 'c2e8f45', author: 'CI Bot' },
  { id: 4, name: 'security-scan', branch: 'develop', status: 'running', time: '1 hr ago', duration: '2m 55s', commit: 'd1a7b33', author: 'Jaimit' },
  { id: 5, name: 'lint-check', branch: 'main', status: 'success', time: '1 hr ago', duration: '0m 48s', commit: 'e5f2c91', author: 'CI Bot' },
  { id: 6, name: 'integration-tests', branch: 'feat/dashboard', status: 'success', time: '2 hr ago', duration: '5m 22s', commit: 'f8d3a67', author: 'Jaimit' },
  { id: 7, name: 'e2e-tests', branch: 'main', status: 'failed', time: '3 hr ago', duration: '8m 14s', commit: 'g4b9c12', author: 'Jaimit' },
  { id: 8, name: 'deploy-staging', branch: 'develop', status: 'success', time: '3 hr ago', duration: '2m 05s', commit: 'h6e1d78', author: 'CI Bot' },
  { id: 9, name: 'build-prod', branch: 'main', status: 'success', time: '4 hr ago', duration: '3m 33s', commit: 'i9f2a45', author: 'Jaimit' },
  { id: 10, name: 'docker-push', branch: 'main', status: 'success', time: '4 hr ago', duration: '1m 12s', commit: 'j3c8e56', author: 'CI Bot' },
  { id: 11, name: 'trivy-scan', branch: 'main', status: 'success', time: '5 hr ago', duration: '2m 48s', commit: 'k7d4f90', author: 'CI Bot' },
  { id: 12, name: 'deploy-prod', branch: 'main', status: 'success', time: '5 hr ago', duration: '0m 35s', commit: 'l1a5b23', author: 'Jaimit' },
  { id: 13, name: 'unit-tests', branch: 'fix/bug-112', status: 'warning', time: '6 hr ago', duration: '2m 18s', commit: 'm8e9c34', author: 'Jaimit' },
  { id: 14, name: 'frontend-deploy', branch: 'develop', status: 'success', time: '7 hr ago', duration: '1m 55s', commit: 'n2f6d67', author: 'CI Bot' },
  { id: 15, name: 'api-tests', branch: 'main', status: 'success', time: '8 hr ago', duration: '3m 01s', commit: 'o5g7e89', author: 'Jaimit' },
];

const statusConfig = {
  success: { icon: CheckCircle, label: 'Passed', className: 'pipeline-icon--success' },
  failed: { icon: XCircle, label: 'Failed', className: 'pipeline-icon--error' },
  warning: { icon: AlertTriangle, label: 'Warning', className: 'pipeline-icon--warning' },
  running: { icon: Loader, label: 'Running', className: 'pipeline-icon--info' },
};

const FILTERS = ['all', 'success', 'failed', 'warning', 'running'];

export default function PipelinesPage() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = allPipelines.filter((p) => {
    if (filter !== 'all' && p.status !== filter) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.branch.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const counts = {
    all: allPipelines.length,
    success: allPipelines.filter((p) => p.status === 'success').length,
    failed: allPipelines.filter((p) => p.status === 'failed').length,
    warning: allPipelines.filter((p) => p.status === 'warning').length,
    running: allPipelines.filter((p) => p.status === 'running').length,
  };

  return (
    <div className="page-transition" key="pipelines">
      <div className="page-header">
        <h1 className="page-title">Pipelines</h1>
        <p className="page-subtitle">
          All CI/CD pipeline runs across branches and services.
        </p>
      </div>

      {/* Toolbar */}
      <div className="pipelines-toolbar">
        <div className="pipelines-search">
          <Search size={16} className="pipelines-search-icon" />
          <input
            type="text"
            className="form-input pipelines-search-input"
            placeholder="Search pipelines or branches..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="pipelines-filters">
          <Filter size={14} style={{ color: 'var(--text-muted)' }} />
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`pipelines-filter-btn ${filter === f ? 'pipelines-filter-btn--active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              <span className="pipelines-filter-count">{counts[f]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="card">
        <div className="pipelines-table-wrap">
          <table className="pipelines-table">
            <thead>
              <tr>
                <th>Status</th>
                <th>Pipeline</th>
                <th>Branch</th>
                <th>Commit</th>
                <th>Author</th>
                <th>Duration</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((pipeline) => {
                const config = statusConfig[pipeline.status];
                const Icon = config.icon;
                return (
                  <tr key={pipeline.id} className="pipelines-row">
                    <td>
                      <div className={`pipeline-icon ${config.className}`}>
                        <Icon size={16} />
                      </div>
                    </td>
                    <td>
                      <span className="pipelines-name">{pipeline.name}</span>
                    </td>
                    <td>
                      <span className="pipelines-branch">{pipeline.branch}</span>
                    </td>
                    <td>
                      <code className="pipelines-commit">{pipeline.commit}</code>
                    </td>
                    <td className="pipelines-author">{pipeline.author}</td>
                    <td>
                      <span className="pipelines-duration">
                        <Clock size={12} />
                        {pipeline.duration}
                      </span>
                    </td>
                    <td className="pipelines-time">{pipeline.time}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="pipelines-empty">
              No pipelines match your filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
