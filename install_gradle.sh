#!/usr/bin/expect
set timeout 2
spawn sudo apt-get remove gradle
expect "*n]" {send "Y\r"}
spawn scp git@test.yuan25.com:~/gradle-2.4-bin.zip ./
expect "*no)?" {send "yes\r"}
expect "*password:" {send "Tornado\r"}
interact

