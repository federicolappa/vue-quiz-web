FROM node:10-alpine

WORKDIR /app

COPY . .

RUN yarn install

EXPOSE 4000

CMD [ "yarn", "dev" ]