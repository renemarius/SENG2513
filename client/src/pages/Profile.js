import React, { useEffect, useState } from "react";
import icon from "../assets/person-icon-1.png";

const Profile = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        joined: "",
        quizzesCompleted: 0,
        averageScore: "0%",
        questionsAnswered: 0,
    });
    
    useEffect(() => {
        const userID = localStorage.getItem("userID");
        console.log("USER ID:",userID);
    
        const fetchUserInfo = async () => {
            const res = await fetch(`https://localhost:3001/api/user/${userID}`);
            const data = await res.json();
            setUser(prev => ({
                ...prev,
                name: data.username,
                email: data.email,
                joined: new Date(data.joined).toLocaleString("default", { month: "long", year: "numeric" }),
            }));
        };
    
        const fetchStats = async () => {
            const res = await fetch(`https://localhost:3001/api/user/${userID}/stats`);
            const stats = await res.json();
            setUser(prev => ({ ...prev, ...stats }));
        };
    
        fetchUserInfo();
        fetchStats();
    }, []);

    return (
        <div className="text-white min-h-screen px-8 py-6">
            <div className="d-flex align-items-center gap-4 mb-5 " style={{ padding: "50px 50px" }} >
                <div className="position-relative d-inline-block">
                    <div
                        className="position-absolute top-0 start-0 w-100 h-100 rounded-circle"
                        style={{
                        backgroundColor: "#237ac3",
                        filter: "blur(10px)",
                        zIndex: 0,
                        }}
                    />
                    <img
                        src={icon}
                        alt="profile"
                        className="rounded-circle position-relative"
                        style={{
                        width: "160px",
                        height: "160px",
                        objectFit: "cover",
                        border: "4px solid #237ac3",
                        zIndex: 1,
                        }}
                    />
                    </div>

                <div style={{ fontSize: "1.25rem", color: "#cfe9ff", }}>
                    <h2 className="fw-bold fs-3 mb-1">{user.name}</h2>
                    <p className="mb-1">{user.email}</p>
                    <p className="mb-1">Joined {user.joined}</p>
                </div>
            </div>
            <div className="row px-5 g-4">
                <div className="col-md-6">
                    <div className="stat-card p-4 text-center rounded" 
                            style={{ borderStyle: "solid", borderColor: "#237ac3", backgroundColor: "#1a1a1a", }} >
                        <h3 className="display-5" style={{ color: "#237ac3", }} >{user.quizzesCompleted}</h3>
                        <p className="mt-2">Quizzes Completed</p>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="stat-card p-4 text-center rounded" 
                            style={{ borderStyle: "solid", borderColor: "#237ac3", backgroundColor: "#1f1f1f", }} >
                        <h3 className="display-5" style={{ color: "#237ac3", }} >{user.averageScore}</h3>
                        <p className="mt-2">Average Score</p>
                    </div>
                </div>
                <div className="col-12">
                    <div className="stat-card p-4 text-center rounded" 
                            style={{ borderStyle: "solid", borderColor: "#237ac3", backgroundColor: "#1f1f1f", }} >
                        <h3 className="display-5" style={{ color: "#237ac3", }} >{user.questionsAnswered}</h3>
                        <p className="mt-2">Questions Answered</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;