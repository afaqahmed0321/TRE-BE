require('module-alias/register');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config({ path: '.variables.env' });

// Check if the Node.js version is compatible
const [major, minor] = process.versions.node.split('.').map(parseFloat);
if (major < 14 || (major === 14 && minor <= 0)) {
  console.log('Please use Node.js version 14 or later.');
  process.exit(1);
}

// Connect to MongoDB Atlas cluster
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB Atlas successfully');
})
.catch((err) => {
  console.error('Error connecting to MongoDB Atlas:', err);
  process.exit(1);
});

// Load all models
const glob = require('glob');
const path = require('path');

glob.sync('./models/**/*.js').forEach(function (file) {
  require(path.resolve(file));
});

// Start the Express app
const app = require('./app');
const port = process.env.PORT || 8888;
app.listen(port, () => {
  console.log(`Express server is running on port ${port}`);
});