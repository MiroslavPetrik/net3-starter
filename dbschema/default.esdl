using extension auth;

module default {
  global identity := (select global ext::auth::ClientTokenIdentity);

  global current_user := (
    assert_single((
      select User
      filter .identity =
        global ext::auth::ClientTokenIdentity
    ))
  );

  type User {
      required identity: ext::auth::Identity {
        constraint exclusive;
      };
      required name: str;
  }
}
