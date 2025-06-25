import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Status } from "../../types";

export interface User {
  name: string;
  email: string;
  github: string;
  status: Status;
}

export type UserId = string;

export interface UserWithId extends User {
  id: UserId;
}

const DEFAULT_STATE: UserWithId[] = [
  {
    id: "1",
    name: "Viola Amherd",
    email: "viola.amherd@yahoo.com",
    github: "@viola534",
    status: "on-time",
  },
  {
    id: "2",
    name: "Jules Kramer",
    email: "jules.kramer@gmail.com",
    github: "@julesK",
    status: "retrasado",
  },
  {
    id: "3",
    name: "Naomi Fujimoto",
    email: "naomi.fuji@outlook.com",
    github: "@nao_fuji",
    status: "adelantado",
  },
  {
    id: "4",
    name: "Leonhard Maier",
    email: "leonhard.maier@hotmail.com",
    github: "@leo_dev",
    status: "on-time",
  },
  {
    id: "5",
    name: "Carmen Ortega",
    email: "carmen.ortega@live.com",
    github: "@car_ort",
    status: "retrasado",
  },
  {
    id: "6",
    name: "Tariq El-Bashir",
    email: "tariq.eb@gmail.com",
    github: "@tariqBash",
    status: "adelantado",
  },
  {
    id: "7",
    name: "Elsa Aguilera",
    email: "elsa.nordstrom@protonmail.com",
    github: "@elsanord",
    status: "on-time",
  },
];

//Se llama a una funcion anonima que se autoejecuta para llenar una variable
const initialState: UserWithId[] = (() => {
  const persistedstate = localStorage.getItem("_redux__state");
  if (persistedstate) {
    return JSON.parse(persistedstate).users;
  }
  return DEFAULT_STATE;
})();

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addNewUser: (state, action: PayloadAction<User>) => {
      const id = crypto.randomUUID();
      //esta es una forma muy sencilla de mutar estados
      state.push({ id, ...action.payload }); // esta es la forma mas sencilla utilizando react.redux
      //return [...state, { id, ...action.payload }]; //esta es una forma adicional
    },
    deleteUserById: (state, action: PayloadAction<UserId>) => {
      const id = action.payload;
      return state.filter((user: UserWithId) => user.id !== id);
    },
    rollbackUser: (state, action: PayloadAction<UserWithId>) => {
      const isUserAlreadyDefined = state.some(
        (user) => user.id === action.payload.id,
      );
      if (!isUserAlreadyDefined) {
        return [...state, action.payload];
      }
    },
  },
});

export default usersSlice.reducer;

export const { deleteUserById, addNewUser, rollbackUser } = usersSlice.actions;
