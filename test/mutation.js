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
# Comments in GraphQL are defined with the hash (#) symbol.

# This "Book" type can be used in other type declarations.
type Book {
    title: String
    author: String
}

# The "Query" type is the root of all GraphQL queries.
# (A "Mutation" type will be covered later on.)
type Query {
    books: [Book]
}

type Mutation {
    add (title: String!, author: String!): Book
}
`;

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
    Query: {
        books: () => books,
    },
    Mutation: {
        add: (root, args) => {
            const book = {
                title: args.title,
                author: args.author,
            };
            books.push(book);
            return book;
        }
    }
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