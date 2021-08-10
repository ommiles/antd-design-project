export const fetchProjects = () => {
  return dispatch => {
    dispatch({ type: 'FETCH_PROJECTS_REQUEST' });
    fetch('http://127.0.0.1:3000/api/v1/projects')
      .then(res => res.json())
      .then(projects => dispatch({ type: 'FETCH_PROJECTS_SUCCESS', projects }))
      .catch(console.log);
  };
};
