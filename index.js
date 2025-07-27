const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'supersecretkey',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: false, // HTTP for simplicity; secure: true needs HTTPS
        httpOnly: false // Allow JavaScript access to cookies (vulnerable for demo)
    }
}));

// In-memory user data
const users = {
    'user1': { password: 'pass1', data: 'Sensitive data for user1' },
    'user2': { password: 'pass2', data: 'Sensitive data for user2' }
};

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (users[username] && users[username].password === password) {
        req.session.user = username;
        res.redirect('/dashboard');
    } else {
        res.send('Invalid credentials');
    }
});

app.get('/dashboard', (req, res) => {
    if (req.session.user) {
        res.send(`
            <h1>Welcome ${req.session.user}!</h1>
            <p>Your data: ${users[req.session.user].data}</p>
            <form action="/update-data" method="post">
                <label for="newData">New Data:</label>
                <input type="text" id="newData" name="newData" required><br>
                <button type="submit">Update Data</button>
            </form>
            <a href="/logout">Logout</a>
        `);
    } else {
        res.redirect('/');
    }
});

app.post('/update-data', (req, res) => {
    if (req.session.user) {
        const newData = req.body.newData;
        users[req.session.user].data = newData;
        res.redirect('/dashboard');
    } else {
        res.redirect('/');
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

// For local development
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

// Export for Vercel
module.exports = app;