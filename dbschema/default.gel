using extension auth;

module default {
  global currentUser := (
    assert_single((
      select User filter .identity = global ext::auth::ClientTokenIdentity
    ))
  );

  type User {
      required identity: ext::auth::Identity {
        constraint exclusive;
      };
      required name: str;
  }
}
