# TwinSight AI

TwinSight AI is an advanced AI-powered platform designed to enhance operational resilience and incident management through intelligent analysis and recommendations.

## 🌟 Features

- **Operational Resilience Dashboard**: Real-time monitoring and analysis of operational incidents
- **Change Risk Advisor**: AI-powered risk assessment for change requests
- **Interactive AI Chat**: Ask questions and get intelligent insights about your operations
- **Incident Management**: Comprehensive incident tracking and resolution system
- **Release Management**: Track and analyze release factors and their impact
- **Smart Recommendations**: AI-generated recommendations for incident prevention and resolution

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

### Installation

1. Clone the repository
```bash
git clone https://github.com/ajith1989/twinsight-ai.git
cd twinsight-ai
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

4. Run the development server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 🏗️ Project Structure

```
twinsight-ai/
├── app/                         # Next.js app directory
│   ├── api/                     # API routes
│   ├── ask-twinsight/           # AI chat interface
│   ├── change-risk-advisor/     # Change risk assessment
│   └── operational-resilience/  # Operational dashboard
├── components/                  # Reusable React components
│   ├── ai-elements/             # AI-specific UI components
│   ├── charts/                  # Data visualization components
│   ├── filter/                  # Filter components
│   └── ui/                      # Base UI components
├── config/                      # Configuration files
├── hooks/                       # Custom React hooks
├── lib/                         # Utility functions and libraries
└── public/                      # Static assets
```

## 🛠️ Technology Stack

- **Framework**: Next.js (React)
- **Styling**: Tailwind CSS
- **UI Components**: Custom component library
- **Charts**: Custom charting components
- **API Integration**: RESTful APIs
- **AI Integration**: Azure AI services for model inference, vector search, and orchestration (see the "AI Integration" section below)

## AI Integration

This project uses Azure AI capabilities for model inference, embeddings, semantic search, and orchestration. The following sections summarize recommended Azure services, environment variables, security considerations, and development tips.

### Recommended Azure services
- Azure Cognitive Search (semantic search + vector store) — store embeddings and enable fast semantic retrieval
- Azure OpenAI / Azure AI Services — model inference for LLMs (text generation, summarization, chat)
- Azure AI Foundry — for model orchestration, deployment patterns, and multi-model pipelines
- Azure Cognitive Services (Vision, Speech) — optional, if you add multimodal features
- Azure Key Vault — store API keys and secrets securely
- Azure Cosmos DB or Azure SQL — for structured persistence and metadata associated with incidents

### Agent Orchestration & Architecture
- **LangGraph-based Workflow**: Implements a sophisticated agent orchestration system using LangGraph for complex incident analysis and response workflows
- **Streaming Response Architecture**: Real-time streaming of agent responses and intermediate reasoning steps
- **Multi-Agent Communication**: Coordinated communication between specialized agents (Analysis, Response, Risk Assessment)
- **State Management**: Persistent state tracking across agent interactions using LangGraph's state management

### Typical architecture & patterns
- Use embeddings + vector search (Cognitive Search or a vector DB) for retrieval-augmented generation (RAG)
- Keep the retrieval layer stateless and store only metadata + vectors in the vector store
- Proxy model calls through server-side API routes (Next.js API routes) so keys are never exposed in the browser
- Use short-term caching for repeated prompts and limit token usage per request to control cost and latency
- Implement agent workflows using LangGraph for complex multi-step reasoning tasks
- Stream intermediate results and agent thoughts for better user experience and debugging

### Environment variables (suggested)
Add these to your `.env.local` (names are examples — align with `.env.example`):

```
# Azure Cognitive Search
AZURE_COG_SEARCH_ENDPOINT=your-search-endpoint
AZURE_COG_SEARCH_API_KEY=your-search-key

# Azure OpenAI / Azure AI endpoint
AZURE_OPENAI_ENDPOINT=https://your-openai-resource.openai.azure.com/
AZURE_OPENAI_KEY=your-openai-key

# (Optional) Azure AI Foundry
AZURE_AI_FOUNDRY_ENDPOINT=https://your-foundry-endpoint/
AZURE_AI_FOUNDRY_KEY=your-foundry-key

# Persistence
COSMOS_CONNECTION_STRING=...

# Other
NEXT_PUBLIC_APP_INSIGHTS_KEY=...
```

### Security & privacy recommendations
- Never commit `.env*` files to source control; use `.gitignore` and managed secrets in CI/CD (GitHub Actions, Vercel, etc.).
- Store production keys in Azure Key Vault and use managed identities where possible.
- Review and minimize what user data is sent to external AI models; perform PII scrubbing if required by policy.
- Use private endpoints and VNET integration for production services to reduce exposure.

### Cost, monitoring & reliability
- Monitor usage and quota on Azure OpenAI / AI Services to avoid unexpected costs.
- Implement request throttling and graceful degradation when model calls fail.
- Emit telemetry (requests, latency, token counts) to App Insights or another APM for observability.

### Development tips
- For local development, use a small testing model or mocked responses to avoid incurring costs
- Keep prompts and context windows small; use chunking & selective retrieval for long documents
- Include unit tests for prompt construction and integration tests for the retrieval pipeline
- Use the `/api/v1/twinsightai/agents` endpoint for complex workflows requiring multi-agent coordination
- Test agent workflows with simple scenarios first, then gradually increase complexity
- Monitor agent execution graphs for bottlenecks and optimization opportunities
- Implement graceful fallbacks when specific agents in the workflow fail

### API Reference

#### Agent Orchestration Endpoints
- `POST /api/v1/twinsightai/agents`
  - Handles complex incident analysis workflows
  - Streams real-time agent responses and reasoning
  - Expects: `{ incidentNo: string, incidentTitle: string }`
  - Returns: Streaming response of agent actions and outputs

## 🔐 Security

The application implements secure practices for handling sensitive operational data and AI interactions. Please follow security guidelines when deploying to production.

## 📊 Features Detail

### Operational Resilience
- Incident tracking and management
- Real-time monitoring
- Historical analysis
- Agent feedback system

### Change Risk Advisor
- Risk assessment for changes
- Impact analysis
- Automated recommendations
- Release factor analysis

### Ask TwinsightAI
- Natural language queries
- Contextual responses
- Interactive chat interface
- AI-powered insights

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is proprietary software. All rights reserved.

## 👥 Team

- Owner: Team TwinSight AI
- Project: AI Olympiad

## 📞 Support

For support and queries, please contact the development team or raise an issue in the repository.

---

Built with ❤️ for operational excellence and AI innovation.
