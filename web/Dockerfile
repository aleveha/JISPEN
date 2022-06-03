FROM node:16-alpine as deps
WORKDIR /tmp
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build
RUN mv public .next/standalone/public && \
    mv .next/static .next/standalone/.next/static && \
    mv .next/standalone /home/node

FROM node:16-alpine AS prod
COPY --from=deps /home/node /home/node
WORKDIR /home/node/standalone
CMD ["node", "server.js"]
