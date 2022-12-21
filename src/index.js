require('dotenv').config();
const express = require('express');
const app = express();

// Server settings
app.set('port', process.env.APP_PORT || 3000)

// Middlewares
app.use(express.json());

// Routes
const userRouter = require('./api/User/user.router')
app.use('/api/users', userRouter)

const projectRouter = require('./api/Project/project.router')
app.use('/api/projects', projectRouter)

const projectUpdateRouter = require('./api/ProjectUpdate/projectupdate.router')
app.use('/api/projectupdates', projectUpdateRouter)

const relevantPointRouter = require('./api/RelevantPoint/relevantpoint.router')
app.use('/api/relevantpoints', relevantPointRouter)

app.get("/api", (req, res) => {
    res.json({
        message: "The API is working correctly!"
    });
});

//Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
})