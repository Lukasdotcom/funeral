"use client";

import { login } from "./actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";

export default function Login() {
  // You pass your ServerAction and an initial state to `useFormState`
  const [state, formAction] = useActionState(login, {
    error: "",
  });

  return (
    <form
      action={formAction}
      className="max-w-md mx-auto p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-md"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="password">Passwort</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Geben Sie Ihr passwort ein"
          />
          {state.error !== "" && <p className="text-red-500">{state.error}</p>}
        </div>

        <Button type="submit" className="w-full">
          Anmelden
        </Button>
      </div>
    </form>
  );
}
