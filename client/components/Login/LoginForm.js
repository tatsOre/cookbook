import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Link from "next/link";

import AlertMessage from "../Alert/AlertMessage";
import ProvidersButtons from "./ProvidersButtons";
import styles from "./LoginForm.module.css";
import { LOGIN_URL } from "../../config";

import { useContext } from "react";
import { userContext } from "../../src/UserContext";

const Login = () => {
  const { alert, setAlert } = useContext(userContext);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const router = useRouter();

  const [warning, setWarning] = useState({ show: false, messages: [] });
  const [disabled, setDisabled] = useState(false);

  const onSubmit = async (data, event) => {
    event.preventDefault();
    setDisabled(true);

    const res = await fetch(LOGIN_URL, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const result = await res.json();

    if (res.status !== 200) {
      setWarning({
        show: true,
        messages: result.message,
      });
      return setDisabled(false);
    }
    setAlert(!alert);
    router.push("/");
  };

  return (
    <div className={styles.login_container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.login_form}>
        <h1>Welcome back!</h1>
        <p>If you have an account, sign in with your email address:</p>
        {warning.show && (
          <AlertMessage
            variant="danger"
            label="There was a problem:"
            messages={warning.messages}
          />
        )}
        <div>
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            className={styles.form__input}
            id="email"
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Entered value does not match email format",
              },
            })}
          />
          {errors.email && <span role="alert">{errors.email.message}</span>}

          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            className={styles.form__input}
            id="password"
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "You must specify a password",
            })}
          />
          {errors.password && (
            <span role="alert">{errors.password.message}</span>
          )}

          <Link href="/">
            <a className={styles.form__link}>Forgot your password?</a>
          </Link>
        </div>

        <button
          type="submit"
          disabled={disabled}
          className={styles.form__submit}
        >
          Log In
        </button>
        <ProvidersButtons />
      </form>

      <div className={styles.block}>
        Don't have an account?
        <Link href="/signup">
          <a className={styles.form__link}> Sign up</a>
        </Link>
      </div>
    </div>
  );
};

export default Login;
