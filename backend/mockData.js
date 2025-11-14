// Mock data for sessions and chat messages
const mockAnswers = [
  {
    description: "Here's an overview of top-performing stocks in the technology sector. These companies show strong quarterly growth and market position.",
    table: {
      columns: ["Company", "Symbol", "Price", "Change", "Market Cap"],
      rows: [
        ["Apple Inc.", "AAPL", "$178.50", "+2.3%", "$2.8T"],
        ["Microsoft Corp.", "MSFT", "$385.20", "+1.8%", "$2.9T"],
        ["NVIDIA Corp.", "NVDA", "$495.30", "+4.2%", "$1.2T"],
        ["Amazon.com", "AMZN", "$145.80", "+0.9%", "$1.5T"],
        ["Alphabet Inc.", "GOOGL", "$142.65", "+1.5%", "$1.8T"],
      ]
    }
  },
  {
    description: "Current system metrics showing server performance and resource utilization across all production environments.",
    table: {
      columns: ["Server", "CPU Usage", "Memory", "Uptime", "Status"],
      rows: [
        ["web-01", "45%", "62%", "23 days", "Healthy"],
        ["web-02", "38%", "58%", "23 days", "Healthy"],
        ["db-01", "72%", "81%", "45 days", "Warning"],
        ["cache-01", "22%", "34%", "45 days", "Healthy"],
        ["api-01", "56%", "67%", "12 days", "Healthy"],
      ]
    }
  },
  {
    description: "Monthly sales performance breakdown by region, showing revenue trends and growth metrics for Q4 2024.",
    table: {
      columns: ["Region", "Revenue", "Growth", "Orders", "Avg. Order"],
      rows: [
        ["North America", "$2.4M", "+15.2%", "3,450", "$696"],
        ["Europe", "$1.8M", "+12.8%", "2,890", "$623"],
        ["Asia Pacific", "$3.1M", "+22.5%", "5,120", "$605"],
        ["Latin America", "$890K", "+8.3%", "1,230", "$724"],
        ["Middle East", "$1.2M", "+18.7%", "1,680", "$714"],
      ]
    }
  },
  {
    description: "Employee performance metrics for the current quarter, highlighting top performers and key achievement indicators.",
    table: {
      columns: ["Employee", "Department", "Tasks Done", "Efficiency", "Rating"],
      rows: [
        ["Sarah Chen", "Engineering", "142", "94%", "⭐⭐⭐⭐⭐"],
        ["Mike Johnson", "Sales", "98", "91%", "⭐⭐⭐⭐⭐"],
        ["Emma Wilson", "Marketing", "87", "88%", "⭐⭐⭐⭐"],
        ["Alex Kumar", "Product", "76", "89%", "⭐⭐⭐⭐"],
        ["Lisa Park", "Operations", "112", "92%", "⭐⭐⭐⭐⭐"],
      ]
    }
  },
  {
    description: "Real-time cryptocurrency market snapshot showing current prices, trading volumes, and 24-hour performance changes.",
    table: {
      columns: ["Coin", "Price", "24h Change", "Volume", "Market Cap"],
      rows: [
        ["Bitcoin", "$43,250", "+3.5%", "$28.5B", "$845B"],
        ["Ethereum", "$2,280", "+2.8%", "$15.2B", "$274B"],
        ["Cardano", "$0.52", "+1.2%", "$420M", "$18.3B"],
        ["Solana", "$98.40", "+5.7%", "$2.1B", "$42.1B"],
        ["Polygon", "$0.89", "+4.3%", "$310M", "$8.3B"],
      ]
    }
  }
];

// In-memory storage for sessions (in production, use a database)
let sessions = [
  {
    sessionId: "session_demo_001",
    title: "Stock Market Analysis",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    messages: [
      {
        type: "user",
        question: "What are the top tech stocks?",
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        feedback: null
      },
      {
        type: "bot",
        answer: mockAnswers[0],
        timestamp: new Date(Date.now() - 86350000).toISOString(),
        feedback: null
      }
    ]
  },
  {
    sessionId: "session_demo_002",
    title: "Server Performance Metrics",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    messages: [
      {
        type: "user",
        question: "Show me server health status",
        timestamp: new Date(Date.now() - 172800000).toISOString(),
        feedback: null
      },
      {
        type: "bot",
        answer: mockAnswers[1],
        timestamp: new Date(Date.now() - 172750000).toISOString(),
        feedback: null
      }
    ]
  }
];

function getRandomAnswer() {
  return mockAnswers[Math.floor(Math.random() * mockAnswers.length)];
}

function generateSessionId() {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export { sessions, getRandomAnswer, generateSessionId };