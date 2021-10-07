import Alert from "react-bootstrap/Alert";

const AlertMessage = ({ variant, label, messages }) => {
  const content = messages.map((msg) => <li>{msg}</li>);
  return (
    <Alert variant={variant}>
      <Alert.Heading>{label}</Alert.Heading>
      <ul>{content}</ul>
    </Alert>
  );
};

export default AlertMessage;
