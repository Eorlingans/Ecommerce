export const fetcher = async (url, method = "GET", data = {}) => {
    const token = localStorage.getItem("token") || ""
    const body = JSON.stringify(data)
    const headers = {
        "Authorization": `Bearer ${token}`,
        "X-CSRFToken": token,
        'Content-Type': 'application/json'
    }
    var opts
    if (method === "GET") {
        opts = {
            method,
            cors: true,
            headers
        }
    } else {
        opts = {
            method,
            body,
            cors: true,
            headers
        }
    }
    const res = await
        fetch(
            url,
            opts
        )
    const datos = await res.json()
    console.log(res, datos)
    if (!res.ok) throw new Error(datos.detail)
    return datos
}