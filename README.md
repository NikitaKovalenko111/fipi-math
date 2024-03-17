# FIPI MATH

It is my **hand-written** fullstack project. I was making it for 5 months 2-3 days in a week. This project is a **platform for preparing for the russian math exam**.

The project runs on the [link](https://devapplication.ru). But usually it doesn't work because I turn off the server!

## Functionality

This project has exam tasks from [**FIPI**](https://ege.fipi.ru/bank/index.php?proj=AC437B34557F88EA4115D2F374B0A07B) (original source of exam tasks).
This project lets students solve tasks, generate variants of exam with these tasks. If user is authorized, he can save solved variant in his profile.
The tasks are filtered by difficulty, task number that lets students prepare for the exam more efficiently. Students can also mark the tasks as "solved".

Users that have "admin" role can add new tasks. To add a task you need to fill difficulty, task number, answer (not necessary) fields and add a screenshot of the task (screenshot must have 1103 width).

## Techonologies

The project is made with **React** (frontend) and **Nest** (backend) using **Typescript**. **MongoDB** is used as a database (I'm planning to replace it with PostgreSQL).

### Other techologies:

#### Frontend

-   Redux
-   Redux-saga
-   Axios
-   Reselect
-   Katex
-   React-router-dom

#### Backend

-   Mongoose
-   Bcrypt
-   Jsonwebtoken

And other less important libraries...

_Tests haven't been written yet. But it'll be!_

## Yarn main commands

`yarn build` - to build client and server

`yarn build:server` - to build server

`yarn build:client` - to build client

`yarn start:dev` - to start client and server in developing mode

`yarn start:prod` - to start client and server in production mode

Other commands you can see in package.json file

## Deploy

To deploy this project you need your VPS (VDS) server with all the necessary utilities (git, nvm, yarn, nginx). First, you need to clone this repository to your server. Secondly, you need to configure your nginx file. Thirdly, you need to set environment on your server or create .env files in server and client folders. Environment must contain:

**Server**

-   CONNECTION_URL=\<your mongodb connection link\>
-   JWT_ACCESS_KEY=\<coined key for access tokens generation\>
-   JWT_REFRESH_KEY=\<coined key for refresh tokens generation\>
-   JWT_VARIANT_KEY=\<coined key for variant tokens generation\>
-   FRONTEND_URL=\<your client url (without last \\)\>
-   PORT=\<your server port\>

**Client**

-   REACT_APP_API_PATH=\<your server url (without last \\)\>

After setting environment, you need to build the project. You can do it with `yarn build` command. Then, you need to run server. You can do it with pm2 (or other utilities), you need to run dist/main.js file. To run client you need to move your build folder to the folder that you set in nginx config (it may be var/www/ folder). That's all!
