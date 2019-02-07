import * as fastify from 'fastify';

import { Server, IncomingMessage, ServerResponse } from 'http';
import { GraphQLSchema, DocumentNode } from 'graphql';
import { IResolvers }  from 'graphql-tools';

declare module 'fastify' {
    // interface FastifyApolloOptions
}

declare const fastifyApollo: fastify.Plugin<Server, IncomingMessage, ServerResponse, {
    path: string,
    // context?: Record<string, any>;
    // schema?: GraphQLSchema,
    typeDefs?: DocumentNode | Array<DocumentNode>,
    resolvers: IResolvers,
    // subscriptions?: {
    //     enabled: boolean;
    //     path: string;
    // onConnect?: (connectionParams: Object, websocket: WebSocket, context: ConnectionContext) => any;
    // onDisconnect?: (websocket: WebSocket, context: ConnectionContext) => any;
    // };
    graphiql: {
        enabled: boolean,
        path?: string
    },
    // // beforeHandler(request, reply, done): void;

}>;

export = fastifyApollo;