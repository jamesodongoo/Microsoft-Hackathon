import React from 'react';

export default function FeedbackPanel({ feedback }) {
  return (
    <div className="feedback-panel">
      <h2>Feedback</h2>
      <div className="feedback-section">
        <h3>Innovation</h3>
        <p>{JSON.stringify(feedback.feedback.innovation, null, 2)}</p>
      </div>
      <div className="feedback-section">
        <h3>Responsible AI</h3>
        <pre>{JSON.stringify(feedback.rai_report, null, 2)}</pre>
      </div>
    </div>
  );
}