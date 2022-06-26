#!/bin/bash
cd `dirname $0`

files=(`ls *.json`)
for i in ${files[@]};
do
    python3 insort.py $i
done
