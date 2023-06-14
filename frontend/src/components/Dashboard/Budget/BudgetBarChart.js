import { useEffect, useRef } from 'react';
import { Chart, BarController, BarElement, LinearScale, CategoryScale, Tooltip } from 'chart.js';

Chart.register(BarController, BarElement, LinearScale, CategoryScale, Tooltip);

const BudgetChart = ({ dataset = [
    { month: 'January', balance: 1345543 },
    { month: 'February', balance: -1234262 },
    { month: 'March', balance: 1752381 },
    { month: 'April', balance: -1113111 },
    { month: 'May', balance: 1834439 },
    { month: 'June', balance: -1153346 },
], onMonthClick }) => {
    const canvasRef = useRef(null);
    const datasetCount = dataset.slice(0, 6);

    useEffect(() => {
        let chart = null;

        if (canvasRef.current) {
            const data = {
                labels: datasetCount.map(d => d.month),
                datasets: [{
                    label: 'Net balance',
                    data: datasetCount.map(d => d.balance),
                    backgroundColor: datasetCount.map(d => d.balance >= 0 ? 'rgba(0, 163, 35, 0.86)' : 'rgba(206, 0, 0, 0.86)'),
                    borderColor: datasetCount.map(d => d.balance >= 0 ? 'rgba(0, 100, 0, 1)' : 'rgba(100, 0, 0, 1)'),
                    borderWidth: 2.5,
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
                                color: '#000',
                                callback: function (value) {
                                    return '$' + value;
                                }
                            },
                        },

                        x: {
                            type: 'category',
                            grid: {
                                display: false,
                            },
                            ticks: {
                                color: '#000',
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    let label = context.dataset.label || '';

                                    if (label) {
                                        label += ':  ';
                                    }
                                    if (context.parsed.y !== null) {
                                        label += new Intl.NumberFormat('en-US', {
                                            style: 'currency',
                                            currency: 'USD',
                                            maximumFractionDigits: 0,
                                        }).format(context.parsed.y);
                                    }
                                    return label;
                                },
                            }
                        },
                    },
                    onClick: function (event, activeElements) {
                        if (activeElements.length > 0) {
                            const firstPoint = activeElements[0];
                            const month = this.data.labels[firstPoint.index];
                            const balance = this.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];

                            // fake data
                            const monthData = {
                                month,
                                balance,
                                transactions: [
                                    { id: 1, name: 'Transaction 1', amount: 100 },
                                    { id: 2, name: 'Transaction 2', amount: 200 },
                                ],
                            };

                            onMonthClick(monthData);
                        }
                    },
                }
            };

            chart = new Chart(canvasRef.current, config);
        }

        return () => {
            if (chart) {
                chart.destroy();
            }
        };
    }, [dataset, onMonthClick]);

    return (
        <canvas className='' ref={canvasRef} />
    );
}

export default BudgetChart;
