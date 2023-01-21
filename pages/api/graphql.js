import { gql, ApolloServer } from "apollo-server-micro";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import path from 'path';
import fs from 'fs';

import resolvers from 'util/resolvers';
const schema = fs.readFileSync(path.resolve('./util/schema.gql')).toString();

const typeDefs = gql(schema);

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground({
      settings: {
        "request.credentials": "include",
      },
    })],
  context: ({ req, res }) => {
    return { loggedIn: false }
  }
});

const startServer = apolloServer.start();

export default async function handler(req, res) {
    await startServer;
    await apolloServer.createHandler({
        path: "/api/graphql",
    })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};