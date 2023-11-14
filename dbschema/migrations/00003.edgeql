CREATE MIGRATION m1osyk6vzuc7k22hjd44mz475gc6iwfxwju75j6zudcbdd3g7jpggq
    ONTO m1mqq7fu7tnjq2nf57wptovooaqgw6qpa2jfw6jvwujb5dv6od4ceq
{
  ALTER GLOBAL default::current_user USING (std::assert_single((SELECT
      default::User {
          *
      }
  FILTER
      (.identity = GLOBAL ext::auth::ClientTokenIdentity)
  )));
};
