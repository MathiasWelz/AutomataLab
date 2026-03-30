# AutomataLab

An educational mobile application for learning formal languages and automata theory based on Peter Linz's textbook. Built with React Native (Expo), TypeScript, Go, and modern technologies.

## Overview

AutomataLab provides an interactive platform to learn and practice:

- **Deterministic Finite Automata (DFA)** - Build and test DFA directly in the app
- **Nondeterministic Finite Automata (NFA)** - Understand epsilon transitions
- **Regular Languages** - Explore regular expressions and patterns
- **Context-Free Grammars** - Design and test CFG
- **Pushdown Automata** - Work with stack-based computation
- **Turing Machines** - Learn universal computation theory

## Project Structure

```
AutomataLab/
├── backend/                 # Go backend (Gin, PostgreSQL, Redis)
│   ├── cmd/                # Application entry point
│   │   └── main.go
│   ├── internal/
│   │   ├── api/            # HTTP handlers and routes
│   │   ├── models/         # Data structures
│   │   ├── services/       # Business logic
│   │   └── automata/       # Automata core logic
│   ├── go.mod
│   ├── Dockerfile
│   └── .env.example
│
├── mobile/                  # React Native frontend (Expo SDK 51)
│   ├── app/
│   │   ├── (tabs)/         # Tabbed navigation
│   │   │   ├── index.tsx   # Home screen
│   │   │   ├── learn.tsx   # Lessons
│   │   │   ├── practice.tsx # Canvas for building automata
│   │   │   └── profile.tsx # User profile & progress
│   │   ├── _layout.tsx     # Root layout with React Query
│   ├── lib/
│   │   ├── api.ts          # Axios client
│   │   └── store.ts        # Zustand state management
│   ├── constants/
│   │   └── Colors.ts
│   ├── components/
│   │   └── ThemedText.tsx
│   ├── package.json
│   ├── app.json
│   ├── tsconfig.json
│   └── .env.example
│
├── docker-compose.yml       # Multi-container orchestration
├── .gitignore
└── README.md
```

## Tech Stack

### Backend
- **Runtime**: Go 1.22
- **Framework**: Gin 1.9
- **Database**: PostgreSQL 15
- **Cache**: Redis 7
- **CORS**: Enabled for local development

### Frontend
- **Runtime**: Expo SDK 51
- **Framework**: React Native + Expo Router v3
- **Language**: TypeScript 5.2
- **State Management**: Zustand 4.4
- **API Client**: Axios 1.6 + React Query 5.28
- **Styling**: NativeWind 2.0 (Tailwind for React Native)

## Quick Start

### Prerequisites

- Node.js 18+ (for mobile development)
- Go 1.22+ (for backend)
- Docker & Docker Compose (for database services)
- Expo CLI (`npm install -g expo-cli`)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Copy environment variables:
   ```bash
   cp .env.example .env
   ```

3. Initialize Go modules:
   ```bash
   go mod download
   ```

4. Run with Docker Compose (includes PostgreSQL & Redis):
   ```bash
   cd ..
   docker-compose up -d
   ```

5. The backend will be available at `http://localhost:8080`

6. Test the health endpoint:
   ```bash
   curl http://localhost:8080/api/health
   ```

### Mobile Setup

1. Navigate to the mobile directory:
   ```bash
   cd mobile
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Copy environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Start the Expo development server:
   ```bash
   npm start
   ```

5. Select your platform:
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app (web/mobile)

## Available Endpoints

### Health Check
- `GET /api/health` - Backend health status

### Automata
- `GET /api/automata` - List all automata
- `GET /api/automata/:id` - Get specific automata
- `POST /api/automata` - Create new automata

### Lessons
- `GET /api/lessons` - List all lessons
- `GET /api/lessons/:id` - Get specific lesson

## Features

### Home Screen
- Welcome message
- Backend connectivity status
- Quick access to learning paths

### Learn Tab
- Browse Linz's automata theory lessons
- Organized by topic complexity
- Foundational to advanced topics

### Practice Tab
- Create Deterministic Finite Automata
- Define states, alphabet, and transitions
- Test string acceptance
- View created automata history

### Profile Tab
- View learning statistics
- Track automata created
- Progress tracking per topic
- Clear session data

## Environment Variables

### Backend (.env)
```
PORT=8080
GIN_MODE=debug
DB_HOST=localhost
DB_PORT=5432
DB_USER=automatalab
DB_PASSWORD=password
DB_NAME=automatalab_db
REDIS_HOST=localhost
REDIS_PORT=6379
ALLOWED_ORIGINS=http://localhost:8081,http://localhost:3000
```

### Mobile (.env.local)
```
EXPO_PUBLIC_API_BASE_URL=http://localhost:8080
EXPO_PUBLIC_API_TIMEOUT=30000
```

## Development Workflow

### Running Everything with Docker

```bash
# Start all services (DB, Redis, Backend)
docker-compose up -d

# View logs
docker-compose logs -f backend

# Stop everything
docker-compose down

# Remove volumes (reset database)
docker-compose down -v
```

### Running Backend Locally (without Docker)

```bash
cd backend
go run ./cmd/main.go
```

Requires:
- PostgreSQL running on localhost:5432
- Redis running on localhost:6379

### Testing the Backend

```bash
cd backend
go test ./...
```

## API Examples

### Get Health Status
```bash
curl http://localhost:8080/api/health
```

Response:
```json
{
  "status": "ok",
  "timestamp": "2026-03-29T10:30:00Z",
  "version": "1.0.0"
}
```

### Create Automata (Example)
```bash
curl -X POST http://localhost:8080/api/automata \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Binary Strings",
    "states": ["q0", "q1", "q2"],
    "alphabet": ["0", "1"],
    "initial_state": "q0",
    "accept_states": ["q2"]
  }'
```

## Performance & Optimization

- Mobile uses React Query for efficient API caching
- Zustand provides lightweight state management
- Backend uses connection pooling for database
- Redis caching layer for frequent queries
- NativeWind enables CSS-in-JS optimization for React Native

## Learning Resources

This project is designed for students using:
- **Primary Textbook**: "Introduction to Formal Languages and Automata" by Peter Linz
- **Topics Covered**: Chapters 1-8 core concepts
- **Interactive Examples**: Hands-on DFA/NFA building and testing

## Common Issues

### Port Already in Use
```bash
# Find process using port 8080
lsof -i :8080

# Kill process
kill -9 <PID>
```

### Backend Connection Error
- Ensure Docker Compose services are running: `docker-compose ps`
- Check backend logs: `docker-compose logs backend`
- Verify API base URL in `.env.local`

### Expo Build Error
```bash
# Clear cache
expo start -c
```

## Future Enhancements

- [ ] NFA to DFA conversion visualization
- [ ] Regular expression to automata compiler
- [ ] Turing machine simulator
- [ ] Collaborative automata building
- [ ] Export automata as images/code
- [ ] Automated test generation
- [ ] Performance analytics dashboard

## Contributing

Contributions are welcome! Please:
1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

This project is created for educational purposes.

## Support

For issues, questions, or suggestions:
- Check existing issues on GitHub
- Review the Linz textbook for theoretical concepts
- Test API endpoints with curl or Postman

---

Built with ❤️ for students learning automata theory
