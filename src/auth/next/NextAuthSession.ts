import { Client } from "edgedb";

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
