#!/bin/bash

# Start both frontend and backend servers

echo "Starting Flask backend server..."
cd backend
source venv/bin/activate
python app.py &
BACKEND_PID=$!

cd ..

echo "Starting frontend development server..."
cd frontend
export PATH="/opt/homebrew/bin:$PATH"
pnpm run dev &
FRONTEND_PID=$!

echo ""
echo "=========================================="
echo "Servers started successfully!"
echo "=========================================="
echo "Frontend: http://localhost:5173"
echo "Backend API: http://localhost:5001"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Wait for Ctrl+C
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait
