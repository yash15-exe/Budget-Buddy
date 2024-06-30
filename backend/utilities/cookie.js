export const storeTokenInCookie = (token) => {
  document.cookie = `token=${token}; SameSite=Strict; Secure`; // Set appropriate options like SameSite and Secure
};

export const getTokenFromCookie = () => {
  const cookies = document.cookie.split("; ");
  const tokenCookie = cookies.find((cookie) => cookie.startsWith("token="));
  if (tokenCookie) {
    return tokenCookie.split("=")[1];
  }
  return null;
};
