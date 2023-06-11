import { ApolloServer, gql } from "apollo-server";
import { error } from "console";
import crypto from 'crypto'

const users = [
    {
        id: "mahsa-rdm",
        firstName: "Mahsa",
        lastName: "Radinmehr",
        email: "rodinmehr@gmail.com",
        password: "12345"
    },
    {
        id: "jane-doe",
        firstName: "Jane",
        lastName: "Doe",
        email: "jane@gmail.com",
        password: "12345"
    },
]

const Todos = [
  {
    title: "buy book",
    by: "mahsa-rdm",
  },
  {
    title: "write code",
    by: "mahsa-rdm",
  },
  {
    title: "record video",
    by: "mahsa-rdm",
  },
];

const typeDefs = gql`
type Query {
    users:[User]
    user(id:ID!):User
}

input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String
}

type Mutation {
    createUser(userNew: UserInput!):User
}
type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    todos:[Todo]
}

type Todo {
    title: String
    by: ID!
}
`;

const resolvers = {
    Query: {
        users: () => users,
        user: (parent, { id }, {userLoggedIn}) => {
            if(!userLoggedIn) throw new Error("You are not logged in")
            return users.find(items=>items.id == id)
        }
    },
    User: {
        todos: (parent) => {
            return Todos.filter(todo=>todo.by==parent.id)
        }
    },
    Mutation: {
        createUser: (parent, { userNew }) => {
            const newUser = {
              id: crypto.randomUUID(),
              ...userNew,
            };
            users.push(newUser)
            return newUser

        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
        userLoggedIn: true
    }
});

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at: ${url}`);
});

