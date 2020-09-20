import { SIGN_IN, SIGN_OUT,CURRENT_PERSON } from '../actions/types';

const INTIAL_STATE = {
  isSignedIn: null,
  userId: null,
  currentPerson:null
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isSignedIn: true, userId: action.payload };
    case SIGN_OUT:
      return { ...state, isSignedIn: false, userId: null };
    case CURRENT_PERSON:
      return {...state,currentPerson:action.payload};
    default:
      return state;
  }
};
