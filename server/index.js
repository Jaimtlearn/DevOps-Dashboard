const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const path = require('path');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 4000;
const startTime = Date.now();

// Middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(compression());
app.use(morgan('combined'));
app.use(express.json());

// Serve static frontend build
app.use(express.static(path.join(__dirname, '..', 'dist')));

// ─── API Routes ──────────────────────────────────────────────

// Health check endpoint
app.get('/api/health', (_req, res) => {
  const uptime = Math.floor((Date.now() - startTime) / 1000);
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: `${uptime}s`,
    version: process.env.npm_package_version || '1.0.0',
    environment: process.env.NODE_ENV || 'development',
  });
});

// Readiness probe
app.get('/api/ready', (_req, res) => {
  res.json({ ready: true });
});

// Liveness probe
app.get('/api/live', (_req, res) => {
  res.json({ alive: true });
});

// System metrics endpoint
app.get('/api/metrics', (_req, res) => {
  const memUsage = process.memoryUsage();
  res.json({
    system: {
      platform: os.platform(),
      arch: os.arch(),
      cpus: os.cpus().length,
      totalMemory: `${Math.round(os.totalmem() / 1024 / 1024)}MB`,
      freeMemory: `${Math.round(os.freemem() / 1024 / 1024)}MB`,
      loadAverage: os.loadavg(),
    },
    process: {
      pid: process.pid,
      nodeVersion: process.version,
      heapUsed: `${Math.round(memUsage.heapUsed / 1024 / 1024)}MB`,
      heapTotal: `${Math.round(memUsage.heapTotal / 1024 / 1024)}MB`,
      rss: `${Math.round(memUsage.rss / 1024 / 1024)}MB`,
    },
    uptime: `${Math.floor((Date.now() - startTime) / 1000)}s`,
  });
});

// Demo pipeline data endpoint
app.get('/api/pipelines', (_req, res) => {
  res.json({
    pipelines: [
      { id: 1, name: 'frontend-deploy', status: 'success', branch: 'main', duration: '1m 42s' },
      { id: 2, name: 'api-tests', status: 'failed', branch: 'feat/auth', duration: '3m 12s' },
      { id: 3, name: 'docker-build', status: 'running', branch: 'main', duration: '4m 08s' },
      { id: 4, name: 'security-scan', status: 'success', branch: 'develop', duration: '2m 55s' },
    ],
  });
});

// SPA fallback — serve index.html for client-side routes
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

// ─── Error Handler ───────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error(`[ERROR] ${err.message}`);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong' : err.message,
  });
});

// ─── Start Server ────────────────────────────────────────────
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://0.0.0.0:${PORT}/api/health`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;