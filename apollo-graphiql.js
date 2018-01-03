'use strict'

const GraphiQL = require('apollo-server-module-graphiql');
const resolveGraphiQLString = require('apollo-server-module-graphiql').resolveGraphiQLString;

function graphiql(options) {
    return {
        method: 'GET',
        url: '/graphiql',
        schema: {
            querystring: {
                query: {
                    type: 'string'
                }
            },
            response: {
                '2xx': {
                    type: 'string'
                },
                '5xx': {
                    type: 'string'
                }            
            }            
        },
        handler: function (request, reply) {
            resolveGraphiQLString(request.query, options, request.req)
                .then((response) => {
                    reply.type('text/html').code(200).send(response);
                }, (err) => {
                    reply.code(500).send(err.message);
                });
        }
    }
}

module.exports = function (fastify, options, next) {
    fastify.route(graphiql(options));

    next();
}