import {combineReducers} from 'redux';
import storeSlice from '../slices/stores';

import userSlice from '../slices/user';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  stores: storeSlice.reducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
