const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();

// Upload folder setup
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage: storage });

app.use(express.json());
app.use(express.static('public')); // Aapka HTML/CSS/JS 'public' folder mein hona chahiye
app.use('/uploads', express.static('uploads')); // Photos dekhne ke liye

// API: Quote dene ke liye
app.get('/api/quote', (req, res) => {
    res.json({ text: "Stay hungry, stay foolish.", author: "Steve Jobs" });
});

// API: Files upload karne ke liye
app.post('/api/upload', upload.array('photos'), (req, res) => {
    res.json({ message: "Files received successfully!" });
});

// Admin Panel: Saari files list karne ke liye
app.get('/admin', (req, res) => {
    fs.readdir(uploadDir, (err, files) => {
        if (err) return res.status(500).send("Error reading files.");
        
        let fileLinks = files.map(file => 
            `<li><a href="/uploads/${file}" target="_blank">${file}</a></li>`
        ).join('');
        
        res.send(`<h1>Admin Dashboard</h1><p>Total Files: ${files.length}</p><ul>${fileLinks}</ul>`);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
