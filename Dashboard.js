import React, { useState } from 'react';

const Dashboard = () => {
  const [project, setProject] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [demoScript, setDemoScript] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyze = async () => {
    if (!project.trim()) {
      setError('Please describe your project first');
      return;
    }

    setLoading(true);
    setError(null);
    setFeedback(null);
    setDemoScript(null);

    try {
      const response = await fetch('http://localhost:5000/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          project_details: project
        })
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      
      // Transform data to ensure proper formats
      const transformed = {
        feedback: data.feedback ? mapFeedback(data.feedback) : null,
        demoScript: data.demo_script || null
      };

      setFeedback(transformed.feedback);
      setDemoScript(transformed.demoScript);

    } catch (err) {
      setError(err.message);
      console.error('Analysis failed:', err);
    } finally {
      setLoading(false);
    }
  };

  // Ensure feedback data has proper format
  const mapFeedback = (feedback) => {
    const criteria = ['innovation', 'impact', 'usability', 'solution_quality'];
    const result = {};
    
    criteria.forEach(key => {
      const item = feedback[key] || {};
      result[key] = {
        score: typeof item.score === 'number' ? item.score : 0,
        feedback: typeof item.feedback === 'string' ? item.feedback : 'No feedback available',
        improvements: formatImprovements(item.improvements)
      };
    });
    
    return result;
  };

  // Safely format improvements
  const formatImprovements = (improvements) => {
    if (!improvements) return ['No specific suggestions provided'];
    if (typeof improvements === 'string') {
      return improvements.split('\n')
        .map(item => item.replace(/^- /, '').trim())
        .filter(item => item.length > 0);
    }
    if (Array.isArray(improvements)) return improvements;
    return [String(improvements)];
  };

  const renderScore = (score) => {
    const scoreValue = typeof score === 'number' ? score : 0;
    const scoreClass = `score-${Math.floor(scoreValue)}`;
    return (
      <span className={`score-badge ${scoreClass}`}>
        {scoreValue.toFixed(1)}/5
      </span>
    );
  };

  return (
    <div className="dashboard">
      <h1>CodeCatalyst AI Assistant</h1>
      
      <div className="input-section">
        <h2>Describe Your Project</h2>
        <textarea
          value={project}
          onChange={(e) => setProject(e.target.value)}
          placeholder="Describe your project in detail..."
          rows={6}
        />
      </div>

      <button 
        onClick={analyze}
        disabled={loading || !project.trim()}
        className="analyze-button"
      >
        {loading ? (
          <>
            <span className="spinner"></span>
            Analyzing...
          </>
        ) : 'Get Analysis'}
      </button>

      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => setError(null)}>Dismiss</button>
        </div>
      )}

      {feedback && (
        <div className="results-section">
          <h2>Project Analysis</h2>
          {Object.entries(feedback).map(([criteria, data]) => (
            <div key={criteria} className="criteria-card">
              <h3>
                {criteria.split('_').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </h3>
              
              <div className="score-section">
                <strong>Score:</strong> {renderScore(data.score)}
              </div>
              
              <div className="feedback-section">
                <p>{data.feedback}</p>
              </div>
              
              <div className="improvements-section">
                <h4>Suggestions:</h4>
                <ul>
                  {data.improvements.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      {demoScript && (
        <div className="results-section">
          <h2>Demo Script</h2>
          <div className="script-content">
            {demoScript.split('\n').map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;