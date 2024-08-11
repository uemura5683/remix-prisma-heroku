import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { prisma } from "~/db.server";

export type Todo = {
  id: number;
  password: string;
}
type LoaderData = {
  exists: boolean;
  error: string;
};

export const loader = async ({ request }: LoaderFunctionArgs): Promise<LoaderData[]> => {
  const array: LoaderData[] = [];
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const id = searchParams.get('id');
  const password = searchParams.get('password');
  const todos: Todo[] = await prisma.idpass.findMany();
  const exists = todos.some((todo) => todo.id === Number(id) && todo.password === password);

  var error: string = '';
  switch(true) {
    case id === '' && password === '' && exists === false || id === null && password == null && exists === false:
      var error = "IDとパスワードを入力してください";
      break;
    case id === '' && exists === false:
      var error = "IDを入力してください";
      break;
    case password === '' && exists === false:
      var error = "パスワードを入力してください";      
      break;
    case id !== '' && password !== '' && exists === false:
      var error = "IDとPasswordが一致しません";
      break;
    default: 
      var error = "";
    break;
  }
  array.push({ exists, 'error': error })
  return array;
};
export default function Index() {
  const data = useLoaderData<typeof loader>();
  return (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  );
}