import { useRef, useState } from 'react'
import { ArrowUpRight, Terminal } from 'lucide-react'
import { profile } from '../data'
import { repositoryUrl, resumeUrl } from '../orbitData'
const help =
  'help · profile · projects · skills · architecture · agentic-ai · rag · mlops · cloud · github · contact · resume · clear'
export default function OrbitTerminal({ onArchitecture, onProfile }) {
  const [input, setInput] = useState(''),
    [history, setHistory] = useState([]),
    [entries, setEntries] = useState([
      {
        command: '',
        text: 'Welcome to AI ORBIT. Type help to explore. This is a local portfolio navigator, not a system shell.',
      },
    ])
  const historyIndex = useRef(-1)
  function submit(e) {
    e.preventDefault()
    const command = input.trim()
    if (!command) return
    setInput('')
    setHistory((h) => [command, ...h].slice(0, 30))
    historyIndex.current = -1
    const key = command.toLowerCase()
    if (key === 'clear') {
      setEntries([])
      return
    }
    const commands = {
      help,
      profile: `${profile.name} — ${profile.title}\n${profile.summary}`,
      projects:
        'Cigna Healthcare: RAG & governed agents\nRegions Bank: financial ML & MLOps\nPublix: recommendations & forecasting',
      skills:
        'Python · SQL · LangGraph · MCP · Bedrock · OpenSearch · PySpark · MLflow · Docker · Kubernetes',
      architecture: 'Opening the interactive healthcare architecture.',
      'agentic-ai':
        'LangGraph + LangChain → authorized MCP tools → structured outputs → human review. See the orchestration explorer.',
      rag: 'Documents → chunking → embeddings → hybrid retrieval → context → Bedrock / Claude → grounding checks. Techniques: metadata filtering, reranking, response validation.',
      mlops:
        'Feature engineering → experiment tracking → validation → packaging → controlled deployment → monitoring. MLflow · Azure ML · Docker · AKS · Jenkins · GitHub Actions.',
      cloud:
        'AWS: Bedrock, EKS, S3, Redshift, CloudWatch, X-Ray\nAzure: Azure ML, AKS, Synapse, ADLS Gen2\nGCP: Vertex AI, Gemini, BigQuery, GKE',
      github: 'Portfolio source repository on GitHub.',
      contact:
        'guvvalavarunreddy2103@gmail.com\nlinkedin.com/in/varunreddy-guvvala/',
      resume: 'Download the latest user-supplied AWS base resume (.docx).',
    }
    setEntries((items) =>
      [
        ...items,
        {
          command,
          text:
            commands[key] ??
            `Unknown command: ${command}. Type help for available commands.`,
          link:
            key === 'github'
              ? repositoryUrl
              : key === 'resume'
                ? resumeUrl
                : undefined,
          download: key === 'resume',
        },
      ].slice(-12),
    )
    if (key === 'architecture') onArchitecture('healthcare')
    if (key === 'profile') onProfile()
  }
  function keys(e) {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      historyIndex.current = Math.min(
        historyIndex.current + 1,
        history.length - 1,
      )
      setInput(history[historyIndex.current] ?? '')
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      historyIndex.current = Math.max(historyIndex.current - 1, -1)
      setInput(historyIndex.current === -1 ? '' : history[historyIndex.current])
    }
  }
  return (
    <section className="section terminal-section" id="terminal">
      <div className="container">
        <div className="terminal-intro">
          <p className="eyebrow">04 / THE SHORTCUT</p>
          <h2>
            A little more
            <br />
            <em>command line.</em>
          </h2>
          <p>Prefer to explore with a keyboard? You’re in the right place.</p>
        </div>
        <div className="orbit-terminal">
          <div className="terminal-top">
            <span>
              <Terminal size={14} /> AI-ORBIT / LOCAL NAVIGATOR
            </span>
            <div>
              <i />
              <i />
              <i />
            </div>
          </div>
          <div
            className="terminal-log"
            role="log"
            aria-label="Portfolio terminal output"
            aria-live="polite"
          >
            {entries.map((entry, index) => (
              <div key={index}>
                {entry.command && (
                  <p className="terminal-command">
                    AI-ORBIT &gt; <span>{entry.command}</span>
                  </p>
                )}
                <p>{entry.text}</p>
                {entry.link && (
                  <a
                    href={entry.link}
                    download={entry.download ? true : undefined}
                    target={entry.download ? undefined : '_blank'}
                    rel="noopener noreferrer"
                  >
                    {entry.download
                      ? 'Download resume (.docx)'
                      : 'Open repository'}
                    <ArrowUpRight size={12} />
                  </a>
                )}
              </div>
            ))}
          </div>
          <form onSubmit={submit}>
            <label htmlFor="orbit-command">AI-ORBIT &gt;</label>
            <input
              id="orbit-command"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={keys}
              autoComplete="off"
              spellCheck="false"
              placeholder="Type help and press Enter"
            />
            <button type="submit">
              Run <ArrowUpRight size={13} />
            </button>
          </form>
          <p className="terminal-hint">
            ↑ ↓ Command history<span>No shell execution. No API calls.</span>
          </p>
        </div>
      </div>
    </section>
  )
}
