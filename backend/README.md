# PowerPoint Generation Backend

Flask API for generating customized PowerPoint presentations.

## Setup

1. Create a virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the server:
```bash
python app.py
```

The server will start on `http://localhost:5001`

## API Endpoints

### POST /generate-pptx
Generates a customized PowerPoint presentation.

**Request body:**
```json
{
  "config": {
    "clientName": "Example Client",
    "stage": { "id": "scale", "name": "Scale" },
    "ambition": { "id": "talent-differentiator", "name": "Talent Differentiator" },
    "facilitation": "facilitated",
    "modality": "hybrid",
    "recipes": [
      { "id": "ascend-leadership", "name": "ASCEND: Leadership Alignment Program" }
    ]
  },
  "executiveSummary": "Executive summary text here..."
}
```

**Response:**
Returns a PowerPoint file (.pptx) for download.

### GET /health
Health check endpoint.

**Response:**
```json
{
  "status": "ok"
}
```
