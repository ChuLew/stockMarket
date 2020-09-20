import { CREATE_PERSON, EDIT_HOLDING} from '../actions/types';


export default (state = {}, action) => {
  switch (action.type) {
    case CREATE_PERSON:
        return { ...state, [action.payload.id]: action.payload };
    case EDIT_HOLDING:
      return { ...state, holdings: false, userId: null };
    default:
      return state;
  }
};
