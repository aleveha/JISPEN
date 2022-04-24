FROM node:16-alpine as deps
WORKDIR /usr/app
ADD package.json yarn.lock ./
RUN yarn install

FROM node:16-alpine as builder
ENV NODE_ENV=production
WORKDIR /usr/app
ADD . .
COPY --from=deps /usr/app/node_modules ./node_modules
RUN yarn build

FROM node:16-alpine AS prod
WORKDIR /usr/app
ENV NODE_ENV=production
COPY --from=builder /usr/app/next.config.js ./
COPY --from=builder /usr/app/public ./public
COPY --from=builder /usr/app/.next ./.next
COPY --from=builder /usr/app/node_modules ./node_modules
CMD ["node_modules/.bin/next", "start"]