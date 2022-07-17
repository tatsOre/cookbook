import Link from "next/link";

import { LinkFilled, LinkOutlined } from "../Buttons/Buttons";

import styles from "./Navigation.module.css";

const LoginNav = ({ router }) => {
  return (
    <div className={styles.login__nav}>
      {!router.pathname.startsWith("/login") && (
        <Link href="/login" passHref>
          <LinkFilled>Login</LinkFilled>
        </Link>
      )}
      {!router.pathname.startsWith("/signup") && (
        <Link href="/signup" passHref>
          <LinkOutlined>Sign Up</LinkOutlined>
        </Link>
      )}
    </div>
  );
};

export default LoginNav;
