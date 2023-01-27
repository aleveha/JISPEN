## JISPEN – waste records

### What is it?

JISPEN is a tool that helps hospitals and medical institutions keep track of their waste management. It is designed to be simple to use and allows
users to easily register different types of waste. This information can then be used to ensure that the waste is handled and disposed of properly in
accordance with regulations and guidelines. JISPEN can also help hospitals and medical institutions with reporting and compliance, and can be used as
part of an overall waste management program.

### Technologies:

**Database**: PostgreSQL, Redis\
**Back-end**: TypeScript, Node.js, NestJS, TypeORM\
**Front-end**: Typescript, React, Next.js, Tailwind, MUI\
**DevOps**: Docker, Docker Compose, Docker Stack, GitLab CI/CD

### How to run:

#### Development:

1. Install Docker and Docker Compose
2. Run `docker-compose up -d --build` in the root directory
3. Open `localhost:8008` in your browser

#### Production:

1. Install Docker and Docker Compose
2. Run `docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build` in the root directory
3. Open `localhost:8008` in your browser

Note that the production version is optimized for production and does not include any of the development tools.\
Also note that the development version use hot reloading, which means that you can make changes to the code and see the changes immediately in your
browser.
