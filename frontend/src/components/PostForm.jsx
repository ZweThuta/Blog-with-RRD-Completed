import { Form, useActionData, redirect, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { getToken } from "../util/auth";
 
const PostForm = ({ header, btnText, oldValue, method }) => {
  const data = useActionData();
  const navigation = useNavigate();
  const isPosting = navigation.state === "submitting";
  return (
    <>
      <section className="form-section">
        <p> {header}</p>
        {data && data.errors && (
          <ul>
            {Object.values(data.errors).map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
        <Form method={method}>
          <div className="form-input">
            <label htmlFor="form-title">Title</label>
            <input
              type="text"
              id="form-title"
              name="title"
              required
              defaultValue={oldValue ? oldValue.title : ""}
            />
          </div>
          <div>
            <label htmlFor="form-image">Image</label>
            <input
              type="url"
              id="form-image"
              name="image"
              required
              defaultValue={oldValue ? oldValue.image : ""}
            />
          </div>
          <div>
            <label htmlFor="form-date">Date</label>
            <input
              type="date"
              id="form-date"
              name="date"
              required
              defaultValue={oldValue ? oldValue.date : ""}
            />
          </div>
          <div>
            <label htmlFor="form-description">Description</label>
            <textarea
              cols="30"
              rows="5"
              id="form-description"
              name="description"
              required
              defaultValue={oldValue ? oldValue.description : ""}
            />
            <button type="submit" className="post-btn">
              {isPosting ? "Posting..." : btnText}
            </button>
          </div>
        </Form>
      </section>
    </>
  );
};

export default PostForm;

export const action = async ({ request, params }) => {
  const data = await request.formData();
  const method = request.method;
  const token = getToken();
  const postData = {
    id: uuidv4(),
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };

  let url = `${process.env.REACT_APP_DOMAIN}/posts`;
  if (method === "PATCH") {
    const id = params.id;
    url = `${process.env.REACT_APP_DOMAIN}/posts/${id}`;
  }

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(postData),
  });
  if (response.status === 422) {
    return response;
  }
  if (!response.ok) {
    throw new Error("Failed to create post.");
  }
  return redirect("/");
};
