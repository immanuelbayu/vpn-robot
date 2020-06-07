#!/bin/bash

randomVpn=(usla1 defr3 itco defr2 nlam2 itmi frpa2 cato2 kr2 nz mc tr jpto ph my aubr aupe mo cava ar)
randomNumber=$(( $RANDOM % 12 ));

expressvpn connect "${randomVpn[randomNumber]}"


if [ "Already connected! Please disconnect first" ]; then
    expressvpn disconnect
    expressvpn connect "${randomVpn[randomNumber]}"
	fi