module.exports = {
  husky: {
    hooks: {
      'pre-commit': 'hooks/check-test-only.sh',
      'prepare-commit-msg': 'hooks/prepare-commit-msg.sh ${GIT_PARAMS}',
      'pre-push': 'hooks/check-no-console-call.sh && hooks/run-test-prepush.sh',
    },
  },
};
