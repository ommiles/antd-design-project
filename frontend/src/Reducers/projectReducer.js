const initialState = {
  projects: [],
  loading: false,
  errors: false,
};

export default function projectsReducer(state = initialState, action) {
  switch (action.type) {
    case '':
      return '';
    default:
      return state;
  }
}
