'use strict'

const { makeExecutableSchema, PubSub, gql } = require('apollo-server-core');

const { SubscriptionServer, ExecutionParams } = require('subscriptions-transport-ws');
const { execute, subscribe } = require('graphql');

// const ApolloServer = require('../lib/fastify-base');



// const pubsub = new PubSub();

// const typeDefs = `
//     type Query {
//         cat(id: Int!): Cat
//         allCats: [Cat]
//     }

//     type Mutation {
//         createCat(name: String!): Cat
//     }

//     type Subscription {
//         catAdded: Cat
//         newMessage: String
//     }

//     type Cat {
//         id: Int!
//         name: String!
//     }
// `;

// const cats = [
//     {
//         id: 1,
//         name: '1'
//     },
//     {
//         id: 2,
//         name: '2',
//     },
//     {
//         id: 3,
//         name: '33'
//     }        
// ];

// const resolvers = {
//     Query: {
//         cat: (root, args) => {
//             for (let i = 0; i < cats.length; ++ i) {
//               if (args.id === cats[i].id) {
//                   return cats[i];
//                 }
//             }
//           return null;
//         },
//         allCats: () => {
//             return cats;
//         }
//     },
//     Mutation: {
//         createCat: (_, data) => {
//             const cat = Object.assign({id: cats.length + 1}, data);
//             cats.push(cat);

//             pubsub.publish('catAdded', cat);

//             return cat;
//         }
//     },
//     Subscription: {
//         catAdded:  {
//             resolve: (payload) => {
//                 return payload;
//             },
//             subscribe: () => pubsub.asyncIterator ('catAdded')
//         },
//         newMessage: {
//             subscribe: () => pubsub.asyncIterator('new_message')
//         }
//     },
//     Cat: {
//         id: (cat) => cat.id,
//         name: (cat) => cat.name
//     }
// };

// const schema = makeExecutableSchema({
//   typeDefs,
//   resolvers,
// });

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
  `;
  
  // Resolvers define the technique for fetching the types in the
  // schema.  We'll retrieve books from the "books" array above.
  const resolvers = {
    Query: {
      books: () => books,
    },
  };


// const server = new ApolloServer(opts);

const fastify = require('fastify')();

// const opts = {
//     app: fastify,
//     resolvers: resolvers,
//     typeDefs: typeDefs
// };

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const options = {
    graphql: {
      path: '/ql',
      schema: schema,
      subscriptions: {
        enabled: true        
      },
      beforeHandler: function (request, reply, done) {
        console.log('beforeHandler - graphql');
        done();
      },
      // apollo: {
      //     schema
      // }
    },
    graphiql: {
        enabled: true,
        path: '/iql',
        endpointURL: '/ql',
        subscriptionsURL: '/subscriptions',        
        beforeHandler: function (request, reply, done) {
            console.log('beforeHandler - graphiql');
            done();
        },        
        // apollo: {
        //     endpointURL: '/ql',
        //     subscriptionsURL: '/subscriptions'
        // }
    }
};

fastify.register(require('../lib/fastify-base'), options);

fastify.listen(3001, (err) => {
    if (err) {
        console.error('start failed - ', err);
        return;
    }    
    console.log('started.');    
});