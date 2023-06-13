import { useEffect, useRef } from 'react';
import { Chart, BarController, BarElement, LinearScale, CategoryScale, Tooltip, Legend } from 'chart.js';

Chart.register(BarController, BarElement, LinearScale, CategoryScale, Tooltip, Legend);

const BudgetChart = ({ dataset = [
    { month: 'January', balance: 543 },
    { month: 'February', balance: -262 },
    { month: 'March', balance: 381 },
    { month: 'April', balance: -111 },
    { month: 'May', balance: 834 },
    { month: 'June', balance: -53 },
] }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        let chart = null;

        if (canvasRef.current) {
            const data = {
                labels: dataset.map(d => d.month),
                datasets: [{
                    label: 'Balance',
                    data: dataset.map(d => d.balance),
                    backgroundColor: dataset.map(d => d.balance >= 0 ? 'rgba(0, 200, 0, 0.5)' : 'rgba(200, 0, 0, 0.5)'),
                    borderColor: dataset.map(d => d.balance >= 0 ? 'rgba(0, 100, 0, 1)' : 'rgba(100, 0, 0, 1)'),
                    borderWidth: 1
                }]
            };

            const config = {
                type: 'bar',
                data: data,
                options: {
                    scales: {
                        y: {
                            type: 'linear',
                            beginAtZero: true,
                            grid: {
                                // for zero index
                                color: (context) => context.tick.value === 0 ? 'rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 0.1)',
                                lineWidth: (context) => context.tick.value === 0 ? 2 : 1,
                            },
                            ticks: {
                                callback: function (value) {
                                    return '$' + value;
                                }
                            }
                        },

                        x: {
                            type: 'category',
                            grid: {
                                display: false,
                            }
                        }
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    const label = context.dataset.label || '';
                                    if (label) {
                                        return `${label}: ${context.parsed.y}`;
                                    } else {
                                        return context.parsed.y;
                                    }
                                }
                            }
                        }
                    }
                }
            };

            chart = new Chart(canvasRef.current, config);
        }

        return () => {
            if (chart) {
                chart.destroy();
            }
        };
    }, [dataset]);

    return (
        <canvas className='' ref={canvasRef} />
    );
}

export default BudgetChart;

    // // dataset format:
    // // [
    // //     { month: 'January', balance: 500 },
    // //     { month: 'February', balance: -200 },
    // // ]
