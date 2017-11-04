function validateResult(results){
  if(!results){
    return false;
  }
  if(results.length === 0){
    return false;
  }
  return true;
}

function filterValid(results, model){
  return results.filter((result) => {
    model.fromdbPayload(result);
    return model.isValid();
  });
}

module.exports = {
  validateResult,
  filterValid,
};