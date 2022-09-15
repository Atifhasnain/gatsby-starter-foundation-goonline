---
template: blog-post
title: ERPNext Installation Guide on Ubuntu 22.04
slug: /erpnext-ubuntu-22-frappe
date: 2022-09-15 10:22
description: Erpnext, Frappe, Ubuntu 22.04,
featuredImage: /assets/erpnext-logo.png
---
A complete Guide to Install Frappe Bench on Ubuntu 22.04 LTS & install Frappe/ERPNext Application on your site.

## **Pre-requisites**

```
  Python 3.6+
  Node.js 14+
  Redis 5                                       (caching and real time updates)
  MariaDB 10.3.x / Postgres 9.5.x               (to run database driven apps)
  yarn 1.12+                                    (js dependency manager)
  pip 20+                                       (py dependency manager)
  wkhtmltopdf (version 0.12.5 with patched qt)  (for pdf generation)
  cron                                          (bench's scheduled jobs: automated certificate renewal, scheduled backups)
  NGINX                                         (proxying multitenant sites in production)
```

**1﻿. Install Git**

```
sudo apt-get install git
```

**2. Install Python**

```
sudo apt-get install python3-dev
```

**3. Install Python Package Manager & Setup Tools**

```
sudo apt-get install python3-setuptools python3-pip
```

**4. Install Virtualenv** 

```
sudo apt-get install virtualenv
```

C﻿heck Python Version & Install environment accordingly:

```
python3 -V
```

f﻿or v3.8:

```
sudo apt install python3.8-venv
```

f﻿or v3.1:0

```
 sudo apt install python3.10-venv
```

**5. Install MariaDB**

```
sudo apt-get install software-properties-common
sudo apt install mariadb-server
sudo mysql_secure_installation
```

**6. Install Database Development Files**

```
sudo apt-get install libmysqlclient-dev
```

**7. Edit & Replace MariaDB Configuration Files**

```
sudo nano /etc/mysql/my.cnf
```

```
# MariaDB database server configuration file.
#
# You can copy this file to one of:
# - "/etc/mysql/my.cnf" to set global options,
# - "~/.my.cnf" to set user-specific options.
# 
# One can use all long options that the program supports.
# Run program with --help to get a list of available options and with
# --print-defaults to see which it would actually understand and use.
#
# For explanations see
# http://dev.mysql.com/doc/mysql/en/server-system-variables.html

# This will be passed to all mysql clients
# It has been reported that passwords should be enclosed with ticks/quotes
# escpecially if they contain "#" chars...
# Remember to edit /etc/mysql/debian.cnf when changing the socket location.
[client]
port		= 3306
socket		= /var/run/mysqld/mysqld.sock

# Here is entries for some specific programs
# The following values assume you have at least 32M ram

# This was formally known as [safe_mysqld]. Both versions are currently parsed.
[mysqld_safe]
socket		= /var/run/mysqld/mysqld.sock
nice		= 0

[mysqld]
innodb-file-format=barracuda
innodb-file-per-table=1
innodb-large-prefix=1
character-set-client-handshake = FALSE
character-set-server = utf8mb4
collation-server = utf8mb4_unicode_ci
#SQL_BIG_SELECTS=1
#SQL_SAFE_UPDATES = 0
#
# * Basic Settings
#
user		= mysql
pid-file	= /var/run/mysqld/mysqld.pid
socket		= /var/run/mysqld/mysqld.sock
port		= 3306
basedir		= /usr
datadir		= /var/lib/mysql
tmpdir		= /tmp
lc_messages_dir	= /usr/share/mysql
lc_messages	= en_US
skip-external-locking
#
# Instead of skip-networking the default is now to listen only on
# localhost which is more compatible and is not less secure.
bind-address		= 127.0.0.1
#
# * Fine Tuning
#
max_connections		= 100
connect_timeout		= 5
wait_timeout		= 600
max_allowed_packet	= 64M
thread_cache_size       = 128
sort_buffer_size	= 4M
bulk_insert_buffer_size	= 16M
tmp_table_size		= 32M
max_heap_table_size	= 32M
#
# * MyISAM
#
# This replaces the startup script and checks MyISAM tables if needed
# the first time they are touched. On error, make copy and try a repair.
myisam_recover_options = BACKUP
key_buffer_size		= 500M
#open-files-limit	= 2000
table_open_cache	= 400
myisam_sort_buffer_size	= 512M
concurrent_insert	= 2
read_buffer_size	= 2M
read_rnd_buffer_size	= 1M
#
# * Query Cache Configuration
#
# Cache only tiny result sets, so we can fit more in the query cache.
query_cache_limit		= 128K
query_cache_size		= 64M
# for more write intensive setups, set to DEMAND or OFF
#query_cache_type		= DEMAND
#
# * Logging and Replication
#
# Both location gets rotated by the cronjob.
# Be aware that this log type is a performance killer.
# As of 5.1 you can enable the log at runtime!
#general_log_file        = /var/log/mysql/mysql.log
#general_log             = 1
#
# Error logging goes to syslog due to /etc/mysql/conf.d/mysqld_safe_syslog.cnf.
#
# we do want to know about network errors and such
log_warnings		= 2
#
# Enable the slow query log to see queries with especially long duration
#slow_query_log[={0|1}]
slow_query_log_file	= /var/log/mysql/mariadb-slow.log
long_query_time = 10
#log_slow_rate_limit	= 1000
log_slow_verbosity	= query_plan

#log-queries-not-using-indexes
#log_slow_admin_statements
#
# The following can be used as easy to replay backup logs or for replication.
# note: if you are setting up a replication slave, see README.Debian about
#       other settings you may need to change.
#server-id		= 1
#report_host		= master1
#auto_increment_increment = 2
#auto_increment_offset	= 1
log_bin			= /var/log/mysql/mariadb-bin
log_bin_index		= /var/log/mysql/mariadb-bin.index
# not fab for performance, but safer
#sync_binlog		= 1
expire_logs_days	= 10
max_binlog_size         = 100M
# slaves
#relay_log		= /var/log/mysql/relay-bin
#relay_log_index	= /var/log/mysql/relay-bin.index
#relay_log_info_file	= /var/log/mysql/relay-bin.info
#log_slave_updates
#read_only
#
# If applications support it, this stricter sql_mode prevents some
# mistakes like inserting invalid dates etc.
#sql_mode		= NO_ENGINE_SUBSTITUTION,TRADITIONAL
#
# * InnoDB
#
# InnoDB is enabled by default with a 10MB datafile in /var/lib/mysql/.
# Read the manual for more InnoDB related options. There are many!
default_storage_engine	= InnoDB
innodb_buffer_pool_size	= 3000M
innodb_log_buffer_size	= 8M
innodb_file_per_table	= 1
innodb_open_files	= 400
innodb_io_capacity	= 400
innodb_flush_method	= O_DIRECT
#
# * Security Features
#
# Read the manual, too, if you want chroot!
# chroot = /var/lib/mysql/
#
# For generating SSL certificates I recommend the OpenSSL GUI "tinyca".
#
# ssl-ca=/etc/mysql/cacert.pem
# ssl-cert=/etc/mysql/server-cert.pem
# ssl-key=/etc/mysql/server-key.pem

#
# * Galera-related settings
#
[galera]
# Mandatory settings
#wsrep_on=ON
#wsrep_provider=
#wsrep_cluster_address=
#binlog_format=row
#default_storage_engine=InnoDB
#innodb_autoinc_lock_mode=2
#
# Allow server to accept connections on all interfaces.
#
#bind-address=0.0.0.0
#
# Optional setting
#wsrep_slave_threads=1
#innodb_flush_log_at_trx_commit=0

[mysqldump]
quick
quote-names
max_allowed_packet	= 64M

[mysql]
default-character-set = utf8mb4
#max_allowed_packet=64M
#no-auto-rehash	# faster start of mysql but no tab completion

[isamchk]
key_buffer		= 16M

#
# * IMPORTANT: Additional settings that can override those from this file!
#   The files must end with '.cnf', otherwise they'll be ignored.
#
!includedir /etc/mysql/conf.d/
```

Now save, exit and restart database services

```
sudo service mysql restart
```

**8. Install Redis Server**

```
sudo apt-get install redis-server
```

**9. Install NodeJs**

```
sudo apt install curl 
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
source ~/.profile
nvm install 14.15.0  
```

**10. Install Yarn**

```
sudo apt-get install npm

sudo npm install -g yarn
```

**11. Install wkhtmltopdf & Fonts**

```
sudo apt -y install libxrender1 libxext6 xfonts-75dpi xfonts-base
```

**12. Install Frappe Bench**

```
sudo -H pip3 install frappe-bench

bench --version
```

**13. Initialise Frappe Bench & Install Frappe Latest Version**

```
bench init frappe-bench 

cd frappe-bench/
bench start
```

**14. Create Site Using Frappe Bench**

```
bench new-site blog.goonline.dev

bench use blog.goonline.dev
```

**15. Install ERPNext in Bench & Install on Site**

```
bench get-app erpnext --branch version-13

#Or

bench get-app https://github.com/frappe/erpnext --branch version-13

bench --site blog.goonline.dev install-app erpnext

bench start
```