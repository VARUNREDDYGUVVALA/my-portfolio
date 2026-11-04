export const repositoryUrl = 'https://github.com/VARUNREDDYGUVVALA/my-portfolio'
export const orbitLayers = [
  {
    id: 'models',
    name: 'AI models',
    color: '#67deff',
    technologies: ['Claude', 'Gemini', 'Bedrock'],
    summary: 'Grounded generation and evaluated model behavior.',
  },
  {
    id: 'agents',
    name: 'Agent systems',
    color: '#b5a0ff',
    technologies: ['LangGraph', 'LangChain', 'MCP'],
    summary: 'Stateful workflows, authorized tools, and human review.',
  },
  {
    id: 'data',
    name: 'Data systems',
    color: '#57dfbe',
    technologies: ['PySpark', 'SQL', 'Airflow'],
    summary: 'Validated data, reliable pipelines, useful context.',
  },
  {
    id: 'delivery',
    name: 'Infrastructure',
    color: '#efc080',
    technologies: ['Docker', 'Kubernetes', 'MLflow'],
    summary: 'Repeatable delivery, lifecycle tracking, and observability.',
  },
]
export const telemetry = [
  ['AGENTIC AI', 'LangGraph · MCP'],
  ['GENERATIVE AI', 'Claude · Gemini'],
  ['RAG', 'Hybrid search · Reranking'],
  ['ML / MLOPS', 'MLflow · CI/CD'],
  ['DATA', 'PySpark · SQL · Airflow'],
  ['CLOUD', 'AWS · Azure · GCP'],
]
export const orbitSystems = [
  {
    id: 'healthcare',
    number: '01',
    name: 'Healthcare claims intelligence',
    client: 'Cigna Healthcare',
    domain: 'healthcare',
    tags: ['Python', 'FastAPI', 'LangGraph', 'Bedrock', 'OpenSearch'],
    capabilities: [
      'RAG',
      'Agent orchestration',
      'MCP',
      'Human review',
      'Observability',
    ],
    description:
      'Grounded healthcare knowledge, governed tool execution, and human-reviewed workflows.',
    flow: [
      'Claims context',
      'FastAPI',
      'OpenSearch',
      'Bedrock',
      'LangGraph',
      'Human review',
      'Response',
    ],
    accent: '#67deff',
  },
  {
    id: 'banking',
    number: '02',
    name: 'Banking ML platform',
    client: 'Regions Bank',
    domain: 'banking',
    tags: ['Python', 'Azure ML', 'XGBoost', 'MLflow', 'AKS'],
    capabilities: [
      'Feature engineering',
      'Model validation',
      'MLOps',
      'Drift monitoring',
    ],
    description:
      'Repeatable financial-risk modeling with traceable validation, deployment, and monitoring.',
    flow: [
      'Transactions',
      'Features',
      'XGBoost',
      'MLflow',
      'Validation',
      'AKS',
      'Monitoring',
    ],
    accent: '#b5a0ff',
  },
  {
    id: 'agents',
    number: '03',
    name: 'Governed agent orchestration',
    client: 'Cigna Healthcare / workstream',
    domain: 'healthcare',
    tags: ['LangGraph', 'LangChain', 'Python', 'MCP', 'FastAPI'],
    capabilities: [
      'Agent orchestration',
      'MCP',
      'Structured outputs',
      'Human review',
    ],
    description:
      'A closer view of the agent and tool integrations within the healthcare engagement—not a separate client project.',
    flow: [
      'Request',
      'Supervisor',
      'Retrieval',
      'MCP tool',
      'Validation',
      'Human review',
      'Response',
    ],
    accent: '#57dfbe',
  },
  {
    id: 'data',
    number: '04',
    name: 'Enterprise data workflows',
    client: 'San Bernardino County',
    domain: 'data',
    tags: ['Python', 'PySpark', 'Airflow', 'Azure Synapse', 'SQL'],
    capabilities: ['Data quality', 'ETL', 'API integration', 'Observability'],
    description:
      'Python services and dependable Azure data pipelines for public-sector reporting and analytics.',
    flow: [
      'Source data',
      'Validation',
      'Python ETL',
      'Airflow',
      'Synapse',
      'Flask API',
      'Analytics',
    ],
    accent: '#efc080',
  },
]
export const constellations = [
  {
    name: 'AI & AGENTS',
    color: '#b5a0ff',
    items: ['LangGraph', 'LangChain', 'MCP', 'Claude', 'Gemini'],
  },
  {
    name: 'RETRIEVAL',
    color: '#67deff',
    items: [
      'OpenSearch',
      'Embeddings',
      'Hybrid search',
      'Reranking',
      'Bedrock',
    ],
  },
  {
    name: 'DATA',
    color: '#57dfbe',
    items: ['PySpark', 'Pandas', 'SQL', 'Airflow', 'NumPy'],
  },
  {
    name: 'MLOPS',
    color: '#efc080',
    items: ['Docker', 'Kubernetes', 'MLflow', 'Jenkins', 'GitHub Actions'],
  },
  {
    name: 'CLOUD',
    color: '#84b9ff',
    items: ['AWS', 'Azure', 'GCP', 'Terraform', 'CloudWatch'],
  },
]
export const technologyContext = {
  LangGraph: {
    summary:
      'Stateful orchestration for multi-step retrieval, governed tool execution, structured outputs, and human review.',
    related: ['LangChain', 'MCP', 'Bedrock', 'FastAPI'],
    projects: ['healthcare'],
  },
  MCP: {
    summary:
      'Python MCP servers and authorized interfaces connect agent workflows with healthcare APIs and enterprise knowledge services.',
    related: ['LangGraph', 'Python', 'FastAPI'],
    projects: ['healthcare'],
  },
  OpenSearch: {
    summary:
      'Semantic retrieval, embeddings, metadata filters, and grounded policy context for healthcare RAG.',
    related: ['Bedrock', 'Embeddings', 'Hybrid search', 'LangGraph'],
    projects: ['healthcare'],
  },
  Bedrock: {
    summary:
      'Claude models on Amazon Bedrock support knowledge retrieval, summarization, and prior authorization assistance.',
    related: ['Claude', 'OpenSearch', 'LangGraph'],
    projects: ['healthcare'],
  },
  MLflow: {
    summary:
      'Experiment tracking, model comparison, versioning, and validation for regulated financial machine learning.',
    related: ['Azure', 'XGBoost', 'Docker'],
    projects: ['banking'],
  },
  PySpark: {
    summary:
      'Data cleansing, transformation, validation, and feature preparation across enterprise data and machine-learning workflows.',
    related: ['Python', 'SQL', 'Pandas', 'Airflow'],
    projects: ['healthcare', 'banking'],
  },
  AWS: {
    summary:
      'AWS-native AI services, secure data access, EKS deployment, and CloudWatch/X-Ray observability for healthcare.',
    related: ['Bedrock', 'CloudWatch', 'Terraform', 'Kubernetes'],
    projects: ['healthcare'],
  },
  Azure: {
    summary:
      'Azure Machine Learning, AKS, Synapse, and ADLS Gen2 support banking MLOps and public-sector data engineering.',
    related: ['MLflow', 'Kubernetes', 'SQL', 'PySpark'],
    projects: ['banking'],
  },
}
Object.assign(technologyContext, {
  RAG: {
    summary:
      'Chunking, embeddings, hybrid retrieval, metadata filtering, reranking, context assembly, and response grounding connect approved enterprise knowledge to model outputs.',
    related: ['OpenSearch', 'Embeddings', 'Bedrock', 'LangGraph'],
    projects: ['healthcare'],
  },
  'Agent orchestration': {
    summary:
      'LangGraph and LangChain coordinate stateful multi-step workflows with authorized tools, structured outputs, and human review.',
    related: ['LangGraph', 'LangChain', 'MCP'],
    projects: ['healthcare'],
  },
  'Human review': {
    summary:
      'Human-in-the-Loop review, validation controls, and grounding checks govern sensitive healthcare AI workflows.',
    related: ['LangGraph', 'MCP', 'Bedrock'],
    projects: ['healthcare'],
  },
  Observability: {
    summary:
      'Monitor service health, API latency, retrieval behavior, and model quality through the documented AWS and Azure production practices.',
    related: ['CloudWatch', 'AWS', 'Azure'],
    projects: ['healthcare', 'banking'],
  },
  MLOps: {
    summary:
      'Model training, experiment tracking, validation, packaging, controlled deployment, and monitoring support repeatable financial machine learning.',
    related: ['MLflow', 'Docker', 'Kubernetes', 'Jenkins'],
    projects: ['banking'],
  },
  Python: {
    summary:
      'The foundation across all five client engagements: AI services, FastAPI and Flask APIs, validated data pipelines, and machine-learning utilities.',
    related: ['LangGraph', 'PySpark', 'SQL', 'Pandas'],
    projects: ['healthcare', 'banking', 'retail'],
  },
})
Object.assign(technologyContext, {
  'Feature engineering': {
    summary:
      'Validated transaction, customer, utilization, and repayment-history features support fraud and credit-risk models.',
    related: ['Python', 'PySpark', 'SQL', 'XGBoost'],
    projects: ['banking'],
  },
  'Model validation': {
    summary:
      'Precision, recall, F1-score, ROC-AUC, cross-validation, and stability checks support governed financial model promotion.',
    related: ['MLflow', 'Azure ML', 'XGBoost'],
    projects: ['banking'],
  },
  'Drift monitoring': {
    summary:
      'Feature drift, model behavior, data quality, service failures, and latency are reviewed during production operations.',
    related: ['Azure', 'MLflow', 'Azure Monitor'],
    projects: ['banking'],
  },
  'Data quality': {
    summary:
      'Schema validation, duplicate detection, reconciliation, and controlled ingestion prepare reliable operational datasets.',
    related: ['Python', 'SQL', 'Pandas', 'PySpark'],
    projects: ['healthcare', 'banking', 'retail'],
  },
  ETL: {
    summary:
      'Python, Pandas, PySpark, SQL, and Airflow support repeatable extraction, transformation, reconciliation, and scheduled processing.',
    related: ['PySpark', 'SQL', 'Airflow', 'Pandas'],
    projects: ['healthcare', 'banking', 'retail'],
  },
  'API integration': {
    summary:
      'Reusable Python REST services integrate enterprise APIs and analytical outputs through documented service contracts.',
    related: ['Python', 'FastAPI', 'SQL'],
    projects: ['healthcare'],
  },
  'Structured outputs': {
    summary:
      'Validated structured responses and controlled tool execution support accountable healthcare agent workflows.',
    related: ['LangGraph', 'MCP', 'FastAPI'],
    projects: ['healthcare'],
  },
  'Azure ML': {
    summary:
      'Azure Machine Learning supports financial model training, experiment tracking, validation, registry management, and controlled deployment.',
    related: ['MLflow', 'XGBoost', 'AKS'],
    projects: ['banking'],
  },
  XGBoost: {
    summary:
      'Predictive models for fraud and credit risk at Regions Bank and recommendation and forecasting work at Publix.',
    related: ['Python', 'MLflow', 'SQL'],
    projects: ['banking', 'retail'],
  },
  AKS: {
    summary:
      'Azure Kubernetes Service supports containerized banking inference services with controlled deployment and secure runtime patterns.',
    related: ['Azure', 'Docker', 'Kubernetes', 'Terraform'],
    projects: ['banking'],
  },
  FastAPI: {
    summary:
      'Python microservices expose inference APIs and secure healthcare integration with reusable service contracts and structured logging.',
    related: ['Python', 'LangGraph', 'Bedrock', 'MCP'],
    projects: ['healthcare'],
  },
  SQL: {
    summary:
      'Source integration, transformations, data validation, feature preparation, and analytical queries across the client engagements.',
    related: ['Python', 'Pandas', 'PySpark', 'Airflow'],
    projects: ['healthcare', 'banking', 'retail'],
  },
  Airflow: {
    summary:
      'Scheduled public-sector ETL workflows coordinate dependencies, retries, validation checkpoints, and failure handling.',
    related: ['Python', 'PySpark', 'SQL', 'Azure'],
    projects: [],
  },
  'Azure Synapse': {
    summary:
      'Public-sector analytical datasets use structured schemas, partition-aware processing, reconciliation, and controlled access.',
    related: ['Azure', 'SQL', 'PySpark', 'Airflow'],
    projects: [],
  },
})
export function getTechnologyContext(technology) {
  if (technologyContext[technology]) return technologyContext[technology]
  const group = constellations.find((g) => g.items.includes(technology))
  const healthcare = [
    'LangChain',
    'Claude',
    'Embeddings',
    'Hybrid search',
    'Reranking',
    'Terraform',
    'Kubernetes',
    'GitHub Actions',
    'CloudWatch',
  ]
  const banking = ['Docker', 'Jenkins', 'Kubernetes', 'GitHub Actions']
  const retail = ['Pandas', 'NumPy', 'SQL']
  return {
    summary: `${technology} is listed in the supplied resume. Explore its connections within the ${group?.name.toLowerCase() ?? 'engineering'} stack.`,
    related: group?.items.filter((t) => t !== technology).slice(0, 4) ?? [],
    projects: [
      ...(healthcare.includes(technology) ? ['healthcare'] : []),
      ...(banking.includes(technology) ? ['banking'] : []),
      ...(retail.includes(technology) ? ['retail'] : []),
    ],
  }
}
