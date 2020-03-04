FROM node:12.14.0-alpine

WORKDIR /app

COPY . .

RUN yarn install --production && yarn build

CMD yarn start