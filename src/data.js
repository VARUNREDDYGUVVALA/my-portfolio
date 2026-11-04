export const contact = {
  email: 'guvvalavarunreddy2103@gmail.com',
  linkedin: 'https://www.linkedin.com/in/varunreddy-guvvala/',
}
export const experience = [
  {
    company: 'Cigna Healthcare',
    sector: 'Healthcare',
    location: 'Dallas, Texas',
    role: 'Senior Python AI/ML Engineer',
    dates: 'Apr 2024 — Present',
    metric: '35%',
    result: 'improvement in knowledge-retrieval efficiency',
    description:
      'Architecting AWS-native Generative AI and RAG applications for regulated healthcare operations, prior authorization, and governed agent workflows.',
    achievements: [
      'Engineered a RAG platform using Amazon Bedrock, Claude, FastAPI, and OpenSearch Vector Search.',
      'Built MCP servers and LangGraph tool integrations for secure healthcare API access and Human-in-the-Loop review.',
      'Deployed FastAPI services on Amazon EKS with Terraform and GitHub Actions; monitored latency, retrieval behavior, and service health through CloudWatch and X-Ray.',
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
      'Claude',
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
      'AWS / Amazon EKS',
      'CloudWatch / X-Ray',
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

export const profile = {
  name: 'Varunreddy Guvvala',
  title: 'Senior Python AI/ML Engineer',
  summary:
    'I design enterprise AI systems that connect the right context, the right tools, and the right controls — from AWS-native RAG to governed agent workflows and predictive machine learning.',
  source: 'Varun_Guvvala_AWS_BaseResume.docx',
}

// Conceptual architecture summaries derived from the resume, not internal client blueprints.
export const systems = {
  healthcare: [
    {
      label: 'FastAPI',
      type: 'SERVICE LAYER',
      icon: 'api',
      detail:
        'Python microservices expose secure REST APIs for AI inference, healthcare integration, and governed access to operational data.',
      technology: 'Python · FastAPI · FHIR/HL7',
    },
    {
      label: 'LangGraph + MCP',
      type: 'ORCHESTRATION',
      icon: 'agent',
      detail:
        'Stateful agent workflows discover authorized MCP tools, call healthcare services, and produce structured outputs with human review.',
      technology: 'LangGraph · LangChain · MCP',
    },
    {
      label: 'OpenSearch',
      type: 'RETRIEVAL',
      icon: 'data',
      detail:
        'Document chunking, embeddings, semantic search, and metadata filters retrieve approved healthcare policy context for grounded responses.',
      technology: 'OpenSearch Vector Search · Embeddings',
    },
    {
      label: 'Bedrock / Claude',
      type: 'GENERATION',
      icon: 'brain',
      detail:
        'Claude models on Amazon Bedrock support healthcare summarization, knowledge retrieval, and prior authorization assistance.',
      technology: 'Amazon Bedrock · Claude · Prompt engineering',
    },
    {
      label: 'Validation & review',
      type: 'GUARDRAILS',
      icon: 'shield',
      detail:
        'Grounding checks, retrieval evaluation, safety reviews, and Human-in-the-Loop controls support reliable, governed healthcare workflows. This represents application controls, not a claim of using the Amazon Bedrock Guardrails product.',
      technology: 'Grounding · Offline evaluation · Human review',
    },
    {
      label: 'EKS + CloudWatch',
      type: 'PRODUCTION',
      icon: 'cloud',
      detail:
        'Dockerized services run on Amazon EKS with Terraform and CI/CD. CloudWatch and X-Ray support latency, service-health, and retrieval troubleshooting.',
      technology: 'Amazon EKS · Terraform · CloudWatch · X-Ray',
    },
  ],
  banking: [
    {
      label: 'Financial data',
      type: 'INGESTION',
      icon: 'data',
      detail:
        'SQL databases, ADLS Gen2, payment systems, and internal APIs supply governed inputs for fraud and risk modeling.',
      technology: 'ADLS Gen2 · SQL · Internal APIs',
    },
    {
      label: 'Feature pipelines',
      type: 'PREPARATION',
      icon: 'api',
      detail:
        'Python and PySpark normalize transactions and create customer, repayment-history, utilization, and risk features with quality checks.',
      technology: 'Python · Pandas · PySpark',
    },
    {
      label: 'XGBoost / TensorFlow',
      type: 'MODELING',
      icon: 'brain',
      detail:
        'Fraud classification and credit-risk models combine feature engineering, class balancing, probability scores, and calibrated decision thresholds.',
      technology: 'XGBoost · TensorFlow · scikit-learn',
    },
    {
      label: 'MLflow + Azure ML',
      type: 'VALIDATION',
      icon: 'agent',
      detail:
        'Experiment tracking, candidate comparison, cross-validation, and model versioning support reproducible model promotion.',
      technology: 'MLflow · Azure Machine Learning · ROC-AUC',
    },
    {
      label: 'AKS inference',
      type: 'SERVING',
      icon: 'cloud',
      detail:
        'Containerized model-serving applications use AKS and controlled CI/CD for repeatable inference deployments.',
      technology: 'Docker · AKS · Jenkins · GitHub Actions',
    },
    {
      label: 'Model monitoring',
      type: 'OBSERVABILITY',
      icon: 'shield',
      detail:
        'Azure Monitor tracks latency and service failures alongside reviews of model performance, feature drift, and data quality.',
      technology: 'Azure Monitor · Drift detection · Model governance',
    },
  ],
  retail: [
    {
      label: 'POS + clickstream',
      type: 'DATA SOURCES',
      icon: 'data',
      detail:
        'Store transactions, clickstream, inventory, promotions, and product catalogs provide inputs for retail predictive analytics.',
      technology: 'POS · Clickstream · SQL',
    },
    {
      label: 'Retail features',
      type: 'PREPARATION',
      icon: 'api',
      detail:
        'Seasonality, promotions, lags, rolling averages, and customer behavior inform recommendation and forecasting models.',
      technology: 'Python · Pandas · NumPy',
    },
    {
      label: 'Predictive models',
      type: 'MODELING',
      icon: 'brain',
      detail:
        'XGBoost, Random Forest, regression, and classification support recommendations, personalization, and demand planning.',
      technology: 'XGBoost · Random Forest · scikit-learn',
    },
    {
      label: 'Offline validation',
      type: 'EVALUATION',
      icon: 'shield',
      detail:
        'Cross-validation, hyperparameter tuning, RMSE, MAE, precision, recall, and F1-score guide candidate selection.',
      technology: 'Cross-validation · RMSE · MAE · F1',
    },
    {
      label: 'Reusable scoring',
      type: 'INFERENCE',
      icon: 'agent',
      detail:
        'Modular Python utilities standardize feature processing, model inference, and repeatable scoring workflows.',
      technology: 'Python · OOP · PyTest',
    },
    {
      label: 'Retail decisions',
      type: 'BUSINESS USE',
      icon: 'cloud',
      detail:
        'Predictions inform merchandising, inventory planning, replenishment, and personalized customer experiences.',
      technology: 'Recommendations · Demand forecasting',
    },
  ],
}

export const traceSteps = [
  {
    label: 'Plan',
    code: '01 / CONTEXT',
    title: 'Understand before acting.',
    detail:
      'Start with the request and the approved knowledge sources. Assemble relevant context and route the workflow to the appropriate tools.',
    evidence: 'Resume: retrieval relevance, context assembly, workflow state',
    icon: 'brain',
  },
  {
    label: 'MCP tool call',
    code: '02 / EXECUTION',
    title: 'Give agents governed capabilities.',
    detail:
      'Use Python MCP servers and authorized tool interfaces to connect LangGraph workflows with healthcare APIs and enterprise knowledge services.',
    evidence: 'Resume: MCP servers, tool discovery, authorization controls',
    icon: 'agent',
  },
  {
    label: 'Human review',
    code: '03 / CONTROL',
    title: 'Keep a person in the decision loop.',
    detail:
      'Introduce human review and validated structured outputs for regulated prior authorization and utilization-management workflows.',
    evidence: 'Resume: Human-in-the-Loop, grounding checks, safety reviews',
    icon: 'shield',
  },
  {
    label: 'Result',
    code: '04 / DELIVERY',
    title: 'Deliver. Evaluate. Observe.',
    detail:
      'Serve grounded outputs through Python services, evaluate response quality, and monitor API latency, retrieval behavior, and production service health.',
    evidence: 'Resume: PyTest, offline benchmarks, CloudWatch, X-Ray',
    icon: 'cloud',
  },
]
