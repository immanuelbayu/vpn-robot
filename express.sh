#!/bin/bash

randomVpn=(id1 smart jpto1 ausy2 usla1 ukel nlam defr1 itmi se1 krsk uz1)
randomNumber=$(( $RANDOM % 12 ));

#echo "${randomNumber}"
#echo "${myArray[randomNumber]}"

#if [$randomNumber -eq "idn"];  then
	#expressvpn disconnect
#else 
	expressvpn connect "${randomVpn[randomNumber]}"
#fi

if [ "Already connected! Please disconnect first" ]; then
    expressvpn disconnect
    expressvpn connect "${randomVpn[randomNumber]}"
	fi

#expressvpn connect smart
#expressvpn disconnect
#expressvpn connect ph1