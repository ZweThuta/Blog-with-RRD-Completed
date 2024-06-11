import React from "react";
import { Link, Form, useSearchParams, useActionData, useNavigation } from "react-router-dom";

const AuthForm = () => {
  const data = useActionData();
  const navigation = useNavigation();


  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const isSubmitting = navigation.state === "submitting"
  return (
    <>
      <section className="authform-section">
        <div className="authform-bg">
          <p>
            {isLogin ? "Login to your account" : "Create a new account now!"}
          </p>
          {data && data.errors && (
            <ul>
              {Object.values(data.errors).map((err) => (
                <li key={err}>{err}</li>
              ))}
            </ul>
          )}
          {data && data.message && <p>{data.message}</p>}
          <Form method="POST">
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                required
              />
              <button className="post-btn login-btn" disabled={isSubmitting}>
                {
                    isSubmitting ? "Submitting" : isLogin ? "Login" : "Register"
                }
              </button>
            </div>
          </Form>
          <div className="login-text">
            {isLogin ? (
              <p>
                Don't have a account?
                <Link to={"/auth?mode=signup"}>Create account.</Link>
              </p>
            ) : (
              <p>
                Already have a account?
                <Link to={"/auth?mode=login"}>Login here.</Link>
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default AuthForm;
