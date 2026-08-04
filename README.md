[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/yY-vj1fX)
# CD Collection API

This is the starting point for the **CD Collection API** assignment. The goal of this project is to build a RESTful API using **Express** and **MongoDB (via Mongoose)** to manage a collection of music CDs.

For full project details, requirements, and grading criteria, refer to the [assignment sheet](https://menglishca.github.io/keyin-course-notes/databases/qaps/qap-3/).

## Setup Instructions

1. **Accept the GitHub Assignment** (link provided in the assignment sheet).

1. **Name your new repository**

1. Once your repository is created, **clone your new repo** to your local machine:
    ```bash
    git clone <your-new-repo-url>
    ```

1. Navigate into the project directory and install the necessary dependencies:
    ```bash
    cd <your-new-repo-name>
    npm install
    ```

1. **Run the app:**
    ```bash
    npm start
    ```
    This will start the server at `http://localhost:3000/`.

1. You can now begin working on your project, making changes and committing regularly:
    ```bash
    git add .
    git commit -m "First commit"
    git push origin main
    ```


## Development Guidelines

1. **Refactoring In-Memory Storage**:
   - The app currently uses an in-memory array to store CDs.
   - You must replace this with a **Mongoose model** connected to MongoDB.
   - CRUD routes (`GET`, `POST`, `PUT`, `DELETE`) must be updated to use the database.
2. **Query Parameters**:
   - Add support for query params like `?artist=`, `?genre=`, `?before=`, and `?fields=`.
3. **Error Handling**:
   - Include basic error checks in each route (e.g., missing fields, invalid IDs).
4. **Schema Design**:
   - Your schema should support: `title`, `artist`, `genre`, and `release year`.

## Submission Guidelines
- Submit a link to your GitHub repository through the Teams assignment.
- Ensure the API runs correctly with `npm start`.
- Implement all required functionality described in the [assignment sheet](https://menglishca.github.io/keyin-course-notes/databases/qaps/qap-3/).
- It's recommended you do not remove the in-memory code until your MongoDB implementation is working.

## Notes
- You may use [MongoDB Atlas](https://www.mongodb.com/atlas/database) if you have trouble with local setup.
- The app does **not** use a frontend — test your routes using Thunder Client, Postman, or curl.
- No templating engine is required. This assignment is focused entirely on backend functionality.
