#!/bin/bash
# TODO:
# make working directories: server, public, server/models server/api server/models
# create working files: app.js
#
# DEST=~/.profile
for A in "alias ns='npm start '" "alias gs='git status '" "alias ga='git add '" "alias gA='git add -A'" "alias gb='git branch '" "alias gc='git commit'" "alias gd='git diff'" "alias go='git checkout '" "alias gk='gitk --all&'" "alias gx='gitx --all'" "alias got='git '" "alias get='git '"; do
  echo ${A} >> ~/.profile;
  echo >> ~/.profile;
done
