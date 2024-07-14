FROM node:current-alpine

WORKDIR /starwars

COPY package*.json ./

RUN npm install

COPY . .

ARG DATABASE_HOST=localhost

ENV DATABASE_HOST=$DATABASE_HOST
EXPOSE 3000

CMD ["npm", "run", "start:prod" ]