# fastify-apollo-step
Set up Apollo Server with Fastify.

`update to ApolloServer(2.0.0-rc.3), and supports Subscriptions!`

# [fastify](https://github.com/fastify) 
Fast and low overhead web framework, for Node.js

# [apollo](https://github.com/apollographql)
A community building flexible open source tools for GraphQL.

# fastify-apollo-step
As Apollo offical page said that Apollo Server can work with many Node.js HTTP frameworks, but no fastify in that list. So let's make one.

fastify-apollo-step is designed as a plugin of fastify, just call `register` to use it.

fastify-apollo-step also supports graphiql/playground module of Apollo Server.


# Usage
```
npm install --save fastify-apollo-step apollo-server-core@rc graphql fastify graphql-playground-html graphql-tools

```
* apollo-server is a release candidate, its necessary to install from the rc tag -- https://www.apollographql.com/
* by fastify, just need apollo-server-core, not apollo-server


# Options
fastify-apollo-step can be configurated with the follow option object, inclues itself configurations and Apollo Server configurations.

```js
const options = {
    path: '/ql',
    context: undefined,//not supported yet.
    schema: undefined,
    typeDefs: typeDefs,
    resolvers: resolvers,
    subscriptions: {
      enabled: true,
      path: '/subscriptions',
      onConnect: (connectionParams, webSocket) => {
      },
      onDisconnect: (webSocket, connectionContext) => {
      }
    },
    graphiql: {
      enabled: true,
      path: '/iql'
    },
    beforeHandler: function (request, reply, done) {
      done();
    }
};
```

* **`path`**: GraphQL module endpoint;
* **`schema`**: GraphQL schema, optional if `typeDefs` and `resolvers` exist;
* **`typeDefs`**: GraphQL type definitions, optional if `schema` exists;
* **`resolvers`**: GraphQL resolver definitions, optional if `schema` exists;
* **`subscriptions`**: Options of subscription;
* **`graphiql`**: Options of GraphiQL of Playground;
* **`beforeHandler`**: beforeHandler function of Fastify while calls QL or iQL;

# Usage
```js
const options = {
  path: '/ql',
  typeDefs: typeDefs,
  resolvers: resolvers,
  ...
};

fastify.register(ApolloFastify, options);

fastify.listen(3000, (err) => {
  if (err) {
      console.error('server starts failed - ', err);
      return;
  }    
  console.log('🚀 Server ready at http://localhost:3000');
});

```

# Test

```
    npm run query
    npm run mutation
    npm run subscription
```
# ScreenShots
* Query

![Query](https://raw.githubusercontent.com/codejie/fastify-apollo-step/master/screenshots/query.jpg)

* Mutaton

![Mutation](https://raw.githubusercontent.com/codejie/fastify-apollo-step/master/screenshots/mutation.jpg)

* Subscription

![Subscription](https://raw.githubusercontent.com/codejie/fastify-apollo-step/master/screenshots/subscription.jpg)

