FROM node:18-alpine as deps
WORKDIR /tmp
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build
RUN yarn install --production --ignore-scripts --prefer-offline
RUN mv package.json /home/node && mv dist /home/node && mv node_modules /home/node && mv entrypoint.sh /home/node

FROM node:16-alpine as prod
COPY --from=deps /home/node /home/node
WORKDIR /home/node/dist
ENTRYPOINT ["/home/node/entrypoint.sh"]
EXPOSE 8000
CMD ["node", "src/main.js"]
