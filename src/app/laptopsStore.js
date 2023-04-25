import { configureStore } from '@reduxjs/toolkit';
import reduxSlice from './features/reduxSlice';



export default configureStore({
    reducer: {
        laptopData: reduxSlice
    }
})