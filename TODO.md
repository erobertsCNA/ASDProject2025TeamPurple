# TODO List
This is more so a construction zone for our contributors. This can be a common place to,
- plan future tasks, 
- share ideas, 
- avoid conflicting merges.

## Evan's Tasks
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

-[ ] Front to back
  - [ ] Make sure you included in installation instructions that mongodb (or another nosql solution) 
  - is installed and managed. 
  - [ ]Run react
  - [ ]Check front and back connections
  - [ ]Test with postmans
 
-[ ] ARCHITECTURE NOTES
  - [ ] Eventual deployment, future AWS and Atlas Cloud hosting services for automation, scalability, and deployment
  - [ ] Look up gov grant for civic infrastructure you could pitch with idea.
  - [ ] Now known examples of gov hosting services (esoltuions and govstack)
## Ral’s Tasks
- [ ] Sample1
- [ ] Sample2
- [ ] Sample3

## Marcus’s Tasks
- [ ] Sample1
- [ ] Sample2
- [ ] Sample3

## Nick’s Tasks
- [ ] Sample1
- [ ] Sample2
- [ ] Sample3

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

