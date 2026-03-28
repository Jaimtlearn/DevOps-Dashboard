import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from 'recharts';
import { TrendingUp, TrendingDown, Activity, GitBranch, Shield, Clock } from 'lucide-react';

// ─── Mock Data ──────────────────────────────────────────────
const deploymentTrend = [
  { month: 'Aug', deploys: 68, failures: 8 },
  { month: 'Sep', deploys: 82, failures: 5 },
  { month: 'Oct', deploys: 95, failures: 12 },
  { month: 'Nov', deploys: 110, failures: 7 },
  { month: 'Dec', deploys: 98, failures: 4 },
  { month: 'Jan', deploys: 125, failures: 6 },
  { month: 'Feb', deploys: 132, failures: 3 },
  { month: 'Mar', deploys: 142, failures: 2 },
];

const buildDuration = [
  { day: 'Mon', frontend: 1.8, backend: 2.4, infra: 3.1 },
  { day: 'Tue', frontend: 1.6, backend: 2.1, infra: 2.8 },
  { day: 'Wed', frontend: 2.0, backend: 2.6, infra: 3.4 },
  { day: 'Thu', frontend: 1.5, backend: 2.0, infra: 2.6 },
  { day: 'Fri', frontend: 1.7, backend: 2.3, infra: 3.0 },
  { day: 'Sat', frontend: 1.3, backend: 1.8, infra: 2.2 },
  { day: 'Sun', frontend: 1.1, backend: 1.5, infra: 2.0 },
];

const pipelineStatus = [
  { name: 'Passed', value: 87, color: '#12b886' },
  { name: 'Failed', value: 8, color: '#fa5252' },
  { name: 'Cancelled', value: 3, color: '#f59f00' },
  { name: 'Running', value: 2, color: '#339af0' },
];

const resourceUsage = [
  { time: '00:00', cpu: 32, memory: 48 },
  { time: '04:00', cpu: 18, memory: 42 },
  { time: '08:00', cpu: 55, memory: 58 },
  { time: '12:00', cpu: 78, memory: 72 },
  { time: '14:00', cpu: 82, memory: 75 },
  { time: '16:00', cpu: 65, memory: 68 },
  { time: '18:00', cpu: 45, memory: 55 },
  { time: '20:00', cpu: 38, memory: 50 },
  { time: '23:59', cpu: 25, memory: 44 },
];

const summaryStats = [
  { label: 'Total Deployments', value: '1,248', change: '+12%', trend: 'up', icon: Activity },
  { label: 'Success Rate', value: '98.7%', change: '+2.1%', trend: 'up', icon: GitBranch },
  { label: 'Security Score', value: 'A+', change: 'No issues', trend: 'up', icon: Shield },
  { label: 'Avg Build Time', value: '2m 34s', change: '-18s faster', trend: 'up', icon: Clock },
];

// ─── Custom Tooltip ─────────────────────────────────────────
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <div className="chart-tooltip-label">{label}</div>
      {payload.map((entry) => (
        <div key={entry.name} className="chart-tooltip-row">
          <span className="chart-tooltip-dot" style={{ background: entry.color }} />
          <span className="chart-tooltip-name">{entry.name}</span>
          <span className="chart-tooltip-value">{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────
export default function AnalyticsPage() {
  return (
    <div className="page-transition" key="analytics">
      <div className="page-header">
        <h1 className="page-title">Analytics</h1>
        <p className="page-subtitle">
          Deployment trends, build performance, and infrastructure metrics.
        </p>
      </div>

      {/* Summary Stats */}
      <div className="stats-grid">
        {summaryStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <article className="stat-card" key={stat.label}>
              <div className="stat-label">
                <Icon aria-hidden="true" />
                {stat.label}
              </div>
              <div className="stat-value">{stat.value}</div>
              <div className={`stat-change stat-change--${stat.trend}`}>
                {stat.trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {stat.change}
              </div>
            </article>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="charts-grid">

        {/* Line Chart — Deployment Trend */}
        <div className="chart-card chart-card--wide">
          <div className="chart-card-header">
            <div>
              <h2 className="chart-card-title">Deployment Trend</h2>
              <p className="chart-card-subtitle">Successful deployments vs failures over 8 months</p>
            </div>
            <span className="badge badge--success">
              <span className="badge-dot" />
              Trending Up
            </span>
          </div>
          <div className="chart-body">
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={deploymentTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-light)" />
                <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={12} tickLine={false} />
                <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" iconSize={8} />
                <Line
                  type="monotone"
                  dataKey="deploys"
                  name="Deployments"
                  stroke="var(--text-primary)"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: 'var(--bg-card)' , stroke: 'var(--text-primary)', strokeWidth: 2 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="failures"
                  name="Failures"
                  stroke="var(--error)"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ r: 3, fill: 'var(--bg-card)', stroke: 'var(--error)', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart — Build Duration */}
        <div className="chart-card">
          <div className="chart-card-header">
            <div>
              <h2 className="chart-card-title">Build Duration</h2>
              <p className="chart-card-subtitle">Avg build time by service (minutes)</p>
            </div>
          </div>
          <div className="chart-body">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={buildDuration} barCategoryGap="20%">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-light)" />
                <XAxis dataKey="day" stroke="var(--text-muted)" fontSize={12} tickLine={false} />
                <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} unit="m" />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" iconSize={8} />
                <Bar dataKey="frontend" name="Frontend" fill="var(--text-primary)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="backend" name="Backend" fill="var(--text-muted)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="infra" name="Infra" fill="var(--border-color)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie/Donut Chart — Pipeline Status */}
        <div className="chart-card">
          <div className="chart-card-header">
            <div>
              <h2 className="chart-card-title">Pipeline Status</h2>
              <p className="chart-card-subtitle">Distribution of pipeline results</p>
            </div>
          </div>
          <div className="chart-body chart-body--centered">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={pipelineStatus}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                >
                  {pipelineStatus.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" iconSize={8} formatter={(value) => <span style={{ color: 'var(--text-secondary)', fontSize: 12 }}>{value}</span>} />
              </PieChart>
            </ResponsiveContainer>
            <div className="donut-center-label">
              <span className="donut-center-value">87%</span>
              <span className="donut-center-text">Pass Rate</span>
            </div>
          </div>
        </div>

        {/* Area Chart — Resource Usage */}
        <div className="chart-card chart-card--wide">
          <div className="chart-card-header">
            <div>
              <h2 className="chart-card-title">Resource Usage</h2>
              <p className="chart-card-subtitle">CPU and memory utilization over 24 hours</p>
            </div>
            <span className="badge badge--info">
              <span className="badge-dot" />
              Live
            </span>
          </div>
          <div className="chart-body">
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={resourceUsage}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-light)" />
                <XAxis dataKey="time" stroke="var(--text-muted)" fontSize={12} tickLine={false} />
                <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} unit="%" />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" iconSize={8} />
                <Area
                  type="monotone"
                  dataKey="cpu"
                  name="CPU"
                  stroke="var(--text-primary)"
                  fill="var(--text-primary)"
                  fillOpacity={0.08}
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="memory"
                  name="Memory"
                  stroke="var(--info)"
                  fill="var(--info)"
                  fillOpacity={0.08}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
