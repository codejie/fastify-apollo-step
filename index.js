'use strict'

const ApolloFastify = require('./lib/apollo-fastify');

module.exports = ApolloFastify;

// const options = {
//     path: '/ql',
//     context: undefined,
//     gqlSchema: undefined,
//     typeDefs: typeDefs,
//     resolvers: resolvers,
//     subscriptions: {
//       enabled: true,
//       path: '/subscriptions',
//       onConnect: (connectionParams, webSocket) => {
//       },
//       onDisconnect: (webSocket, connectionContext) => {
//       }
//     },
//     graphiql: {
//       enabled: true,
//       path: '/iql'
//     },
//     routeBeforeHandler: function (request, reply, done) {
//       done();
//     }
// };
