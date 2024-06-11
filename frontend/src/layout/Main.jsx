import {
  Outlet,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import NavBar from "../components/NavBar";
import { useEffect } from "react";
import { getExpDuration } from "../util/auth";
import Loader from "../pages/Loader";
const Main = () => {
  const token = useLoaderData();
  const submit = useSubmit();
  const { state } = useNavigation();

  useEffect(() => {
    if (!token) {
      return;
    }
    if (token === "TOKEN EXPIRED") {
      submit(null, { action: "/logout", method: "POST" });
    }
    const duration = getExpDuration();
    setTimeout(() => {
      submit(null, { action: "/logout", method: "POST" });
    }, [duration]);
  }, [token, submit]);
  return (
    <>
      {state === "loading" ? (
        <Loader />
      ) : (
        <section className="main">
          <NavBar />
          {state === "loading" ? <Loader /> : <Outlet />}
        </section>
      )}
    </>
  );
};

export default Main;
