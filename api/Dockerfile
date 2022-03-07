FROM node:16-alpine as develop
WORKDIR /api
ADD package.json yarn.lock ./
RUN yarn install
ADD . .
RUN yarn build

FROM node:16-alpine as prod
WORKDIR /api
ADD package.json yarn.lock ./
RUN yarn install --prod
COPY --from=develop /api/dist ./dist

CMD ["node", "./dist/main.js"]