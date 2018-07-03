const { makeExecutableSchema, gql, PubSub } = require('apollo-server-core');

const pubsub = new PubSub();
const SOMETHING_CHANGED_TOPIC = 'something_changed';

const typeDefs = gql`
  type Query {
    hello: String
  }
  type Subscription {
    newMessage: String
    whatMessage: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'hello',
  },
  Subscription: {
    newMessage: {
      resolve: (payload) => {
        return payload + '---- time ';
      },
      subscribe: () => pubsub.asyncIterator(SOMETHING_CHANGED_TOPIC),
    },
    whatMessage: {
      subscribe: () => pubsub.asyncIterator(SOMETHING_CHANGED_TOPIC)
    }
  },
};

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
      subscriptionsURL: '/graphql',        
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

const options = {
  path: '/ql',
  context: undefined,
  schema: schema,
  resolvers: resolvers,
  subscriptions: {
    enabled: true,
    path: '/suscription',
    onConnected: undefined
  },
  graphiql: {
    enabled: true,
    path: '/iql'
  },
  beforeHandler: function (request, reply, done) {
    done();
  }
};


const fastify = require('fastify')();

fastify.register(require('../lib/fastify-base'), options);

fastify.listen(3001, (err) => {
    if (err) {
        console.error('start failed - ', err);
        return;
    }    
    console.log('started.');    
});

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// });

// server.listen().then(({ url }) => {
//   console.log(`🚀 Server ready at ${url}`);
// });

//publish events every second
setInterval(
  () =>
    pubsub.publish(SOMETHING_CHANGED_TOPIC, {
      newMessage: new Date().toString(),
      whatMessage: 'hello'
    }),
  1000,
);