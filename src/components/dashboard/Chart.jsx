import { useEffect, useRef } from "react";
import Chart from 'chart.js/auto';

const ChartComponent = ({chartData}) => {

    const secondChartRef = useRef(null);
    const secondChartInstanceRef = useRef(null);
    useEffect(() => {

        if (secondChartRef.current) {
            if (secondChartInstanceRef.current) {
                secondChartInstanceRef.current.destroy();
            }
        }

        const data = chartData

        const secondcharData = {
            type: 'bar',
            data: {
                labels: [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec',
                ],
                datasets: [
                    {
                        label: 'Total Amount',
                        borderRadius: 5,
                        data: data.map((item) => item.amount),
                        backgroundColor: '#3F51B5',
                        maxBarThickness: 5,
                    },

                ],
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                    x: {
                        grid: {
                            display: false,
                        },
                    },
                },
                plugins: {
                    legend: {
                        display: false,
                    },
                },
            },
        };


        const newChartInstance = new Chart(secondChartRef.current, secondcharData);
        secondChartInstanceRef.current = newChartInstance;

    }, [chartData]);
    return(
        <>
            <div className="flex flex-col justify-center px-8 py-6 bg-white rounded-lg shadow-md shadow-gray-200 md:col-span-2 md:row-span-2 gap-y-4 gap-x-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <h2 className="font-medium text-gray-700">The total amount of orders in month wise</h2>

                    <div className="flex items-center mt-4 -mx-2 sm:mt-0">


                        <span className="flex items-center text-gray-600">
                            <p className="mx-2">Amount</p>
                            <span className="w-2 h-2 mx-2 bg-indigo-500 rounded-full"></span>
                        </span>
                    </div>
                </div>

                <canvas className="max-w-3xl max-h-96" ref={secondChartRef}></canvas>

            </div>
        </>
    )
}

export default ChartComponent;