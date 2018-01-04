'use strict'

const graphql = require('./apollo-graphql');
const graphiql = require('./apollo-graphiql');

module.exports = function (fastify, options, next) {

    if (options.graphql.path == undefined) {
        options.graphql.path = '/';
    }
    fastify.route(graphql(options.graphql));

    if (options.graphiql) {
        if (options.graphiql.path === undefined) {
            options.graphiql.path = '/graphiql';
        }
        if (options.graphiql.apollo === undefined) {
            options.graphiql.apollo = {};
        }
        if (options.graphiql.apollo.endpointURL === undefined) {
            options.graphiql.apollo.endpointURL = options.graphql.path;
        }        
        fastify.route(graphiql(options.graphiql));
    }

    next();
}