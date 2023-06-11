import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    users: [User]
    user(id: ID!): User
  }

  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String
  }

  type Mutation {
    createUser(userNew: UserInput!): User
  }
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    todos: [Todo]
  }

  type Todo {
    title: String
    by: ID!
  }
`;

export default typeDefs