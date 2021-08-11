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
    case 'SORT_PROJECTS':
      return {
        ...state,
        projects: action.newData,
      };
      case 'ADD_PROJECT':
        return {
          ...state,
          projects: [...state.projects, action.project],
        }
    case 'EDIT_PROJECTS':
      if (state.projects.findIndex) {
        let index = state.projects.findIndex(
          (project) => project.id === action.project.id
        );
        return {
          projects: [
            ...state.projects.slice(0, index),
            action.project,
            ...state.projects.slice(index + 1),
          ],
          loading: false,
          error: false,
        };
      } else {
        return { ...state, loading: false, error: false };
      }
      case 'DELETE_PROJECT':
        return {
          ...state,
          projects: state.projects.filter(item => item.id !== action.project.id),
        }
    default:
      return state;
  }
}
