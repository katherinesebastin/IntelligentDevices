import React, { useEffect, useState } from "react";

export default function Reminders({ token }) {
    const [reminders, setReminders] = useState({ reminder1: "", reminder2: "", reminder3: "" });
    const [enabled, setEnabled] = useState({ reminder1: true, reminder2: true, reminder3: true });
    const [status, setStatus] = useState("");

    useEffect(() => {
        fetch("http://localhost:8080/api/reminders", {
            headers: { "Authorization": "Bearer " + token }
        })
        .then(res => res.json())
        .then(data => {
            setReminders({ reminder1: data.reminder1 || "", reminder2: data.reminder2 || "", reminder3: data.reminder3 || "" });
            setEnabled({ reminder1: !!data.reminder1, reminder2: !!data.reminder2, reminder3: !!data.reminder3 });
        });
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            reminder1: enabled.reminder1 ? reminders.reminder1 : null,
            reminder2: enabled.reminder2 ? reminders.reminder2 : null,
            reminder3: enabled.reminder3 ? reminders.reminder3 : null
        };
        const res = await fetch("http://localhost:8080/api/reminders", {
            method: "PUT",
            headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token },
            body: JSON.stringify(payload)
        });
        setStatus(res.ok ? "Reminders updated!" : "Failed to update reminders.");
        setTimeout(() => setStatus(""), 3000);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Reminders</h2>
            {[1,2,3].map(i => (
                <div className="reminder-row" key={i}>
                    <label className="reminder-label-right">
                        <span>Reminder {i}</span>
                        <input type="checkbox" checked={enabled[`reminder${i}`]} onChange={e => setEnabled({...enabled, [`reminder${i}`]: e.target.checked})} />
                    </label>
                    <input type="time" value={reminders[`reminder${i}`]} onChange={e => setReminders({...reminders, [`reminder${i}`]: e.target.value})} />
                </div>
            ))}
            <br/>
            <button type="submit">Save Reminders</button>
            <p id="reminder-status">{status}</p>
        </form>
    );
}
