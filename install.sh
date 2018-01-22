#!/bin/bash

#Author: Yuan
#Date: 2015-05-19 13:25:56
#Import :: This script should be run in the ubuntu

echo -e "\033[31m---------------------------\033[0m"
echo -e "\033[31m Updating\033[0m"
echo -e "\033[31m---------------------------\033[0m"

sudo apt-get update

echo -e "\033[31m---------------------------\033[0m"
echo -e "\033[31m Install tools\033[0m"
echo -e "\033[31m---------------------------\033[0m"

sudo apt-get install unzip
sudo apt-get install expect

echo -e "\033[31m---------------------------\033[0m"
echo -e "\033[31m Install open-jdk\033[0m"
echo -e "\033[31m---------------------------\033[0m"

sudo apt-get install default-jdk

echo -e "\033[31m---------------------------\033[0m"
echo -e "\033[31m Install mongodb\033[0m"
echo -e "\033[31m---------------------------\033[0m"

sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo "deb http://repo.mongodb.org/apt/ubuntu "$(lsb_release -sc)"/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

echo -e "\033[31m---------------------------\033[0m"
echo -e "\033[31m Install and config nginx\033[0m"
echo -e "\033[31m---------------------------\033[0m"

sudo apt-get install nginx
cp ./default.back ./default
sed -i '50a alias '$PWD/static/\; default
sudo cp ./default /etc/nginx/sites-enabled

echo -e "\033[31m---------------------------\033[0m"
echo -e "\033[31m Install gradle\033[0m"
echo -e "\033[31m---------------------------\033[0m"

expect install_gradle.sh
unzip gradle-2.4-bin.zip
rm gradle-2.4-bin.zip

#if [ $GRADLE_PATH ];
#then	echo "Adding path into bashrc.."
#	echo "GRADLE_PATH=\"$PWD/gradle-2.4\"" >> ~/.bashrc
#	echo "PATH=\"$GRADLE_PATH/bin:$PATH\"" >> ~/.bashrc
#	echo "Adding finished"
#fi

echo -e "\033[31m---------------------------\033[0m"
echo -e "\033[31m Try to build project\033[0m"
echo -e "\033[31m---------------------------\033[0m"

GRADLE_PATH="$PWD/gradle-2.4"
PATH="$GRADLE_PATH/bin:$PATH"
gradle build

echo -e "\033[31m---------------------------\033[0m"
echo -e "\033[31m Run project\033[0m"
echo -e "\033[31m---------------------------\033[0m"

sudo service mongodb restart
sudo service nginx restart

java -jar ./build/libs/*.jar 

