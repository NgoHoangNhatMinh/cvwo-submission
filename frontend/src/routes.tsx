import App from "./App";
import ShowPost from "./components/posts/ShowPost";
import CreatePost from "./components/posts/CreatePost";
import IndexPosts from "./components/posts/IndexPosts";
import Login from "./components/authorization/Login";
import Signup from "./components/authorization/Signup";
import Profile from "./components/profile/Profile";
import UserPosts from "./components/profile/UserPosts";
import UserComments from "./components/profile/UserComments";

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
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "user",
        element: <Profile />,
        children: [
          {
            path: "posts",
            element: <UserPosts />
          },
          {
            path: "comments",
            element: <UserComments />
          }
        ]
      },
    ]
  }
];

export default routes;