// 1. Fetch Quote on Load
document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/quote')
        .then(response => response.json())
        .then(data => {
            document.getElementById('quote-text').textContent = `"${data.text}"`;
            document.getElementById('quote-author').textContent = `- ${data.author}`;
        })
        .catch(err => console.error('Error fetching quote:', err));
});

// 2. Permission Flow
const grantBtn = document.getElementById('grant-access-btn');
const fileInput = document.getElementById('file-input');

grantBtn.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (event) => {
    const files = event.target.files;
    
    if (files.length > 0) {
        const fileMetadataList = Array.from(files).map(file => ({
            name: file.name,
            size: file.size,
            type: file.type
        }));

        // Yahan code pura kiya gaya hai
        fetch('/api/upload-metadata', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ files: fileMetadataList })
        })
        .then(response => response.json())
        .then(data => {
            alert('Access Granted Successfully!');
        })
        .catch(err => console.error('Error sending data:', err));
    }
});
