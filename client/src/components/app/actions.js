export const LOGGING_IN = 'LOGGING_IN';
export const userRequest = () => ({
  type: LOGGING_IN,
  loading: true
});

export const SET_USER = 'SET_USER';
export const setUser = (currentUser, statusCode) => ({
  type: SET_USER,
  currentUser,
  loading: false,
  statusCode
});

export const fetchUser = accessToken => dispatch => {
  dispatch(userRequest());
  return fetch('/api/me', {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
    .then(res => {
      if (!res.ok) {
        if (res.status === 401) {
          dispatch(setUser(null, res.status));
          return;
        } else {
          dispatch(setUser(null, 500));
        }
        throw new Error(res.statusText);
      }
      return res.json();
    })
    .then(currentUser => {
      dispatch(setUser(currentUser, 200));
      return;
    })
    .catch(err => {
      throw new Error(err);
    });
}