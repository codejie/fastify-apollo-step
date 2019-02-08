'use strict'

const ApolloServerCore = require('apollo-server-core');

const graphql = require('./apollo-graphql');
const graphiql = require('./apollo-graphiql');

class ApolloServer extends ApolloServerCore.ApolloServerBase {

    constructor (opts) {
        const base = {
            context: opts.context,
            schema: opts.gqlSchema,
            typeDefs: opts.typeDefs,
            resolvers: opts.resolvers,
            schemaDirectives: opts.schemaDirectives,
            subscriptions: false,
            uploads: false,
        };

        if (opts.subscriptions && opts.subscriptions.enabled) {
            base.subscriptions = {
                path: opts.subscriptions.path,
                onConnect: opts.subscriptions.onConnect,
                onDisconnect: opts.subscriptions.onDisconnect
            };
        }

        super(base);
        
        this.options = opts;
    }

    attach(app) {

        this.app = app;

        this.setGraphQLHandler();
        this.setGraphiQLHandler();

        this.setSubscriptionsHandler();
        // this.setUploadsHandler();
    }

    setGraphQLHandler () {
        const opts = {
            path: this.options.path,
            context: this.context,
            schema: this.schema,
            beforeHandler: this.options.routeBeforeHandler,
            subscriptions: this.options.subscriptions && this.options.subscriptions.enabled,
            debug: false,
            tracing: false
        };

        this.app.route(graphql(opts));
    }

    setGraphiQLHandler () {
        if (this.options.graphiql && this.options.graphiql.enabled) {
            const opts = {
                path: this.options.graphiql.path,
                endpoint: this.options.path,
                beforeHandler: this.options.routeBeforeHandler,                
            };
            if (this.options.subscriptions && this.options.subscriptions.enabled) {
                opts.subscriptionsEndpoint = this.options.subscriptions.path;
            }
            this.app.route(graphiql(opts));
        }
    }

    setSubscriptionsHandler () {
        if (this.options.subscriptions && this.options.subscriptions.enabled) {
            super.installSubscriptionHandlers(this.app.server);
        }
    }

    setUploadsHandler () {

    }

    supportsSubscriptions () {
        return true;
    }

    supportsUploads () {
        return false;
    }
}

const Plugin = function (fastify, opts, next) {
    const server = new ApolloServer(opts);
    server.attach(fastify);

    next();
}


module.exports = Plugin;