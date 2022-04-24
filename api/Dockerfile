FROM node:16-alpine as develop
WORKDIR /usr/app
ADD package.json yarn.lock ./
RUN yarn install
ADD . .
RUN yarn build

FROM node:16-alpine as prod
WORKDIR /usr/app
ADD package.json yarn.lock ./
RUN yarn install --prod
COPY --from=develop /usr/app/dist ./dist

CMD ["node", "./dist/main.js"]