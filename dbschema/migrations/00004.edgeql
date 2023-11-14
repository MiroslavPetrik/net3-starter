CREATE MIGRATION m13x3ijudtammiylmgagbb6zc3gj57liylxb7b7pjlaas75mgimajq
    ONTO m1osyk6vzuc7k22hjd44mz475gc6iwfxwju75j6zudcbdd3g7jpggq
{
  ALTER TYPE default::User {
      ALTER LINK identity {
          CREATE CONSTRAINT std::exclusive;
      };
  };
};
