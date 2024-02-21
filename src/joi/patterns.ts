const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-])[A-Za-z\d!@#$%^&*-]{6,}$/;
const phoneRegex = (/^((\+972|0)([23489]|5[02468]|77)-?[1-9]\d{6})$/);
const expirationDateRegex = /^(0[1-9]|1[0-2])\/\d{4}$/;

export { passwordRegex, phoneRegex, expirationDateRegex };