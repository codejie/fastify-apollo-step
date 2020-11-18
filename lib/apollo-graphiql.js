'use strict'

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
            reply.header('Content-Type', 'text/html')
                .send(GraphqlPlaygroundHtml.renderPlaygroundPage({
                    endpoint: options.endpoint,//iql
                    subscriptionsEndpoint: options.subscriptionsEndpoint,//'/subscriptions',
                    // version: '1.7.1'
                }));
        }
    }
}

module.exports = graphiql;