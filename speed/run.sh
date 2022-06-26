#!/bin/bash
cd `dirname $0`
filename=$(date +%Y%m%d%H%M).json
./speedtest -f json > ${filename}
python3 insort.py ${filename}
