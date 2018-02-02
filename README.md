# Food Trucks API

## Requirements

* [Node.js](https://nodejs.org) 9.x
* [Postgres](https://www.postgresql.org/) 9.x
* [Terraform](https://www.terraform.io/) 0.10.x (for provisioning)
* [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) (for provisioning)

## Quick Start

```sh
nvm use # Run this if using NVM for Node version management
npm i
npm run dev
curl -i http://localhost:3000/nearby?latitude=&longitude
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
