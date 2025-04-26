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
            try {
                const res = await fetch(`https://localhost:3001/api/result/attempts/${userID}`);
                const attempts = await res.json();
        
                const quizzesCompleted = attempts.length;
        
                let totalScore = 0;
                let totalPossible = 0;
                let totalQuestionsAnswered = 0;
        
                attempts.forEach(attempt => {
                    totalScore += attempt.score;
                    totalPossible += attempt.totalQuestions;
                    totalQuestionsAnswered += attempt.totalQuestions;
                });

                console.log("Total Score: ", totalScore);
        
                const averageScore = totalPossible > 0
                    ? `${Math.round((totalScore / totalPossible) * 100)}%`
                    : "0%";
        
                setUser(prev => ({
                    ...prev,
                    quizzesCompleted,
                    averageScore,
                    questionsAnswered: totalQuestionsAnswered,
                }));
            } catch (err) {
                console.error("Failed to fetch stats:", err);
            }
        };        
    
        fetchUserInfo();
        fetchStats();
    }, []);

    return (
        <div className="d-flex flex-column vh-80">
            {/* Main content */}
            <div className="flex-grow-1 text-white">
                <div className="container pt-5 pb-3">
                    <div className="d-flex flex-column flex-md-row align-items-center gap-4 mb-5">
                        <div className="position-relative">
                            {/* Modern glow effect */}
                            <div
                                className="position-absolute"
                                style={{
                                    top: "-10px",
                                    left: "-10px",
                                    width: "calc(100% + 20px)",
                                    height: "calc(100% + 20px)",
                                    backgroundColor: "#237ac3",
                                    filter: "blur(20px)",
                                    opacity: "0.5",
                                    zIndex: 0,
                                    borderRadius: "50%",
                                }}
                            />
                            <img
                            src={icon}
                            alt="profile"
                            className="rounded-circle position-relative"
                            style={{
                                width: "140px",
                                height: "140px",
                                objectFit: "cover",
                                border: "3px solid rgba(35, 122, 195, 0.8)",
                                zIndex: 1,
                                boxShadow: "0 8px 32px rgba(35, 122, 195, 0.3)",
                            }}
                            />
                        </div>
            
                        <div className="text-center text-md-start" style={{ color: "#e0e0e0" }}>
                            <h2 className="fw-bold mb-2">{user.name}</h2>
                            <p className="mb-1 opacity-75">{user.email}</p>
                            <p className="mb-2 opacity-75">Joined {user.joined}</p>
                        </div>
                    </div>
            
                    {/* Stats cards with modern design */}
                    <div className="row g-4 mt-3">
                        <div className="col-md-6">
                            <div 
                            className="p-4 rounded-4 h-100 text-center transition-all" 
                            style={{ 
                                background: "linear-gradient(145deg, #1a1a1a, #242424)",
                                boxShadow: "0 4px 24px rgba(0, 0, 0, 0.2)",
                                border: "1px solid rgba(35, 122, 195, 0.2)",
                                transform: "translateY(0)",
                                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.transform = "translateY(-5px)";
                                e.currentTarget.style.boxShadow = "0 8px 32px rgba(35, 122, 195, 0.3)";
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow = "0 4px 24px rgba(0, 0, 0, 0.2)";
                            }}
                            >
                            <h3 className="display-4 fw-bold mb-0" style={{ color: "#3d9eff" }}>{user.quizzesCompleted}</h3>
                            <p className="mt-2 text-white-50">Quizzes Completed</p>
                            </div>
                        </div>
                    
                        <div className="col-md-6">
                            <div 
                            className="p-4 rounded-4 h-100 text-center transition-all" 
                            style={{ 
                                background: "linear-gradient(145deg, #1a1a1a, #242424)",
                                boxShadow: "0 4px 24px rgba(0, 0, 0, 0.2)",
                                border: "1px solid rgba(35, 122, 195, 0.2)",
                                transform: "translateY(0)",
                                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.transform = "translateY(-5px)";
                                e.currentTarget.style.boxShadow = "0 8px 32px rgba(35, 122, 195, 0.3)";
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow = "0 4px 24px rgba(0, 0, 0, 0.2)";
                            }}
                            >
                            <h3 className="display-4 fw-bold mb-0" style={{ color: "#3d9eff" }}>{user.averageScore}</h3>
                            <p className="mt-2 text-white-50">Average Score</p>
                            </div>
                        </div>
                    
                        <div className="col-12">
                            <div 
                            className="p-4 rounded-4 text-center transition-all" 
                            style={{ 
                                background: "linear-gradient(145deg, #1a1a1a, #242424)",
                                boxShadow: "0 4px 24px rgba(0, 0, 0, 0.2)",
                                border: "1px solid rgba(35, 122, 195, 0.2)",
                                transform: "translateY(0)",
                                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.transform = "translateY(-5px)";
                                e.currentTarget.style.boxShadow = "0 8px 32px rgba(35, 122, 195, 0.3)";
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow = "0 4px 24px rgba(0, 0, 0, 0.2)";
                            }}
                            >
                            <h3 className="display-4 fw-bold mb-0" style={{ color: "#3d9eff" }}>{user.questionsAnswered}</h3>
                            <p className="mt-2 text-white-50">Questions Answered</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;