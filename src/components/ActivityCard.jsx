import { Clock, ExternalLink } from 'lucide-react';

const activities = [
  {
    user: 'JK',
    text: '<strong>Jaimit</strong> deployed <strong>v2.4.1</strong> to production',
    time: '2 minutes ago',
  },
  {
    user: 'CI',
    text: '<strong>CI Bot</strong> completed security scan — <strong>0 vulnerabilities</strong>',
    time: '15 minutes ago',
  },
  {
    user: 'JK',
    text: '<strong>Jaimit</strong> merged PR #47 into <strong>main</strong>',
    time: '32 minutes ago',
  },
  {
    user: 'GH',
    text: '<strong>GitHub Actions</strong> built Docker image <strong>devops-dashboard:latest</strong>',
    time: '1 hour ago',
  },
  {
    user: 'TR',
    text: '<strong>Trivy</strong> scan passed — image signed and pushed to registry',
    time: '1 hour ago',
  },
];

export default function ActivityCard({ onNavigate }) {
  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">
          <Clock aria-hidden="true" />
          Activity Feed
        </h2>
        <button className="btn" aria-label="View all activity" onClick={() => onNavigate('activity')}>
          View All
          <ExternalLink size={14} aria-hidden="true" />
        </button>
      </div>
      <div className="card-body">
        {activities.map((activity, i) => (
          <div className="activity-item" key={i}>
            <div className="activity-avatar" aria-hidden="true">
              {activity.user}
            </div>
            <div className="activity-content">
              <div
                className="activity-text"
                dangerouslySetInnerHTML={{ __html: activity.text }}
              />
              <div className="activity-time">{activity.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
