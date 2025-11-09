# Use Node image
FROM node:18-alpine

# Set workdir
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# styling (you can skip if you prefer plain CSS)
# RUN npm i -D tailwindcss postcss autoprefixer @tailwindcss/postcss
RUN npm i -D tailwindcss postcss @tailwindcss/postcss autoprefixer
RUN npm i react-router-dom framer-motion
RUN npm i i18next react-i18next

# NEW
RUN npm install lucide-react

ENV CHOKIDAR_USEPOLLING=true
ENV WATCHPACK_POLLING=true

# Expose Vite dev server port
EXPOSE 5173

# Start development server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]