FROM node:16-alpine as deps
WORKDIR /app
ADD package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:16-alpine as builder
ENV NODE_ENV=production
WORKDIR /app
ADD . .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn build

FROM node:16-alpine AS prod
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/next.config.js ./
#COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
CMD ["node_modules/.bin/next", "start"]