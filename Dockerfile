FROM node:9.5.0

# Create non-root user to run app with

RUN useradd --user-group --create-home --shell /bin/bash api

# Set working directory

WORKDIR /home/api

COPY package.json ./
COPY package-lock.json ./

RUN chown -R api:api /home/api

# Change user so that everything that's npm-installed belongs to it

USER api

# Install dependencies

RUN npm install --no-optional

# Switch to root and copy over the rest of our code
# This is here, after the npm install, so that code changes don't trigger an
# un-caching of the npm install line

USER root
COPY .eslintrc .eslintignore .sequelizerc cluster.js ./
COPY app ./app
COPY scripts ./scripts
RUN chown -R api:api /home/api
USER api

CMD [ "npm", "start" ]
EXPOSE 3000
