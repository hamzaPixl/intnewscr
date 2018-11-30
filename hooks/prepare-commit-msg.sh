#!/bin/bash

echo "Modify commit message: "

COMMIT_MESSAGE=$1

echo "$COMMIT_MESSAGE"

printf "[INTNEWSCR] $(cat $COMMIT_MESSAGE)" > COMMIT_MESSAGE
