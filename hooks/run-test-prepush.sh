#!/bin/sh

current_branch=$(git symbolic-ref HEAD | sed -e 's,.*/\(.*\),\1,')
pass=true

if [ $current_branch = "devlop" ] || [ $current_branch = "master" ]; then
  npm test
  if [ $? != 0 ]; then
    pass=false
  fi
fi

if $pass; then
  exit 0
else
  echo ""
  echo "PUSH FAILED:"
  echo "Some tests fail. Please fix them and try pushing again."
  exit 1
fi
