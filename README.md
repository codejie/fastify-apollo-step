# fastify-apollo-step
Set up Apollo Server with Fastify.

`update to ApolloServer(2.x), and supports Subscriptions!`

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
npm install --save fastify-apollo-step apollo-server-core graphql fastify graphql-playground-html graphql-tools

```
* by fastify, just need apollo-server-core, not apollo-server


# Options
fastify-apollo-step can be configurated with the follow option object, inclues itself configurations and Apollo Server configurations.

```js
const options = {
    path: '/ql',
    context: undefined,
    gqlSchema: undefined,
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
    routeBeforeHandler: function (request, reply, done) {
      done();
    }
};
```

* **`path`**: GraphQL module endpoint;
* **`gqlSchema`**: GraphQL schema, optional if `typeDefs` and `resolvers` exist;
* **`typeDefs`**: GraphQL type definitions, optional if `schema` exists;
* **`resolvers`**: GraphQL resolver definitions, optional if `schema` exists;
* **`subscriptions`**: Options of subscription;
* **`graphiql`**: Options of GraphiQL of Playground;
* **`routeBeforeHandler`**: beforeHandler function of Fastify while calls QL or iQL;

# Example
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

# TypeScript

  Ready. But I am not good at TypeScript yet.

  To conflict with Fastify Plugin Option, I have to change 'schema' and 'beforeHandler' of FastifyApollo's, Please refer to ./test/ts/subscription.ts.

```js
declare namespace fastifyApollo {
    interface Options {
        path: string,
        context?: Record<string, any>,
        gqlSchema?: GraphQLSchema,
        typeDefs?: DocumentNode | Array<DocumentNode>,
        resolvers: IResolvers,
        subscriptions?: {
            enabled: boolean,
            path?: string,
            onConnect?: (connectionParams: Object, websocket: WebSocket, context: ConnectionContext) => any,
            onDisconnect?: (websocket: WebSocket, context: ConnectionContext) => any,
        },
        graphiql?: {
            enabled: boolean,
            path?: string
        },
        routeBeforeHandler?: (request: IncomingMessage, reply: ServerResponse, done: () => void) => void        
    }
}
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

