import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import AlertMessage from "../Alert/AlertMessage";
import ProvidersButtons from "./ProvidersButtons";
import styles from "./LoginForm.module.css";
import { LOGIN_URL } from "../../config";

const Login = () => {
  const router = useRouter();
  const [disabled, setDisabled] = useState(false);
  const [warning, setWarning] = useState({ show: false, messages: [] });
  const loginUser = async (event) => {
    event.preventDefault();
    setDisabled(true);

    const res = await fetch(LOGIN_URL, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email: event.target.email.value,
        password: event.target.password.value,
      }),
    });

    const result = await res.json();

    if (res.status !== 200) {
      setWarning({
        show: true,
        messages: result.message,
      });
      return setDisabled(false);
    }
    router.push("/");
  };

  return (
    <div className={styles.login_container}>
      <form onSubmit={loginUser} className={styles.login_form}>
        <h1>Welcome back!</h1>
        {warning.show && (
          <AlertMessage
            variant="danger"
            label="There was a problem:"
            messages={warning.messages}
          />
        )}
        <div>
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              className={styles.form__input}
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              className={styles.form__input}
            />
            <Link href="/">
              <a className={styles.form__link}>Forgot your password?</a>
            </Link>
          </div>
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
