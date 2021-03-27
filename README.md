# Simple cross-domain SSO example with NodeJS

This is demo of cross-domain SSO web application with NodeJS. To run this example you need NodeJS version 14 or higher or Docker installed on your computer.

## Description

The example consists of 3 applications:

1. Accounts application - this is the app that stores and manages users and user sessions and also responsible for handling cross-domain session. This app runs on `http://localhost:8080`.
2. HR application - this is just a dummy application that is connected to accounts application and represents an HR app of a company. This app runs on `http://localhost:3000`.
3. Tasks application - this is also a dummy application that represents a task manager of a company and is connected to accounts application. This app runs on `http://localhost:4000`.

The reason that these apps are running on different ports is that this example is to demonstrate sharing SSO session through multiple origins (domains).

## How to run

To run the example either open three terminal instances and go into the folders (`accounts`, `hr` and `tasks`) and run `node server.js` one by one, or run `docker-compose up` command in root folder. After running the example go to your browsers and open either of applications mentioned above.

If you open either `http://localhost:3000` or `http://localhost:4000`, you will be redirected to accounts application `http://localhost:8080`.
Then after you log in to the system, you will be redirected to the app that you are coming from. To log in to the system use `admin` as username and `admin` as a password.
