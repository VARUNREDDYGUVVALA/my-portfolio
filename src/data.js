export const contact = {
  email: 'guvvalavarunreddy2103@gmail.com',
  linkedin: 'https://www.linkedin.com/in/varunreddy-guvvala/',
}
export const experience = [
  {
    company: 'Cigna Healthcare',
    sector: 'Healthcare',
    location: 'Dallas, Texas',
    role: 'Python AI Engineer',
    dates: 'Apr 2024 — Present',
    metric: '35%',
    result: 'improvement in knowledge-retrieval efficiency',
    description:
      'Building governed generative AI for healthcare operations, from pharmacy knowledge retrieval to human-reviewed agent workflows.',
    achievements: [
      'Engineered a RAG platform using Amazon Bedrock, Claude, FastAPI, and OpenSearch Vector Search.',
      'Built MCP servers and LangGraph tool integrations for secure healthcare API access and Human-in-the-Loop review.',
      'Deployed AI services on Amazon EKS with Terraform, GitHub Actions, PyTest, and production observability.',
    ],
    tags: ['Python', 'Amazon Bedrock', 'LangGraph', 'MCP', 'OpenSearch', 'AWS'],
  },
  {
    company: 'Regions Bank',
    sector: 'Banking',
    location: 'Birmingham, Alabama',
    role: 'ML/MLOps Engineer',
    dates: 'Dec 2022 — Mar 2024',
    metric: '20%',
    result: 'improvement in fraud-detection precision',
    description:
      'Operationalized financial-risk models and a governed Azure MLOps platform for regulated banking.',
    achievements: [
      'Developed fraud and credit-risk solutions with XGBoost, TensorFlow, and Azure Machine Learning.',
      'Tracked experiments and model validation with MLflow, precision, recall, F1-score, and ROC-AUC.',
      'Delivered AKS inference services with CI/CD, Terraform, data-quality controls, and drift monitoring.',
    ],
    tags: ['Azure ML', 'XGBoost', 'TensorFlow', 'MLflow', 'AKS'],
  },
  {
    company: 'San Bernardino County',
    sector: 'Public sector',
    location: 'San Bernardino, California',
    role: 'Sr. Python Software Engineer',
    dates: 'Aug 2019 — Nov 2022',
    metric: '25%',
    result: 'improvement in processing efficiency',
    description:
      'Built Python services and Azure data workflows for reporting, analytics, and operational decision support.',
    achievements: [
      'Engineered ETL pipelines with Python, PySpark, SQL, and Apache Airflow.',
      'Built Flask APIs and analytical datasets in Azure Synapse and ADLS Gen2.',
      'Applied data validation, query tuning, batching, testing, and controlled releases.',
    ],
    tags: ['Python', 'Flask', 'PySpark', 'Airflow', 'Azure Synapse'],
  },
  {
    company: 'Publix',
    sector: 'Retail',
    location: 'Lakeland, Florida',
    role: 'Sr. Python Data Scientist',
    dates: 'Oct 2017 — Jul 2019',
    metric: '18%',
    result: 'improvement in recommendation and forecasting accuracy',
    description:
      'Connected retail data science with personalization, demand planning, and inventory decisions.',
    achievements: [
      'Built recommendation and forecasting solutions with Python, SQL, and XGBoost.',
      'Engineered seasonal, promotional, clickstream, and customer-behavior features.',
      'Evaluated models using cross-validation, RMSE, MAE, and classification metrics.',
    ],
    tags: ['XGBoost', 'scikit-learn', 'Pandas', 'Forecasting', 'SQL'],
  },
  {
    company: 'Fortis Healthcare',
    sector: 'Healthcare',
    location: 'India',
    role: 'Python Engineer',
    dates: 'Aug 2015 — Aug 2017',
    metric: '22%',
    result: 'improvement in processing efficiency',
    description:
      'Developed healthcare applications and dependable clinical-data processing workflows.',
    achievements: [
      'Built Python ETL pipelines and Flask APIs for clinical reporting and utilization management.',
      'Introduced validation, reconciliation, reusable modules, and SQL optimizations.',
      'Supported classification models, integration testing, UAT, and release validation.',
    ],
    tags: ['Python', 'Flask', 'SQL', 'ETL', 'scikit-learn'],
  },
]
export const projects = [
  {
    id: 'healthcare',
    number: '01',
    name: 'Grounded answers. Governed actions.',
    category: 'Generative AI · Healthcare',
    client: 'Cigna Healthcare',
    title: 'Healthcare knowledge & agent platform',
    summary:
      'A retrieval and agent platform connecting healthcare knowledge with secure enterprise tools.',
    challenge:
      'Make PBM policies, pharmacy claims context, and prior authorization knowledge easier to retrieve while preserving governed access.',
    approach:
      'Combined document chunking, embeddings, metadata-filtered OpenSearch retrieval, and Claude on Amazon Bedrock. LangGraph agents use MCP tools and human review for multi-step workflows.',
    outcome: '35% improvement in knowledge-retrieval efficiency.',
    tags: ['RAG', 'Amazon Bedrock', 'LangGraph', 'MCP'],
    visual: 'rag',
    metric: '+35%',
    label: 'retrieval efficiency',
  },
  {
    id: 'banking',
    number: '02',
    name: 'From risk signals to reliable decisions.',
    category: 'Machine learning · Banking',
    client: 'Regions Bank',
    title: 'Financial risk & MLOps platform',
    summary:
      'Predictive fraud and credit-risk models with a traceable path from experimentation to production.',
    challenge:
      'Improve fraud-detection precision and support repeatable, governed model delivery across banking workflows.',
    approach:
      'Engineered transaction and customer features, trained XGBoost and TensorFlow models, and validated thresholds and stability. Used MLflow, Azure Machine Learning, and AKS for model lifecycle and serving.',
    outcome: '20% improvement in fraud-detection precision.',
    tags: ['XGBoost', 'Azure ML', 'MLflow', 'AKS'],
    visual: 'risk',
    metric: '+20%',
    label: 'fraud-detection precision',
  },
  {
    id: 'retail',
    number: '03',
    name: 'Turning retail patterns into foresight.',
    category: 'Predictive analytics · Retail',
    client: 'Publix',
    title: 'Retail recommendation & forecasting',
    summary:
      'Modeling customer behavior and demand to inform personalization and inventory planning.',
    challenge:
      'Translate POS, clickstream, promotion, and inventory data into useful retail predictions.',
    approach:
      'Prepared seasonality, lag, rolling-average, and behavioral features. Compared XGBoost, Random Forest, and regression models using cross-validation and business-aligned evaluation metrics.',
    outcome: '18% improvement in recommendation and forecasting accuracy.',
    tags: ['Python', 'XGBoost', 'Forecasting', 'Pandas'],
    visual: 'forecast',
    metric: '+18%',
    label: 'recommendation & forecasting accuracy',
  },
]
export const skills = [
  {
    title: 'Generative & agentic AI',
    description: 'Knowledge connected to action.',
    icon: 'ai',
    items: [
      'LLMs & RAG',
      'LangChain',
      'LangGraph',
      'MCP',
      'Amazon Bedrock',
      'Gemini / Vertex AI',
      'Prompt engineering',
      'Human-in-the-Loop',
    ],
  },
  {
    title: 'Machine learning',
    description: 'Models with measurable outcomes.',
    icon: 'ml',
    items: [
      'scikit-learn',
      'XGBoost',
      'TensorFlow',
      'Feature engineering',
      'Cross-validation',
      'Model evaluation',
      'Responsible AI',
    ],
  },
  {
    title: 'Python & data systems',
    description: 'The foundations for intelligent products.',
    icon: 'data',
    items: [
      'Python',
      'SQL',
      'FastAPI',
      'Flask',
      'Pandas / NumPy',
      'PySpark',
      'Apache Airflow',
      'ETL / ELT',
    ],
  },
  {
    title: 'Cloud & production',
    description: 'Built to run beyond the notebook.',
    icon: 'cloud',
    items: [
      'AWS',
      'Azure',
      'GCP',
      'Docker',
      'Kubernetes',
      'Terraform',
      'MLflow',
      'GitHub Actions',
      'PyTest',
      'Observability',
    ],
  },
]
