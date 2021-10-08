import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import "../styles/normalize.css";

import { UserProvider } from "../src/UserContext";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
