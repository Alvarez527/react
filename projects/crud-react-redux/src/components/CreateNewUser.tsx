import React from "react";
import { useState } from "react";
import { Button, Card, TextInput, Title, Badge } from "@tremor/react";
import { useUserActions } from "../hooks/useUserActions";
import { type Status } from "../types";

export function CreateNewUser() {
  const { addUser } = useUserActions();

  const [result, setResult] = useState<"ok" | "ko" | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const github = formData.get("github") as string;
    const status = formData.get("status") as Status;

    if (!name || !email || !github) {
      // validaciones que tu quieras
      return setResult("ko");
    }

    addUser({ name, email, github, status });
    setResult("ok");
    form.reset();
  };

  return (
    <Card style={{ marginTop: "16px" }}>
      <Title>Create New User</Title>

      <form className="" onSubmit={handleSubmit}>
        <TextInput name="name" placeholder="Aqui el nombre" />
        <TextInput name="email" placeholder="Aqui el mail" />
        <TextInput name="github" placeholder="Aqui el usuario de GitHub" />
        <TextInput name="status" placeholder="Cual es el estado?" />
        <div>
          <Button type="submit" style={{ marginTop: "16px" }}>
            Crear Usuario
          </Button>
          <span>
            {result === "ok" && (
              <Badge color="green">Guardado correctamente</Badge>
            )}
            {result === "ko" && <Badge color="red">Error con los campos</Badge>}
          </span>
        </div>
      </form>
    </Card>
  );
}
