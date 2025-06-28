import { useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUsers } from "../services/users";
import { type FetchUsersResponse } from "../types.d";

const useUsers = () => {
  const { isLoading, isError, data, refetch, fetchNextPage, hasNextPage } =
    useInfiniteQuery<FetchUsersResponse>(
      ["users"],
      fetchUsers,

      // Aqui se indica como estara la estructura de la información
      {
        getNextPageParam: (lastPage) => {
          // lastPage es el ultimo resultado de la consulta
          // pages es un array con todos los resultados anteriores
          return lastPage.nextCursor;
        },
        refetchOnWindowFocus: false, // No volver a cargar al enfocar la ventana, evita hacer refetching al cambiar de pestaña
        staleTime: Infinity, // o puede ser 1000*3 (3seg) Infinity  Mantiene los datos frescos indefinidamente, no se volverán a cargar hasta que se haga un refetch manual
      },
    );

  const usersReceived = useMemo(() => {
    return data?.pages.flatMap((page) => page.users) ?? [];
  }, [data]);

  return {
    isLoading,
    isError,
    usersReceived,
    refetch,
    fetchNextPage,
    hasNextPage,
  };
};

export { useUsers };
