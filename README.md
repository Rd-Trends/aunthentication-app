<!-- Please update value in the {}  -->

<h1 align="center">Authentication App</h1>

<div align="center">
   Solution for a challenge from  <a href="http://devchallenges.io" target="_blank">Devchallenges.io</a>.
</div>

<div align="center">
  <h3>
    <a href="https://rd-auth-app.vercel.app">
      Demo
    </a>
    <span> | </span>
    <a href="https://{your-url-to-the-solution}">
      Solution
    </a>
    <span> | </span>
    <a href="https://devchallenges.io/challenges/N1fvBjQfhlkctmwj1tnw">
      Challenge
    </a>
  </h3>
</div>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [Table of Contents](#table-of-contents)
  - [Built With](#built-with)
- [Features](#features)
- [How To Use](#how-to-use)

<!-- OVERVIEW -->

### Built With

<!-- This section should list any major frameworks that you built your project using. Here are a few examples.-->

- [Nextjs](https://nextjs.org/)
- [Typescript](https://www.typescriptlang.org)
- [TailwindCSS](https://tailwindcss.com/)
- [SWR - for data fetching](https://swr.vercel.app)
- [passportjs for authentication](https://passportjs.org)
- [mongoDB](https://mongodb.com)
- [cloudinary for image upload](https://cloudinary.com)
  
## Features

<!-- List the features of your application or follow the template. Don't share the figma file here :) -->

This application/site was created as a submission to a [DevChallenges](https://devchallenges.io/challenges) challenge. The [challenge](https://devchallenges.io/challenges/N1fvBjQfhlkctmwj1tnw) was to build an application to complete the given user stories.

- User can register a new account
- User can log into an existing account
- User can loh in or register using one of the following

  - Google
  - Twitter
  - Facebook
  - Github

- User can sign out
- User can see their profile details
- User can edit their details including: name, bio, photo, phone, email and password.
- User can upload a new photo 

## How To Use

<!-- Example: -->

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/rd-trends/auth-social-app

# Install dependencies
$ npm install

# Run the app
$ npm start
```

also

create a .env.local file in your root directory and add the following environment variables

```env
GOOGLE_CLIENT_ID = "your google client/app id"
GOOGLE_CLIENT_SECRET = "your google client/app secret"
FACEBOOK_CLIENT_ID = "your facebook client id"
FACEBOOK_CLIENT_SECRET = "your facebook client secret"
TWITTER_API_KEY = "your twitter client id"
TWITTER_API_SECRET = "your twitter client secret"
GITHUB_CLIENT_ID = "your github client id"
GITHUB_CLIENT_SECRET = your github client secret"
MONGODB_URI = "your mongodb connection URI"
TOKEN_SECRET = "your session token secret
CLOUDINARY_URL= "your cloudinary uri"
```
