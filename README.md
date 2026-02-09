# 🎉 EventMatch - AI-Powered Event Discovery

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwindcss" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Algolia-Agent_Studio-5468ff?style=for-the-badge&logo=algolia" alt="Algolia" />
</p>

> **Discover events that match your vibe!** EventMatch is a conversational AI-powered event discovery platform built for the Algolia Agent Studio Challenge.

## ✨ Features

### 🤖 Conversational AI
- **Natural Language Search** - Ask "Find music events in Mumbai" or "Free tech conferences this month"
- **Smart Recommendations** - AI suggests events based on your preferences
- **Follow-up Queries** - Refine your search with contextual conversations

### 🎨 Beautiful UI
- **Glassmorphism Design** - Modern frosted glass effect cards
- **Floating Particles** - Animated background particles
- **Smooth Animations** - Framer Motion powered transitions
- **Dark Theme** - Eye-friendly dark mode design

### 📌 Core Functionality
- **32+ Events** across 9 categories (Music, Sports, Tech, Food, Art, Wellness, Business, Education)
- **Bookmarking** - Save your favorite events (persisted in localStorage)
- **Advanced Filters** - Filter by category, price, and saved events
- **Event Modal** - Detailed view with capacity tracking
- **Search** - Full-text search across titles, descriptions, and cities

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/eventmatch.git
cd eventmatch

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your Algolia credentials to .env.local

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the app!

## 🔧 Environment Variables

Create a `.env.local` file with:

```env
NEXT_PUBLIC_ALGOLIA_APP_ID=your_app_id
NEXT_PUBLIC_ALGOLIA_SEARCH_KEY=your_search_key
ALGOLIA_ADMIN_KEY=your_admin_key
```

## 📁 Project Structure

```
eventmatch/
├── app/
│   ├── page.tsx        # Main page with events grid
│   ├── layout.tsx      # Root layout with fonts
│   └── globals.css     # Custom CSS styles
├── components/
│   └── ChatInterface.tsx  # AI chat component
├── lib/
│   ├── algolia.ts      # Algolia client config
│   └── events-data.ts  # Sample events data
├── public/
└── package.json
```

## 🎯 Event Categories

| Category | Icon | Events |
|----------|------|--------|
| Music | 🎵 | Concerts, EDM nights, Jazz |
| Sports | ⚽ | Marathon, Cricket, Yoga |
| Tech | 💻 | AI Summit, Hackathons |
| Food | 🍕 | Food festivals, Wine tasting |
| Art | 🎨 | Exhibitions, Dance, Comedy |
| Wellness | 🧘 | Meditation, Spa, Mental health |
| Business | 💼 | Summits, Leadership forums |
| Education | 📚 | Study abroad fairs, Bootcamps |

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Search**: Algolia Agent Studio

## 📸 Screenshots

### Home Page
![Event Discovery Homepage](#)

### Chat Interface
![AI Chat Interface](#)

### Event Details
![Event Modal](#)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Algolia](https://www.algolia.com/) for Agent Studio
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Lucide](https://lucide.dev/) for beautiful icons
- [Unsplash](https://unsplash.com/) for event images

---

<p align="center">
  Made with ❤️ for the <a href="https://dev.to/challenges/algolia">Algolia Agent Studio Challenge</a>
</p>
