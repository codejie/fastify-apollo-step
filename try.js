'use strict'

const fastify = require('fastify')();
const { makeExecutableSchema,addMockFunctionsToSchema } = require('graphql-tools');

// const { graphql, graphiql } = require('./');
const graphqlStep = require('./index');

const typeDefs = `
    type Query {
        cat(id: Int!): Cat
    }

    type Mutation {
        createCat(name: String!): Cat
    }

    type Cat {
        id: Int!
        name: String!
    }
`;

const cats = [
    {
        id: 1,
        name: '1'
    },
    {
        id: 2,
        name: '2',
    },
    {
        id: 3,
        name: '33'
    }        
];

const resolvers = {
    Query: {
        cat: (root, args) => {
            for (let i = 0; i < cats.length; ++ i) {
              if (args.id === cats[i].id) {
                  return cats[i];
                }
            }
          return null;
        }    
    },
    Mutation: {
        createCat: (_, data) => {
            const cat = Object.assign({id: cats.length + 1}, data);
            cats.push(cat);
            return cat;
        }
    },
    Cat: {
        id: (cat) => cat.id,
        name: (cat) => cat.name
    },
    
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const options = {
    graphql: {
        path: '/ql',
        apollo: {
            schema
        }
    },
    graphiql: {
        path: '/graphiql',
        apollo: {
            endpointURL: '/ql'
        }
    }
};

// fastify.register(graphql, options);
// fastify.register(graphiql, options);

fastify.register(graphqlStep, options);

fastify.addHook('preHandler', (request, reply, next) => {
    if (request.body) {
        console.log('preHandler - (reqId:%d) body:%j\n', request.req.id, request.body);
    }
    next();                
});

fastify.addHook('onSend', (request, reply, payload, next) => {
    if (payload) {
        console.log('onSend - (reqId:%d) payload:%j\n', request.req.id, payload);
    }
    next();                
});

fastify.addHook('onRequest', (req, res, next) => {
    console.log('onRequest - ', req);
    next();
});

fastify.listen(3001);

