import { useUsers } from "../hooks/useUsers";

export const Results = () => {
  const { usersReceived } = useUsers();
  return (
    <div>
      <h3>Results {usersReceived.length}</h3>
    </div>
  );
};
