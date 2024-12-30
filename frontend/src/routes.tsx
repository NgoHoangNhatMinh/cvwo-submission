import App from "./App";
import ShowPost from "./components/ShowPost";
import CreatePost from "./components/CreatePost";

const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "posts/:id",
    element: <ShowPost />,
  },
  {
    path: "posts/new",
    element: <CreatePost />,
  }
];

export default routes;