const BASE_URL = 'http://localhost:5000'

const checkResponse = (res: Response) => {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((err: Error) => {
    return Promise.reject(err);
  });
};

export const getInfo = async () => {
  return await fetch(`${BASE_URL}/info`)
    .then((res) => checkResponse(res))
};

export const getUser = async (token: string) => {
  return await fetch(`${BASE_URL}/profile?token=${token}`)
    .then((res) => checkResponse(res))
    .catch(err => {
      console.log(err);
    });
}

export const login = async ({email, password}: {email: string, password: string}) => {
  return await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        email: email, 
        password: password
    })
  })
    .then(checkResponse)
    .then((data) => localStorage.setItem('token', data.data.token))
}

export const logout = async (token: string) => {
  return await fetch(`${BASE_URL}/logout?token=${token}`, {
    method: 'DELETE'
  })
  .then(checkResponse)
  .then(() => localStorage.clear())
  .catch((error) => console.error("Error during logout:", error.message));
}

export const getAuthor = async (token: string, signal: AbortSignal) => {
  return await fetch(`${BASE_URL}/author?token=${token}`, {signal})
    .then((res) => checkResponse(res))
    .catch(err => console.log(err));
};

export const getQuote = async (token: string, authorId: number, signal: AbortSignal) => {
  return await fetch(`${BASE_URL}/quote?token=${token}&authorId=${authorId}`, {signal})
    .then((res) => checkResponse(res))
    .catch(err => console.log(err));
};