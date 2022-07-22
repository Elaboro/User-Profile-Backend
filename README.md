# User Profile Backend

## Description
Backend demonstrates registration and authorization of users, as well as editing profile with uploading and deleting photos.
Implemented pagination for list of users.

## Main technology stack
**Node.js**, **TypeScript**, **Express**, **TypeORM**, **MySQL**, **Swagger**

## Launch application
- create and configure `.env` by analogy with `.env.sample`
- `npm i`
- `npm run migration:run`
- `npm run start`

## API documentation
http://localhost:3000/api/docs/


## Migrations
> **Example:** `npm run migration:create src/migration/NameMigration`

#### Create migration:
`npm run migration:create src/migration/<name>`

#### Generate migration:
`npm run migration:generate src/migration/<name>`

#### Perform all migrations:
`npm run migration:run`

#### Go back one migration ago:
`npm run migration:revert`
