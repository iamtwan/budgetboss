'use client';

import { useEffect, useRef } from 'react';
import { Chart, DoughnutController, ArcElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { formatString } from 'utils/helpers';

Chart.register(DoughnutController, ArcElement, CategoryScale, LinearScale, Tooltip, Legend);

const themeColors = [
    [1, 22, 30],
    [174, 195, 176],
    [18, 69, 89],
    [1, 22, 30]
];

const generateRandomColor = () => {
    const o = Math.floor, r = Math.random, s = 255;
    const randomThemeColor = themeColors[o(r() * themeColors.length)];
    const colorDistance = 15;

    const getRandomColor = (color) => {
        const min = Math.max(0, color - colorDistance);
        const max = Math.min(s, color + colorDistance);
        return o(min + r() * (max - min));
    };

    const newColor = randomThemeColor.map(getRandomColor);
    return `rgba(${newColor[0]}, ${newColor[1]}, ${newColor[2]}, 0.8)`;
}

const MonthlyPieChart = ({ data }) => {
    const canvasRef = useRef(null);
    console.log(data);

    useEffect(() => {
        let categories = [];

        if (data) {
            categories = Object.keys(data.categories).map(key => ({
                label: formatString(key),
                percent: data.categories[key]
            }));
        }

        const dataset = {
            labels: categories.map(c => c.label),
            datasets: [{
                data: categories.map(c => c.percent),
                backgroundColor: categories.map(() => generateRandomColor()),
            }]
        }

        const config = {
            type: 'doughnut',
            data: dataset,
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
                                return `${label}: ${Math.round(value)}%`;
                            },
                        },
                    },
                },
                cutout: '50%',
            },
        }

        let chart = null;
        if (canvasRef.current) {
            chart = new Chart(canvasRef.current, config);
        }

        return () => {
            if (chart) {
                chart.destroy();
            }
        }
    }, [data]);

    return (
        <div style={{ width: '500px', height: '500px' }}>
            <canvas ref={canvasRef} />
        </div>
    );
}

export default MonthlyPieChart;
