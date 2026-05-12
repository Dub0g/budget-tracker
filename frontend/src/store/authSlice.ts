import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { AuthState } from '../types'

const initialState: AuthState = {
  
  token: null,
  isAuthenticated: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      // збережи токен в state
      // встанови isAuthenticated в true
        state.token = action.payload
        state.isAuthenticated = true
    },
    logout: (state) => {
      // очисти токен
      // встанови isAuthenticated в false
      state.token = null
      state.isAuthenticated = false
    },
  },
})

export const { setToken, logout } = authSlice.actions
export default authSlice.reducer