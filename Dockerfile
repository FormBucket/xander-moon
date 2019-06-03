FROM node:10-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN yarn --dev
COPY . .
EXPOSE 1234
CMD [ "yarn", "start" ]
