# If not explicitly set, grab the Heroku email and API token, assuming you are
# authenticated with the Heroku CLI
HEROKU_AUTH_TOKEN?=$(shell heroku auth:token)
HEROKU_EMAIL?=$(shell heroku whoami)

deploy:
	# Requires `ENV` and `TAG` variables
	# Example: `make deploy ENV="staging" TAG="2.0.5"`
	@test "${ENV}" || (echo '$$ENV variable required' && exit 1)
	@test "${TAG}" || (echo '$$TAG variable required' && exit 1)
	HEROKU_EMAIL="${HEROKU_EMAIL}" HEROKU_AUTH_TOKEN="${HEROKU_AUTH_TOKEN}" scripts/deploy.sh;

plan:
	# Create plan for environment changes, requires HEROKU_AUTH_TOKEN and
	# HEROKU_EMAIL environment variables to be set. If you are authenticated
	# with the Heroku CLI HEROKU_AUTH_TOKEN can be set from: `heroku auth:token`
	@test "${ENV}" || (echo '$$ENV variable required' && exit 1)
	@test "${HEROKU_AUTH_TOKEN}" || (echo '$$HEROKU_AUTH_TOKEN variable required, authenticate with the Heroku CLI and this will fill in automatically' && exit 1)
	@test "${HEROKU_EMAIL}" || (echo '$$HEROKU_EMAIL variable required, authenticate with the Heroku CLI and this will fill in automatically' && exit 1)
	cd ./terraform && \
	terraform get -update=true && \
	terraform init && \
	terraform plan -out $(ENV).tfplan -state $(ENV).tfstate -var 'heroku_email=$(HEROKU_EMAIL)' -var 'heroku_auth_token=$(HEROKU_AUTH_TOKEN)' -var 'environment=$(ENV)' .;

apply:
	@test "${ENV}" || (echo '$$ENV variable required' && exit 1)
	cd ./terraform && terraform apply -state-out $(ENV).tfstate $(ENV).tfplan;

destroy:
	@test "${ENV}" || (echo '$$ENV variable required' && exit 1)
	@test "${HEROKU_AUTH_TOKEN}" || (echo '$$HEROKU_AUTH_TOKEN variable required, authenticate with the Heroku CLI and this will fill in automatically' && exit 1)
	@test "${HEROKU_EMAIL}" || (echo '$$HEROKU_EMAIL variable required, authenticate with the Heroku CLI and this will fill in automatically' && exit 1)
	cd ./terraform && terraform destroy -state $(ENV).tfstate -var 'heroku_email=$(HEROKU_EMAIL)' -var 'heroku_auth_token=$(HEROKU_AUTH_TOKEN)' -var 'environment=$(ENV)' -force;

.PHONY: deploy plan apply destroy
