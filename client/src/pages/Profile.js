import React from "react";

const Profile = () => {
    const user = {
        name: "User Name",
        email: "useremail@mail.com",
        joined: "February 2025",
        quizzesCompleted: 30,
        averageScore: "85%",
        questionsAnswered: 145,
    };

    return (
        <div className="bg-black text-white min-h-screen px-8 py-6">
            <div className="max-w-3xl mx-auto bg-gray-900 rounded-lg p-6">
                <div className="flex gap-6 items-center mb-6">
                    <div className="w-24 h-24 rounded-full bg-gray-700"></div>
                    <div>
                        <h2 className="text-2xl font-bold">{user.name}</h2>
                        <p className="text-gray-400">{user.email}</p>
                        <p className="text-gray-500">Joined {user.joined}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mt-6">
                    <div className="bg-gray-800 p-6 rounded-lg border border-indigo-600">
                        <h3 className="text-3xl font-bold text-indigo-400">{user.quizzesCompleted}</h3>
                        <p className="text-gray-400 mt-2">Quizzes Completed</p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg border border-indigo-600">
                        <h3 className="text-3xl font-bold text-indigo-400">{user.averageScore}</h3>
                        <p className="text-gray-400 mt-2">Average Score</p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg border border-indigo-600 col-span-2">
                        <h3 className="text-3xl font-bold text-indigo-400">{user.questionsAnswered}</h3>
                        <p className="text-gray-400 mt-2">Questions Answered</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;