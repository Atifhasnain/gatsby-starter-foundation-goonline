---
template: blog-post
title: How To Secure Nginx with Let's Encrypt Using Certbot
slug: /how-to-secure-nginx-with-let-s-encrypt-using-certbot
date: 2022-10-01 08:50
description: Let's Encrypt, Certbot, Python3, Nginx, SSL Installtion, Ubuntu, Linux
featuredImage: /assets/letsencrypt.png
---
## 1. Installing Certbot

```
sudo apt install certbot python3-certbot-nginx
```

## 2. Confirming Nginx Configuration

Certbot should to be able to find the correct `server` block in your Nginx configuration for it to be able to automatically configure SSL for your domain. To achieve this it looks for a `server_name` directive that matches the domain name for which SSL certificate is requested.

To check, open the configuration file for your domain using `vi` or your favorite text editor:

```
sudo nano /etc/nginx/sites-available/yourdomain.com
```

It should look like this:

```
...
server_name yourdomain.com www.yourdomain.com;
...
```

If it doesn’t, update it to match the required configurations. Then save and close the file. Now verify the syntax of your configuration:

```
sudo nginx -t
```

If you get an error, reopen the server block file and check for errors on mentioned line number. Now check again for configuration block syntax and reload Nginx to reflect the latest changes:

```
sudo service nginx reload
```

## 3. Obtaining an SSL Certificate

To use this plugin, type the following:

`-d` to specify the domain names.

```
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

If `certbot` successfully passed challenge ,it will prompt to configure your HTTPS settings.

```
Please choose whether or not to redirect HTTP traffic to HTTPS, removing HTTP access.
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
1: No redirect - Make no further changes to the webserver configuration.
2: Redirect - Make all requests redirect to secure HTTPS access. Choose this for
new sites, or if you're confident your site works on HTTPS. You can undo this
change by editing your web server's configuration.
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Select the appropriate number [1-2] then [enter] (press 'c' to cancel):
```

Select your choice then hit `ENTER`.

```
Output
IMPORTANT NOTES:
 - Congratulations! Your certificate and chain have been saved at:
   /etc/letsencrypt/live/yourdomain.com/fullchain.pem
   Your key file has been saved at:
   /etc/letsencrypt/live/yourdomain.com/privkey.pem
   Your cert will expire on 2020-08-18. To obtain a new or tweaked
   version of this certificate in the future, simply run certbot again
   with the "certonly" option. To non-interactively renew *all* of
   your certificates, run "certbot renew"
 - If you like Certbot, please consider supporting our work by:

   Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
   Donating to EFF:                    https://eff.org/donate-le
```

##  5. Verifying Certbot Auto-Renewal

Y﻿ou can check the status of the timer with `systemctl`:

```
sudo systemctl status certbot.timer
```

```
Output
● certbot.timer - Run certbot twice daily
     Loaded: loaded (/lib/systemd/system/certbot.timer; enabled; vendor preset: enabled)
     Active: active (waiting) since Mon 2020-05-04 20:04:36 UTC; 2 weeks 1 days ago
    Trigger: Thu 2022-10-01 09:22:32 UTC+5; 9h left
   Triggers: ● certbot.service
```

T﻿o verify the renewal process:

```
sudo certbot renew --dry-run
```

If you see no errors, you’re good to go. Certbot will renew your certificates and reload Nginx service to reflect latest changes, when required.