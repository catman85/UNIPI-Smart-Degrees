#! /bin/sh

cd frontend/
xterm -e npm run serve --hold &
cd ../
xterm -e expect trufflexp.exp --hold &
sleep 25
cp build/contracts/Degrees.json frontend/src/assets/Degrees.json
