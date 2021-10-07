import { useState } from "react";
import Link from "next/link";

import AlertMessage from "../Alert/AlertMessage";
import ProvidersButtons from "../Login/ProvidersButtons";
import styles from "./SignUpForm.module.css";
import { SIGNUP_URL } from "../../config";

const SignUp = () => {
  const [warning, setWarning] = useState({ show: false, messages: [] });
  const [disabled, setDisabled] = useState(false);

  const registerUser = async (event) => {
    event.preventDefault();
    setDisabled(true);

    const res = await fetch(SIGNUP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: event.target.name.value,
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
    }

    setDisabled(false);
  };

  return (
    <div className={styles.signup__container}>
      <form onSubmit={registerUser} className={styles.signup__form}>
        <h1>Create your account</h1>
        {warning.show && (
          <AlertMessage
            variant="danger"
            label="There was a problem creating your account:"
            messages={warning.messages}
          />
        )}
        <div>
          <div>
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Name"
              className={styles.form__input}
            />
          </div>
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
          </div>
        </div>
        <button
          type="submit"
          disabled={disabled}
          className={styles.form__submit}
        >
          Create account
        </button>
        <ProvidersButtons />
      </form>

      <div className={styles.block}>
        <p>
          Have an account?
          <Link href="/login">
            <a className={styles.form__link}> Log in</a>
          </Link>
        </p>
        <Link href="/">
          <a className={styles.form__link}>Forgot your password?</a>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
