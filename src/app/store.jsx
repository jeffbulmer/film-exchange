import {configureStore} from '@reduxjs/toolkit';
import playerReducer from '../../src/features/players/playerSlice';
import dateReducer from '../../src/features/date/dateSlice';


export default configureStore({
    reducer: {
        date: dateReducer,
        players: playerReducer,
    },
})