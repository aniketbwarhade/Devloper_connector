const express = require('express');
const connectDB = require('./config/db')
const app = express();
const path = require('path');

// connect Database
connectDB();

// init body parser to parse body in json format
// init middelware
app.use(express.json({extended:false}))


// Define Routes
app.use('/api/users',require('./routes/api/users'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/profile',require('./routes/api/profile'));
app.use('/api/posts',require('./routes/api/posts'));


// Serve static assests in production
if(process.env.NODE_ENV === 'production'){
    // set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server started on port ${PORT}`));

//  to run server and client both concurrently -- npm run dev 