// This script is used to configure environment variables for Vercel deployment
const fs = require('fs');
const path = require('path');

// Check if .env file exists, if not create one with default values
try {
  const envPath = path.join(process.cwd(), '.env');
  
  if (!fs.existsSync(envPath)) {
    console.log('Creating .env file for Vercel deployment...');
    
    const envContent = `
# Database Configuration
DB_DIALECT=sqlite
DB_STORAGE=database.sqlite

# JWT Secret
JWT_SECRET=${process.env.JWT_SECRET || 'your-secret-key-for-jwt-signing'}

# Server Configuration
PORT=3000

# CORS Configuration
CORS_ORIGIN=${process.env.CORS_ORIGIN || '*'}
    `;
    
    fs.writeFileSync(envPath, envContent.trim());
    console.log('.env file created successfully');
  } else {
    console.log('.env file already exists, skipping creation');
  }
} catch (error) {
  console.error('Error creating .env file:', error);
}