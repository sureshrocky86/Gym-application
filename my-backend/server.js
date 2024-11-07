const express = require('express');
const path = require('path')
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./userRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.static("frontend"));
app.use(cors());
app.use(express.json()); // For parsing application/json
app.use('/api', userRoutes);
// exports.api = functions.https.onRequest(app);

app.use('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/sample-website/index.html'));
})


// MongoDB Connection
mongoose.connect('mongodb+srv://sureshrocky53:8Rz4oryT2MOgmx7D@gymdb.sl0lu.mongodb.net/?retryWrites=true&w=majority&appName=GymDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Sample route
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
