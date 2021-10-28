import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Link from "next/link";

import AlertMessage from "../Alert/AlertMessage";
import ProvidersButtons from "../Login/ProvidersButtons";
import styles from "./SignUpForm.module.css";

import { fetchAPI } from "../../src/ApiCalls";
import { SIGNUP_URL } from "../../config";
import { ButtonFilled } from "../Buttons/Buttons";

const SignUp = () => {
  const router = useRouter();
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm();

  const [warning, setWarning] = useState({ show: false, messages: [] });
  const [disabled, setDisabled] = useState(false);

  const onSubmit = async (data, e) => {
    e.preventDefault();
    try {
      setDisabled(true);
      const response = await fetchAPI("POST", SIGNUP_URL, data);
      if (response.status !== 200) {
        const content = await response.json();
        setWarning({
          show: true,
          messages: content.message,
        });
        return setDisabled(false);
      }
      router.push("/me/recipes");
    } catch (error) {
      setWarning({
        show: true,
        messages: error.message,
      });
      setDisabled(false);
    }
  };

  return (
    <div className={styles.form__container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h1>Start. Explore. Share.</h1>
        <p>Fill in your details below to create an account:</p>
        {warning.show && (
          <AlertMessage
            variant="danger"
            label="There was a problem creating your account:"
            messages={warning.messages}
          />
        )}

        <label htmlFor="name" className="sr-only">
          Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Name"
          {...register("name", {
            required: "Name is required",
            maxLength: { value: 50, message: "Max length is 50" },
          })}
        />
        {errors.name && <span role="alert">{errors.name.message}</span>}

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
            minLength: {
              value: 8,
              message: "Password must have at least 8 characters",
            },
          })}
        />
        {errors.password && <span role="alert">{errors.password.message}</span>}

        <label htmlFor="confirm_password" className="sr-only">
          Confirm password
        </label>
        <input
          id="confirm_password"
          type="password"
          placeholder="Confirm Password"
          {...register("confirm_password", {
            required: "Please confirm password",
            validate: {
              matchesPreviousPassword: (value) => {
                const { password } = getValues();
                return password === value || "Passwords do not match";
              },
            },
          })}
        />
        {errors.confirm_password && (
          <span role="alert">{errors.confirm_password.message}</span>
        )}

        <ButtonFilled type="submit" disabled={disabled}>
          Create account
        </ButtonFilled>
        <ProvidersButtons />
      </form>

      <div className={styles.login__block}>
        <p>
          Have an account?
          <Link href="/login">
            <a> Log in</a>
          </Link>
        </p>
        <Link href="/">
          <a>Forgot your password?</a>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
