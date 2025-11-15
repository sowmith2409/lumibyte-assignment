# 🚀 Lumibyte Chat Application

A simplified ChatGPT-style full-stack web application built with **React, Tailwind CSS, Node.js, and Express.js**.  
This project demonstrates **session-based chat**, **structured tabular responses**, **dark/light theme**, and **mock backend APIs**.

---

## 📌 Features

---

## 🔹 Frontend (React + TailwindCSS)

### ✅ Modern ChatGPT-style UI  
### ✅ Sidebar with:
- All chat sessions  
- “New Chat” button  
- Collapsible navigation panel  

### ✅ Chat Interface includes:
- User messages  
- AI responses  
- Tabular structured data output  
- Like 👍 / Dislike 👎 feedback buttons  

### ✅ Theme Switching
- Global **Dark/Light** mode toggle using CSS variables  

### ✅ Routing
- Session-based routing with **react-router-dom**

### ✅ Responsive Design
- Optimized for **mobile, tablet, and desktop**

---

## 🔹 Backend (Node.js + Express)

### ✅ No Database Required  
Backend uses fully **mock JSON files** to simulate real chat data.

### 📡 REST API Endpoints

| Method | Endpoint             | Description                      |
|--------|-----------------------|----------------------------------|
| GET    | `/api/sessions`       | List all chat sessions           |
| GET    | `/api/new-chat`       | Create and return a new session ID |
| GET    | `/api/session/:id`    | Fetch chat history for a session  |
| POST   | `/api/chat/:id`       | Return structured response + text |

### Backend Features
- Easy-to-understand modular code  
- Implements session management  
- CORS-enabled for frontend communication  

---

## 📦 Tech Stack

### **Frontend**
- React  
- Tailwind CSS  
- React Router  
- JavaScript (ES6)

### **Backend**
- Node.js  
- Express.js  
- Mock JSON data  
- UUID for session IDs  

---

## 🧾 Project Description

This project replicates essential features of ChatGPT:
- Sidebar session management  
- Conversational interface  
- Tabular structured responses (like Perplexity/ChatGPT Advanced Data Mode)  
- Theme switching  
- Fully mock-driven backend  

Perfect for demonstrating **full-stack development skills**, clean architecture, and UI/UX knowledge.

---

