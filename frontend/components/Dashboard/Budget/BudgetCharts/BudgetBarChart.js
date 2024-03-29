'use client';

import { useEffect, useRef } from 'react';
import { Chart, BarController, BarElement, LinearScale, CategoryScale, Tooltip } from 'chart.js';
import { fetchBarChart } from '../../../../services/apiService';

Chart.register(BarController, BarElement, LinearScale, CategoryScale, Tooltip);

const BudgetBarChart = ({ onMonthClick }) => {
    const { data: dataset, error, isLoading } = fetchBarChart();
    const canvasRef = useRef(null);


    useEffect(() => {
        let chart = null;

        const resizeHandler = () => {
            if (chart) {
                chart.resize();
                chart.update('none');
            }
        };

        window.addEventListener('resize', resizeHandler);

        if (canvasRef.current && dataset.length > 0) {
            const datasetCount = dataset.slice(0, 6);
            const data = {
                labels: datasetCount.map(d => d.month),
                datasets: [{
                    label: 'Net balance',
                    data: datasetCount.map(d => d.netBalance),
                    backgroundColor: datasetCount.map(d => d.netBalance >= 0 ? 'rgba(174, 195, 176, 0.86)' : 'rgba(183, 64, 64, 0.86)'),
                    borderColor: datasetCount.map(d => d.netBalance >= 0 ? 'rgba(89, 131, 146, 1)' : 'rgba(177, 25, 25, 1)'),
                    borderWidth: 2.5,
                    borderRadius: 3.5,
                }]
            }

            const config = {
                type: 'bar',
                data: data,
                responsive: true,
                options: {
                    scales: {
                        y: {
                            type: 'linear',
                            beginAtZero: true,
                            grid: {
                                // for zero index
                                color: (context) => context.tick.value === 0 ? 'rgba(18, 69, 89, 1)' : 'rgba(18, 69, 89, 0.1)',
                                lineWidth: (context) => context.tick.value === 0 ? 2 : 1,
                            },
                            ticks: {
                                color: '#124559',
                                font: {
                                    weight: 'bold',
                                },
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
                                color: '#124559',
                                font: {
                                    weight: 'bold',
                                },
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

                            onMonthClick(month);
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

            window.removeEventListener('resize', resizeHandler);
        };


    }, [dataset, onMonthClick]);

    if (error) {
        return <div>Failed to load chart data</div>;
    }
    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div className='w-100'>
            <canvas ref={canvasRef} />
        </div>
    );
}

export default BudgetBarChart;
