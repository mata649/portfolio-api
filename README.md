# portfolio-api

The Portfolio API is a backend component of a portfolio website that was developed using Typescript, Express.js, MongoDB, and Clean Architecture principles. The API uses JSON Web Tokens (JWT) for handling sessions securely, ensuring that user data is protected.  The Clean Architecture principles make sure that the codebase is modular, maintainable, and testable, allowing for easy additions, bug fixes, and changes without breaking existing functionality. 

## Generics
Generics are a way to write code that can work with different types of data. They allow you to write code that is more flexible, reusable, and easier to maintain. Instead of writing separate code for each specific data type, you can use generics to write code that can work with any data type.

I learned about generics when I was creating this project so I tried to use it to abstract a big part of the code. This helped me to write a reusable code and easy to extend, a good example of this in the implementation of [SkillMongoRepository](https://github.com/mata649/portfolio-api/blob/master/src/skill/data/mongo/skill.repository.ts) which extends of BaseMongoRepository inheriting all the base functions for a mongo repository (create, getById, get, update, delete) but extending a new function which is getSkillsByCategory. 

Another example is the implementation of [CategoryUseCase](https://github.com/mata649/portfolio-api/blob/master/src/category/domain/category.useCases.ts), I only have to extends the BaseUseCase to have a functional CategoryUseCase, avoiding to write repetitive code. This approach was gotten for most of the important code of the Back-End like controllers, repositories, useCases, requests, etc. You can find all the base code in the [base](https://github.com/mata649/portfolio-api/tree/master/src/base) directory to see all the abstractions to the code.  

The rest of the code mostly implements these base abstractions, so it was really easy to write new modules to the API based on these abstractions. I just needed to do sometimes some extension of the code depending on the needs of each module
## Requirements

-   **Node.js:**  Node.js® is an open-source, cross-platform JavaScript runtime environment. You can read more about docker-compose  [here](https://nodejs.org/en/)

## Installing Project Dependencies

To install the dependencies for this project you just need to be located in the root folder of the project and run the following command.

```
npm run install

```
## Tests
The tests were implemented using Jest, and you can run them by executing the following command

    npm run test

## Running Project

To run this project you just need to be located in the root folder of the project and run the following command.

```
npm run dev
```

## Docker
Docker was utilized to facilitate the deployment of the project on any cloud service that accepts Docker images. Docker simplifies the deployment process by enabling the definition of a set of configuration steps for the project.

To run the project locally using Docker and Docker-compose, execute the following command:

    docker compose up -d

