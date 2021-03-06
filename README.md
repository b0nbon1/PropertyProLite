# PropertyProLite

[![Coverage Status](https://coveralls.io/repos/github/b0nbon1/PropertyProLite/badge.svg?branch=develop)](https://coveralls.io/github/b0nbon1/PropertyProLite?branch=develop) [![Build Status](https://travis-ci.org/b0nbon1/PropertyProLite.svg?branch=develop)](https://travis-ci.org/b0nbon1/PropertyProLite) [![Maintainability](https://api.codeclimate.com/v1/badges/1896eca128dd31e29d16/maintainability)](https://codeclimate.com/github/b0nbon1/PropertyProLite/maintainability)

Property Pro Lite is a platform where people can create and/or search properties for sale or rent.

## Table Contents

 1. [Getting Started](#Getting-Started)
 2. [Prerequisites](#Prerequisites)
 3. [Installing the Api](#Installing-api)
 4. [Running Tests](#Running-the-tests)
 5. [API Endpoints](#Api-Endpoints)
 6. [Pivotal Tracker Board](#PIVOTAL-TRACKER-BOARD)
 7. [Contributions](#Contributions)

## Getting Started

By running the following command Property-Pro-Lite-Api will be automatically downloaded to your local machine so lets get started.

```sh
git clone https://github.com/b0nbon1/PropertyProLite
```

## Prerequisites

before you install the software make sure you have the following already installed on your machine

- nodejs get it [here](https://nodejs.org)

## Installing api

A step by step series of examples that tell you how to get a development env running

1. run

```sh
npm install
```

To install all the necessary dependencies packages on your local computer

1. set up environment variables by creating a dotenv file
   - add **PORT** with value of port number
   - add **JWT_KEY** with value of any secret word

2. set up the database postgres and store you database URL in dotenv file as follows:
   - development Url as `DBURL= {url}`
   - production Url as `DB_URL={url}`
   - testing Url as `DBURL_TEST={url}`

3. To start your sever

```sh
npm start
```

## Running the tests

TO run the test for the api

```sh
npm test
```

## Api Endpoints

These are the endpoints for this api :

| Endpoint        | Endpoint                 | Functionality|
| ------------- | --------------------------|------------|
| POST /signup          | `/api/v2/auth/signup`   | User create an account |
| POST  /login       | `/api/v2/auth/login`   | User login to their account |
| POST   /property     | `/api/v2/property`    | Agent post property advert |
| PATCH    /property/<:property-id>     | `/api/v2/property/<:property_id>`| Agent update their property advert |
| PATCH    /property/<:property-id>/sold      | `/api/v2/property/<:property_id>/sold`       |Agent mark their advert as sold |
| DELETE  /property/<:property-id>     | `/api/v2/property/<:property_id>` | Agent delete their advert |
| GET /property |  `/api/v2/property` |get all property adverts|
| GET /properties?type=propertyType | `/api/v2/properties?type=propertyType` | get all property adverts of specific type |
| GET /property/<:property-id>         | `/api/v2/property/<:property_id>` | get a specific advert |
| POST  /property/<:property-id>/report        | `/api/v2/property/<:property_id>/report`      | User report property as Fraud |

## PIVOTAL TRACKER BOARD

Click here to view: [PIVOTAL TRACKER STORIES](https://www.pivotaltracker.com/n/projects/2353886)

## Contributions

[Bonvic Bundi](https://www.bonbo.io.ke)

[![Ask Me Anything !](https://img.shields.io/badge/Ask%20me-anything-1abc9c.svg)](https://twitter.com/Bonvic7)
