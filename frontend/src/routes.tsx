import App from "./App";
import Show from "./components/Show";

const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "posts/:id",
    element: <Show />,
  },
];

export default routes;