//Import pages
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { NoMatch } from "../pages/NoMatch";
import { TodoList } from "../pages/TodoList";

const rotas = [
  { path: "/", element: <Login /> },
  { path: "/home", element: <Home />, auth: true },
  { path: "/todo/:id", element: <TodoList />, auth: true },

  { path: "*", element: <NoMatch /> },
];

export default rotas;
