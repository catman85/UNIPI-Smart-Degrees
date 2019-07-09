#! /bin/sh

cd app-users/
xterm -e npm run serve --hold &
cd ../
xterm -e expect trufflexp.exp --hold &
sleep 20
cp build/contracts/Degrees.json app-users/src/assets/Degrees.json
