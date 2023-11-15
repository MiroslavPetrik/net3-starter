CONFIGURE CURRENT DATABASE SET
ext::auth::SMTPConfig::sender := 'hello@net3.com';

CONFIGURE CURRENT DATABASE SET
ext::auth::SMTPConfig::host := 'localhost';

CONFIGURE CURRENT DATABASE SET
ext::auth::SMTPConfig::port := <int32>1025;

CONFIGURE CURRENT DATABASE SET
ext::auth::SMTPConfig::username := 'smtpuser';

CONFIGURE CURRENT DATABASE SET
ext::auth::SMTPConfig::password := 'smtppassword';

CONFIGURE CURRENT DATABASE SET
ext::auth::SMTPConfig::security := 'STARTTLS';   # STARTTLS or PlainText

CONFIGURE CURRENT DATABASE SET
ext::auth::SMTPConfig::validate_certs := false;
