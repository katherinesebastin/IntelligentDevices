import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function MoodChart({ labels, data }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!canvasRef.current || !data || data.length === 0) return;

        const chart = new Chart(canvasRef.current, {
            type: "line",
            data: {
                labels,
                datasets: [
                    {
                        label: "Mood Average",
                        data,
                        borderWidth: 2,
                        tension: 0.3
                    }
                ]
            },
            options: {
                scales: {
                    y: { min: 1, max: 3, ticks: { stepSize: 1 } }
                }
            }
        });

        // Cleanup chart on unmount or data change
        return () => chart.destroy();
    }, [labels, data]);

    return <canvas ref={canvasRef}></canvas>;
}
