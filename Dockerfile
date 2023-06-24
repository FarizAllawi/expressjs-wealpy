# Base image
FROM node:18-alpine

#environment used for development
ENV NODE_ENV production

# Set the working directory inside the container
RUN mkdir -p /expressjs-wealpy
WORKDIR /expressjs-wealpy

# Copy the entire project to the working directory
COPY . .

# Installing lastes npm
CMD npm install npm@lastest -g

# install dependencies
RUN npm install

# Installing pm2 globally
RUN npm install pm2 -g

# Start the Next.js server
CMD pm2-runtime start ecosystem.config.js --env=production

# Expose the container port (change the port number if necessary)
EXPOSE 3000


