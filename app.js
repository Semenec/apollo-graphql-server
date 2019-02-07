const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const schemas = require("./schemas");
const resolvers = require("./resolvers");
const { mergeSchemas } = require("graphql-tools");
const port = process.env.PORT || 8080;

const schema = mergeSchemas({ schemas, resolvers });
const app = express();
const server = new ApolloServer({ schema });

server.applyMiddleware({ app, path: "/graphql" });

app.listen({ port }, () => {
  console.log(`Apollo Server on http://localhost:${port}/graphql`);
});

module.exports = app;
