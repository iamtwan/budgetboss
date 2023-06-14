import { useEffect, useRef } from 'react';
import { Chart, DoughnutController, ArcElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

Chart.register(DoughnutController, ArcElement, CategoryScale, LinearScale, Tooltip, Legend);

const generateRandomColor = () => {
    const o = Math.round, r = Math.random, s = 255;
    return `rgba(${o(r() * s)}, ${o(r() * s)}, ${o(r() * s)}, 0.8)`;
};

const MonthlyPieChart = ({ monthData }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        // fake category data
        const categories = [
            { label: 'Food', percent: 0.2 },
            { label: 'Rent', percent: 0.3 },
            { label: 'Utilities', percent: 0.1 },
            { label: 'Other', percent: 0.4 },
        ];

        const data = {
            labels: categories.map(c => c.label),
            datasets: [{
                data: categories.map(c => c.percent),
                // backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#32CD32'],
                backgroundColor: categories.map(() => generateRandomColor()),

            }]
        };

        const config = {
            type: 'doughnut',
            data: data,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'right',
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                let label = context.label;
                                let value = context.parsed;
                                return `${label}: ${(value * 100).toFixed(2)}%`;
                            },
                        },
                    },
                },
                cutout: '50%',
            },
        };

        let chart = null;
        if (canvasRef.current) {
            chart = new Chart(canvasRef.current, config);
        }

        return () => {
            if (chart) {
                chart.destroy();
            }
        };
    }, [monthData]);

    return (
        <div style={{ width: "500px", height: "500px" }}>
            <canvas ref={canvasRef} />
        </div>
        // <canvas className='' ref={canvasRef} />
    );
};

export default MonthlyPieChart;
