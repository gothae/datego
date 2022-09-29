import {combineReducers} from 'redux';
import storeSlice from '../slices/stores';
import categorySlice from '../slices/category';
import userSlice from '../slices/user';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  stores: storeSlice.reducer,
  category: categorySlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
