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
    createUser: (parent, { userNew }) => {
      const newUser = {
        id: crypto.randomUUID(),
        ...userNew,
      };
      users.push(newUser);
      return newUser;
    },
  },
};

export default resolvers