import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import MoodDashboard from "./components/MoodDashboard";
import { getToken } from "./services/auth";

function App() {
    const PrivateRoute = ({ children }) => getToken() ? children : <Navigate to="/login" />;

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login onLogin={() => window.location.href = "/"} />} />
                <Route path="/" element={<PrivateRoute><MoodDashboard /></PrivateRoute>} />
            </Routes>
        </Router>
    );
}

export default App;
