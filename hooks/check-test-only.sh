#!/bin/bash

PATTERN="describe\.only\|it\.only"
MESSAGE="You cannot commit this .only in your test"

files=$(git diff --name-only --cached ./server/)

if [[ $? != 0 ]]; then
    echo "Command failed."
elif [[ $files ]]; then
    if git diff --name-only --cached ./server/ | xargs -t grep -Hn --color=always $PATTERN; then
        echo ""
        echo $MESSAGE
        exit 1
    else
        echo "No .only found in tests files, success"
        exit 0
    fi
else
    echo "Nothing change in tests files, success"
fi
