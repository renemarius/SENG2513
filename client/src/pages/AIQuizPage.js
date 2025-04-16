import React from 'react';
import AIQuizGenerator from '../components/AIQuizGenerator';

function AIQuizPage() {
  return (
    <div className="container mt-4">
      <h1>Create an AI-Generated Quiz</h1>
      <p className="lead">
        Tell us what topic you want to test your knowledge on, and our AI will create
        a custom quiz just for you!
      </p>
      <div className="card">
        <div className="card-body">
          <AIQuizGenerator />
        </div>
      </div>
    </div>
  );
}

export default AIQuizPage;