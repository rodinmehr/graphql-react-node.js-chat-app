import { ApolloServer, gql } from "apollo-server";

const users = [
    {
        id: 1,
        firstName: "Mahsa",
        lastName: "Radinmehr",
        email: "rodinmehr@gmail.com",
        password: "12345"
    },
    {
        id: 2,
        firstName: "Jane",
        lastName: "Doe",
        email: "jane@gmail.com",
        password: "12345"
    },
]

const typeDefs = gql`
type Query {
    users:[User]
    user(id:ID!):User
}

type User {
    id: ID
    firstName: String
    lastName: String
    email: String
}
`

const resolvers = {
    Query: {
        users: () => users,
        user: (parent, {id}, context) => {
            console.log(id)
            return users.find(items=>items.id == id)
        }
    }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at: ${url}`);
});

