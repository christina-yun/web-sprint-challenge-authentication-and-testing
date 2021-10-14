# Authentication and Testing Sprint Challenge

**Read these instructions carefully. Understand exactly what is expected _before_ starting this Sprint Challenge.**

This challenge allows you to practice the concepts and techniques learned over the past sprint and apply them in a concrete project. This sprint explored **Authentication and Testing**. During this sprint, you studied **authentication, JSON web tokens, unit testing, and backend testing**. In your challenge this week, you will demonstrate your mastery of these skills by creating **a dad jokes app**.

This is an individual assessment. All work must be your own. All projects will be submitted to Codegrade for automated review. You will also be given feedback by code reviewers on Monday following the challenge submission. For more information on the review process [click here.](https://www.notion.so/lambdaschool/How-to-View-Feedback-in-CodeGrade-c5147cee220c4044a25de28bcb6bb54a)

You are not allowed to collaborate during the sprint challenge.

## Project Setup

- [ ] Run `npm install` to install your dependencies.
- [ ] Run tests locally executing `npm test`.

## Project Instructions

Dad jokes are all the rage these days! In this challenge, you will build a real wise-guy application.

Users must be able to call the `[POST] /api/auth/register` endpoint to create a new account, and the `[POST] /api/auth/login` endpoint to get a token.

We also need to make sure nobody without the token can call `[GET] /api/jokes` and gain access to our dad jokes.

We will hash the user's password using `bcryptjs`, and use JSON Web Tokens and the `jsonwebtoken` library.

### MVP

Your finished project must include all of the following requirements (further instructions are found inside each file):

- [ ] An authentication workflow with functionality for account creation and login, implemented inside `api/auth/auth-router.js`.
- [ ] Middleware used to restrict access to resources from non-authenticated requests, implemented inside `api/middleware/restricted.js`.
- [ ] A minimum of 2 tests per API endpoint, written inside `api/server.test.js`.

**IMPORTANT Notes:**

- Do not exceed 2^8 rounds of hashing with `bcryptjs`.
- If you use environment variables make sure to provide fallbacks in the code (e.g. `process.env.SECRET || "shh"`).
- You are welcome to create additional files but **do not move or rename existing files** or folders.
- Do not alter your `package.json` file except to install extra libraries. Do not update existing packages.
- The database already has the `users` table, but if you run into issues, the migration is available.
- In your solution, it is essential that you follow best practices and produce clean and professional results.
- Schedule time to review, refine, and assess your work and perform basic professional polishing.

## Submission format

- [ ] Submit via Codegrade by pushing commits to your `main` branch on Github.
- [ ] Check Codegrade before the deadline to compare its results against your local tests.
- [ ] Check Codegrade on the days following the Sprint Challenge for reviewer feedback.
- [ ] New commits will be evaluated by Codegrade if pushed _before_ the sprint challenge deadline.

## Interview Questions

Be prepared to demonstrate your understanding of this week's concepts by answering questions on the following topics.

1. Differences between using _sessions_ or _JSON Web Tokens_ for authentication.

A: JWT, unlike sessions are stored on the client stide, while sessions use the server memory to store user data. Sessions are not as scalable as JWT because if many users were to make requests all at once, it can strain the server. JWT are sent along with every request and contains all the user information in an encoded form, making it a bad candidate for putting in sensitive information. JWTs are stateless because the information is stored client-side and authentication can occur locally instead of per request, like with cookies. 

2. What does `bcryptjs` do to help us store passwords in a secure manner?

A: Bcryptjs hashes the passwords many times and sends that hashed version of a password as the saved piece of information. Since hashing only goes one way, it cannot be decoded, but it is unique and tied to the instance of the information being created. It is also considered very slow compared to other ciphering methods and the extra computation needed slows down brute force and dictionary attacks.

3. How are unit tests different from integration and end-to-end testing?

A: Unit tests are designed to test extremely small chunks of code to make sure they work. Unit tests are good for testing isolated code that doesn't require callbacks and making sure that small chunk is working as expected. Integration testing is to test to make sure different parts are working as expected in concert with each other, and end-to-end testing is testing an app from start to finish to make sure the entire user experience is captured.

4. How does _Test Driven Development_ change the way we write applications and tests?

A: In TDD, the idea is to understand and have outcomes for what code should do in mind before even writing it. You write the test to make sure that it computes as expected, and write the code to follow that rather than writing everything out and then testing that already-written code is passing tests created just for the purpose of testing it.