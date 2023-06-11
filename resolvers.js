import pc from "@prisma/client";
import bcrypt from "bcryptjs";
import { ApolloError, AuthenticationError } from "apollo-server";

const prisma = new pc.PrismaClient();

const resolvers = {
  Query: {
    users: () => users,
    user: (parent, { id }, { userLoggedIn }) => {
      if (!userLoggedIn) throw new Error("You are not logged in");
      return users.find((items) => items.id == id);
    },
  },
  User: {
    todos: (parent) => {
      return Todos.filter((todo) => todo.by == parent.id);
    },
  },
  Mutation: {
    signupUser: async (parent, { userNew }) => {
      const user = await prisma.user.findUnique({
        where: { email: userNew.email },
      });
      if (user)
        throw new AuthenticationError("User already exists with that email");
      const hashedPassword = await bcrypt.hash(userNew.password, 10);
      const newUser = await prisma.user.create({
        data: {
          ...userNew,
          password: hashedPassword,
        },
      });
      return newUser;
    },
  },
};

export default resolvers;
