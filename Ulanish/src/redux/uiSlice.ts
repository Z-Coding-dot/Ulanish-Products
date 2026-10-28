import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
export type ToastMessage = { id: string; key: string; action?: 'update'; persistent?: boolean };
const slice = createSlice({
  name: 'ui',
  initialState: { searchOpen: false, installOpen: false, toasts: [] as ToastMessage[] },
  reducers: {
    setSearchOpen: (state, a: PayloadAction<boolean>) => {
      state.searchOpen = a.payload;
    },
    setInstallOpen: (state, a: PayloadAction<boolean>) => {
      state.installOpen = a.payload;
    },
    addToast: (state, a: PayloadAction<ToastMessage>) => {
      if (!state.toasts.some((t) => t.id === a.payload.id)) state.toasts.push(a.payload);
    },
    removeToast: (state, a: PayloadAction<string>) => {
      state.toasts = state.toasts.filter((t) => t.id !== a.payload);
    },
  },
});
export const { setSearchOpen, setInstallOpen, addToast, removeToast } = slice.actions;
export default slice.reducer;
