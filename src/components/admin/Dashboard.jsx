import { useState } from "react";


const Dashboard = () => {

    const [showDays, setShowDays] = useState(false);
    const [selectedDays, setSelectedDays] = useState([]);

    const handleDaySelection = (event) => {
        const selectedDay = event.target.value;
        const isSelected = event.target.checked;

        if (isSelected) {
            setSelectedDays([...selectedDays, selectedDay]);
        } else {
            const updatedSelectedDays = selectedDays.filter(
                (day) => day !== selectedDay
            );
            setSelectedDays(updatedSelectedDays);
        }
    };

    const toggleDays = () => {
        setShowDays(!showDays);
    }
    return (
        <>
            <div className="relative">
                <div>
                    <input
                        type="checkbox"
                        id="daysToggle"
                        className="appearance-none rounded-md border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        checked={showDays}
                        onChange={toggleDays}
                    />
                    <label htmlFor="daysToggle" className="font-medium text-gray-700">
                        Days
                    </label>
                </div>
                {showDays && (
                    <div className="mt-2">
                        <div className="space-y-2">
                            <input
                                type="checkbox"
                                id="monday"
                                value="Monday"
                                className="appearance-none  rounded-md border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 checkbox checkbox-xs"
                                checked={selectedDays.includes("Monday")}
                                onChange={handleDaySelection}
                            />
                            <label htmlFor="monday" className="text-gray-700">
                                Monday
                            </label>
                            
                        </div>
                        <div className="space-y-2">
                            <input
                                type="checkbox"
                                id="tuesday"
                                value="Tuesday"
                                className="appearance-none  rounded-md border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 checkbox checkbox-xs"
                                checked={selectedDays.includes("Tuesday")}
                                onChange={handleDaySelection}
                            />
                            <label htmlFor="tuesday" className="text-gray-700">
                                Tuesday
                            </label>
                            
                        </div>
                    </div>
                )}
            </div>
        </>

        
    )
};

export default Dashboard;