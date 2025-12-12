import React, { useState } from "react";
import { login } from "../services/auth";

export default function Login({ onLogin }) {
    const [deviceId, setDeviceId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(deviceId, password);
            onLogin(); // notify parent that login succeeded
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="container">
            <h2>Device Login</h2>
            <input placeholder="Device ID" value={deviceId} onChange={e => setDeviceId(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={handleSubmit}>Login</button>
            {error && <p style={{color: "red"}}>{error}</p>}
        </div>
    );
}
