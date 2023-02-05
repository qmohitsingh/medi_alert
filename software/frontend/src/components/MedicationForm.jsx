import React, { useState } from "react";

const MedicationForm = () => {
    const [medication, setMedication] = useState({
        name: "",
        dosage: "",
        schedule: "",
        vibrations: "",
    });

    const handleChange = (event) => {
        setMedication({
            ...medication,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(medication);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-10 rounded-lg shadow-md">
            <h2 className="text-lg font-bold text-purple-700 mb-5">Medication Information</h2>
            <div className="mb-5">
                <label className="block text-gray-700 font-bold mb-2">Name</label>
                <input
                    type="text"
                    name="name"
                    value={medication.name}
                    onChange={handleChange}
                    className="border border-gray-400 p-2 w-full"
                />
            </div>
            <div className="mb-5">
                <label className="block text-gray-700 font-bold mb-2">Dosage</label>
                <input
                    type="text"
                    name="dosage"
                    value={medication.dosage}
                    onChange={handleChange}
                    className="border border-gray-400 p-2 w-full"
                />
            </div>
            <div className="mb-5">
                <label className="block text-gray-700 font-bold mb-2">
                    When to take medication
                </label>
                <input
                    type="text"
                    name="schedule"
                    value={medication.schedule}
                    onChange={handleChange}
                    className="border border-gray-400 p-2 w-full"
                />
            </div>
            <div className="mb-5">
                <label className="block text-gray-700 font-bold mb-2">Vibrations</label>
                <input
                    type="text"
                    name="vibrations"
                    value={medication.vibrations}
                    onChange={handleChange}
                    className="border border-gray-400 p-2 w-full"
                />
            </div>
            <button className="bg-purple-700 text-white text-md py-3 px-6 rounded-md hover:bg-purple-800">
                Submit
            </button>
        </form>
    );
};

export default MedicationForm;
