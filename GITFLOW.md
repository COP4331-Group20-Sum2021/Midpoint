# Git flow
This document will contain the git flow process for the Large Project for Group 20 of COP 4331C taken in Summer 2021 (this repository).

## Branching
To get started on working on a new feature, create a new branch off of `main`.
```
git checkout main
git checkout -b <branch-name>
```
All of your code for the feature you are working on will go in this branch. 

### Branch naming
Keep your branch names specific, but short. Branch names can be either camel case or seperated by a dash (-). Examples are `fontendFixes` or `user-api`.

### Pull requests
When you have completed the work on your branch, open a pull request from your branch to `main`. This pull request will then be reviewd. If changes are needed to prevent a bug, they will be mentioned. If not changes are needed, then `main` will be updated with your PR and deployed to Heroku.