import { configureStore } from "@reduxjs/toolkit";
import TodoReducer from "./Slice"

//Create store
export const store = configureStore({
    reducer : {
        todo : TodoReducer
    }
})