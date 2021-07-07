---
title: MySQL_0(uninstall and install)
description: 'Uninstall:'
date: ''
categories: []
keywords: []
slug: ''
---

  

#### Uninstall:

*   Open a terminal window
*   Use mysqldump to backup your databases to text files! (skipped)
*   Stop the database server
*   `sudo rm -rf /usr/local/mysql*`
*   `sudo rm -rf /Library/StartupItems/MySQLCOM`
*   `sudo rm -rf /Library/PreferencePanes/My*`
*   `rm -rf ~/Library/PreferencePanes/My*`
*   `sudo rm -rf /Library/Receipts/mysql*`
*   `sudo rm -rf /Library/Receipts/MySQL*`
*   `sudo rm -rf /**private**/var/db/receipts_/*mysql*_`

#### Install:

[https://dev.mysql.com/doc/refman/8.0/en/osx-installation-pkg.html](https://dev.mysql.com/doc/refman/8.0/en/osx-installation-pkg.html)