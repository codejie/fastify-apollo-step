# fastify-apollo-step
Set up Apollo Server with Fastify.

## [`fastify`](https://github.com/fastify) 
Fast and low overhead web framework, for Node.js

## [`apollo`](https://github.com/apollographql)
A community building flexible open source tools for GraphQL.

## fastify-apollo-step
As Apollo offical page said that Apollo Server can work with many Node.js HTTP frameworks, but no fastify in that list. So let's make one.

fastify-apollo-step is designed as a plugin of fastify, just call `register` to use it.

fastify-apollo-step also supports graphiql module of Apollo Server.

## Usage
```
npm install --save fastify-apollo-step
```

## Options
fastify-apollo-step can be configurated with the follow option object, inclues itself configurations and Apollo Server configurations.

```js
const options = {
    graphql: {
        path: '/ql', //optional
        beforeHandler: function (request, reply, done) { //optional
            console.log('beforeHandler - graphql');
            done();
        },        
        apollo: {
            schema
        }
    },
    graphiql: { //optional
        path: '/graphiql', //optional
        beforeHandler: beforeHandlerFunc, //optional
        apollo: {
            endpointURL: '/ql' //optional
        }
    }
};
```

`options.graphql` is used to configurate GraphQL module. 
* **`path`**: the access path of GraphQL, the default is '/'
* **`beforeHandler`**: beforeHandler of fastify
* **`apollo`**: the GraphQL module configrations of Apollo Server, for detail to [Apollo Options](https://github.com/apollographql/apollo-server#options)

`options.graphiql` is used to configurate to GraphiQL module. if this options does not exist, fastify-apollo-step will not load GraphiQL module.
* **`path`**: the access path of GraphiQL, the default is '/graphiql'
* **`beforeHandler`**: beforeHandler of fastify
* **`apollo`**: the GraphiQL module configuations of Apollo Server, for detail to [apollo-server-module-graphiql](https://github.com/apollographql/apollo-server/blob/master/packages/apollo-server-module-graphiql/src/resolveGraphiQLString.ts). this option `endpointURL` should the same as `graphql.path`, and it is optional, the default uses `graphql.path`.

## Example
```js
const graphqlStep = require('fastify-apollo-step');

...

fastify.register(graphqlStep, options);

```


