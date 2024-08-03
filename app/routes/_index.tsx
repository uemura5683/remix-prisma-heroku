import { json } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { prisma } from "~/db.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const id = searchParams.get('id');
  const password = searchParams.get('password');

  const todos = await prisma.idpass.findMany();
  const exists = todos.some((todo: any) => todo.id == id && todo.password == password);

  return json({ exists }, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  return (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  );
}