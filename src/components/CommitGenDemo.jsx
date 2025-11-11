import { useState } from 'react';
import { generateCommit } from '@upendra.manike/commit-gen';
import './Demo.css';

function CommitGenDemo() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [examples] = useState([
    { input: 'fix login bug on Safari', expected: 'fix(auth): fix login bug on Safari' },
    { input: 'add new user registration feature', expected: 'feat(auth): add new user registration feature' },
    { input: 'update dependencies', expected: 'chore(deps): update dependencies' },
    { input: 'refactor user service', expected: 'refactor(user): refactor user service' },
    { input: 'remove unused code', expected: 'chore: remove unused code' },
    { input: 'update documentation', expected: 'docs: update documentation' },
    { input: 'fix memory leak in cache', expected: 'fix(cache): fix memory leak in cache' },
    { input: 'add unit tests for auth', expected: 'test(auth): add unit tests for auth' },
  ]);

  const handleGenerate = () => {
    if (!input.trim()) {
      setOutput('');
      return;
    }
    try {
      const result = generateCommit(input);
      setOutput(result);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  const handleExample = (exampleInput) => {
    setInput(exampleInput);
    try {
      const result = generateCommit(exampleInput);
      setOutput(result);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  return (
    <div className="demo-container">
      <h1>@upendra.manike/commit-gen</h1>
      <p className="demo-description">
        Natural Language to Conventional Commit - CLI tool to generate conventional commit messages automatically. 
        Convert plain English to semantic commit format. Perfect for Git workflows and CI/CD pipelines.
      </p>

      <div className="demo-section">
        <h2>Generate Conventional Commit</h2>
        <p>Type a plain English description and get a properly formatted conventional commit message.</p>
        <div className="input-group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
            className="demo-input"
            placeholder="e.g., fix login bug on Safari"
          />
          <button onClick={handleGenerate} className="demo-button">Generate</button>
        </div>
        {output && (
          <div className="demo-output">
            <h3>Generated Commit Message:</h3>
            <div className="commit-output">{output}</div>
            <button 
              onClick={() => navigator.clipboard.writeText(output)} 
              className="demo-button"
              style={{ marginTop: '10px' }}
            >
              Copy to Clipboard
            </button>
          </div>
        )}
        <div className="code-example">
          <pre>{`import { generateCommit } from '@upendra.manike/commit-gen';

// Generate conventional commit from natural language
const commit = generateCommit('fix login bug on Safari');
// Output: 'fix(auth): fix login bug on Safari'

const commit2 = generateCommit('add new user registration feature');
// Output: 'feat(auth): add new user registration feature'

// CLI usage
// npx commit-gen "fix login bug"
// Output: fix(auth): fix login bug`}</pre>
        </div>
      </div>

      <div className="demo-section">
        <h2>Try Examples</h2>
        <p>Click on any example to see how it's converted:</p>
        <div className="examples-grid">
          {examples.map((example, index) => (
            <div key={index} className="example-card" onClick={() => handleExample(example.input)}>
              <div className="example-input">
                <strong>Input:</strong> {example.input}
              </div>
              <div className="example-output">
                <strong>Output:</strong> {example.expected}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="demo-section">
        <h2>Conventional Commit Types</h2>
        <p>The tool automatically detects commit types based on keywords:</p>
        <div className="commit-types">
          <div className="commit-type-item">
            <code>feat</code> - New features
          </div>
          <div className="commit-type-item">
            <code>fix</code> - Bug fixes
          </div>
          <div className="commit-type-item">
            <code>docs</code> - Documentation changes
          </div>
          <div className="commit-type-item">
            <code>style</code> - Code style changes (formatting, etc.)
          </div>
          <div className="commit-type-item">
            <code>refactor</code> - Code refactoring
          </div>
          <div className="commit-type-item">
            <code>test</code> - Adding or updating tests
          </div>
          <div className="commit-type-item">
            <code>chore</code> - Maintenance tasks, dependencies
          </div>
          <div className="commit-type-item">
            <code>perf</code> - Performance improvements
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h2>Real-World Use Cases</h2>
        <div className="use-cases">
          <div className="use-case-item">
            <strong>Git Workflow Automation:</strong> Automatically format commit messages in CI/CD pipelines
          </div>
          <div className="use-case-item">
            <strong>Team Consistency:</strong> Ensure all team members follow conventional commit format
          </div>
          <div className="use-case-item">
            <strong>Semantic Versioning:</strong> Generate changelogs and version bumps from commit history
          </div>
          <div className="use-case-item">
            <strong>Code Review:</strong> Make commit messages more readable and searchable
          </div>
          <div className="use-case-item">
            <strong>Automation Tools:</strong> Integrate with git hooks, IDEs, and development tools
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h2>Common Patterns</h2>
        <div className="code-example">
          <pre>{`// Pattern: Git hook integration
// .git/hooks/commit-msg
const { generateCommit } = require('@upendra.manike/commit-gen');
const message = generateCommit(process.argv[2]);
fs.writeFileSync(process.argv[1], message);

// Pattern: IDE integration
// VS Code task or extension
const commit = generateCommit(userInput);
vscode.executeCommand('git.commit', commit);

// Pattern: CI/CD automation
// GitHub Actions workflow
const commit = generateCommit(prDescription);
exec(\`git commit -m "\${commit}"\`);`}</pre>
        </div>
      </div>
    </div>
  );
}

export default CommitGenDemo;

