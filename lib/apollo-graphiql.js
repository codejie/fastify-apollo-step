'use strict'

// const GraphiQL = require('apollo-server-module-graphiql');
// const resolveGraphiQLString = require('apollo-server-module-graphiql').resolveGraphiQLString;

const GraphqlPlaygroundHtml =  require('graphql-playground-html');

function graphiql(options) {
    return {
        method: 'GET',
        url: options.path,
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
        beforeHandler: options.beforeHandler,
        handler: function (request, reply) {
            const ret = GraphqlPlaygroundHtml.renderPlaygroundPage({
                endpoint: options.endpointURL,//iql
                subscriptionsEndpoint: options.subscriptionsURL,//'/subscriptions',
                version: '1.7.1'
            });
            reply.header('Content-Type', 'text/html')
                .send(ret);
            // reply.header('Content-Type', 'text/html')
            //     .send(GraphqlPlaygroundHtml.renderPlaygroundPage({
            //         endpoint: options.endpointURL,//iql
            //         subscriptionsEndpoint: options.suscriptionsURL,//'/subscriptions',
            //         version: '1.7.1'
            //     }));

        }
    }
}

module.exports = graphiql;