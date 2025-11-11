import { useState } from 'react';
import { generateChangelog } from '@upendra.manike/changelog-buddy';
import './Demo.css';

function ChangelogBuddyDemo() {
  const [changelog, setChangelog] = useState('');
  const [exampleCommits] = useState([
    'feat(auth): add user authentication',
    'fix(api): resolve timeout issue',
    'docs(readme): update installation guide',
    'refactor(utils): optimize data processing',
    'feat(ui): add dark mode support',
    'fix(bug): resolve memory leak',
    'chore(deps): update dependencies',
    'test(auth): add unit tests',
    'perf(cache): improve cache performance',
    'feat(api): add pagination support',
  ]);

  const handleGenerate = () => {
    try {
      const result = generateChangelog(exampleCommits, '1.2.0');
      setChangelog(result);
    } catch (error) {
      setChangelog(`Error: ${error.message}`);
    }
  };

  return (
    <div className="demo-container">
      <h1>@upendra.manike/changelog-buddy</h1>
      <p className="demo-description">
        Auto Changelog Generator for Git - Reads commits and generates markdown changelog with emojis + semver bump. 
        Perfect for automation and CI/CD pipelines. Generate professional changelogs automatically.
      </p>

      <div className="demo-section">
        <h2>Generate Changelog</h2>
        <p>Generate a changelog from an array of conventional commit messages.</p>
        <button onClick={handleGenerate} className="demo-button">Generate Changelog</button>
        {changelog && (
          <div className="demo-output">
            <h3>Generated Changelog:</h3>
            <div className="changelog-output">
              <pre>{changelog}</pre>
            </div>
            <button 
              onClick={() => navigator.clipboard.writeText(changelog)} 
              className="demo-button"
              style={{ marginTop: '10px' }}
            >
              Copy to Clipboard
            </button>
          </div>
        )}
        <div className="code-example">
          <pre>{`import { generateChangelog } from '@upendra.manike/changelog-buddy';

const commits = [
  'feat(auth): add user authentication',
  'fix(api): resolve timeout issue',
  'docs(readme): update installation guide',
  'refactor(utils): optimize data processing',
];

const changelog = generateChangelog(commits, '1.2.0');
// Generates formatted markdown changelog

// CLI usage
// npx changelog-buddy
// Reads git commits and generates CHANGELOG.md`}</pre>
        </div>
      </div>

      <div className="demo-section">
        <h2>Input Commits</h2>
        <p>These are the commits used to generate the changelog above:</p>
        <div className="commits-list">
          {exampleCommits.map((commit, index) => (
            <div key={index} className="commit-item">
              <code>{commit}</code>
            </div>
          ))}
        </div>
      </div>

      <div className="demo-section">
        <h2>Features</h2>
        <div className="features-list">
          <div className="feature-item">
            <strong>✨ Automatic Categorization:</strong> Groups commits by type (feat, fix, docs, etc.)
          </div>
          <div className="feature-item">
            <strong>📝 Markdown Format:</strong> Generates clean, readable markdown changelogs
          </div>
          <div className="feature-item">
            <strong>🎯 Semver Detection:</strong> Automatically suggests version bumps based on commit types
          </div>
          <div className="feature-item">
            <strong>🔍 Commit Parsing:</strong> Extracts scope, type, and description from commits
          </div>
          <div className="feature-item">
            <strong>🚀 CI/CD Ready:</strong> Perfect for automated release workflows
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h2>Real-World Use Cases</h2>
        <div className="use-cases">
          <div className="use-case-item">
            <strong>Release Management:</strong> Automatically generate changelogs for each release
          </div>
          <div className="use-case-item">
            <strong>CI/CD Automation:</strong> Integrate into GitHub Actions, GitLab CI, or other pipelines
          </div>
          <div className="use-case-item">
            <strong>Documentation:</strong> Keep project documentation up-to-date with latest changes
          </div>
          <div className="use-case-item">
            <strong>Version Bumping:</strong> Automatically determine version bumps (major, minor, patch)
          </div>
          <div className="use-case-item">
            <strong>Team Communication:</strong> Share what changed in each release with stakeholders
          </div>
        </div>
      </div>

      <div className="demo-section">
        <h2>Common Patterns</h2>
        <div className="code-example">
          <pre>{`// Pattern: Git integration
const { execSync } = require('child_process');
const { generateChangelog } = require('@upendra.manike/changelog-buddy');

// Get commits since last tag
const commits = execSync('git log --pretty=format:"%s" v1.0.0..HEAD')
  .toString()
  .split('\\n')
  .filter(Boolean);

const changelog = generateChangelog(commits, '1.1.0');
fs.writeFileSync('CHANGELOG.md', changelog);

// Pattern: GitHub Actions workflow
// .github/workflows/release.yml
- name: Generate Changelog
  run: |
    npx changelog-buddy --since=\${{ github.event.release.tag_name }}
    git add CHANGELOG.md
    git commit -m "docs: update changelog"

// Pattern: Pre-release script
// package.json scripts
{
  "prerelease": "changelog-buddy && npm version patch"
}`}</pre>
        </div>
      </div>
    </div>
  );
}

export default ChangelogBuddyDemo;

