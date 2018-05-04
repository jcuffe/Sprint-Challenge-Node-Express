module.exports = {
  intToBoolean,
  booleanToint,
  projectToBody,
  actionToBody,
};

function intToBoolean(int) {
  return int === 1 ? true : false;
}

function booleanToint(bool) {
  return bool === true ? 1 : 0;
}

function projectToBody(project) {
  let result = project

  if (project) {
    result = {
      ...project,
      completed: intToBoolean(project.completed),
    };

    if (project.actions) {
      result.actions = project.actions.map(action => ({
        ...action,
        completed: intToBoolean(action.completed),
      }));
    }
  }

  return result;
}

function actionToBody(action) {
  if (action) {
    return {
    ...action,
    completed: intToBoolean(action.completed),
    }
  }
}
