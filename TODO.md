# TODO List
This is more so a construction zone for our contributors. This can be a common place to,
- plan future tasks, 
- share ideas, 
- avoid conflicting merges.

## Team Ral and Marcus (Things to do)
- Following from previous conversation, here is the "things needing to be completed" short list, hopefully by April 11th, deliverable.
- [ ] Ral and Marcus: organize and fix controllers under src/backend/controllers . The controllers folder currently holds code files submitted by both of you.
There are some duplicates and redundant code. Remove duplicates and combine and upgrade code where necessary. Since the front and backend are set up, you can
easily test the code as well, to ensure functionality.
- [ ] Ral: You had some submissions for the April 4th deliverable, but your branch was cloned off main instead of 
this week's dev branch, "April4thUpdate". Normally not a big deal but main is out of date and the project architecture has
changed so significantly that I can't merge your changes in easily. For this week, just physically move the files into the correct
folder and in the git update, just comment what happened.

## Evan's Area
- Last Updated: March 25th, 2025


- [x] Complete `README.md`
  - [ ] Update Usage screenshots and images (waiting on development)
  - [x] Add installation script for Mac/Linux
  - [ ] Test setup.sh 
  - [x] Confirm and write installation instructions
  - [x] Replace Roadmap with Use Cases
  - [ ] Fill in Use Cases
    - [ ] Use Case 1
    - [ ] Use Case 2
    - [ ] Use Case 3
  - [x] Create LICENSE
- [x] Research next steps to bring functionality up to date with Paul's code.
- [x] Implement code update to class standard (once March 28th deliverable is merged successfully)
  - [x] Correct directory architecture
- [x] Individualize (reference architecture documents)

- [x] Implement bcrypt
  - [x] Create files in appropriate architecture
  - [x] Implement bcrypt hashing and password validation
  - [x] Test with postman (/register and /login)
- [x] Front to back ports
  - Using cors, frontend (react 3000) and backend (express 5000)
  - setup.bat now denies port 3000 as an input
  - setup.sh should do the same but is waiting for testing
  - [x] Bug fix: if user decides not to run backend before installing frontend, frontend won't accidently end up on 5000

-[ ] Front to back
  - [ ] Make sure you included in installation instructions that mongodb (or another nosql solution) 
  - is installed and managed which includes connection string and database name. 
    - Make sure to differentiate between local database and cloud (gets the proper url)
  - [x] Run react
  - [x] Check front and back connections
    - below backend requests are confirmed functional: /register , /login
    - below pages are confirmed functional: /register (i.e. RegisterPage.js), /login (i.e. RegisterPage.js)

- [x] Set up front end dependencies in setup-client.bat
  - Might be best keeping backend set up not with front end.
- [ ] Consider making interactive script using console to handle both.
  - Until then, in the backend, setup.bat, frontend, npm install
  - Consider having consoles automatically launch to the correct directory (if possible). 
    - Example, Console1: ../backend and Console2: ../client
 
-[ ] ARCHITECTURE NOTES
  - [ ] Eventual deployment, future AWS and Atlas Cloud hosting services for automation, scalability, and deployment
  - [ ] Look up gov grant for civic infrastructure you could pitch with idea.
  - [x] Known examples of gov hosting services (esoltuions and govstack)
  
## Ral’s Area
- [ ] Sample1
- [ ] Sample2
- [ ] Sample3

## Marcus’s Area
- [ ] Sample1
- [ ] Sample2
- [ ] Sample3

## Nick’s Area
- [ ] Sample1
- [ ] Sample2
- [ ] Sample3

--- April 4th deliverable post submission update [PLEASE READ] ---

I'm making this a recurring log for my own reference and possibly to format into a document later. I'll also include notes
for us below, like how this week I was asked to report the following for reference:

- Following from previous conversation, here is the "things needing to be completed" short list, hopefully by April 11th, deliverable.
- [ ] Ral and Marcus: organize and fix controllers under src/backend/controllers . The controllers folder currently holds code files submitted by both of you.
  There are some duplicates and redundant code. Remove duplicates and combine and upgrade code where necessary. Since the front and backend are set up, you can
  easily test the code as well, to ensure functionality.
- [ ] Ral: You had some submissions for the April 4th deliverable, but your branch was cloned off main instead of
  this week's dev branch, "April4thUpdate". Normally not a big deal but main is out of date and the project architecture has
  changed so significantly that I can't merge your changes in easily. For this week, just physically move the files into the correct
  folder and in the git update, just comment what happened.

--- March 28th deliverable post submission update [PLEASE READ] --- 

For Marcus and Ral (who worked closely on the same stuff this week)

This week's merge had a lot of overlap in work, specifically controllers. I've corrected some obvious errors but I don't
have time to through all of the code. So for this week, go through the controllers (don't change my authController.js) 
which contain both Marcus's and Ral's files. Merge them better and remove repeated methods.

Also Marcus, fix volunteer.controller.js and its volunteer.js counterpart, they're both spelt wrong. I placed volunteer.js,
 users.js, and resource.js in models as they are all mongoose models, not controllers. Update their name as well to match
naming convention.

For Nick,

I have your react in here. I don't have time to even test it, but this week we can get react connected to backend.

