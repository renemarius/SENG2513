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
        <div className="position-relative" style={{ height: "88vh" }}>
      
          {/* Background split */}
          <div className="d-flex flex-column h-100">
            {/* Black top background */}
            <div className="bg-black" style={{ flex: '0 0 30%' }}></div>

            {/* Gray bottom background */}
            <div className="bg-secondary" style={{ flex: '0 0 70%' }}></div>
          </div>
      
          {/* Card positioned on top */}
          <div
            className="bg-white rounded-4 shadow-lg p-4 d-flex flex-column align-items-center"
            style={{
                width: '100%',
                maxWidth: '700px',
                position: 'absolute',
                top: '30%',
                left: '50%',
                transform: 'translate(-50%, -25%)',
                textAlign: 'center'
            }}
          >
            {/* Profile Picture */}
            <div style={{ position: 'absolute', top: '-60px', left: '50%', transform: 'translateX(-50%)' }}>
              <img 
                src={icon} 
                alt="Profile" 
                className="rounded-circle" 
                style={{ width: '120px', height: '120px', objectFit: 'cover', border: '5px solid white', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}
              />
            </div>
      
            {/* Top Buttons */}
            <div className="d-flex justify-content-between mt-5 px-3 w-100">
              <div style={{ color: '#3a7bd5', fontSize: '14px', cursor: 'pointer' }}>
                <i className="bi bi-collection" style={{ marginRight: '4px' }}></i> Quizzes
              </div>
              <div style={{ color: '#3a7bd5', fontSize: '14px', cursor: 'pointer' }}>
                <i className="bi bi-award" style={{ marginRight: '4px' }}></i> Attempts
              </div>
            </div>
      
            {/* User Info */}
            <div className="mt-3">
              <h3 className="fw-bold text-dark mb-1">{user.name}</h3>
              <p className="text-secondary mb-1">{user.email}</p>
              <p className="text-muted" style={{ fontSize: '14px' }}>Joined {user.joined}</p>
            </div>
      
            {/* Stats */}
            <div className="d-flex justify-content-around my-4 w-100">
              <div>
                <h4 className="fw-bold text-primary mb-0">{user.quizzesCompleted}</h4>
                <small className="text-dark">Quizzes</small>
              </div>
              <div>
                <h4 className="fw-bold text-primary mb-0">{user.averageScore}</h4>
                <small className="text-dark">Avg Score</small>
              </div>
              <div>
                <h4 className="fw-bold text-primary mb-0">{user.questionsAnswered}</h4>
                <small className="text-dark">Questions</small>
              </div>
            </div>
      
            {/* Show More Button */}
            <button className="btn btn-primary rounded-pill px-4">Take New Quiz</button>
      
          </div>
      
        </div>
    );
};

export default Profile;