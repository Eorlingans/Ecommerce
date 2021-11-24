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
    console.log("#First Res.", res)
    let datos = null
    let err = null
    try {
        datos = await res.json()
        console.log(res, datos)
        if (!res.ok) {
            err = datos
            if(datos.detail) err = datos.detail
            datos = null
        }
    } catch (e) {
        if (!res.ok) err = res.status
        if(datos === null && res.ok) datos = {}
    }
    if(err !== null && datos === null) throw new Error(err)
    return datos
}