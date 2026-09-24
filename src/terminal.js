import { sound } from './audio.js';

export class InteractiveTerminal {
  constructor(containerId, inputId, outputId) {
    this.container = document.getElementById(containerId);
    this.input = document.getElementById(inputId);
    this.output = document.getElementById(outputId);
    this.history = [];
    this.historyIndex = -1;

    this.commands = {
      help: () => this.cmdHelp(),
      status: () => this.cmdStatus(),
      'rag-query': (args) => this.cmdRagQuery(args),
      'docker-ps': () => this.cmdDockerPs(),
      metrics: () => this.cmdMetrics(),
      skills: () => this.cmdSkills(),
      contact: () => this.cmdContact(),
      clear: () => this.cmdClear(),
      neofetch: () => this.cmdNeofetch(),
      whoami: () => this.cmdWhoami(),
      about: () => this.cmdAbout(),
      ls: () => this.cmdLs(),
      sudo: () => this.cmdSudo(),
    };

    this.init();
  }

  init() {
    if (!this.input || !this.output) return;

    // Production Linux / FastAPI Welcome Banner
    this.appendOutput(`
<div style="color: #00f5ff; font-weight: 700; margin-bottom: 0.5rem; font-family: monospace;">
  ____  ____     _ __     _______ _____ _   _ 
 |  _ \\|  _ \\   / \\\\ \\   / / ____| ____| \\ | |
 | |_) | |_) | / _ \\\\ \\ / /|  _| |  _| |  \\| |
 |  __/|  _ < / ___ \\\\ V / | |___| |___| |\\  |
 |_|   |_| \\_/_/   \\_\\\\_/  |_____|_____|_| \\_|
</div>
<div style="color: #10b981; font-weight: 600;">● RUNTIME INITIALIZED: NIE Cluster Node-01 • Linux 6.8.0-fastapi</div>
<div style="color: #94a3b8; font-size: 0.84rem; margin-top: 0.2rem;">
  Python 3.12.3 • FastAPI 0.111 • Qdrant Vector Engine 1.9.2 • Docker 26.1
</div>
<div style="color: #64748b; font-size: 0.8rem; margin: 0.5rem 0;">
  Type <span style="color: #00f5ff; font-weight: 600;">help</span> to inspect system directives or click quick chips below.
</div>
<div style="border-bottom: 1px dashed #1e2430; margin: 0.6rem 0;"></div>
`);

    this.input.addEventListener('keydown', (e) => {
      sound.playKeypress();

      if (e.key === 'Enter') {
        const commandLine = this.input.value.trim();
        if (commandLine) {
          this.history.push(commandLine);
          this.historyIndex = this.history.length;
          this.execute(commandLine);
        } else {
          this.appendOutput(`<div class="terminal-line"><span style="color: #00f5ff;">praveen@nie-cluster:~$</span></div>`);
        }
        this.input.value = '';
        this.scrollToBottom();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (this.history.length > 0 && this.historyIndex > 0) {
          this.historyIndex--;
          this.input.value = this.history[this.historyIndex];
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (this.historyIndex < this.history.length - 1) {
          this.historyIndex++;
          this.input.value = this.history[this.historyIndex];
        } else {
          this.historyIndex = this.history.length;
          this.input.value = '';
        }
      }
    });

    // Handle suggestion chips
    document.querySelectorAll('.chip-btn').forEach((chip) => {
      chip.addEventListener('click', () => {
        const cmd = chip.getAttribute('data-cmd');
        if (cmd) {
          sound.playKeypress();
          this.input.value = cmd;
          this.history.push(cmd);
          this.historyIndex = this.history.length;
          this.execute(cmd);
          this.input.value = '';
          this.scrollToBottom();
        }
      });
    });

    // Clear button
    const clearBtn = document.getElementById('terminal-clear-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => this.cmdClear());
    }
  }

  execute(commandLine) {
    const [rawCmd, ...args] = commandLine.trim().split(/\s+/);
    const cmd = rawCmd.toLowerCase();

    // Echo prompt
    this.appendOutput(`
      <div class="terminal-line">
        <span style="color: #00f5ff; font-weight: 600;">praveen@nie-cluster:~$</span>
        <span style="color: #ffffff;">${this.escapeHtml(commandLine)}</span>
      </div>
    `);

    if (this.commands[cmd]) {
      this.commands[cmd](args);
    } else {
      sound.playBeep(400, 0.1);
      this.appendOutput(`
        <div class="terminal-line" style="color: #ef4444;">
          zsh: command not found: ${this.escapeHtml(cmd)}. Type <span style="color: #00f5ff;">help</span> for directives.
        </div>
      `);
    }
  }

  cmdHelp() {
    sound.playBeep(660, 0.05);
    this.appendOutput(`
<div style="color: #00f5ff; font-weight: 600; margin-bottom: 0.35rem;">ENGINEERING REPL DIRECTIVES:</div>
<table style="width: 100%; border-collapse: collapse; font-size: 0.84rem; font-family: monospace;">
  <tr>
    <td style="color: #c084fc; width: 170px; padding: 3px 0;">help</td>
    <td style="color: #94a3b8;">Output terminal manual and directive specs</td>
  </tr>
  <tr>
    <td style="color: #c084fc; padding: 3px 0;">status</td>
    <td style="color: #94a3b8;">Inspect live cluster health, microservices, and memory allocation</td>
  </tr>
  <tr>
    <td style="color: #c084fc; padding: 3px 0;">rag-query &lt;text&gt;</td>
    <td style="color: #94a3b8;">Run 1536-d semantic vector query against Qdrant HNSW index</td>
  </tr>
  <tr>
    <td style="color: #c084fc; padding: 3px 0;">docker-ps</td>
    <td style="color: #94a3b8;">List active containerized microservices and port mappings</td>
  </tr>
  <tr>
    <td style="color: #c084fc; padding: 3px 0;">metrics</td>
    <td style="color: #94a3b8;">Display p50/p95/p99 latency percentiles & throughput data</td>
  </tr>
  <tr>
    <td style="color: #c084fc; padding: 3px 0;">skills</td>
    <td style="color: #94a3b8;">Print technical capabilities and architecture competencies</td>
  </tr>
  <tr>
    <td style="color: #c084fc; padding: 3px 0;">contact</td>
    <td style="color: #94a3b8;">Print direct communication channels (Email & GitHub)</td>
  </tr>
  <tr>
    <td style="color: #c084fc; padding: 3px 0;">clear</td>
    <td style="color: #94a3b8;">Flush the terminal display buffer</td>
  </tr>
</table>
`);
  }

  cmdStatus() {
    sound.playBeep(720, 0.06);
    this.appendOutput(`
<div style="color: #00f5ff; font-weight: 600; margin-bottom: 0.35rem;">[CLUSTER STATUS] Node: nie-cluster-primary (Ubuntu 24.04 LTS)</div>
<div style="font-family: monospace; font-size: 0.83rem; line-height: 1.6;">
  <div><span style="color: #10b981;">●</span> FastAPI ASGI: <span style="color: #38bdf8;">ONLINE</span> (4 Uvicorn workers, non-blocking asyncio loop)</div>
  <div><span style="color: #10b981;">●</span> Qdrant Cluster: <span style="color: #38bdf8;">CONNECTED</span> (HNSW index loaded, 52,140 dense vectors)</div>
  <div><span style="color: #10b981;">●</span> MySQL 8.0: <span style="color: #38bdf8;">HEALTHY</span> (Active connection pool: 6/20, max_overflow=10)</div>
  <div><span style="color: #10b981;">●</span> MongoDB Store: <span style="color: #38bdf8;">HEALTHY</span> (Telemetry audit replica active)</div>
  <div><span style="color: #10b981;">●</span> Docker Engine: <span style="color: #38bdf8;">RUNNING</span> (v26.1, multi-stage Alpine containers)</div>
  <div style="color: #94a3b8; margin-top: 0.3rem;">System Load: 0.18, 0.22, 0.19 | Memory: 1.42GB / 32.0GB (4.4% utilized)</div>
</div>
`);
  }

  cmdMetrics() {
    sound.playBeep(800, 0.06);
    this.appendOutput(`
<div style="color: #00f5ff; font-weight: 600; margin-bottom: 0.4rem;">[BENCHMARK TELEMETRY] Latency Percentiles & Load Profile</div>
<div style="font-family: monospace; font-size: 0.82rem; overflow-x: auto;">
  <table style="width: 100%; border-collapse: collapse;">
    <tr style="border-bottom: 1px solid #1e2430; color: #94a3b8;">
      <th style="text-align: left; padding: 4px 0;">ENDPOINT / OPERATION</th>
      <th style="text-align: right; padding: 4px 8px;">P50</th>
      <th style="text-align: right; padding: 4px 8px;">P95</th>
      <th style="text-align: right; padding: 4px 0;">P99</th>
    </tr>
    <tr>
      <td style="color: #e2e8f0; padding: 3px 0;">GET /health</td>
      <td style="text-align: right; color: #10b981; padding: 3px 8px;">1.1ms</td>
      <td style="text-align: right; color: #10b981; padding: 3px 8px;">2.9ms</td>
      <td style="text-align: right; color: #10b981; padding: 3px 0;">4.6ms</td>
    </tr>
    <tr>
      <td style="color: #e2e8f0; padding: 3px 0;">POST /v1/auth/token</td>
      <td style="text-align: right; color: #10b981; padding: 3px 8px;">8.2ms</td>
      <td style="text-align: right; color: #10b981; padding: 3px 8px;">14.1ms</td>
      <td style="text-align: right; color: #10b981; padding: 3px 0;">18.5ms</td>
    </tr>
    <tr>
      <td style="color: #e2e8f0; padding: 3px 0;">POST /v1/vector/search</td>
      <td style="text-align: right; color: #38bdf8; padding: 3px 8px;">16.4ms</td>
      <td style="text-align: right; color: #38bdf8; padding: 3px 8px;">23.8ms</td>
      <td style="text-align: right; color: #38bdf8; padding: 3px 0;">34.2ms</td>
    </tr>
    <tr>
      <td style="color: #e2e8f0; padding: 3px 0;">POST /v1/rag/stream (TTFT)</td>
      <td style="text-align: right; color: #c084fc; padding: 3px 8px;">76ms</td>
      <td style="text-align: right; color: #c084fc; padding: 3px 8px;">92ms</td>
      <td style="text-align: right; color: #c084fc; padding: 3px 0;">114ms</td>
    </tr>
  </table>
  <div style="color: #10b981; margin-top: 0.4rem;">✔ Sustained Throughput: 10,420 rps under stress-test (0.00% error rate)</div>
</div>
`);
  }

  cmdRagQuery(args) {
    const query = args.join(' ') || 'FastAPI connection pooling & vector search';
    sound.playSuccess();

    this.appendOutput(`
<div style="color: #34d399; margin: 0.4rem 0;">⚡ [RAG-RETRIEVAL] Vectorizing: "${this.escapeHtml(query)}"</div>
<div style="color: #94a3b8; font-size: 0.8rem; margin-bottom: 0.5rem; font-family: monospace;">
  Dense Dim: 1536-d float32 | Metric: Cosine Distance | Index: Qdrant HNSW Graph [ONLINE]
</div>
<div style="background: rgba(0, 245, 255, 0.05); border-left: 3px solid #00f5ff; padding: 0.5rem 0.8rem; margin-bottom: 0.5rem; font-family: monospace;">
  <div style="color: #00f5ff; font-weight: 600;">1. Chunk #402: "Async SQLAlchemy Engine & MySQL 8.0 Connection Pool"</div>
  <div style="color: #e2e8f0; font-size: 0.82rem;">Cosine Similarity: <strong>0.9841</strong> [██████████████████░] 98.4%</div>
  <div style="color: #94a3b8; font-size: 0.78rem;">Context: "Configured async connection pooling with pool_size=20, max_overflow=10 to eliminate thread contention."</div>
</div>
<div style="background: rgba(139, 92, 246, 0.05); border-left: 3px solid #8b5cf6; padding: 0.5rem 0.8rem; margin-bottom: 0.5rem; font-family: monospace;">
  <div style="color: #c084fc; font-weight: 600;">2. Chunk #189: "Qdrant HNSW Graph Parameter Tuning"</div>
  <div style="color: #e2e8f0; font-size: 0.82rem;">Cosine Similarity: <strong>0.9412</strong> [████████████████░░░] 94.1%</div>
  <div style="color: #94a3b8; font-size: 0.78rem;">Context: "Tuned m=16, ef_construct=128 to achieve sub-25ms retrieval over 50k+ high-dimensional embeddings."</div>
</div>
<div style="background: rgba(255, 255, 255, 0.03); border-left: 3px solid #64748b; padding: 0.5rem 0.8rem; font-family: monospace;">
  <div style="color: #cbd5e1; font-weight: 600;">3. Chunk #88: "Multi-Stage Docker Microservice Specification"</div>
  <div style="color: #e2e8f0; font-size: 0.82rem;">Cosine Similarity: <strong>0.8920</strong> [██████████████░░░░░] 89.2%</div>
  <div style="color: #94a3b8; font-size: 0.78rem;">Context: "Constructed minimal 95MB Alpine image running non-root process with health probes."</div>
</div>
`);
  }

  cmdDockerPs() {
    sound.playBeep(520, 0.06);
    this.appendOutput(`
<div style="overflow-x: auto; color: #e2e8f0; font-size: 0.82rem; font-family: monospace;">
<div style="color: #00f5ff; font-weight: 600; margin-bottom: 0.4rem;">CONTAINER ID   IMAGE                 COMMAND                  CREATED         STATUS         PORTS                     NAMES</div>
<div>4f91b72a1e08   fastapi-core:3.12     "uvicorn main:app..."    3 hours ago     Up 3 hours     0.0.0.0:8000-&gt;8000/tcp   fastapi-app</div>
<div>b830d91e44f1   qdrant/qdrant:v1.9    "./entrypoint.sh"        3 hours ago     Up 3 hours     0.0.0.0:6333-&gt;6333/tcp   qdrant-engine</div>
<div>c7849e0a2993   mysql:8.0-debian      "docker-entrypoint..."   3 hours ago     Up 3 hours     0.0.0.0:3306-&gt;3306/tcp   mysql-cluster</div>
<div>99e218fd04ac   mongo:7.0-jammy       "docker-entrypoint..."   3 hours ago     Up 3 hours     0.0.0.0:27017-&gt;27017/tcp mongo-telemetry</div>
</div>
<div style="color: #10b981; margin-top: 0.4rem; font-size: 0.8rem; font-family: monospace;">✔ 4 containers healthy. Zero restart count. Resource limits enforced.</div>
`);
  }

  cmdSkills() {
    sound.playBeep(700, 0.06);
    this.appendOutput(`
<div style="color: #00f5ff; font-weight: 700; margin-bottom: 0.4rem;">PRODUCTION TECHNICAL STACK:</div>
<div style="color: #e2e8f0; font-size: 0.84rem; line-height: 1.6; font-family: monospace;">
  <span style="color: #34d399;">[LANGUAGES]</span> Python 3.11+, SQL, JavaScript (ES6+), Bash<br>
  <span style="color: #38bdf8;">[BACKEND]</span> FastAPI, AsyncIO, Flask, RESTful APIs, Pydantic v2, SQLAlchemy<br>
  <span style="color: #c084fc;">[VECTORS & DATA]</span> Qdrant Vector DB, MySQL (InnoDB), MongoDB, SQLite, Redis<br>
  <span style="color: #fbbf24;">[DEVOPS/SYS]</span> Docker Multi-Stage, Docker Compose, Git/GitHub, Linux/Ubuntu
</div>
`);
  }

  cmdContact() {
    sound.playSuccess();
    this.appendOutput(`
<div style="background: rgba(0, 245, 255, 0.08); border: 1px solid rgba(0, 245, 255, 0.25); padding: 0.8rem; border-radius: 8px; margin: 0.5rem 0; font-family: monospace;">
  <div style="color: #00f5ff; font-weight: 700; margin-bottom: 0.3rem;">📡 PRAVEEN // DIRECT COMMUNICATIONS</div>
  <div style="color: #e2e8f0; font-size: 0.84rem; line-height: 1.6;">
    <strong>Email:</strong> <a href="mailto:sp59600638@gmail.com" style="color: #38bdf8; text-decoration: underline;">sp59600638@gmail.com</a><br>
    <strong>GitHub:</strong> <a href="https://github.com/sp5900638-max" target="_blank" rel="noopener noreferrer" style="color: #c084fc; text-decoration: underline;">https://github.com/sp5900638-max</a><br>
    <strong>Institution:</strong> The National Institute of Engineering (NIE), Mysuru (2nd Year CSE)<br>
    <strong>Location:</strong> Mysuru, Karnataka, India
  </div>
</div>
`);
  }

  cmdClear() {
    sound.playKeypress();
    this.output.innerHTML = '';
  }

  cmdNeofetch() {
    sound.playBeep(780, 0.08);
    this.appendOutput(`
<div style="display: flex; gap: 1.5rem; flex-wrap: wrap; margin: 0.5rem 0; font-size: 0.82rem; font-family: monospace;">
  <div style="color: #00f5ff; line-height: 1.2;">
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/\\<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/  \\<br>
    &nbsp;&nbsp;&nbsp;&nbsp;/ /\\ \\<br>
    &nbsp;&nbsp;&nbsp;/ /  \\ \\<br>
    &nbsp;&nbsp;/ / /\\ \\ \\<br>
    &nbsp;/ / /  \\ \\ \\<br>
    /_/ /_/\\ \\_\\ \\<br>
    \\_\\_\\/  \\/\\_\\/<br>
    &nbsp;&nbsp;NIE CLUSTER
  </div>
  <div style="line-height: 1.5;">
    <span style="color: #00f5ff; font-weight: 700;">praveen</span>@<span style="color: #8b5cf6; font-weight: 700;">nie-mysuru</span><br>
    -----------------------<br>
    <span style="color: #94a3b8;">OS:</span> Ubuntu 24.04 LTS x86_64<br>
    <span style="color: #94a3b8;">Host:</span> NIE Cluster Node-01<br>
    <span style="color: #94a3b8;">Kernel:</span> 6.8.0-fastapi-rag<br>
    <span style="color: #94a3b8;">Uptime:</span> 99.98% Service Stability<br>
    <span style="color: #94a3b8;">Packages:</span> python3, fastapi, qdrant, docker, git<br>
    <span style="color: #94a3b8;">Shell:</span> zsh 5.9<br>
    <span style="color: #94a3b8;">Memory:</span> 1420MiB / 32768MiB (Lean Async)<br>
    <span style="color: #94a3b8;">Academic:</span> 2nd-Year CSE @ NIE Mysuru
  </div>
</div>
`);
  }

  cmdWhoami() {
    this.appendOutput(`
<div style="color: #e2e8f0; margin: 0.3rem 0; font-size: 0.85rem; font-family: monospace;">
  Praveen — 2nd-year CSE at The National Institute of Engineering (NIE), Mysuru.<br>
  Backend architect specializing in Python, FastAPI, Qdrant vector retrieval, and containerized microservices.
</div>
`);
  }

  cmdAbout() {
    this.cmdWhoami();
  }

  cmdLs() {
    this.appendOutput(`
<div style="color: #38bdf8; font-size: 0.85rem; margin: 0.3rem 0; font-family: monospace;">
  autonomous-vector-rag/   high-throughput-microservice/   async-task-broker/   docker-compose.yml   main.py
</div>
`);
  }

  cmdSudo() {
    this.appendOutput(`
<div style="color: #ef4444; font-size: 0.85rem; margin: 0.3rem 0; font-family: monospace;">
  [PERMISSION DENIED] User is already authenticated as cluster developer.
</div>
`);
  }

  appendOutput(html) {
    this.output.insertAdjacentHTML('beforeend', html);
  }

  scrollToBottom() {
    this.output.scrollTop = this.output.scrollHeight;
  }

  escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}
