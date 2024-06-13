## Description

This is an REST API I build on [Nest.js](https://github.com/nestjs/nest) framework hat scrapes data from SWAPI (swapi.dev) to database and serves it. It has CRUD functionalities, file uploading feature, storing files on AWS s3 storage, as well as some basic authorization with  passport-local

## Installation

```bash
$ npm install
```

### .env file setup 
In order to run app you are required to setup .env file with your local variables:
```bash
DATABASE_HOST
DATABASE_PORT
DATABASE_USER
DATABASE_PASSWORD
DATABASE_NAME
```

### Run migrations

```bash
$ npm run migration:run
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
