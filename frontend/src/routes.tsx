import App from "./App";
import ShowPost from "./components/posts/ShowPost";
import CreatePost from "./components/posts/CreatePost";
import IndexPosts from "./components/posts/IndexPosts";
import Login from "./components/authorization/Login";

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