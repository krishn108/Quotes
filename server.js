const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies and serve static files
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// --- IN-MEMORY DATA STORE (For Learning Purposes) ---
// In a real app, you would use a database like MongoDB or PostgreSQL.
// This array will store the file metadata sent by users.
let uploadedFiles = [];

// Simple hardcoded password for the admin dashboard
const ADMIN_PASSWORD = "secret123"; 

// --- ROUTES ---

// 1. API: Get Quote of the Day
app.get('/api/quote', (req, res) => {
    const quotes = [
        { text: "Code is like humor. When you have to explain it, it’s bad.", author: "John Cage" },
        { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
        { text: "Experience is the name everyone gives to their mistakes.", author: "Oscar Wilde" }
    ];
    // Pick a random quote
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    res.json(randomQuote);
});

// 2. API: Receive File Metadata
app.post('/api/upload-metadata', (req, res) => {
    const fileData = req.body;
    // Add timestamp
    fileData.timestamp = new Date().toLocaleString();
    
    // Save to our in-memory array
    uploadedFiles.push(fileData);
    console.log("Received file data:", fileData);
    
    res.json({ success: true, message: "Metadata received!" });
});

// 3. Admin Dashboard Route
app.get('/admin', (req, res) => {
    // We will render a simple HTML page containing the data
    const filesHtml = uploadedFiles.map(f => 
        `<li>${f.name} (${f.size} bytes) - ${f.type} - Uploaded: ${f.timestamp}</li>`
    ).join('');

    // Simple HTML for the admin panel
    const adminHtml = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Admin Dashboard</title>
        <style>
            body { font-family: sans-serif; padding: 2rem; background: #f4f4f9; }
            .container { max-width: 800px; margin: 0 auto; background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            h1 { color: #333; }
            ul { list-style: none; padding: 0; }
            li { padding: 10px; border-bottom: 1px solid #eee; }
            .logout { color: red; text-decoration: none; float: right; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Admin Dashboard <a href="/" class="logout">Back to Home</a></h1>
            <h3>Files Access Permissions:</h3>
            <ul>${filesHtml.length > 0 ? filesHtml : '<p>No files uploaded yet.</p>'}</ul>
        </div>
    </body>
    </html>
    `;
    res.send(adminHtml);
});

// 4. Admin Login Route (Simple Logic)
app.post('/admin/login', (req, res) => {
    const { password } = req.body;
    if(password === ADMIN_PASSWORD) {
        // In a real app, use a cookie or session. Here we just redirect to /admin.
        res.json({ success: true, redirectUrl: '/admin' });
    } else {
        res.status(401).json({ success: false, message: "Incorrect Password" });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
