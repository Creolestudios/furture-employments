
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
