import Alert from "react-bootstrap/Alert";
import styles from "./Alert.module.css";

const AlertMessage = ({ variant, label, messages = [], children }) => {
  const content = messages.map((msg) => <li>{msg}</li>);
  const themes = {
    success: styles["alert-success"],
    danger: styles["alert-danger"],
    warning: styles["alert-warning"],
  };

  return (
    <Alert className={`${themes[variant]}`} variant={variant}>
      <Alert.Heading>{label}</Alert.Heading>
      {children}
      <ul>{content}</ul>
    </Alert>
  );
};

export default AlertMessage;
