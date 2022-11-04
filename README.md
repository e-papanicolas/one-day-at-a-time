## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

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

`npx prisma migrate dev --name "<name>"` to run prisma schema migrations

`npx prisma generate` - run this command after every change to your Prisma models to update your generated Prisma Client.

`http://localhost:3000/graphql` to launch the Apollo Graphql Sandbox
