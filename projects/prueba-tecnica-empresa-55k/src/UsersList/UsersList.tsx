import { type User } from "../types";
import { SortBy } from "../types.d";

interface UsersListProps {
  deleteUser: (email: string) => void;
  showColors: boolean;
  users: User[];
  setSorting: (sortType: SortBy) => void;
}

export function UsersList({
  users,
  showColors,
  deleteUser,
  setSorting,
}: UsersListProps) {
  return (
    <table style={{ width: "100%" }}>
      <thead>
        <tr>
          <th>Foto</th>
          <th className="pointer" onClick={() => setSorting(SortBy.NAME)}>
            Nombre
          </th>
          <th className="pointer" onClick={() => setSorting(SortBy.LAST)}>
            Apellido
          </th>
          <th className="pointer" onClick={() => setSorting(SortBy.COUNTRY)}>
            País
          </th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => {
          const backgroundColor = index % 2 === 0 ? "#333" : "#555";
          const color = showColors ? backgroundColor : "transparent";

          return (
            <tr key={user.email} style={{ backgroundColor: color }}>
              <td>
                <img src={user.picture.thumbnail} />
              </td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td>
                <button
                  onClick={() => {
                    deleteUser(user.email);
                  }}
                >
                  Borrar
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

// table, thead, tbody <= Estos son la clave para hacer una tabla
// tr es la fila
// td es la celda
// th celdas del header
