CONFIGURE CURRENT DATABASE SET
ext::auth::SMTPConfig::sender := 'starter@net3.app';

CONFIGURE CURRENT DATABASE SET
ext::auth::SMTPConfig::host := 'sandbox.smtp.mailtrap.io';

CONFIGURE CURRENT DATABASE SET
ext::auth::SMTPConfig::port := <int32>2525;

CONFIGURE CURRENT DATABASE SET
ext::auth::SMTPConfig::username := 'youruser';

CONFIGURE CURRENT DATABASE SET
ext::auth::SMTPConfig::password := 'yourpass';

CONFIGURE CURRENT DATABASE SET
ext::auth::SMTPConfig::security := 'STARTTLSOrPlainText';

CONFIGURE CURRENT DATABASE SET
ext::auth::SMTPConfig::validate_certs := true;
