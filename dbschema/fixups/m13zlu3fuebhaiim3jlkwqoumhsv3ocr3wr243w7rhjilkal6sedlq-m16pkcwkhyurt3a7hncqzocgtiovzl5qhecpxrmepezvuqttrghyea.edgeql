CREATE MIGRATION m17nljmzeexpdiei5zly4bcliobbyybeadfqf2mcwznojlmxv4ij3q
    ONTO m13zlu3fuebhaiim3jlkwqoumhsv3ocr3wr243w7rhjilkal6sedlq
{
  ALTER GLOBAL default::current_user USING (std::assert_single((SELECT
      default::User
  FILTER
      (.identity = GLOBAL ext::auth::ClientTokenIdentity)
  )));
};
