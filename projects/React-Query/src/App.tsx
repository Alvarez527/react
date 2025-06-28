import { useEffect, useState, useMemo } from "react";
import "./App.css";
import { SortBy } from "./types.d";
import { UsersList } from "./UsersList/UsersList";
import { useUsers } from "./hooks/useUsers";
import { Results } from "./components/Results";
import { type User } from "./types.d"; // Asegúrate de que la ruta sea correcta

// Este es el bloque de React Query

function App() {
  const { isLoading, isError, usersReceived, fetchNextPage, hasNextPage } =
    useUsers();

  const [users, setUsers] = useState<User[]>([]);
  const [showColors, setShowColors] = useState(false);
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);
  const [filterCountry, setFilterCountry] = useState<string | null>(null);

  console.log("users", users);
  console.log("usersReceived", usersReceived);

  const changeSorting = (sortType: SortBy) => {
    setSorting(sortType);
  };

  const toggleColor = () => {
    setShowColors(!showColors);
  };

  const handleReset = () => {
    setUsers(usersReceived);
  };

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => {
      return user.email != email;
    });

    setUsers(filteredUsers);
  };

  const filteredUsers = useMemo(() => {
    console.log("filteredUsers");
    return typeof filterCountry === "string" && filterCountry.length > 0
      ? users.filter((user) => {
          return user.location.country
            .toLowerCase()
            .includes(filterCountry.toLowerCase());
        })
      : users;
  }, [users, filterCountry]);

  const sortedUsers = useMemo(() => {
    console.log("sortUsers");
    return sorting != SortBy.NONE
      ? [...filteredUsers].sort((a, b) => {
          //users.toSorted tambien se puede usar esta forma ya que regresa una copia sin modificar el actual
          switch (sorting) {
            case SortBy.NAME:
              return a.name.first.localeCompare(b.name.first);
            case SortBy.LAST:
              return a.name.last.localeCompare(b.name.last);
            case SortBy.COUNTRY:
              return a.location.country.localeCompare(b.location.country);
            default:
              return 0;
          }
        })
      : filteredUsers;
  }, [filteredUsers, sorting]);

  useEffect(() => {
    setUsers(usersReceived);
  }, [usersReceived]);

  return (
    <>
      <div className="App">
        <h1>Prueba técnica</h1>
        <header>
          <button onClick={toggleColor}>Colorear filas</button>
          <button onClick={handleReset}>Reset</button>
          <input
            placeholder="Filtra por pais"
            onChange={(e) => setFilterCountry(e.target.value)}
          />
        </header>
        <main>
          {users.length > 0 && (
            <div className="sorting">
              <Results />
              <button onClick={() => changeSorting(SortBy.NAME)}>
                Ordenar por nombre
              </button>
              <button onClick={() => changeSorting(SortBy.LAST)}>
                Ordenar por apellido
              </button>
              <button onClick={() => changeSorting(SortBy.COUNTRY)}>
                Ordenar por país
              </button>
              <button onClick={() => changeSorting(SortBy.NONE)}>
                Quitar ordenación
              </button>
              <UsersList
                deleteUser={handleDelete}
                showColors={showColors}
                users={sortedUsers}
                setSorting={setSorting}
              />

              {!isLoading && !isError && hasNextPage === true && (
                <button
                  onClick={async () => {
                    await fetchNextPage();
                  }}
                >
                  Cargar mas resultados
                </button>
              )}
            </div>
          )}
          {isLoading && <p>Cargando...</p>}
          {isError && <p>Error: {isError}</p>}
          {!isLoading && !isError && users.length === 0 && (
            <p>No hay usuarios para mostrar</p>
          )}
        </main>
      </div>
    </>
  );
}

export default App;
