echo -e "\033[31m---------------------------\033[0m"
echo -e "\033[31m Try to build project\033[0m"
echo -e "\033[31m---------------------------\033[0m"

sudo rm -R .gradle
sudo rm -R build

GRADLE_PATH="$PWD/gradle-2.4"
PATH="$GRADLE_PATH/bin:$PATH"
gradle build

echo -e "\033[31m---------------------------\033[0m"
echo -e "\033[31m Run project\033[0m"
echo -e "\033[31m---------------------------\033[0m"

sudo service mongodb restart
sudo service nginx restart

java -jar ./build/libs/*.jar
