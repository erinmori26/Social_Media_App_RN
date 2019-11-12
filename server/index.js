const { ApolloServer } = require("apollo-server");

const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

// verify user ID function (not complete)
const validateTokenAndGetUserId = token => {
  // TODO: do work to authorize user
  return "user-2";
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const context = {};

    // get correct user ID (verify)
    if (req.headers.authorization) {
      // Bearer SOME_TOKEN
      const [bearer, token] = req.headers.authorization.split(" ");
      context.userId = validateTokenAndGetUserId(token);
    }

    return context;
  }
});

// get url where server is running
server.listen().then(({ url }) => {
  console.log(`Server is running at ${url}!`);
});
