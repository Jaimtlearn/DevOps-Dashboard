# ============================================
# Stage 1: Build the frontend
# ============================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency files first for better caching
COPY package.json package-lock.json* ./
RUN npm ci --ignore-scripts

# Copy source files and build
COPY . .
RUN npm run build

# ============================================
# Stage 2: Production image
# ============================================
FROM node:20-alpine AS production

# Security: add non-root user
RUN addgroup -g 1001 -S appgroup && \
    adduser -S appuser -u 1001 -G appgroup

WORKDIR /app

# Install only production dependencies
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev --ignore-scripts && \
    npm cache clean --force

# Copy built frontend from builder stage
COPY --from=builder /app/dist ./dist

# Copy server code
COPY server ./server

# Set ownership
RUN chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

# Environment variables
ENV NODE_ENV=production
ENV PORT=4000

# Expose port
EXPOSE 4000

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:4000/api/health || exit 1

# Start the server
CMD ["node", "server/index.js"]