import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUsersFromAPI } from "../../services/api";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetchUsersFromAPI();
  return response;
});

const initialState = {
  users: [],
  status: "idle",
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      let newId = 1;
      if (state.users.length > 0) {
        const ids = state.users.map((user) => user.id);
        newId = Math.max(...ids) + 1;
      }

      const newUser = {
        id: newId,
        ...action.payload,
      };
      state.users.push(newUser);
    },

    updateUser: (state, action) => {
      const userIndex = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      if (userIndex >= 0) {
        state.users[userIndex] = action.payload;
      }
    },

    deleteUser: (state, action) => {
      const filteredUsers = state.users.filter(
        (user) => user.id !== action.payload
      );
      state.users = filteredUsers;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.users = action.payload;
    });

    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const { addUser, updateUser, deleteUser } = usersSlice.actions;

export default usersSlice.reducer;
