CONFIGURE CURRENT BRANCH INSERT cfg::SMTPProviderConfig {
  name := 'sandbox-mailtrap',
  sender := 'local@gnt.app', # use your domain configured in your mailtrap testing account
  host := 'sandbox.smtp.mailtrap.io',
  port := <int32>587,
  username := <str>$username,
  password := <str>$password,
  security := 'STARTTLSOrPlainText',
  validate_certs := false,
};
