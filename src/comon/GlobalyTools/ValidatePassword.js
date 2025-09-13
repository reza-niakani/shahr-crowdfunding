const validatePassword = (pass, setPasswordValidation) => {
  const validations = {
    minLength: pass?.length >= 8,
    hasUpperCase: /[A-Z]/.test(pass),
    hasLowerCase: /[a-z]/.test(pass),
    hasNumber: /[0-9]/.test(pass),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(pass)
  };
  setPasswordValidation(validations);
  return Object.values(validations).every(Boolean);
};
export default validatePassword;
