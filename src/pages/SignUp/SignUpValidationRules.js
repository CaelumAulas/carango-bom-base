export default function validate(values) {
  var errors = {};

  if (!values.username) {
    errors.username = "Preencha o nome do usuário.";
  } else if (values.username.length < 3) {
    errors.username = "Usuário precisa ter 3 digitos ou mais.";
  }

  if (!values.password) {
    errors.password = "Preencha a senha usuário.";
  } else if (values.password.length < 3) {
    errors.password = "Senha precisa ter 3 digitos ou mais.";
  }

  if (!values.password2) {
    errors.password2 = "Confirme a senha do usuário.";
  } else if (values.password2 !== values.password) {
    errors.password2 = "As senhas precisam ser iguais.";
  }

  return errors;
}
