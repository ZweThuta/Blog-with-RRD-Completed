import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./layout/Main";
import Error from "./pages/Error";
import Create from "./pages/Create";
import Edit from "./pages/Edit";

import { loader as logoutLoader } from "./pages/Logout";
import Posts, { loader as postsLoader } from "./pages/Posts";
import Details, {
  loader as detailLoader,
  action as deleteAction,
} from "./pages/Details";

import { action as postCreateAction } from "./components/PostForm";
import { action as postUpdateAction } from "./components/PostForm";
import Auth, { action as authAction } from "./pages/Auth";
import { checkTokenLoader, tokenLoader } from "./util/auth";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      id: "root",
      element: <Main />,
      errorElement: <Error />,
      loader: tokenLoader,
      children: [
        {
          index: true,
          element: <Posts />,
          loader: postsLoader,
        },
        {
          path: "/create-post",
          element: <Create />,
          action: postCreateAction,
          loader: checkTokenLoader,
        },
        {
          path: "/auth",
          element: <Auth />,
          action: authAction,
        },
        {
          path: "/logout",
          loader: logoutLoader,
        },
        {
          path: ":id",
          id: "post-detail",
          loader: detailLoader,
          children: [
            {
              index: true,
              element: <Details />,
              action: deleteAction,
            },
            {
              path: "edit-post",
              element: <Edit />,
              action: postUpdateAction,
              loader:checkTokenLoader,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
