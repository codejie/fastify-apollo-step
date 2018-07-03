'use strict'

const ApolloServerCore = require('apollo-server-core');

function graphql(options) {
    return {
        method: ['GET', 'POST'],
        url: options.path,
        schema: {
            querystring: {
                query: {
                    type: 'string'
                }
            },
            body: {
                type: 'object',
                properties: {
                    query: {
                        type: 'string'
                    },
                    operationName: {
                        anyOf: [
                            { type: 'string' },
                            { type: 'null' }
                        ]
                    },
                    variables: {
                        anyOf: [
                            { type: 'object' },
                            { type: 'null' }
                        ]
                    }
                },
                // additionalProperties: {
                //     type: 'string'
                // }                
            },
            uglify: true,
            response: {
                '2xx': {
                    type: 'string'
                    // properties: {
                    //     data: {
                    //         anyOf: [
                    //             { type: 'string' },
                    //             { type: 'object' }
                    //         ]
                    //     }
                    // }
                },
                '4xx': {
                    type: 'object',
                    properties: {
                        data: {
                            type: 'string'
                        },
                        errors: {
                            type: 'string'
                        }
                    }
                },
                '5xx': {
                    type: 'string'
                }
            }
        },
        beforeHandler: options.beforeHandler,
        handler: function (request, reply) {
            return ApolloServerCore.runHttpQuery([request, reply], {
                method: request.req.method,
                options: options,
                query: request.req.method === 'POST' ? request.body : request.query,
                request: ApolloServerCore.convertNodeHttpToRequest(request.req)
            }).then(response => {
                // Object.keys(response.responseInit.headers).forEach(key => {
                //     reply.header(key, response.responseInit.headers[key]);
                // });
                reply.header('Content-Type', 'application/graphql');
                reply.send(response.graphqlResponse);
            }).catch(err => {
                if ('HttpQueryError' === err.name) {
                    if (err.headers) {
                        Object.keys(err.headers).forEach(key => {
                            reply.header(key, err.headers[key]);
                        });
                    }
                    reply.status(err.statusCode).send(err.message);
                }
            });
        }
    }
}

module.exports = graphql;
