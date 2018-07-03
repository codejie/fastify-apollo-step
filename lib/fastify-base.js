'use strict'

const ApolloServerCore = require('apollo-server-core');

const graphql = require('./apollo-graphql');
const graphiql = require('./apollo-graphiql');

class ApolloServer extends ApolloServerCore.ApolloServerBase {

    constructor (opts) {
        const base = {
            context: opts.context,
            schema: opts.schema,
            typeDefs: opts.typeDefs,
            resolvers: opts.resolvers,
            schemaDirectives: opts.schemaDirectives,
            subscriptions: opts.subscriptions && opts.subscriptions.enabled,
        };

        super(base);

        const graphql = {
            schema: opts.graphql.schema,
        };

        const graphiql = {

        }

        const subscriptions = {

        }

        super(apollo);
        this.options = opts;
    }

    attach(app) {

        this.app = app;

        this.setGraphQLHandler();
        this.setGraphiQLHandler();

        this.setSubscriptionsHandler();
        this.setUploadsHandler();
    }

    setGraphQLHandler () {
        this.app.route(graphql(this.options.graphql));
    }

    setGraphiQLHandler () {
        if (this.options.graphiql.enabled) {
            this.app.route(graphiql(this.options.graphiql));
        }
    }

    setSubscriptionsHandler () {
        if (this.options.graphql.subscriptions && this.options.graphql.subscriptions.enabled) {
            super.installSubscriptionHandlers(this.app.server);
        }
    }

    setUploadsHandler () {

    }

    supportsSubscriptions () {
        return true;
    }

}

const Plugin = function (fastify, opts, next) {
    const server = new ApolloServer(opts);
    server.attach(fastify);

    next();

}


module.exports = Plugin;