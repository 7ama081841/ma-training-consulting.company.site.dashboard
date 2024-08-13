import { legacy_createStore as createStore } from 'redux'

const initialState = {
  sidebarShow: true,
  theme: 'light',
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    default:
      return state
  }
}

const store = createStore(changeState)
export default store

// import { configureStore, createSlice } from '@reduxjs/toolkit'

// // Initial state
// const initialState = {
//   sidebarShow: true,
//   theme: 'light',
// }

// // Create a slice
// const uiSlice = createSlice({
//   name: 'ui',
//   initialState,
//   reducers: {
//     set(state, action) {
//       return { ...state, ...action.payload }
//     },
//   },
// })

// // Export actions
// export const { set } = uiSlice.actions

// // Configure the store
// const store = configureStore({
//   reducer: uiSlice.reducer,
// })

// export default store
