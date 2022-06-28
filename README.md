# DEEL BACKEND TASK

## Data Models

> **All models are defined in src/model.js**

### Profile
A profile can be either a `client` or a `contractor`. 
clients create contracts with contractors. contractor does jobs for clients and get paid.
Each profile has a balance property.

### Contract
A contract between and client and a contractor.
Contracts have 3 statuses, `new`, `in_progress`, `terminated`. contracts are considered active only when in status `in_progress`
Contracts group jobs within them.

### Job
contractor get paid for jobs by clients under a certain contract.

## Getting Set Up

  
The exercise requires [Node.js](https://nodejs.org/en/) to be installed. We recommend using the LTS version.

  

1. Start by cloning this repository.

  

1. In the repo root directory, run `npm install` to gather all dependencies.

  

1. Next, `npm run seed` will seed the local SQLite database. **Warning: This will drop the database if it exists**. The database lives in a local file `database.sqlite3`.

  

1. Then run `npm start` which should start both the server and the React client.

## Improvements in the version 1.0.0

1. Moved to layered structure to have proper seperation by concerns
(interface -> controller, business -> service, data -> repositories)
2. Added basics for linting & code formatting to keep code base in the proper way
3. Implemented param validation for routes to prevent issues with incorrect parameters
4. Seperated business logic from express framework specifics.

## Possible improvements (TODO list)
1. Create Swagger OpenApi documentation
2. Implement integration tests to check endpoinds e2e
3. Implement unit tests for services
4. Create database migrations instead of sync on sequelize models.