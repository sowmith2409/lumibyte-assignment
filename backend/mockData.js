// -----------------------
// Mock Answer Datasets
// -----------------------
const mockAnswers = [
  {
    description:
      "Here’s a breakdown of global climate indicators from 2024, covering temperature anomalies, CO₂ levels, and major environmental events.",
    table: {
      columns: ["Metric", "Value", "Change", "Region", "Status"],
      rows: [
        ["CO₂ Level", "421 ppm", "+2.1%", "Global", "Rising"],
        ["Avg Temp Increase", "+1.5°C", "+0.04°C", "Global", "Critical"],
        ["Sea Level Rise", "3.6 mm", "+0.3 mm", "Coastal Areas", "Severe"],
        ["Forest Loss", "11.4M hectares", "-1.2%", "Amazon", "High"],
        ["Ice Sheet Loss", "278 gigatons", "+3%", "Antarctica", "Alarming"]
      ]
    }
  },
  {
    description:
      "World population demographics summary showing age distribution, life expectancy, and growth metrics across continents.",
    table: {
      columns: ["Continent", "Population", "Growth Rate", "Life Expectancy", "Median Age"],
      rows: [
        ["Asia", "4.75B", "+0.9%", "74.2", "32"],
        ["Africa", "1.47B", "+2.3%", "64.8", "19"],
        ["Europe", "742M", "+0.1%", "78.6", "43"],
        ["North America", "602M", "+0.6%", "79.1", "38"],
        ["South America", "436M", "+0.8%", "76.4", "31"]
      ]
    }
  },
  {
    description:
      "Education performance metrics comparing academic outcomes across countries using standardized testing data.",
    table: {
      columns: ["Country", "Math Score", "Science Score", "Reading Score", "Rank"],
      rows: [
        ["Singapore", "592", "580", "575", "1"],
        ["Japan", "558", "552", "545", "2"],
        ["South Korea", "545", "544", "538", "3"],
        ["Finland", "520", "516", "507", "7"],
        ["Canada", "512", "507", "503", "11"]
      ]
    }
  },
  {
    description:
      "Electric vehicle adoption metrics showing market share, production capacity, and battery efficiency for 2024.",
    table: {
      columns: ["Brand", "Market Share", "Range", "Battery Efficiency", "Factory Output"],
      rows: [
        ["Tesla", "18%", "420 miles", "92%", "1.8M units"],
        ["BYD", "15%", "350 miles", "89%", "2.1M units"],
        ["Hyundai", "7%", "330 miles", "87%", "850K units"],
        ["Mercedes", "4%", "310 miles", "85%", "520K units"],
        ["Tata Motors", "3%", "280 miles", "82%", "700K units"]
      ]
    }
  },
  {
    description:
      "Global tourism trends for 2024 showing traveler volumes, spending behavior, and recovery compared to pre-pandemic levels.",
    table: {
      columns: ["Country", "Visitors (M)", "Growth", "Avg Spend", "Top Attraction"],
      rows: [
        ["France", "92M", "+12%", "$980", "Eiffel Tower"],
        ["USA", "78M", "+9%", "$1,250", "Times Square"],
        ["Spain", "74M", "+10%", "$860", "Sagrada Família"],
        ["Italy", "68M", "+8%", "$910", "Colosseum"],
        ["Japan", "50M", "+18%", "$1,020", "Mount Fuji"]
      ]
    }
  }
];

// -----------------------
// Sessions (5 demo sessions)
// -----------------------
let sessions = [
  {
    sessionId: "session_demo_101",
    title: "Climate Overview 2024",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    messages: [
      { type: "user", question: "Show me global climate metrics.", timestamp: new Date().toISOString(), feedback: null },
      { type: "bot", answer: mockAnswers[0], timestamp: new Date().toISOString(), feedback: null }
    ]
  },
  {
    sessionId: "session_demo_102",
    title: "World Demographics Summary",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    messages: [
      { type: "user", question: "Show me world population metrics.", timestamp: new Date().toISOString(), feedback: null },
      { type: "bot", answer: mockAnswers[1], timestamp: new Date().toISOString(), feedback: null }
    ]
  },
  {
    sessionId: "session_demo_103",
    title: "Education Score Comparison",
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    messages: [
      { type: "user", question: "Show me global education rankings.", timestamp: new Date().toISOString(), feedback: null },
      { type: "bot", answer: mockAnswers[2], timestamp: new Date().toISOString(), feedback: null }
    ]
  },
  {
    sessionId: "session_demo_104",
    title: "EV Market Overview",
    createdAt: new Date(Date.now() - 345600000).toISOString(),
    messages: [
      { type: "user", question: "Show me electric vehicle stats.", timestamp: new Date().toISOString(), feedback: null },
      { type: "bot", answer: mockAnswers[3], timestamp: new Date().toISOString(), feedback: null }
    ]
  },
  {
    sessionId: "session_demo_105",
    title: "Tourism Trends 2024",
    createdAt: new Date(Date.now() - 432000000).toISOString(),
    messages: [
      { type: "user", question: "Show me global tourism data.", timestamp: new Date().toISOString(), feedback: null },
      { type: "bot", answer: mockAnswers[4], timestamp: new Date().toISOString(), feedback: null }
    ]
  }
];

// Generate random fallback answer
function getRandomAnswer() {
  return mockAnswers[Math.floor(Math.random() * mockAnswers.length)];
}

// Generate session ID
function generateSessionId() {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Export ALL necessary values
export { mockAnswers, sessions, getRandomAnswer, generateSessionId };
