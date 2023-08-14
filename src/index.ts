require('dotenv').config()
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import path from 'path'
import fs from 'fs'
import userResolvers from './resolvers/user';
import betResolvers from './resolvers/bet';
import sequelize from './db/sequelize';

const app = express();

const schema = fs.readFileSync(path.resolve(__dirname, 'schema', 'schema.gql')).toString()

const FORCE_REFRESH_DB = process.env.FORCE_REFRESH_DB === 'true'
const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 4000;

if (FORCE_REFRESH_DB && NODE_ENV !== 'development') {
  console.error(`ERROR: You shouldn't use FORCE_REFRESH_DB as true in a non-development environment`)
  process.exit(-1)
}


const server = new ApolloServer({
  typeDefs: schema,
  resolvers: [userResolvers, betResolvers],
  context: { sequelize },
});

server.start().then(() => {
  server.applyMiddleware({ app });
})

sequelize.sync({ force: FORCE_REFRESH_DB }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});

export default app