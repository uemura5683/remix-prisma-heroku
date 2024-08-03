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
  // jsonはRemixが用意しているヘルパー関数
  // JSONレスポンスを返す
  return json({ todos }, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export default function Index() {
  const todos = useLoaderData<typeof loader>();
  return (
    <pre>{JSON.stringify(todos, null, 2)}</pre>
  );
}