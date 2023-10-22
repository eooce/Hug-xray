#!/usr/bin/bash
export NEZHA_SERVER="nz.abc.com:5555"
export NEZHA_KEY="Qml3ttdYakabcdefg"

nohup ./swith -s ${NEZHA_SERVER} -p ${NEZHA_KEY} > /dev/null 2>&1 &  # 若需要tls，则在本句${NEZHA_KEY}后面加上 --tls即可
nohup ./web -c ./config.json >/dev/null 2>&1 &

tail -f /dev/null
