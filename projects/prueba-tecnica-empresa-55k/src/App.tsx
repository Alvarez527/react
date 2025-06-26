import { useEffect, useState, useRef, useMemo } from "react";
import "./App.css";
import { SortBy, type User } from "./types.d";
import { UsersList } from "./UsersList/UsersList";

function App() {
  const [users, setUsers] = useState<User[]>([]);

  const [showColors, setShowColors] = useState(false);

  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);
  const [filterCountry, setFilterCountry] = useState<string | null>(null);
  const originalUsers = useRef<User[]>([]);
  // useRef es para guardar un valor
  // que queremos que se comparta entre renderizados
  // pero que al cambiar, no vuelva a renderizar el componente

  // const toggleSortByCountry = () => {
  //   const newSortingValue =
  //     sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE;
  //   setSorting(newSortingValue);
  // };

  const changeSorting = (sortType: SortBy) => {
    setSorting(sortType);
  };

  const toggleColor = () => {
    setShowColors(!showColors);
  };

  const handleReset = () => {
    setUsers(originalUsers.current);
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

  //const sortedUsers = sortUsers();

  useEffect(() => {
    fetch("https://randomuser.me/api?results=100")
      .then(async (res) => await res.json())
      .then((res) => {
        setUsers(res.results);
        originalUsers.current = res.results;
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

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
          <UsersList
            deleteUser={handleDelete}
            showColors={showColors}
            users={sortedUsers}
            setSorting={setSorting}
          />
        </main>
      </div>
    </>
  );
}

export default App;
