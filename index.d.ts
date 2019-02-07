import * as fastify from 'fastify';

import { Server, IncomingMessage, ServerResponse } from 'http';
import { GraphQLSchema, DocumentNode } from 'graphql';
import { IResolvers }  from 'graphql-tools';
import { ConnectionContext } from 'subscriptions-transport-ws';

declare module 'fastify' {
    // interface FastifyApolloOptions
}

declare const fastifyApollo: fastify.Plugin<Server, IncomingMessage, ServerResponse, {
    path: string,
    context?: Record<string, any>,
    schema?: GraphQLSchema,
    typeDefs?: DocumentNode | Array<DocumentNode>,
    resolvers: IResolvers,
    subscriptions?: {
        enabled: boolean;
        path?: string;
        onConnect?: (connectionParams: Object, websocket: WebSocket, context: ConnectionContext) => any;
        onDisconnect?: (websocket: WebSocket, context: ConnectionContext) => any;
    };
    graphiql?: {
        enabled: boolean,
        path?: string
    },
    beforeHandler?: (request: IncomingMessage, reply: ServerResponse, done: () => void) => void;
}>;

export = fastifyApollo;