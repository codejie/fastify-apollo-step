'use strict'

const fastStringify = require('fast-safe-stringify').stable;
const runHttpQuery = require('apollo-server-core').runHttpQuery;

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
                    type: 'object',
                    properties: {
                        data: {
                            anyOf: [
                                { type: 'string' },
                                { type: 'object' }
                            ]
                        }
                    }
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
            runHttpQuery([request, reply], {
                method: request.req.method,
                options: options.apollo,
                query: request.req.method === 'POST' ? request.body : request.query
            }).then((response) => {
                reply.type('application/graphql').send(response.graphqlResponse);
            }, (err) => {
                if (err.name === 'HttpQueryError') {
                    if (err.headers) {
                        Object.keys(err.headers).forEach(header => {
                            reply.headers(header, err.headers[header]);
                        });
                    }
                }
                reply.type('application/graphql').code(500).send(err.message);
            });
        }
    }
}

module.exports = graphql;