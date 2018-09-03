'use strict'

const { gql } = require('apollo-server-core');

const fastify = require('fastify')();

const ApolloFastify = require('../index');


const books = [
    {
      title: 'Harry Potter and the Chamber of Secrets',
      author: 'J.K. Rowling',
    },
    {
      title: 'Jurassic Park',
      author: 'Michael Crichton',
    },
];

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type Query {
    uploads: [File]
  }

  type Mutation {
    singleUpload(file: Upload!): File!
  }
`;

const resolvers = {
    Query: {
      uploads: (parent, args) => {
          console.log('query:uploads');
      },
    },
    Mutation: {
      singleUpload: (parent, args) => {
        return args.file.then(file => {
          //Contents of Upload scalar: https://github.com/jaydenseric/apollo-upload-server#upload-scalar
          //file.stream is a node stream that contains the contents of the uploaded file
          //node stream api: https://nodejs.org/api/stream.html
          console.log('mutation:uploads');
          return file;
        });
      },
    },
  };


const options = {
    path: '/ql',
    typeDefs: typeDefs,
    resolvers: resolvers,
    graphiql: {
      enabled: true,
      path: '/iql'
    }
};

fastify.register(ApolloFastify, options);

fastify.listen(3000, (err) => {
  if (err) {
      console.error('server starts failed - ', err);
      return;
  }    
  console.log('🚀 Server ready at http://localhost:3000');
});