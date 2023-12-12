
export const runValidation = (username, password, setFormErrorHandler) => {
  const errors = {};
  if (username.trim().length === 0) {
    errors.username = "username is required";
  }
  if (password.trim().length === 0) {
    errors.password = "password id required";
  }
  setFormErrorHandler(errors);
  return Object.values(errors).length === 0;
};


