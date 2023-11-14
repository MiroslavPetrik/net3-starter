# NET3 = Next.js + EdgeDB + T3 (Tailwind, TypeScript, tRPC)

This is Next.js + EdgeDB starter project bootstraped on the [T3 Stack](https://create.t3.gg/)

- [Next.js v14](https://nextjs.org) Fullstack React framework using the **app router**
- [EdgeDB v4](https://www.edgedb.com/) Graph-relational database with a custom query language, Auth extension and more
- [tRPC](https://trpc.io) typesafe end-2-end API definition & access
- [Tailwind CSS](https://tailwindcss.com) with [Flowbite React](https://www.flowbite-react.com/) componentss
- [TypeScript](https://www.typescriptlang.org/) language for JavaScript autocompletion

> [!NOTE]
> Project uses unstable apis such as the EdgeDB auth extension

# Installation Steps

TBD

## EdgeDB

### 1. Install

### 2. Instatiate & Migrate

### 3. Configure the Auth extension

Set the allowed redirect url via the REPL (run `edgedb`):

```
configure current database set ext::auth::AuthConfig::allowed_redirect_urls := {"http://localhost:3000/"}
```

# FAQ

## How does the query client connect to the EdgeDB?

In development, the library automatically detects the linked edgedb project. In production `EDGEDB_DSN` [env variable is recommended.](https://www.edgedb.com/docs/intro/clients#connection)

## How does Next.js communicate with the EdgeDB Auth extension?

[Using the `@edgedb/auth-nextjs`](https://github.com/edgedb/edgedb-js/tree/master/packages/auth-nextjs)

## How do I deploy this?

TBD

## Database Connection refused (often on Windows 11)

1.  Configure EdgeDB. See [Source](https://github.com/edgedb/edgedb-js/issues/376#issuecomment-1173840632).

```
edgedb configure set listen_addresses 127.0.0.1 ::1
```

2. or [Update operating system routing](https://github.com/nodejs/node/issues/40537#issuecomment-1706257550)

3. or configure the app (not recommended)

```ts
// env.mjs or elsewhere where it suits you
import dns from "node:dns";
dns.setDefaultResultOrder("ipv4first");
```
