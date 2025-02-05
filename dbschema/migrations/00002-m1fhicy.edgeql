CREATE MIGRATION m1fhicyu54gdh4ymyxfmrxqpe4fuz7zvpuoj2qgdsla7s4mwgbkxka
    ONTO m16pkcwkhyurt3a7hncqzocgtiovzl5qhecpxrmepezvuqttrghyea
{
  ALTER GLOBAL default::current_user RENAME TO default::currentUser;
  DROP GLOBAL default::identity;
};
