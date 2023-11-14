CREATE MIGRATION m1mqq7fu7tnjq2nf57wptovooaqgw6qpa2jfw6jvwujb5dv6od4ceq
    ONTO m1uqsnj7jpdffsqokrkfhjylithhizwtdynyu7k5rdltrvuiwzl6fq
{
  CREATE GLOBAL default::identity := (SELECT
      GLOBAL ext::auth::ClientTokenIdentity
  );
};
