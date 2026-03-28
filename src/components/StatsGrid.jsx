import { Activity, GitBranch, Shield, Clock, TrendingUp, TrendingDown } from 'lucide-react';
import { useState, useEffect } from 'react';

const stats = [
  {
    label: 'Deployments',
    value: 142,
    display: '142',
    change: '+12%',
    trend: 'up',
    icon: Activity,
  },
  {
    label: 'Pipelines',
    value: 98.7,
    display: '98.7%',
    change: '+2.1%',
    trend: 'up',
    icon: GitBranch,
  },
  {
    label: 'Security Score',
    value: null,
    display: 'A+',
    change: 'No issues',
    trend: 'up',
    icon: Shield,
  },
  {
    label: 'Avg Build Time',
    value: null,
    display: '2m 34s',
    change: '-18s',
    trend: 'up',
    icon: Clock,
  },
];

function AnimatedValue({ display }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="stat-value" style={{ opacity: show ? 1 : 0, transition: 'opacity 0.6s ease' }}>
      {display}
    </div>
  );
}

export default function StatsGrid() {
  return (
    <div className="stats-grid" role="region" aria-label="Key metrics">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <article className="stat-card" key={stat.label}>
            <div className="stat-label">
              <Icon aria-hidden="true" />
              {stat.label}
            </div>
            <AnimatedValue display={stat.display} />
            <div className={`stat-change stat-change--${stat.trend}`}>
              {stat.trend === 'up' ? (
                <TrendingUp size={14} aria-hidden="true" />
              ) : (
                <TrendingDown size={14} aria-hidden="true" />
              )}
              {stat.change}
            </div>
          </article>
        );
      })}
    </div>
  );
}
