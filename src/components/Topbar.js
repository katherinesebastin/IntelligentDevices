import React from "react";
import { logout } from "../services/auth";

export default function Topbar({ title }) {
    return (
        <div className="topbar">
            <span className="title">{title}</span>
            <span className="logout" onClick={logout}>Logout</span>
        </div>
    );
}
