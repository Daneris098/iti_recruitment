export const getRefreshTokenFromCookie = () => {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name === "refreshToken") {
      return value;
    }
  }
  return null;
};

export default { getRefreshTokenFromCookie }