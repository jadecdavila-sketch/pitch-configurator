# L&D Pitch Configurator

A web application for configuring and exporting customized Learning & Development pitch presentations.

**Live Demo:** https://jadecdavila-sketch.github.io/pitch-configurator/

## Features

- Interactive wizard-based configuration
- 23 training recipes across 3 categories (Individual Contributor, Manager, Executive)
- AI-generated executive summaries powered by Google Gemini
- PowerPoint export with customized slides
- Case study selection
- Delivery configuration (facilitation, modality)

## Architecture

This application consists of two components:

1. **Frontend**: React + TypeScript + Vite application
2. **Backend**: Flask API for PowerPoint generation (Python)

## Prerequisites

- Node.js 18+ and pnpm
- Python 3.9+
- Google Gemini API key (for AI summary generation)

## Setup

### 1. Frontend Setup

```bash
cd frontend
pnpm install
```

Create a `.env` file in the `frontend` directory:

```
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### 2. Backend Setup

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

## Running the Application

### Option 1: Run both servers with one command

```bash
./start-servers.sh
```

This will start:
- Frontend at http://localhost:5173
- Backend API at http://localhost:5001

### Option 2: Run servers separately

**Terminal 1 - Frontend:**
```bash
cd frontend
pnpm run dev
```

**Terminal 2 - Backend:**
```bash
cd backend
source venv/bin/activate
python app.py
```

## How It Works

### PowerPoint Export

1. User configures their pitch using the wizard
2. AI generates an executive summary based on selections
3. When "Export to PowerPoint" is clicked:
   - Frontend sends configuration to Flask API
   - Backend loads the PowerPoint template
   - Backend removes unselected recipe slides
   - Backend adds custom cover, config summary, and executive summary slides
   - Complete PowerPoint file is returned to user

### Template Structure

The PowerPoint template (`public/ppt/Jade 2025-12-18_ANSR template - 1 pagers.pptx`) contains:
- Slide 1: Cover (replaced with custom)
- Slides 2-7: Individual Contributor category + recipes
- Slides 8-16: Manager category + recipes
- Slides 17-27: Executive category + recipes

Only selected recipes and their category headers are included in the final export.

## Development

### Frontend Tech Stack
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Zustand (state management)
- Google Gemini AI

### Backend Tech Stack
- Flask
- python-pptx
- Flask-CORS

## Project Structure

```
L&D-pitch-configurator/
├── frontend/           # React application
│   ├── src/
│   │   ├── components/ # UI components
│   │   ├── lib/        # Utilities and API integrations
│   │   ├── store/      # State management
│   │   └── types/      # TypeScript types
│   └── public/
│       └── ppt/        # PowerPoint template
├── backend/            # Flask API
│   ├── app.py          # Main API server
│   └── requirements.txt
└── start-servers.sh    # Convenience script
```

## API Endpoints

### POST /generate-pptx
Generates a customized PowerPoint presentation.

**Request:**
```json
{
  "config": {
    "clientName": "Client Name",
    "stage": { "id": "scale", "name": "Scale" },
    "ambition": { "id": "talent-differentiator", "name": "Talent Differentiator" },
    "facilitation": "facilitated",
    "modality": "hybrid",
    "recipes": [...]
  },
  "executiveSummary": "Summary text..."
}
```

**Response:** PowerPoint file download

### GET /health
Health check endpoint.
