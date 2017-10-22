#!/bin/bash

PATTERN="describe\.only\|it\.only"
MESSAGE="You cannot commit this .only in your test"

files=$(git diff --name-only --cached ./test/)

if [[ $? != 0 ]]; then
    echo "Command failed."
elif [[ $files ]]; then
    if git diff --name-only --cached ./test/ | xargs -t grep -Hn --color=always $PATTERN; then
      echo ""
      echo $MESSAGE
      exit 1
    else
      exit 0
    fi
else
    echo "No files found."
fi
