import { configureStore, type Middleware } from "@reduxjs/toolkit";
import usersReducer from "./users/slice";
import { toast } from "sonner";
import { rollbackUser } from "./users/slice";

const persistanceLocalStorageMiddleware: Middleware =
  (store) => (next) => (action) => {
    //   console.log(store.getState());
    //   console.log(action);
    // Este bloque sucede antes del store
    next(action); // Aqui se ejecuta el store de Redux
    localStorage.setItem("_redux__state", JSON.stringify(store.getState()));
  };

const syncWithDatabaseMiddleware: Middleware =
  (store) => (next) => (action) => {
    const { type, payload } = action;

    //Obtener el estado antes de eliminar
    const previousState = store.getState();

    //Fase 1
    console.log({ type, payload });
    console.log(store.getState());
    next(action);

    //Fase 2
    if (type === "users/deleteUserById") {
      const userIdToRemove = previousState.users.find(
        (user) => user.id === payload,
      );
      fetch(`https://jsonplaceholder.typicode.asadda/users/${userIdToRemove}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.ok) {
            toast.success("User deleted successfully");
          }
          throw new Error("Error al eliminar el usuario");
        })
        .catch((err) => {
          toast.error(`Error deleting user ${action.payload}`);
          if (userIdToRemove) store.dispatch(rollbackUser(userIdToRemove));
          console.log(err);
        });
    }
  };

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
  middleware: [persistanceLocalStorageMiddleware, syncWithDatabaseMiddleware],
});

// Para enviar el tipado que es requerido por los estados o slices de redux
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
