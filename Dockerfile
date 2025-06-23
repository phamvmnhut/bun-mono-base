FROM imbios/bun-node:1.2.5-23.10.0-alpine AS builder
WORKDIR /usr/src/app

# install dependencies
COPY . .
RUN bun install --frozen-lockfile --production

# Set environment variables for build
ENV NODE_ENV=production
# build client
RUN bun run-client build:web

# final stage
# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1.2.4-alpine AS final
WORKDIR /usr/src/app

# copy client build
COPY . .
COPY --from=builder /usr/src/app/apps/client/dist ./apps/client/dist

# install dependencies production
RUN bun install --frozen-lockfile --production --filter '!client'

RUN ls -la

# env
ENV NODE_ENV=production
ENV PORT=5000

# run the app
USER bun
EXPOSE 5000
ENTRYPOINT [ "bun", "start" ]
