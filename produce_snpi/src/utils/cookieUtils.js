
export const setSessionCookie = (token, days = 1) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `session_token=${token};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
};


export const getSessionToken = () => {
  const name = 'session_token=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return null;
};


export const removeSessionCookie = () => {
  document.cookie = 'session_token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
};

export const isSessionActive = () => {
  return getSessionToken() !== null;
};
