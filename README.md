# Food Trucks API

## Requirements

* [Node.js](https://nodejs.org) 9.x
* [Postgres](https://www.postgresql.org/) 9.x
* [Terraform](https://www.terraform.io/) 0.10.x (for provisioning)
* [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) (for provisioning)

## Quick Start

### Create a Postgres DB

```sh
createdb foodtrucks
```

Create a `.env` file in the root of the project and drop in the DB URL, swapping in your own username/password:

```sh
DATABASE_URL="postgres://yourusername:yourpassword@localhost/foodtrucks"
```

Build the tables in the database (if you've done this before, it _will_ overwrite them so be careful):

```sh
./scripts/syndb.js
```

### Install NPM dependencies and start the server

```sh
nvm use # Run this if using NVM for Node version management
npm i
npm run dev
curl -i http://localhost:3000/nearby?latitude=&longitude=
```

## Provisioning

[Terraform](https://www.terraform.io/) is used to provision a server and addons on [Heroku](https://www.heroku.com). `Makefile` has its own `plan` and `apply` commands, wrapping the Terraform commands of the same name for ensuring proper data-passing.

To create a Terraform, login with the Heroku CLI:

```sh
heroku login
```

Then run:

```sh
make plan ENV=staging TAG=1.2.3
```

Assuming the plan looks correct, apply it, provisioning server components:

```sh
make apply ENV=staging
```

## CircleCI

CircleCI is configured to automatically deploy everything merged to `master` to a staging environment, and to deploy every [Semver](https://semver.org/)-like tag (e.g. v1.5.2) to a production environment. In order to do that, those environments must be set up first using Terraform following the [Provisioning](#provisioning) instructions above, and the CircleCI project needs `HEROKU_EMAIL` and `HEROKU_AUTH_TOKEN` environment variables in order to successfully execute the deployment script at `scripts/deploy.sh`.

To set these, go into the CircleCI project settings for this project, go into "Environment Variables", set `HEROKU_EMAIL` to the email of the Heroku account, and `HEROKU_AUTH_TOKEN` can be grabbed by running this with the Heroku CLI: `heroku auth:token`.
