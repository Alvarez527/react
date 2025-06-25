import { deleteUserById } from "../store/users/slice";
import { useAppDispatch } from "./store";
import type { UserId, UserWithId } from "../store/users/slice";
import { addNewUser } from "../store/users/slice";

export const useUserActions = () => {
  const dispatch = useAppDispatch();

  const removeUser = (id: UserId) => {
    dispatch(deleteUserById(id));
  };

  const addUser = ({ name, email, github, status }) => {
    dispatch(addNewUser({ name, email, github, status }));
  };

  return { removeUser, addUser };
};
