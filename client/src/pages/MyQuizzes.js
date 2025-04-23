import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const MyQuizzes = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const userID = localStorage.getItem("userID");
    const navigate = useNavigate();

    const getDifficultyBadge = (difficulty) => {
        switch (difficulty?.toLowerCase()) {
          case 'easy':
            return 'bg-success';
          case 'medium':
            return 'bg-warning text-dark';
          case 'hard':
            return 'bg-danger';
          default:
            return 'bg-secondary';
        }
    };
      

    useEffect(() => {
        const fetchQuizzes = async () => {
        try {
            const res = await axios.get(`/api/result/user/${userID}`);
            setQuizzes(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching quizzes:", err);
            setError("Failed to load quizzes.");
            setLoading(false);
        }
        };

        fetchQuizzes();
    }, [userID]);

    //console.log(quizzes);

    if (loading) return <p className="text-white">Loading your quizzes...</p>;
    if (error) return <p className="text-danger">{error}</p>;

    return (
        <div className="container pt-4 pb-4 px-4">
            <div className="card text-white border-0 rounded-4 shadow-sm p-4" style={{ backgroundColor: '#1a1a1a' }}>
                <h2 className="mb-4">My Quizzes</h2>
            
                {quizzes.length === 0 ? (
                <p>You haven't saved any quizzes yet.</p>
                ) : (
                    <div className="row row-cols-1 row-cols-md-2 g-4">
                        {quizzes.map((quiz) => (
                            <div key={quiz.quizID} className="col">
                                <div
                                    className="card bg-dark text-light h-100 border-primary"
                                    onClick={() => navigate(`/quiz/${quiz.quizID}`)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <h5 className="card-title">{quiz.topic}</h5>
                                            <span className={`badge ${getDifficultyBadge(quiz.difficulty)}`}>
                                                {quiz.difficulty || 'N/A'}
                                            </span>
                                        </div>
                                        <p className="card-text mb-1">
                                            Taken on {new Date(quiz.createdAt).toLocaleDateString()}
                                        </p>
                                        <div className="d-flex justify-content-between mt-3">
                                            <span className="badge bg-success">
                                                {quiz.score}/{quiz.totalQuestions}
                                            </span>
                                            <span className="text-end small">
                                                Accuracy: {Math.round((quiz.score / quiz.totalQuestions) * 100)}%
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default MyQuizzes;