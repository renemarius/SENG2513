import React from 'react';

const QuizExplanations = ({quizData, userAnswers, onRetake, navigate}) => {
    //const [hasSaved, setHasSaved] = useState(false);

    /*const savedExplanations = () => {
        if (hasSaved) return;

    }*/
    return (
        <div className="card text-white border" style={{backgroundColor: "#1a1a1a",}} >
            <div className="card-body">
                <h2 className="text-center mb-4">Explanations</h2>
                
                {quizData.map((question, index) => (
                    <div key={index} className="mb-4 p-3 border rounded">
                        <h4>{index + 1}. {question.question}</h4>
                        <div className="options mt-2">
                            {question.options.map((option, optIndex) => (
                            <div key={optIndex} className={`mb-1 ${
                                option === question.correctAnswer 
                                ? 'text-success fw-bold' 
                                : option === userAnswers[index]
                                    ? 'text-danger' 
                                    : ''
                            }`}>
                                {option} {option === question.correctAnswer && '✓'} 
                                {option === userAnswers[index] && option !== question.correctAnswer && '✗'}
                            </div>
                            ))}
                        </div>
                        <div className="explanation mt-3 p-2 bg-dark border-info border rounded">
                            <h5>Explanation:</h5>
                            <p>{question.explanation}</p>
                        </div>
                    </div>
                ))}
                
                <div className="text-center mt-4">
                    <button className="btn btn-primary me-2" onClick={onRetake}>
                    Retake Quiz
                    </button>
                    <button className="btn btn-secondary me-2" onClick={() => navigate('/quiz-generator/ai')}>
                    New Quiz
                    </button>
                    {/*<button 
                            className="btn btn-success me-2" 
                            onClick={savedExplanations}
                            disabled={hasSaved}
                        >
                            {hasSaved ? "Saved" : "Save Quiz"}
                    </button>
                    <button className="btn me-2 btn-danger" onClick={() => navigate('/')}>
                        Exit
                    </button>*/}
                </div>
            </div>
        </div>
    );
}

export default QuizExplanations;