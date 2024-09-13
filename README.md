# NET3 = Next.js + EdgeDB + T3 (Tailwind, TypeScript, tRPC)

This is Next.js + EdgeDB starter project bootstraped on the [T3 Stack](https://create.t3.gg/)

- [Next.js v14](https://nextjs.org) Fullstack React framework using the **app router**
- [EdgeDB v4](https://www.edgedb.com) Graph-relational database with a custom query language, Auth extension and more
- [tRPC](https://trpc.io) typesafe end-2-end API definition & access
- [Tailwind CSS](https://tailwindcss.com) with [Flowbite React](https://www.flowbite-react.com/) componentss
- [TypeScript](https://www.typescriptlang.org) language for JavaScript autocompletion
- [i18next](https://www.i18next.com) localization integrated with [zod-i18n](https://github.com/aiji42/zod-i18n/)
- [Storybook](https://storybook.js.org) for building & testing UI in isolation

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

## Docs

### i18n

- ✅ Works for client & server components and server actions.
- ✅ Support for active pathname checks via `useLngPathname()`.
- ✅ Extraction of translation keys via `i18next-parser`.
- ✅ Integrated with `zod` both for key translation & extraction including custom translation keys.

#### Configuration

1. Add your language code into [options array](./src/i18n/options.ts#L5).
2. Import your `zod` translations and add into [resources map](./src/i18n/options.ts#L12)
3. Run `npm run i18n` which will create empty folders & json maps for your locales from added in step 1.
4. Fill the translations & commit changes.
5. 🎉 Your app is translated!

#### Server Components

```tsx
/**
 * Use the custom RSC Params type which gives you the global `[lng]` param.
 */
import { Params } from "@/types";
/**
 * Import the SSR translations hook from a local `i18n` folder.
 * NOTE: the SSR hook is awaited!
 */
import { useTranslation } from "@/i18n";

export default async function Page({ params: { lng } }: Params) {
  // Specify the feature name as your namespace.
  // Use the "global" namespace for reusable components like Button.
  const { t } = await useTranslation("feature", lng);

  return <h1>{t("title")}</h1>;
}
```

You can also use this 'hook' in the server actions. See the [auth actions](./src/app/actions/auth.ts#L27) as an example.

#### Client Components

In client components, we use the hook `useTranslation()` from a library.

```tsx
import { useTranslation } from "react-i18next";

export function CreateUserForm() {
  const { t } = useTranslation("onboarding");
}
```

On the client side, the import of translation files is handled in the `RootLayout` by the [`<Language />` component](./src/i18n/client.tsx#L33).

#### Client Navigation Components

Since the `[lng]` param is present in every `pathname`, we extend the `usePathame()` from Next.js,
with a functionality to strip the prefix away, so you can check for active path easily:

```tsx
"use client";
/**
 * Import useLngPathname instead of the usePathname
 */
import { useLngPathname } from "@/i18n";
/**
 * Get the type for prop which will be passed from the server component params.
 */
import { type LanguageParam } from "@/i18n";

export function Navbar({ lng }: LanguageParam) {
  // pathname no longer contains the lng prefix!
  const pathname = useLngPathname(lng);
  const { t } = useTranslation("global");

  // we can check if the path is active without worrying about the language:
  return (
    <nav>
      <NavbarLink href="/dashboard" active={pathname.startsWith("/dashboard")}>
        {t("dashboard")}
      </NavbarLink>
    </nav>
  );
}
```

See [full code of the `<Navbar />`](<./src/app/[lng]/(user)/_components/navbar.tsx>).

#### Custom Zod Errors

When you use `.refine()` API of `zod`, the custom error must be defined in `params` as follows:

```tsx
/**
 * The local "t" function is necessary for the i18next-parser to extract the translation key properly.
 */
import { t } from "@/i18n";

const customError = z.string().refine((val) => val, {
  // The "zodError" namespace here is mandatory & typechecked
  // The actual key, will be passed down to the zod-i18n-map which will do the translation.
  params: { i18n: t("zodError:passwordsMustMatch") },
});
```

See the translation of the [`passwordsMustMatch` refinement](./src/app/actions/auth.ts#L85) .

# FAQ

## How does the query client connect to the EdgeDB?

In development, the library automatically detects the linked edgedb project. In production `EDGEDB_DSN` [env variable is recommended.](https://www.edgedb.com/docs/intro/clients#connection)

## How does Next.js communicate with the EdgeDB Auth extension?

[Using the `@edgedb/auth-nextjs`](https://github.com/edgedb/edgedb-js/tree/master/packages/auth-nextjs)

## How do I deploy this?

TBD

## Database Connection refused when generating `edgeql-js`

This is related to ipv6 in Node18 (often on Windows 11).

0. Make sure your `node -v` is equal to the one in `.nvmrc`

Run `nvm use` to apply the project node version.
Run `nvm alias default node` to make it default.

1.  Configure EdgeDB. See [Source](https://github.com/edgedb/edgedb-js/issues/376#issuecomment-1173840632).

```
edgedb configure set listen_addresses 127.0.0.1 ::1
```

2. or [Update operating system routing](https://github.com/nodejs/node/issues/40537#issuecomment-1706257550)
