import { createSlice } from '@reduxjs/toolkit';
export const aboutUsSlice = createSlice({
    name: 'about',
    initialState: {
        activeSlide: 'plant_trees',
        playPause: 'play',
        verbiage: 'we do not plant trees',
    },
    reducers: {
        changeSlide: (state, action) => {
            state.activeSlide = action.payload.activeSlide;
            state.verbiage = action.payload.verbiage;            
        },
        playPauseToggle: (state) => {
            state.playPause == 'play' ? state.playPause = 'pause' : state.playPause = 'pause'
        },
    },
})
export const { changeSlide, playPauseToggle } = aboutUsSlice.actions; 
export default aboutUsSlice.reducer;
export const activeSlide = state => state.about.activeSlide;
export const verbiage = state => state.about.verbiage;
export const playPause = state => state.about.playPause;