export const isTokenExpired = (token: string): boolean => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid token');
    }

    const payload = parts[1];
    const decodedPayload = JSON.parse(atob(payload));

    const currentTime = Math.floor(Date.now() / 1000);
    return decodedPayload.exp < currentTime;
  } catch (error) {
    console.error('Token decoding failed:', error);
    return true;
  }
};
