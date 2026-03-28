import { useState } from 'react';
import { GitBranch, GitMerge, GitPullRequest, Rocket, Shield, Package, AlertTriangle, CheckCircle, Search } from 'lucide-react';

const allActivities = [
  { id: 1, user: 'JK', name: 'Jaimit', action: 'deployed', target: 'v2.4.1 to production', time: '2 minutes ago', type: 'deploy', icon: Rocket },
  { id: 2, user: 'CI', name: 'CI Bot', action: 'completed', target: 'security scan — 0 vulnerabilities', time: '15 minutes ago', type: 'security', icon: Shield },
  { id: 3, user: 'JK', name: 'Jaimit', action: 'merged', target: 'PR #47 into main', time: '32 minutes ago', type: 'merge', icon: GitMerge },
  { id: 4, user: 'GH', name: 'GitHub Actions', action: 'built', target: 'Docker image devops-dashboard:latest', time: '1 hour ago', type: 'build', icon: Package },
  { id: 5, user: 'TR', name: 'Trivy', action: 'scanned', target: 'image signed and pushed to registry', time: '1 hour ago', type: 'security', icon: Shield },
  { id: 6, user: 'JK', name: 'Jaimit', action: 'opened', target: 'PR #48 — Add analytics dashboard', time: '2 hours ago', type: 'pr', icon: GitPullRequest },
  { id: 7, user: 'CI', name: 'CI Bot', action: 'ran', target: 'integration tests — 47/47 passed', time: '2 hours ago', type: 'test', icon: CheckCircle },
  { id: 8, user: 'JK', name: 'Jaimit', action: 'pushed', target: '3 commits to feat/dashboard', time: '3 hours ago', type: 'push', icon: GitBranch },
  { id: 9, user: 'GH', name: 'GitHub Actions', action: 'deployed', target: 'staging environment updated', time: '3 hours ago', type: 'deploy', icon: Rocket },
  { id: 10, user: 'JK', name: 'Jaimit', action: 'created', target: 'branch feat/contact-page', time: '4 hours ago', type: 'branch', icon: GitBranch },
  { id: 11, user: 'CI', name: 'CI Bot', action: 'detected', target: '1 warning in docker-build pipeline', time: '5 hours ago', type: 'warning', icon: AlertTriangle },
  { id: 12, user: 'JK', name: 'Jaimit', action: 'merged', target: 'PR #46 — Fix health check endpoint', time: '5 hours ago', type: 'merge', icon: GitMerge },
  { id: 13, user: 'GH', name: 'GitHub Actions', action: 'published', target: 'release v2.4.0', time: '6 hours ago', type: 'deploy', icon: Rocket },
  { id: 14, user: 'TR', name: 'Trivy', action: 'scanned', target: 'no HIGH/CRITICAL vulnerabilities', time: '6 hours ago', type: 'security', icon: Shield },
  { id: 15, user: 'JK', name: 'Jaimit', action: 'pushed', target: '5 commits to main', time: '7 hours ago', type: 'push', icon: GitBranch },
  { id: 16, user: 'CI', name: 'CI Bot', action: 'ran', target: 'e2e tests — 2 failed, 31 passed', time: '8 hours ago', type: 'test', icon: AlertTriangle },
  { id: 17, user: 'JK', name: 'Jaimit', action: 'deployed', target: 'v2.3.9 hotfix to production', time: '10 hours ago', type: 'deploy', icon: Rocket },
  { id: 18, user: 'GH', name: 'GitHub Actions', action: 'built', target: 'Docker image devops-dashboard:v2.3.9', time: '10 hours ago', type: 'build', icon: Package },
];

const TYPES = ['all', 'deploy', 'security', 'merge', 'build', 'pr', 'push', 'test'];

function getTypeColor(type) {
  const map = { deploy: 'var(--success)', security: 'var(--info)', merge: 'var(--text-primary)', build: 'var(--warning)', pr: 'var(--info)', push: 'var(--text-muted)', test: 'var(--success)', warning: 'var(--warning)' };
  return map[type] || 'var(--text-muted)';
}

export default function ActivityPage() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = allActivities.filter((a) => {
    if (filter !== 'all' && a.type !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      if (!a.name.toLowerCase().includes(q) && !a.target.toLowerCase().includes(q) && !a.action.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  return (
    <div className="page-transition" key="activity">
      <div className="page-header">
        <h1 className="page-title">Activity Feed</h1>
        <p className="page-subtitle">
          Complete history of deployments, builds, scans, and repository events.
        </p>
      </div>

      {/* Toolbar */}
      <div className="pipelines-toolbar">
        <div className="pipelines-search">
          <Search size={16} className="pipelines-search-icon" />
          <input
            type="text"
            className="form-input pipelines-search-input"
            placeholder="Search activity..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="pipelines-filters">
          {TYPES.map((t) => (
            <button
              key={t}
              className={`pipelines-filter-btn ${filter === t ? 'pipelines-filter-btn--active' : ''}`}
              onClick={() => setFilter(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="card">
        <div className="card-body activity-timeline">
          {filtered.map((activity) => {
            const Icon = activity.icon;
            return (
              <div className="activity-timeline-item" key={activity.id}>
                <div className="activity-timeline-line" />
                <div
                  className="activity-timeline-dot"
                  style={{ background: getTypeColor(activity.type) }}
                >
                  <Icon size={14} color="#fff" />
                </div>
                <div className="activity-timeline-content">
                  <div className="activity-timeline-header">
                    <div className="activity-avatar" aria-hidden="true">{activity.user}</div>
                    <div>
                      <div className="activity-text">
                        <strong>{activity.name}</strong> {activity.action} <strong>{activity.target}</strong>
                      </div>
                      <div className="activity-time">{activity.time}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="pipelines-empty">
              No activity matches your filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
