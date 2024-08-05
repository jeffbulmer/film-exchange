import {configureStore} from '@reduxjs/toolkit'
import playerReducer from '../../src/features/players/playerSlice'


export default configureStore({
    reducer: {
        players: playerReducer,
    },
})