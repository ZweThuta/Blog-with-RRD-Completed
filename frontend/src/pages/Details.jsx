import React from "react";
import { redirect, useRouteLoaderData } from "react-router-dom";
import PostDetail from "../components/PostDetail";
import { getToken } from "../util/auth";

const Details = () => {
  const post = useRouteLoaderData("post-detail");
  return (
    <>
      <section>
        <PostDetail post={post} />
      </section>
    </>
  );
};

export default Details;

export const loader = async ({ request, params }) => {
  const response = await fetch(`http://localhost:8080/posts/${params.id}`);
  if (!response.ok) {
  } else {
    const data = await response.json();
    return data.post;
  }
};
export const action = async ({ request, params }) => {
  const token = getToken();
  const response = await fetch(`http://localhost:8080/posts/${params.id}`, {
    method: request.method,
    headers:{
      Authorization: "Bearer " + token,
    }
  });
  if (!response.ok) {
    throw new Error("Something Wrong!")
  } else {
    return redirect("/");
  }
};
