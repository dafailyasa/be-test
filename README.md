
## Description

This Project Use Node.js and express. and for CI using github actions.

```bash
for route will be: localhost:3000/api

Task Endpoint : 
 - GET localhost:3000/api/task/search
    Query: 
      > search(search by title)
      > sortBy("desc","asc") on createdAt
      > limit
      > page

- POST localhost:3000/api/task
   body: 
      > title(required)
      > description(optional)
      > status(optional with defaut status = false)

- GET localhost:3000/api/:id
   params: 
      > :id(id of task)

- PATCH localhost:3000/api/:id
   params: 
      > :id(id of task)
   body: 
      > title(required)
      > description(optional)
      > status(optional with default status = false)
```

# env

```bash
# node env = production,development,test
NODE_ENV=development
PORT=3000
MONGODB_URL=mongodb://localhost:27017/be-test
```

## Installation

```bash
$ npm install or yarn install
```

## Running the app

```bash
# development mode
$ npm run dev or yarn run dev

# production mode
$ npm run start:prod or yarn run start:dev
```

## Test

```bash
# test coverage
$ npm run coverage or yarn run coverage

# test coveralls
$ npm run coverage:coveralls or yarn run coverage:coveralls
```

## Lint
```bash
# lint check
$ npm run lint or yarn run lint

# lint fix
$ npm run lint:fix or yarn run lint:fix
```

## Prettier
```bash
# Prettier check
$ npm run lint or yarn run lint

# Prettier fix
$ npm run prettier:fix or yarn run prettier:fix
```

