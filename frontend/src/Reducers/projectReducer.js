const initialState = {
  projects: [],
  loading: false,
  errors: false,
};

export default function projectsReducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_PROJECTS_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'FETCH_PROJECTS_SUCCESS':
      return {
        projects: action.projects,
        loading: false,
        errors: false,
      };
    default:
      return state;
  }
}
