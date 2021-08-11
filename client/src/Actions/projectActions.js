export const fetchProjects = () => {
  return dispatch => {
    dispatch({ type: 'FETCH_PROJECTS_REQUEST' });
    fetch('http://127.0.0.1:3000/api/v1/projects')
      .then(res => res.json())
      .then(projects => dispatch({ type: 'FETCH_PROJECTS_SUCCESS', projects }))
      .catch(console.log);
  };
};

export const sortProjects = newData => {
  return dispatch => {
    dispatch({ type: 'SORT_PROJECTS', newData });
  };
};

export const addProject = () => {
  return dispatch => {
    fetch('http://localhost:3000/api/v1/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        project_name: '',
      }),
    })
      .then(resp => resp.json())
      .then(project => dispatch({ type: 'ADD_PROJECT', project }));
  };
};

export const editProject = (id, project_name) => {
  return dispatch => {
    fetch(`http://127.0.0.1:3000/api/v1/projects/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        project_name: project_name,
      }),
    })
      .then(resp => resp.json())
      .then(project => dispatch({ type: 'EDIT_PROJECTS', project }));
  };
};

export const deleteProject = id => {
  return dispatch => {
    fetch(`http://127.0.0.1:3000/api/v1/projects/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(resp => resp.json())
      .then(project => dispatch({ type: 'DELETE_PROJECT', project }));
  };
};
