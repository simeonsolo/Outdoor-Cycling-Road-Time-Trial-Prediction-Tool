# CYCOUT10

## Overview
This is a basic expressJS + VueJS + node.js application with some OAuth security measures in place, a better reference on the implementation of it can be found at https://auth0.com/blog/how-to-make-secure-http-requests-with-vue-and-express/

## File layout
`client` folder = for front-end configurations in Vue
`server` folder = for back-end configurations in Express
`experimental` folder = for unused, experimenting codes

## Basic setup
If this is your initial visit of the repository, please review the next section below, otherwise follow these instructions to compile the application: 
1.	Install node.js at https://nodejs.org/en/download/, or check its version using `node -v` in your terminal
2.  Check the `README.md` of the directories for further instructions

## For iDE and GitHub initial setup: 
1)	Install VSCode at https://code.visualstudio.com
2)	In your VSCode Terminal, check your user settings using `git config --list`, otherwise insert your email, username and password in VSCode Terminal at the bottom using: 
`git config --global user.email "[YOUR_EMAIL]"
git config --global user.name "[YOUR_ID]"
git config --global user.password ""[YOUR_PASSWORD]""`
3)	Clone your repo using `git clone https://github.cs.adelaide.edu.au/a1225127/CYCOUT10.git`  into your IDE (Works for both cs50 IDE and VSCode on my end)
documentation/GitHub-instructions

## For future branching and pull requests setup: 
1)	Every time you start, run `git pull` to update any changes from `main`. Make sure the bottom left section is at the `main` branch. 
2)	Create a new branch by i) clicking on the icon in the second bottom left “should be at ‘main’ by default” and click on +Create new branch from and select main OR ii) `git branch [NEW BRANCH NAME] `, the i) option is available in the video as I reckon it is much easier. 
3)	Try naming your branch in format like “[front-end/[YOUR_TICKET_NAME_FROM_BACKLOG]]” or “[dataset/[YOUR_TICKET_NAME_FROM_BACKLOG]]” for further clarity
4)	Make your changes
5)	Once done, add them all using `git add *`
6)	Run `git commit -m “[ANY_COMMENT]” `
7)	Run `git push --set-upstream origin [YOUR_BRANCH_NAME]`
8)	Sign into your GitHub Enterprise account. If you have done the initial setup 2), ignore this step. 
9)	Return to the main branch by i) clicking on the icon in the second bottom left again and change to `main` or ii) Run ` git checkout main`
10)	Return to the Pull request section in GitHub to create a new pull request
11)	If someone in the team approves the change, they can click on the “Merge to main” option, otherwise, you can self-approve that change if you think it’s alright

# For Vue and Node.js setup in `experimental` folder:
1)	Run `npm install` to install all dependencies needed from node.js
2)	Run `npm run dev` to start the Vue test app or `npm run lint` for linting
3)	Link to your web browser at your local hosting site

Let me know if I missed anything :) 

### Happy coding y'all…

![cat codes](https://c.tenor.com/y2JXkY1pXkwAAAAM/cat-computer.gif)