'use strict'

const fastify = require('fastify')();
const { makeExecutableSchema,addMockFunctionsToSchema } = require('graphql-tools');

const { graphql, graphiql } = require('./');

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

fastify.register(graphql, {schema});
fastify.register(graphiql, {
    endpointURL: '/'
});

fastify.listen(3001);

