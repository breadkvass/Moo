const checkResponse = (res: Response) => {
    if (res.ok) {
      return res.json();
    }
    return res.json().then((err: Error) => {
      return Promise.reject(err);
    });
};

export const getInfo = async () => {
    return await fetch("http://localhost:5000/info")
        .then((res) => checkResponse(res))
};