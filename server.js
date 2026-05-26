const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage: storage });

app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

app.post('/api/upload', upload.array('photos'), (req, res) => {
    res.json({ message: "Success" });
});

app.get('/admin', (req, res) => {
    fs.readdir(uploadDir, (err, files) => {
        if (err) return res.send("Error");
        let list = files.map(f => `<li><a href="/uploads/${f}" target="_blank">${f}</a></li>`).join('');
        res.send(`<h1>Admin Dashboard</h1><ul>${list}</ul>`);
    });
});

app.listen(3000, () => console.log("Server started"));
