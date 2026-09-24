export const projects = [
  {
    id: 'rag-engine',
    title: 'Autonomous Vector RAG Engine',
    subtitle: 'High-dimensional semantic search & context pipeline using FastAPI, Qdrant, and dense vector embeddings.',
    tag: 'AI / VECTOR SEARCH',
    variant: 'cyan',
    metrics: [
      { value: '< 24ms', label: 'p95 Vector Search' },
      { value: '1536-d', label: 'Embedding Dimension' },
      { value: '99.4%', label: 'Top-3 Precision' },
      { value: 'Dockerized', label: 'Zero-G Isolation' },
    ],
    tech: ['Python 3.12', 'FastAPI', 'Qdrant Vector DB', 'Docker', 'AsyncIO', 'LLM APIs', 'Pydantic'],
    githubUrl: 'https://github.com/sp5900638-max',
    architecture: {
      overview: 'A zero-gravity RAG (Retrieval-Augmented Generation) pipeline engineered for autonomous document ingestion, semantic chunking, dense vector indexing, and low-latency contextual generation.',
      flowChart: `
+------------------+     HTTP POST /query     +-------------------------+
|  Client Request  | ======================> |    FastAPI API Gateway  |
+------------------+                         +-------------------------+
                                                          |
                                                          | Async Vectorization
                                                          v
                                             +-------------------------+
                                             | Sentence-Transformer /  |
                                             | OpenAI Embedding Engine |
                                             +-------------------------+
                                                          |
                                                          | 1536-d Dense Vector
                                                          v
                                             +-------------------------+
                                             |  Qdrant Vector Database |
                                             |  (HNSW Index + Filters) |
                                             +-------------------------+
                                                          |
                                                          | Top-K Relevant Chunks
                                                          v
                                             +-------------------------+
                                             | Context Reranker & LLM  |
                                             | Prompt Assembler        |
                                             +-------------------------+
                                                          |
                                                          | Streamed Response
                                                          v
                                             +-------------------------+
                                             | Client SSE Stream       |
                                             +-------------------------+
      `,
      keyDecisions: [
        'HNSW graph index in Qdrant ensures sub-25ms vector retrieval across thousands of indexed vectors.',
        'Asynchronous I/O via FastAPI and async-qdrant client prevents event loop blocking during high concurrent ingest.',
        'Docker containerization with health checks and volume persistence ensures reproducible deployments.',
        'Configurable cosine similarity threshold prevents hallucination on low-confidence queries.'
      ],
      endpoints: [
        'POST /api/v1/vectorize - Ingests and chunks markdown/PDF documents into vector collections',
        'POST /api/v1/search - High-speed cosine similarity query returning top-K chunks with metadata',
        'POST /api/v1/chat - Full RAG completion stream with citations and similarity score telemetry'
      ]
    }
  },
  {
    id: 'microservice-api',
    title: 'High-Throughput Microservice API',
    subtitle: 'Token-authenticated REST API engine built for modularity, connection pooling, and sub-50ms latency under high concurrency.',
    tag: 'SYSTEMS / BACKEND',
    variant: 'violet',
    metrics: [
      { value: '< 38ms', label: 'p99 API Latency' },
      { value: '10K+', label: 'Concurrent Req Cap' },
      { value: 'JWT + RBAC', label: 'Auth Protocol' },
      { value: 'MySQL / Pool', label: 'Relational Store' },
    ],
    tech: ['Python 3.12', 'FastAPI', 'MySQL', 'SQLAlchemy Async', 'Pydantic v2', 'JWT', 'Docker'],
    githubUrl: 'https://github.com/sp5900638-max',
    architecture: {
      overview: 'A robust, production-ready microservice backend emphasizing asynchronous connection pooling, strict schema validation with Pydantic v2, and secure stateless JWT bearer authorization.',
      flowChart: `
+----------------+      Bearer JWT Token       +---------------------------+
|  Client Apps   | ==========================> |  Traefik / Nginx Gateway  |
+----------------+                             +---------------------------+
                                                             |
                                                             | Proxy Pass
                                                             v
                                               +---------------------------+
                                               |  FastAPI Async Cluster    |
                                               |  - JWT Auth Middleware    |
                                               |  - Pydantic v2 Validation |
                                               |  - Rate Limiter (Token)   |
                                               +---------------------------+
                                                             |
                                        +--------------------+--------------------+
                                        |                                         |
                                        v                                         v
                         +-----------------------------+           +-----------------------------+
                         |  Async SQLAlchemy Pool      |           | Redis Ephemeral Cache       |
                         |  (MySQL 8.0 Engine)         |           | (Session & Token Revocation)|
                         +-----------------------------+           +-----------------------------+
      `,
      keyDecisions: [
        'Async SQLAlchemy engine with tuned connection pool (pool_size=20, max_overflow=10) eliminates thread starvation.',
        'Pydantic v2 Rust-based parsing core yields 5x serialization speedup over legacy serializers.',
        'Role-Based Access Control (RBAC) middleware guarantees fine-grained authorization with minimal CPU overhead.',
        'Multi-stage Docker build produces a lean 95MB Alpine image with zero unnecessary build tools.'
      ],
      endpoints: [
        'POST /auth/token - Issues HMAC-SHA256 signed JWT tokens with refresh rotation',
        'GET /v1/records - Filtered, cursor-paginated retrieval optimized with composite indexes',
        'POST /v1/records - Idempotent create operation with atomic database transaction commit'
      ]
    }
  },
  {
    id: 'telemetry-broker',
    title: 'Distributed Async Task & Telemetry Broker',
    subtitle: 'Asynchronous task queue worker system managing background batch transformations and event streaming with dead-letter queues.',
    tag: 'DISTRIBUTED ARCHITECTURE',
    variant: 'cyan',
    metrics: [
      { value: 'Non-Blocking', label: 'Execution Model' },
      { value: 'Zero-Loss', label: 'DLQ Dead-Letter' },
      { value: 'MongoDB/SQLite', label: 'Flexible Persistence' },
      { value: '100% Async', label: 'Event Handling' },
    ],
    tech: ['Python', 'FastAPI / Flask', 'MongoDB', 'SQLite', 'Docker', 'Git', 'Linux'],
    githubUrl: 'https://github.com/sp5900638-max',
    architecture: {
      overview: 'Asynchronous event consumer and batch worker system designed to offload CPU-intensive operations away from the HTTP request cycle while reporting live status metrics.',
      flowChart: `
+------------------+     POST /tasks/dispatch    +-----------------------+
| Inbound Payload  | ==========================> |  FastAPI Dispatcher   |
+------------------+                             +-----------------------+
                                                             |
                                                             | Push to Queue
                                                             v
                                                 +-----------------------+
                                                 | Redis / SQLite Queue  |
                                                 +-----------------------+
                                                             |
                                       +---------------------+---------------------+
                                       |                                           |
                                       v                                           v
                        +----------------------------+              +----------------------------+
                        |   Async Python Worker #1   |              |   Async Python Worker #2   |
                        |   (Batch Transformations)  |              |   (Telemetry Exporter)     |
                        +----------------------------+              +----------------------------+
                                       |                                           |
                                       +---------------------+---------------------+
                                                             |
                                                             v
                                                 +-----------------------+
                                                 | MongoDB State Store   |
                                                 | & Audit Log Archive   |
                                                 +-----------------------+
      `,
      keyDecisions: [
        'Decoupled architecture guarantees that spikes in batch tasks never impact frontend API response times.',
        'MongoDB document schema allows semi-structured telemetry data without costly schema migration locks.',
        'Automatic retry policy with exponential backoff and dead-letter queues (DLQ) prevents poison-pill payloads.',
        'Packaged into unified docker-compose environment with health probes and resource limits.'
      ],
      endpoints: [
        'POST /tasks/schedule - Submits heavy async job and returns unique UUID task tracker',
        'GET /tasks/{task_id}/status - Polling / websocket endpoint for real-time progress updates',
        'GET /telemetry/health - Live cluster node statistics, memory footprint, and queue depth'
      ]
    }
  }
];
