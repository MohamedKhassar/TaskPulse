
# TaskPulse

TaskPulse is a modern task management application designed to help users organize their tasks efficiently. Built with Next.js, TypeScript, Tailwind CSS, and MongoDB, TaskPulse offers a seamless user experience with a focus on simplicity and productivity.

## Environment Variables

Before running the app, make sure to set up the following environment variables:

- `DB` : The connection URI for MongoDB.
- `NEXTAUTH_SECRET` : Secret key for NextAuth.js authentication.
- `NEXTAUTH_URL` : Base URL for NextAuth.js authentication.
- `BASE_URL` : Base URL for the application.

You can set these in a `.env` file in the root directory **(example)**:


* `DB` = mongodb://localhost:27017/taskpulse 
* `NEXTAUTH_SECRET` = my-nextauth-secret
* `NEXTAUTH_URL` = http://localhost:3000
* `BASE_URL` = http://localhost:3000

Replace the values with appropriate configurations for your application.

# Usage

* Installation:

    To install dependencies run :

    `npm i` **or** `yarn`

* Run The App With :
    
    `npm run dev` **or** `yarn dev`
    
    Then Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

* Testing

    To run tests:
    `npm run test` **or** `yarn test`




## Features

- [✔] Authentication (Sign up, Sign in, Sign out)
- [✔] Task creation, editing, deletion
- [✔] User-specific tasks
- [✔] Dashboard for task overview
- [✔] Responsive design

