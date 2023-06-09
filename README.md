# CYCOUT10

## Overview
This is a `MySQL` + `Express.js` + `Vue.js` + `Node.js` web-application for AusCycling, completed & submitted.

## File layout
- **client** folder = for front-end configurations in `Vue`
- **database** folder = for `sakila` database configurations in `MySQL`
- **dist** folder [NOT PRESENT IN REPO to avoid unnecessary file changes in production, but will be generated in every `npm run build`] = for deployed static pages built on `client`
- **documentation** folder = for all documentation in front-end, database, back-end, GitHub and testing setup instructions
- **routes** folder = for routing configurations in back-end based on `Express`
- **test** folder = for code testing in `npx express-generator` version 
- **views** folder = for engine setup in `Pug`

## Setup
1. Run `npm install` and `npm client-install` after `git pull` or when new dependencies/APIs are added to avoid unexpected behaviours in `client` and `routes`
2. Run `npm run build` to set up web pages 
3. Run `npm run dev` to review the application
4. Open in web browser using `http://localhost:8000/` to test the application
5. For Front end team, navigate to `http://localhost:8080/` for faster reload in `client` directory

Feel free to add if you think there's something missing 🙂

### Happy coding y'all…

![cat codes](https://c.tenor.com/y2JXkY1pXkwAAAAM/cat-computer.gif)
