import App from "./App";
import Show from "./components/Show";
import Create from "./components/Create";

const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "posts/:id",
    element: <Show />,
  },
  {
    path: "posts/new",
    element: <Create />,
  }
];

export default routes;