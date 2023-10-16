import { DELETE_DOCUMENT, SET_DOCUMENTS, UPLOAD_DOCUMENT } from '../constants';

const initialState = {
  documents: [],
};

const documentReducer: any = (state = initialState.documents, action: any) => {
  switch (action.type) {
    case DELETE_DOCUMENT:
      return {uuid : action.payload}
    case SET_DOCUMENTS:
      return {documents : action.payload}
    case UPLOAD_DOCUMENT:
        return {documents : action.payload}  
    default:
      return state;
  }
};

const rootReducer = documentReducer

export default rootReducer;
