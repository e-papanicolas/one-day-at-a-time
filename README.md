## Description

A photo-a-day journal.

## Technologies

- Typescript
- Nest.js: back end framework
- Apollo GraphQL: GraphQL server
- PostgreSQL: relational database
- Prisma: ORM
- Docker: container for database
- Jest: testing
- Redis: cache
- React: front end framework

## Installation

```bash
$ npm install
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

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Notes

### Database

To run prisma schema migrations: `npx prisma migrate dev --name "<name>"`

Run after every change to Prisma models to update generated Prisma Client: `npx prisma generate`

To clear the development DB and seed: `npx prisma migrate reset`

To seed for the first time: `npx prisma db seed`
