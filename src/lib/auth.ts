export function getToken() {
  if (typeof window !== 'undefined') {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; token=`);
    if (parts.length === 2) {
      const tokenPart = parts.pop();
      if (tokenPart) {
        return tokenPart.split(';').shift();
      }
    }
  }
  return null;
}