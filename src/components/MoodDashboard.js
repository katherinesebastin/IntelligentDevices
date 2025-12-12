import React, { useEffect, useState } from "react";
import { requireAuth } from "../services/auth";
import Topbar from "./Topbar";
import Reminders from "./Reminders";
import MoodChart from "./MoodChart"; // We'll create this chart component

export default function MoodDashboard() {
    const token = requireAuth();
    const [todayMood, setTodayMood] = useState("Loading...");
    const [last7, setLast7] = useState([]);
    const [last30, setLast30] = useState([]);

    // React-friendly fetch function
    const fetchJSON = async (url) => {
        try {
            const res = await fetch(url, { headers: { "Authorization": "Bearer " + token } });
            if (res.status === 401) {
                window.location.href = "/login";
                return null;
            }
            return res.json();
        } catch (err) {
            console.error("Fetch error:", err);
            return null;
        }
    };

    const moodLabel = (avg) => {
        if (avg == null) return "No entries today";
        const rounded = Math.round(avg);
        return rounded === 1 ? "Bad" : rounded === 2 ? "Ok" : rounded === 3 ? "Good" : "No entries today";
    };

    useEffect(() => {
    fetchJSON("http://localhost:8080/api/mood/today").then(data => {
        
        if (!data) {
            setTodayMood("Backend unreachable");
            return;
        }

        if (data.avg == null) {
            setTodayMood("No entries today");
            return;
        }

        setTodayMood(moodLabel(data.avg));
    });

        // Last 7 days
        fetchJSON("http://localhost:8080/api/mood/7days").then(data => {
            setLast7(Array.isArray(data) ? data : []);
        });

        // Last 30 days
        fetchJSON("http://localhost:8080/api/mood/30days").then(data => {
            setLast30(Array.isArray(data) ? data : []);
        });
    }, [token]);


    return (
        <div>
            <Topbar title="Moodis" />
            <div className="page" style={{ display: "flex", gap: "40px" }}>
                {/* Left side: Mood charts */}
                <div style={{ flex: 4 }}>
                    <h1>Mood Dashboard</h1>
                    <h2>Today's Average Mood</h2>
                    <div id="today-value">{todayMood}</div>

                    <div className="chart-container">
                        <h2>Last 7 Days</h2>
                        {last7.length === 0
                            ? <div>No entries for last 7 days</div>
                            : <MoodChart labels={last7.map(e => e.date)} data={last7.map(e => e.avg)} />}
                    </div>

                    <div className="chart-container">
                        <h2>Last 30 Days</h2>
                        {last30.length === 0
                            ? <div>No entries for last 30 days</div>
                            : <MoodChart labels={last30.map(e => e.date)} data={last30.map(e => e.avg)} />}
                    </div>
                </div>

                {/* Right side: Reminders */}
                <div style={{ flex: 1, borderLeft: "1px solid #ccc", paddingLeft: "20px" }}>
                    <Reminders token={token} />
                </div>
            </div>
        </div>
    );
}
