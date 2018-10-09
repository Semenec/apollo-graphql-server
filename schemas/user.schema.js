const {
  addMockFunctionsToSchema,
  gql,
  makeExecutableSchema
} = require('apollo-server');

const helloSchema = makeExecutableSchema({
  typeDefs: gql`
		type Query {
			getUser ( email: String! ) : User
		}

    type Mutation {
      registration( input: UserInput! ) : User
      login( email: String!, password: String! ) : LoginMessage
    }

    input UserInput {
      firstName: String
      lastName: String
      email: String!
      password: String!
    }

    type User {
      firstName: String!
      lastName: String!
      email: String
      password: String
      id: ID!
    }

    type LoginMessage {
      message: String!
    }
	`
});

addMockFunctionsToSchema({ schema: helloSchema });

module.exports = helloSchema;