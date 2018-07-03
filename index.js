'use strict'

const ApolloFastify = require('./lib/apollo-fastify');

module.exports = ApolloFastify;

// const options = {
//     path: '/ql',
//     context: undefined,//not supported yet.
//     schema: undefined,
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
//     beforeHandler: function (request, reply, done) {
//       done();
//     }
// };