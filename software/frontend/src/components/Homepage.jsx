import React from "react";

const Homepage = () => {
    return (
        <div className="flex flex-col bg-gray-300">
            <h1 className="text-3xl font-bold text-purple-700">MediAlert</h1>
            <p className="text-lg text-gray-700">Your personal medication reminder system</p>
            <div className="w-64 h-64 mt-10 bg-white rounded-full shadow-lg">
                <i className="fas fa-pill fa-4x text-purple-700 text-center py-12"></i>
            </div>
            <div className="text-wrap">
                <p className="text-base text-gray-700 ">
                    Welcome to MediAlert, your personal medication reminder system! With our state-of-the-art wearable technology, you'll never forget to take your medication again. Our system uses gentle reminders to keep you on track, ensuring that you stay healthy and on top of your health. Simply connect your device to our app, set your medication schedule, and let us take care of the rest. Whether you're at home or on the go, our wearable notifications will discreetly remind you to take your medication on time. Say goodbye to missed doses and hello to a healthier, happier you with MediAlert.
                </p>
            </div>
        </div>
    );
};

export default Homepage;
