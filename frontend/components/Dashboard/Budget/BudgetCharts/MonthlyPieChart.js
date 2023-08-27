'use client';

import { useEffect, useRef } from 'react';
import { Chart, DoughnutController, ArcElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { formatString } from 'utils/helpers';

Chart.register(DoughnutController, ArcElement, CategoryScale, LinearScale, Tooltip, Legend);

const themeColors = [
    [174, 195, 176],
    [89, 131, 146],
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

    useEffect(() => {
        let categories = [];

        if (data) {
            categories = Object.keys(data.categories).map(key => ({
                label: formatString(key),
                percent: (data.categories[key] / data.totalExpenses) * 100
            }));
        }

        const dataset = {
            labels: categories.map(c => c.label),
            datasets: [{
                data: categories.map(c => c.percent),
                backgroundColor: categories.map(() => generateRandomColor()),
                borderColor: '#EFF6E0',
                borderWidth: 6,
                hoverBackgroundColor: '#EFF6E0',
                hoverBorderColor: '#012F44',
                hoverBorderWidth: 3,
            }]
        }

        const config = {
            type: 'doughnut',
            data: dataset,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
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

    if (!data || Object.keys(data.categories).length < 2) {
        return <div id='pie-msg-bg' className='alert alert-info align-self-center' role='alert'>Add/Link more transactions to display chart.</div>;
    }

    return (
        <div className='mt-4' style={{ width: '500px', height: '500px' }}>
            <canvas ref={canvasRef} />
        </div>
    );
}

export default MonthlyPieChart;
