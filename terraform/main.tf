/**
 * Terraform server component configuration
 */

/**
 * Variables
 */

variable "environment" {
  type = "string"
  description = "The name of the environment, e.g. 'staging' or 'production'"
}

variable "heroku_email" {
  type = "string"
  description = "Email address for provisioning Heroku account"
}

variable "heroku_auth_token" {
  type = "string"
  description = "Auth token for provisioning Heroku account, can be pulled from the Heroku CLI with: heroku auth:token"
}

/**
 * Provider config
 */

provider "heroku" {
  email   = "${var.heroku_email}"
  api_key = "${var.heroku_auth_token}"
}

/**
 * Resources
 */

# Server

resource "heroku_app" "server" {
  # The naming here is conventional, and must match up with the names used in
  # scripts/deploy.sh
  name = "${var.environment}-food-trucks-api"
  region = "us"
}

# Postgres addon

resource "heroku_addon" "database" {
  app  = "${heroku_app.server.name}"
  plan = "heroku-postgresql:hobby-dev"
}

# Papertrail addon (for logging)

resource "heroku_addon" "logging" {
  app = "${heroku_app.server.name}"
  plan = "papertrail:choklad"
}

/**
 * Outputs
 */

output "heroku_app_name" { value = "${heroku_app.server.name}" }
output "heroku_app_web_url" { value = "${heroku_app.server.web_url}" }
output "heroku_app_hostname" { value = "${heroku_app.server.hostname}" }
output "heroku_app_git_url" { value = "${heroku_app.server.git_url}" }
