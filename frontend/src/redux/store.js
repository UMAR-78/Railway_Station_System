import {configureStore} from "@reduxjs/toolkit"
import { userReducer } from "./reducers/Userreducers";

const store  = configureStore(
    {
        reducer:
        {
            user : userReducer

        }
    }
) 

export default store;