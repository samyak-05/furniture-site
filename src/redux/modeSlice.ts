import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IModeState {
  currentMode: "gold" | "platinum";
}

const initialState: IModeState = {
  currentMode: "gold", 
};

const modeSlice = createSlice({
  name: "mode",
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<"gold" | "platinum">) => {
      state.currentMode = action.payload;
    },
  },
});

export const { setMode } = modeSlice.actions;
export default modeSlice.reducer;