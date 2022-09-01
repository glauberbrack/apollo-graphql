const { ApolloServer, gql } = require("apollo-server");

const users = [
  {
    name: "Glauber Brack",
    age: 28,
  },
];

const findUserInDatabase = (_, args) => {
  return users.find((user) => user.name === args.name);
};

const createUser = (_, args) => {
  const user = {
    name: args.name,
    age: args.age,
  };
  users.push(user);

  return user;
};

const getUsers = () => {
  return users;
};

// You can find, in some cases the name schema. Is the same thing as typeDefs
const typeDefs = gql`
  type User {
    name: String!
    age: Int
  }

  type Query {
    getUser(name: String): User!
    getUsers: [User]
  }

  type Mutation {
    createUser(name: String!, age: Int!): User
  }
`;

const resolvers = {
  Query: {
    getUser: findUserInDatabase,
    getUsers: getUsers,
  },
  Mutation: {
    createUser: createUser,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen();
