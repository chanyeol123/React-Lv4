import { createSlice } from "@reduxjs/toolkit";





const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            
        },
        removeTodo: (state, action) => {
            
        },
        switchTodo: (state, action) => {

        },
    },
});

export default todosSlice.reducer
export const { addTodo, removeTodo, switchTodo } = todosSlice.actions;




