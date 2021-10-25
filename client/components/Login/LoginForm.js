import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Link from "next/link";

import AlertMessage from "../Alert/AlertMessage";
import ProvidersButtons from "./ProvidersButtons";

import { LOGIN_URL } from "../../config";
import { fetchAPI } from "../../src/ApiCalls";

import styles from "./LoginForm.module.css";
import { ButtonFilled } from "../Buttons/Buttons";

const Login = () => {
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [warning, setWarning] = useState({ show: false, messages: [] });
  const [disabled, setDisabled] = useState(false);

  const onSubmit = async (data, event) => {
    event.preventDefault();
    setDisabled(true);

    const response = await fetchAPI("POST", LOGIN_URL, data);

    if (response.status !== 200) {
      const content = await response.json();
      setWarning({
        show: true,
        messages: content.message,
      });
      return setDisabled(false);
    }
    router.push("/me/recipes");
  };

  return (
    <div className={styles.form__container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h1>
          Hey, you!
          <br />
          Welcome back.
        </h1>
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

        <ButtonFilled type="submit" disabled={disabled}>
          Log in
        </ButtonFilled>

        <ProvidersButtons />
      </form>

      <div className={styles.signup__block}>
        <span>
          {" "}
          or Create your account.
          <Link href="/signup">
            <a> Register now</a>
          </Link>
        </span>

        <p>Registered members can:</p>
        <ul>
          <li>Create and share recipes with the world!</li>
          <li>Save recipes to their favorites list</li>
          <li>Create and save shopping lists</li>
        </ul>
      </div>
    </div>
  );
};

export default Login;
