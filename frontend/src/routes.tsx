import App from "./App";
import ShowPost from "./components/ShowPost";
import CreatePost from "./components/CreatePost";
import IndexPosts from "./components/IndexPosts";
import Login from "./components/Login";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <IndexPosts/>
      },
      {
        path: "posts/:id",
        element: <ShowPost />,
      },
      {
        path: "posts/new",
        element: <CreatePost />,
      },
      {
        path: "login",
        element: <Login />,
      }
    ]
  }
];

export default routes;