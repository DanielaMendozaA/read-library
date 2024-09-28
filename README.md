<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Read and Learn Library



## Table of Contents
- [Documentation](#documentation)
- [Description](#description)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Available Scripts](#available-scripts)
- [Running the Application](#running-the-application)
  - [Development Mode](#development-mode)
  - [Production Mode](#production-mode)
- [Dependencies](#dependencies)
- [Development Dependencies](#development-dependencies)
- [Testing](#testing)
- [Linting and Formatting](#linting-and-formatting)

## Documentation

- Jira
- - https://danniddma96-1725314014534.atlassian.net/jira/software/projects/RLL/boards/2/backlog?selectedIssue=RLL-7

- Swagger
- https://read-library-production.up.railway.app/api/v1/docs#/Books/BooksController_update

- Conceptual Relational Model
- -  https://app.eraser.io/workspace/oepqQ9SHwWwslrhth6Kc?origin=share

- Architecture Diagram
- - https://app.eraser.io/workspace/U3X5H3gk21zGhO6rRtcb?origin=share

- Github
- - https://github.com/DanielaMendozaA/read-library.git
- Enpoints
  
- Create a Book
- - - Method: POST
- - - URL: https://read-library-production.up.railway.app/api/books

- - Get All Books
- - - Method: GET
- - - URL: https://read-library-production.up.railway.app/api/books

- - Get a Book by ID
- - - Method: GET
- - - URL: https://read-library-production.up.railway.app/api/books/{id}
- - - Example URL with ID: https://read-library-production.up.railway.app/api/books/66f83df2a71a1180fda8b8b9

- - Update a Book by ID
- - - Method: PATCH
- - - URL: https://read-library-production.up.railway.app/api/books/{id}
- - - Example URL with ID: https://read-library-production.up.railway.app/api/books/66f83df2a71a1180fda8b8b9

- - Delete a Book by ID
- - - Method: DELETE
- - - URL: https://read-library-production.up.railway.app/api/books/{id}
- - - Example URL with ID: https://read-library-production.up.railway.app/api/books/66f83df2a71a1180fda8b8b9

## Description
The Read-and-Learn Library API is built with NestJS and allows users to manage book collections. The API provides CRUD operations to create, read, update, and delete books, along with robust validation, error handling, and security features like API key authentication.

## Features
- Book management (CRUD)
- API key authentication (x-api-key)
- Pagination for retrieving books
- Swagger-based API documentation
- Mongoose and MongoDB integration for book storage
- Unit and integration testing with Jest
- Eslint and Prettier for code linting and formatting

## Prerequisites
Before starting, ensure you have the following installed:

- Node.js (version 16 or higher)
- npm or Yarn
- MongoDB (for database)

## Installation

1. **Clone the repository**:

    ```bash
     git clone https://github.com/DanielaMendozaA/read-library.git
    cd read-library
    ```

2. **Install the dependencies**:

    Using npm:
    ```bash
    npm install


## Configuration .env file 
MONGO_URI=mongodb://mongo:uDyVCfmuIllhqqupiSpaGWwmPIReBzaE@junction.proxy.rlwy.net:14230
EXECUTE_SEEDS=true
PORT=3000
API_KEY=xxx-library-api-4568xxx

## Available Scripts
The project includes several scripts to facilitate development and deployment:


| Command              | Description                                                     |
|----------------------|-----------------------------------------------------------------|
| `npm run start:dev`   | Starts the application in development.      |
| `npm run build`       | Compiles the project using Nest CLI.                            |
| `npm run format`      | Formats the source code with Prettier.                          |
| `npm run start`       | Starts the application in production mode.                      |
| `npm run lint`        | Lints the source code with ESLint and applies automatic fixes.  |
| `npm run test`        | Runs unit tests with Jest.                                      |
| `npm run test:cov`    | Runs tests and generates a coverage report.                     |
| `npm run test:e2e`    | Runs end-to-end/integration tests.                              |

## Running the Application

### Development Mode

To start the application in development mode, which automatically reloads on code changes:

```bash
npm run start:dev`

```

### Production Mode

## 1- Compile the project:

```bash
npm run build
```

## 2- Start the compiled application:
```bash
npm run start:prod
```

## Dependencies

| Package                 | Description                                                             |
|-------------------------|-------------------------------------------------------------------------|
| `@nestjs/common`        | Common NestJS components like decorators, pipes, and exceptions.        |
| `@nestjs/config`        | Environment variables and configuration management.                     |
| `@nestjs/core`          | Core of NestJS providing the main framework functionality.              |
| `@nestjs/mongoose`      | Integration of Mongoose with NestJS for MongoDB management.             |
| `@nestjs/swagger`       | Generates API documentation using Swagger.                              | 
| `axios`                 | Promise-based HTTP client for the browser and Node.js.                  |
| `class-transformer`     | Transforms plain objects into class instances.                          |
| `class-validator`       | Data validation based on decorators for classes.                        |
| `mongoose`              | MongoDB ODM (Object Data Modeling) library.                             |
| `reflect-metadata`      | Metadata support in TypeScript, necessary for decorators.               |
| `rxjs`                  | Library for reactive programming.                                       |

| Package                               | Description                                               |
|---------------------------------------|-----------------------------------------------------------|
| `@nestjs/cli`                         | Command-line tool for NestJS.                             |
| `@nestjs/testing`                     | Testing utilities for NestJS.                             |
| `@types/jest`                         | TypeScript types for Jest.                                |
| `@typescript-eslint/eslint-plugin`    | ESLint plugin for TypeScript.                             |
| `@typescript-eslint/parser`           | ESLint parser for TypeScript.                             |
| `jest`                                | Testing framework for JavaScript.                         |
| `prettier`                            | Code formatter.                                           |
| `ts-jest`                             | Jest preprocessor for TypeScript.                         |
| `ts-loader`                           | TypeScript loader for Webpack.                            |
| `ts-node`                             | Runs TypeScript files directly in Node.js.                |
| `typescript`                          | Superset of JavaScript that adds static types.            |


## Testing

To run the tests:
```bash
npm run test
```

To run the tests in watch mode:
```bash
npm run test:watch
```
To run the tests and generate a coverage report:
```bash
npm run test:cov
```
To run the end-to-end tests:
```bash
npm run test:e2e
```


## Linting and Formatting

To lint the code and apply automatic fixes:
```bash
npm run lint
```
To format the code:
```bash
npm run format
```