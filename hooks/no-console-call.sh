#!/bin/bash

echo "Checking for console calls..."

NEW_LINE_WITH_CONSOLE_NUMBER=$(git diff HEAD | grep -c -E "^\+.*console\..*$")
MESSAGE="You cannot commit code using the native javascript console object, I found $NEW_LINE_WITH_CONSOLE_NUMBER console method call occurence(s)."

if [ $NEW_LINE_WITH_CONSOLE_NUMBER -gt 0 ] ; then
  printf "\033[1;31m$MESSAGE\033[0m\n"
  exit 1
else
  exit 0
fi
