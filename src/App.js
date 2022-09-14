import { Route, Routes } from "react-router-dom";
import routes from "./routes/routes";
import { useState } from "react";
import { useEffect } from "react";
import { Login } from "./pages/Login";

function App() {
  const [token, setToken] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(true);
    }
  }, []);

  return (
    <Routes>
      {routes.map((route) => {
        if (route.auth) {
          return (
            <Route
              {...route}
              key={route.path}
              element={token ? route.element : <Login />}
            />
          );
        }
        return (
          <Route key={route.path} path={route.path} element={route.element} />
        );
      })}
    </Routes>
  );
}

export default App;
