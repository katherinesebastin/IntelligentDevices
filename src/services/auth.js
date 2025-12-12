export function getToken() {
    return localStorage.getItem("authToken");
}

export function requireAuth() {
    const token = getToken();
    if (!token) {
        window.location.href = "/login";
    }
    return token;
}

export function logout() {
    localStorage.removeItem("authToken");
    window.location.href = "/login";
}

export async function login(deviceId, password) {
    const res = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deviceId, password })
    });

    if (!res.ok) {
        throw new Error("Invalid login!");
    }

    const data = await res.json();
    localStorage.setItem("authToken", data.token);
    return data.token;
}
