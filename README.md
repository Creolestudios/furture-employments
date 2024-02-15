
# # future-employments
 


The project centers around two key entities: candidates and clients. Its primary objective is to match candidates with their dream job requirements while simultaneously filling client job openings. The administrative team meticulously reviews each job opening, ensuring the selection of the most suitable candidates for every position.

[Take tour of future-employments Application]

  

<!-- toc -->

  

- [Features](#features)

  

- [Usage](#usage)

  

- [Env Variables](#env-variables)

  

- [Install Dependencies (frontend & backend)](#install-dependencies-frontend--backend)

  

- [Run](#run)

  

- [Build & Deploy](#build--deploy)

  


  

<!-- tocstop -->

  

## Features

  

- Sign up as Candidate

- Sign up  as Employer
- Create vacancy which candidate can apply
- Vacancy  Search Feature
- Client and Candidate Profile Viewing
- Approving Vacancy and Application
- Candidate CV modification for client 

  

## Installation Guide

  

  

### Requirements

  

- [Nodejs](https://nodejs.org/en/download)

  

- [Postgres](https://www.pgadmin.org/download/)

  

## Usage

  

```shell

git clone https://github.com/Creolestudios/furture-employments.git

cd furture-employments

```

  

### Env Variables

  
 For backend 
Rename the `.env.example` file to `.env`  in backend folder and change values with  your credentials.

  

```
DB_HOST=localhost
DB_USER_NAME=your-postgres-db-username
DB_PASSWORD=your-postgres-db-password
DB_NAME=future-employments
NODE_ENV  =development
SEND_GRID_HOST=smtp.sendgrid.net
SEND_GRID_PORT=465
SEND_GRID_USER=apikey
SEND_GRID_API_KEY=your-sendgrid-api-key
FRONTEND_HOST=localhost:3000
RESET_PASSWORD_EXPIRY=10
LINKEDIN_CLIENT_ID=your-linkedin-client-id
LINKEDIN_CLIENT_SECRET=your-linked-client-secret-key
LINKEDIN_REDICERT_URL=http://localhost:3000/auth/linkedin/callback
JWT_SECRET=prospectsemployments
SERVER_URL=http://localhost:5000

```
For frontend
Rename the `.env.example` file to `.env`  in frontend folder and change values with  your credentials.

```
REACT_APP_BASE_URI=http://localhost:5000/graphql
REACT_APP_CMS_URL=your-cms-url
```

  

### Install Dependencies (frontend & backend)

  

```
cd frontend 

yarn 

```

```
cd backend

yarn 

```

  

### Run

  

```

# Run frontend (:3000)  

yarn start

  

# Run backend (:5000)

  
yarn start
 

```
### Admin Access

To logged in as admin create user using graphql playground with role=3
  http://localhost:5000/graphql

## Build & Deploy

  

```

  
# Create frontend prod build
  

cd frontend

yarn build
 

```
