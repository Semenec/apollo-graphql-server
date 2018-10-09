FROM node:8.5.0

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

# Set a working directory
WORKDIR /usr

# Install native dependencies
# RUN set -ex; \
#   apk add --no-cache ...

# Install Node.js dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy application files
COPY config ./config/
COPY controllers ./controllers/
COPY migrations ./migrations/
COPY models ./models/
COPY resolvers ./resolvers/
COPY schemas ./schemas/
COPY seeders ./seeders/
COPY migration-db.sh ./
COPY .env ./
COPY app.js ./

# Run the container under "node" user by default
USER node

CMD [ "node", "app.js" ]
