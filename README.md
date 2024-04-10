# JobsApply <img src="./client//public/ja.png" alt="JA" width="100" align="right">

A dynamic job application platform that seamlessly integrates Adzuna.com's extensive job listings, providing users with up-to-date and relevant job opportunities.

## Prerequisites
Before you being, ensure you have met the following requirements:
1. Node.js installed
2. npm or yarn package manager installed
3. An adzuna developer account with an application key. To create an Adzuna developer account, visit `https://developer.adzuna.com/signup` 

## Installation

1. Clone the project.
2. `cd jobsapply`

### Server

1. `cd server` and install the dependencies using `npm install`
2. Create a .env file and define two variables named 'API_KEY' and 'APP_ID' pointing to your Adzuna application key and application ID respectively.
3. Run the server using `npm run dev`

### Client

1. `cd client` and install the dependencies using `npm install`
2. Run the client app using `npm run dev`

## Usage
The category is set to Marketing by default. Thus, upon initial rendering, the front-end displays job postings for Marketing roles. All the postings displayed are based in the UK. The search bar can be used to filter jobs postings by title, location, and company name for the selected category.



