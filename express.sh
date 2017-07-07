#!/bin/bash

randomVpn=(idn smart sgju sgcb hk2)
randomNumber=$(( $RANDOM % 4 ));

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