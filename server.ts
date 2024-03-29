import { createServer, IncomingMessage, ServerResponse } from 'http';
import { WebSocketServer } from 'ws';
import { createYoga, createSchema } from 'graphql-yoga';
import { useServer } from 'graphql-ws/lib/use/ws';
import { parse } from 'url';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;

// prepare nextjs
const app = next({ dev, hostname, port });

// match the route next would use if yoga was in `pages/api/graphql.ts`
const graphqlEndpoint = '/api/graphql';

// prepare yoga
const yoga = createYoga({
  graphqlEndpoint,
  graphiql: {
    subscriptionsProtocol: 'WS',
  },
  schema: createSchema({
    typeDefs: /* GraphQL */ `
      type Query {
        hello: String!
      }
      type Subscription {
        message: String!
        clock: String!
      }
    `,
    resolvers: {
      Query: {
        hello: () => 'world',
      },
      Subscription: {
        message: {
          async(text: string) {
            return { message: text };
          },
        },
        clock: {
          async *subscribe() {
            for (let i = 0; i < 5; i++) {
              yield { clock: new Date().toString() };
              await new Promise((resolve) => setTimeout(resolve, 1_000));
            }
          },
        },
      },
    },
  }),
});

(async () => {
  await app.prepare();
  const handle = app.getRequestHandler();

  // create http server
  const server = createServer(
    async (req: IncomingMessage, res: ServerResponse) => {
      try {
        // Be sure to pass `true` as the second argument to `url.parse`.
        // This tells it to parse the query portion of the URL.
        const url = parse(req.url ?? '', true);

        if (url.pathname && url.pathname.startsWith(graphqlEndpoint)) {
          await yoga(req, res);
        } else {
          await handle(req, res, url);
        }
      } catch (err) {
        console.error(`Error while handling ${req.url}`, err);
        res.writeHead(500).end();
      }
    }
  );

  // create websocket server
  const wsServer = new WebSocketServer({ server, path: graphqlEndpoint });

  // prepare graphql-ws
  useServer(
    {
      execute: (args: any) => args.rootValue.execute(args),
      subscribe: (args: any) => args.rootValue.subscribe(args),
      onSubscribe: async (ctx, msg) => {
        const { schema, execute, subscribe, contextFactory, parse, validate } =
          yoga.getEnveloped(ctx);

        const args = {
          schema,
          operationName: msg.payload.operationName,
          document: parse(msg.payload.query),
          variableValues: msg.payload.variables,
          contextValue: await contextFactory(),
          rootValue: {
            execute,
            subscribe,
          },
        };

        const errors = validate(args.schema, args.document);
        if (errors.length) return errors;
        return args;
      },
    },
    wsServer
  );

  await new Promise(() => server.listen(port)).catch(console.error);

  console.log(`
> App started!
  HTTP server running on http://${hostname}:${port}
  GraphQL WebSocket server running on ws://${hostname}:${port}${graphqlEndpoint}
`);
})();
