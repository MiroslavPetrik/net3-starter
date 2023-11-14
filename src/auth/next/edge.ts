import { type Client } from "edgedb";
import { type BuiltinOAuthProviderNames } from "../core/consts";
import { cookies } from "next/headers";

export interface NextAuthOptions {
  baseUrl: string;
  authRoutesPath?: string;
  authCookieName?: string;
  pkceVerifierCookieName?: string;
  passwordResetUrl?: string;
}

type OptionalOptions = "passwordResetUrl";

export function createNextEdgeAuth(client: Client, options: NextAuthOptions) {
  return new NextEdgeAuth(client, options);
}

class NextEdgeAuth {
  /** @internal */
  readonly options: Required<Omit<NextAuthOptions, OptionalOptions>> &
    Pick<NextAuthOptions, OptionalOptions>;

  /** @internal */
  constructor(
    protected readonly client: Client,
    options: NextAuthOptions,
  ) {
    this.options = {
      baseUrl: options.baseUrl.replace(/\/$/, ""),
      authRoutesPath: options.authRoutesPath?.replace(/^\/|\/$/g, "") ?? "auth",
      authCookieName: options.authCookieName ?? "edgedb-session",
      pkceVerifierCookieName:
        options.pkceVerifierCookieName ?? "edgedb-pkce-verifier",
    };
  }

  protected get _authRoute() {
    return `${this.options.baseUrl}/${this.options.authRoutesPath}`;
  }

  // isPasswordResetTokenValid(resetToken: string) {
  //   return Auth.checkPasswordResetTokenValid(resetToken);
  // }

  getOAuthUrl(providerName: BuiltinOAuthProviderNames) {
    return `${this._authRoute}/oauth?${new URLSearchParams({
      provider_name: providerName,
    }).toString()}`;
  }

  getBuiltinUIUrl() {
    return `${this._authRoute}/builtin/signin`;
  }
  getBuiltinUISignUpUrl() {
    return `${this._authRoute}/builtin/signup`;
  }

  getSignoutUrl() {
    return `${this._authRoute}/signout`;
  }

  getSession() {
    return new NextAuthSession(
      this.client,
      cookies().get(this.options.authCookieName)?.value.split(";")[0],
    );
  }
}

export class NextAuthSession {
  public readonly client: Client;

  /** @internal */
  constructor(
    client: Client,
    private readonly authToken: string | undefined,
  ) {
    console.log({ authToken });
    this.client = this.authToken
      ? client.withGlobals({ "ext::auth::client_token": this.authToken })
      : client;
  }

  async isLoggedIn() {
    if (!this.authToken) return false;
    return (await this.client.querySingle(
      `select exists global ext::auth::ClientTokenIdentity`,
    ))! as boolean;
  }
}
