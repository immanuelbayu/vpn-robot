#!/bin/bash

randomVpn=(id1 smart jpto1 ausy2 usla1 ukel nlam defr1 itmi se1 krsk uz1)
randomNumber=$(( $RANDOM % 12 ));

expressvpn connect "${randomVpn[randomNumber]}"


if [ "Already connected! Please disconnect first" ]; then
    expressvpn disconnect
    expressvpn connect "${randomVpn[randomNumber]}"
	fi