import { createSlice } from "@reduxjs/toolkit";

//Get TodoList Intial Values
const getIntialTodo = () => {
  const localTodoList = window.localStorage.getItem("TodoList");
  if (localTodoList) {
    return JSON.parse(localTodoList);
  } else {
    window.localStorage.setItem("TodoList", JSON.stringify([]));
    return [];
  }
};

//Intial Values
const IntialValue = {
  FilterStatus: "All",
  TodoList: getIntialTodo(),
  SearchFilter: "",
};

//Slice
const Slice = createSlice({
  name: "Todo",
  initialState: IntialValue,

  //Reducers
  reducers: {
    AddTodo: (state, action) => {
      state.TodoList.push(action.payload);
      const TodoList = window.localStorage.getItem("TodoList");
      if (TodoList) {
        const TodoListParse = JSON.parse(TodoList);
        TodoListParse.push({
          ...action.payload,
        });
        window.localStorage.setItem("TodoList", JSON.stringify(TodoListParse));
      } else {
        window.localStorage.setItem(
          "TodoList",
          JSON.stringify({ ...action.payload })
        );
      }
    },
    DeleteTodo: (state, action) => {
      const TodoList = window.localStorage.getItem("TodoList");
      if (TodoList) {
        const TodoListParse = JSON.parse(TodoList);
        const TodoFiltered = TodoListParse.filter(
          (Todo) => Todo.id !== action.payload
        );
        window.localStorage.setItem("TodoList", JSON.stringify(TodoFiltered));
        state.TodoList = TodoFiltered;
      }
    },
    EditTodo: (state, action) => {
      const TodoList = window.localStorage.getItem("TodoList");
      if (TodoList) {
        const TodoListParse = JSON.parse(TodoList);
        TodoListParse.map((TodoItem) => {
          if (TodoItem.id === action.payload.id) {
            TodoItem.Title = action.payload.Title;
            TodoItem.status = action.payload.Status;
            TodoItem.Description = action.payload.Description;
            TodoItem.DeadlineDate = action.payload.DeadLine;
            TodoItem.Emoji = action.payload.Emoji;
            window.localStorage.setItem(
              "TodoList",
              JSON.stringify(TodoListParse)
            );
            state.TodoList = TodoListParse;
          }
        });
      }
    },
    ActiveTodo: (state, action) => {
      const TodoList = window.localStorage.getItem("TodoList");
      if (TodoList) {
        const TodoListParse = JSON.parse(TodoList);
        TodoListParse.map((TodoItem) => {
          if (TodoItem.id === action.payload.id) {
            TodoItem.Status = action.payload.IsCompleted;
            window.localStorage.setItem(
              "TodoList",
              JSON.stringify(TodoListParse)
            );
            state.TodoList = TodoListParse;
          }
        });
      }
    },
    PinTodo: (state, action) => {
      const TodoList = window.localStorage.getItem("TodoList");
      if (TodoList) {
        const TodoListParse = JSON.parse(TodoList);
        TodoListParse.map((TodoItem) => {
          if (TodoItem.id === action.payload.id) {
            TodoItem.IsPinned = action.payload.IsPinned;
            window.localStorage.setItem(
              "TodoList",
              JSON.stringify(TodoListParse)
            );
            state.TodoList = TodoListParse;
          }
        });
      }
    },
    UpdateFilterStatus: (state, action) => {
      state.FilterStatus = action.payload;
    },
    UpdateSearchFilter: (state, action) => {
      state.SearchFilter = action.payload;
    },
  },
});

//Export actions
export const {
  AddTodo,
  DeleteTodo,
  EditTodo,
  ActiveTodo,
  UpdateFilterStatus,
  UpdateSearchFilter,
  PinTodo,
} = Slice.actions;

//Export Reducers
export default Slice.reducer;
