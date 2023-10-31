// token的 增 删 查 
export const setToken = (token) =>
{
    localStorage.setItem("token", token)
}

export const getToken = () =>
{
    return localStorage.getItem("token")
}

export const removeToken = () =>
{
    localStorage.removeItem("token")
}

export const HaveToken = () =>
{
    return localStorage.getItem("token") !== null
}