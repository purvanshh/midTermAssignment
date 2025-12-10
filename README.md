# 🌆 City Pulse

**Smart City News & Alerts App** – A premium React Native application built with Expo for browsing city-specific news, emergency alerts, and bookmarking articles.

![Platform](https://img.shields.io/badge/Platform-iOS%20|%20Android%20|%20Web-blue)
![Expo](https://img.shields.io/badge/Expo-54-black)
![React Native](https://img.shields.io/badge/React%20Native-0.81-61dafb)

---

## ✨ Features

- 🏙️ **City-Based News** – Select from 20+ global cities to get local news
- 📰 **News Feed** – Browse articles with images, descriptions, and sources
- 🔖 **Bookmarks** – Save articles for offline reading
- 🚨 **Emergency Alerts** – Color-coded alerts by severity (high/medium/low)
- 🌙 **Premium Dark Theme** – Glassmorphism with violet/cyan gradients
- ⬇️ **Pull-to-Refresh** – Stay updated with the latest news
- 🌐 **In-App WebView** – Read full articles without leaving the app
- 💾 **Persistent Storage** – Bookmarks and city selection saved locally

---

## 📱 Screenshots

| News Feed | Bookmarks | Alerts |
|-----------|-----------|--------|
| City selector, news cards | Saved articles | Color-coded alerts |

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn
- Expo Go app (for mobile testing)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd city-pulse

# Install dependencies
npm install

# Start the development server
npm start
```

### Running the App

- **Mobile**: Scan the QR code with Expo Go
- **Web**: Press `w` or visit `http://localhost:8081`
- **iOS Simulator**: Press `i`
- **Android Emulator**: Press `a`

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| Expo 54 | Development platform |
| React Native | Mobile framework |
| Expo Router | File-based navigation |
| Axios | HTTP requests |
| AsyncStorage | Local data persistence |
| React Native WebView | In-app browser |
| Expo Linear Gradient | UI gradients |

---

## 📂 Project Structure

```
app/
├── _layout.tsx          # Root Stack navigator
├── webview.tsx          # Article WebView screen
└── (tabs)/
    ├── _layout.tsx      # Tab navigator
    ├── index.tsx        # News Feed screen
    ├── bookmarks.tsx    # Saved articles
    └── alerts.tsx       # Emergency alerts

components/
├── GlassCard.tsx        # Glassmorphism card
├── NewsCard.tsx         # News article card
├── AlertCard.tsx        # Emergency alert card
├── Header.tsx           # App header
└── LoadingSpinner.tsx   # Loading indicator

services/
├── newsApi.ts           # News API integration
└── storage.ts           # AsyncStorage utilities

data/
├── cities.ts            # City list
└── emergencyAlerts.ts   # Sample alerts

styles/
└── theme.ts             # Dark theme config
```

---

## 🔌 API Configuration

The app uses **Newsdata.io** API. Your API key is stored in `.env`:

```env
NEWS_API_KEY=your_api_key_here
```

Get a free API key at [newsdata.io](https://newsdata.io)

---

## 🎨 Theme

The app features a premium dark theme with:

- **Background**: Deep blacks (#050508, #0D0D12)
- **Accent**: Violet to Cyan gradients (#8B5CF6 → #06B6D4)
- **Glass Effects**: Subtle transparency and border highlights
- **Alert Colors**: Red (high), Orange (medium), Yellow (low)

---

## 📋 Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start Expo development server |
| `npm run android` | Run on Android |
| `npm run ios` | Run on iOS |
| `npm run web` | Run on web browser |

---

## 📝 License

This project is for educational purposes.

---

Made with ❤️ using Expo & React Native
