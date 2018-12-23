to_branch=$1
if [ -z $to_branch ]; then
  to_branch="master" # default branch is master you can easily change it
fi

# try the upstream branch if possible, otherwise origin will do
UPSTREAM=$(git config --get remote.upstream.url)
ORIGIN=$(git config --get remote.origin.url)
if [ -z $UPSTREAM ]; then
  UPSTREAM=$ORIGIN
fi

organisation="hamzaPixl"
repo=$(basename `git rev-parse --show-toplevel`)
from_branch=$(git rev-parse --abbrev-ref HEAD)
open "https://github.com/$organisation/$repo/pull/new/$organisation:$to_branch...$organisation:$from_branch"

# usage
# ./create-pull-request.sh  -> create a pull request from your local branch to master
# ./create-pull-request.sh branch -> create a pull request from your local branch to branch
