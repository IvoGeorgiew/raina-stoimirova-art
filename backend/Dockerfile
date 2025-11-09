# Use official Python image
FROM python:3.11-slim

# Set workdir
WORKDIR /app

# Copy dependency list and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy source code
COPY . .

# Expose FastAPI port
EXPOSE 8000

# Run the backend
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]