# -------- Stage 1: Build --------
FROM node:23-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copy source code and build
COPY . .
RUN pnpm build

# -------- Stage 2: Production --------
FROM node:23-alpine AS prod
WORKDIR /app

# Copy only built files + package.json for vite
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

RUN npm install -g pnpm

EXPOSE 4173

# Use vite preview to serve the build
CMD ["pnpm", "vite", "preview", "--host", "0.0.0.0", "--port", "4173"]
