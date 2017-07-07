#!/bin/bash
ps -e | grep chrome | sed 's/\(.[0-9]*\).*/\1/' | xargs kill
ps -e | grep firefox | sed 's/\(.[0-9]*\).*/\1/' | xargs kill