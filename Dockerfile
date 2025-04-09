FROM node:20-alpine-slim AS builder
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=false

COPY . .
RUN yarn build

RUN yarn install --frozen-lockfile --production=true

FROM node:20-alpine-slim
WORKDIR /app

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

RUN chown -R node:node /app

USER node

CMD ["node", "server.js"]