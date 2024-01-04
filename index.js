import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// db
import db from "./_db.js";

// types
import { typeDefs } from "./schema.js";

// resolvers
const resolvers = {
  Query: {
    games() {
      return db.games;
    },
    reviews() {
      return db.reviews;
    },
    authors() {
      return db.authors;
    },
    game(_, args) {
      return db.games.find((game) => game.id === args.id);
    },

    review(_, args) {
      return db.reviews.find((review) => review.id === args.id);
    },
  },
};

// server setup
const server = new ApolloServer({
  // typeDefs
  typeDefs,
  //   resolvers
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log("server ready at port 4000");
