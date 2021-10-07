export const endpoint = `http://localhost:3000`;
export const prodEndpoint = `fill me in when we deploy`;

export const LOGIN_URL = `${endpoint}/api/v1/auth/login`;
export const SIGNUP_URL = `${endpoint}/api/v1/auth/register`;
/*
    axios({
      method: "post",
      url: "http://localhost:3000/api/v1/auth/login",
      data: {
        email: event.target.email.value,
        password: event.target.password.value,
      },
      withCredentials: true,
    })
      .then((response) => console.log(response, response.data))
      .catch((err) => console.log(err));
      
*/
