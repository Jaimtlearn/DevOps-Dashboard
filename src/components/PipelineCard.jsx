import { CheckCircle, XCircle, AlertTriangle, Loader, GitBranch, ExternalLink } from 'lucide-react';
import { useState } from 'react';

const pipelines = [
  {
    name: 'frontend-deploy',
    branch: 'main',
    status: 'success',
    time: '2 min ago',
    duration: '1m 42s',
    icon: CheckCircle,
  },
  {
    name: 'api-tests',
    branch: 'feat/auth',
    status: 'error',
    time: '15 min ago',
    duration: '3m 12s',
    icon: XCircle,
  },
  {
    name: 'docker-build',
    branch: 'main',
    status: 'warning',
    time: '32 min ago',
    duration: '4m 08s',
    icon: AlertTriangle,
  },
  {
    name: 'security-scan',
    branch: 'develop',
    status: 'info',
    time: '1 hr ago',
    duration: '2m 55s',
    icon: Loader,
  },
];

export default function PipelineCard({ onNavigate }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">
          <GitBranch aria-hidden="true" />
          Recent Pipelines
        </h2>
        <button className="btn" aria-label="View all pipelines" onClick={() => onNavigate('pipelines')}>
          View All
          <ExternalLink size={14} aria-hidden="true" />
        </button>
      </div>
      <div className="card-body">
        {pipelines.map((pipeline, idx) => {
          const Icon = pipeline.icon;
          return (
            <div
              className="pipeline-item"
              key={pipeline.name}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              role="button"
              tabIndex={0}
              aria-label={`Pipeline ${pipeline.name} on ${pipeline.branch}: ${pipeline.status}`}
            >
              <div className="pipeline-info">
                <div className={`pipeline-icon pipeline-icon--${pipeline.status}`}>
                  <Icon aria-hidden="true" />
                </div>
                <div>
                  <div className="pipeline-name">{pipeline.name}</div>
                  <div className="pipeline-detail">{pipeline.branch}</div>
                </div>
              </div>
              <div className="pipeline-meta">
                <div className="pipeline-time">{pipeline.time}</div>
                <div className="pipeline-duration" style={{
                  opacity: hoveredIdx === idx ? 1 : 0.7,
                  transition: 'opacity 0.2s'
                }}>
                  {pipeline.duration}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
