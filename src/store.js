import { createStore } from 'redux';

const initialState = {
  loggedIn: false,
  username: '',
  searchQuery: '',
  min: 0,
  max: 0,
  advancedSearch: false,
  items: [],
  sellers: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { ...state, loggedIn: true, username: action.username };
    case 'LOGOUT':
      return { ...state, loggedIn: false, username: '' };
    case 'QUERY':
      return { ...state, searchQuery: action.q };

    case 'MINIMUM-PRICE':
      return { ...state, min: action.price };

    case 'MAXIMUM-PRICE':
      return { ...state, max: action.price };

    case 'CLEAR':
      return { ...state, searchQuery: '' };

    case 'ADVANCED-SEARCH':
      return { ...state, advancedSearch: !state.advancedSearch };

    case 'SET_ITEMS':
      return { ...state, items: action.items };

    case 'ADD_ITEM':
      return { ...state, items: state.items.concat(action.item) };

    case 'SET_SELLERS':
      return { ...state, sellers: action.sellers };

    default:
      return state;
  }
}

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
