const initialState = {
  projects: [],
  loading: false,
  errors: false,
};

export default function projectsReducer(state = initialState, action) {
  switch (action.type) {
    case 'XYZ':
      return 'XYZ';
    default:
      return state;
  }
}
