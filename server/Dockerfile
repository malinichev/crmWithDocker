# syntax=docker/dockerfile:1.4

FROM node:lts AS base
WORKDIR /server
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS development
COPY . .
CMD ["npm", "start"]

# Production stage
FROM base AS production
ENV NODE_ENV=production
COPY . .
RUN npm run build
CMD ["node", "src/index.js"]

# Docker tools for development
FROM development as dev-envs
RUN apt-get update && apt-get install -y --no-install-recommends git
RUN useradd -s /bin/bash -m vscode && groupadd docker && usermod -aG docker vscode
COPY --from=gloursdocker/docker / /
