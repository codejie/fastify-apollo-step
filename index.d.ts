import * as fastify from 'fastify';

import * as WebSocket from 'ws';
import { Server, IncomingMessage, ServerResponse } from 'http';
import { GraphQLSchema, DocumentNode } from 'graphql';
import { IResolvers }  from 'graphql-tools';
import { ConnectionContext } from 'subscriptions-transport-ws';

declare namespace fastifyApollo {
    interface Options {
        path: string,
        context?: Record<string, any>,
        // schema?: GraphQLSchema,
        gqlSchema?: GraphQLSchema,
        typeDefs?: DocumentNode | Array<DocumentNode>,
        resolvers: IResolvers,
        subscriptions?: {
            enabled: boolean,
            path?: string,
            onConnect?: (connectionParams: Object, websocket: WebSocket, context: ConnectionContext) => any,
            onDisconnect?: (websocket: WebSocket, context: ConnectionContext) => any,
        },
        graphiql?: {
            enabled: boolean,
            path?: string
        },
        routeBeforeHandler?: (request: IncomingMessage, reply: ServerResponse, done: () => void) => void        
        // beforeHandler?: (request: IncomingMessage, reply: ServerResponse, done: () => void) => void
    }
}

declare const fastifyApollo: fastify.Plugin<Server, IncomingMessage, ServerResponse, fastifyApollo.Options>;

export = fastifyApollo;