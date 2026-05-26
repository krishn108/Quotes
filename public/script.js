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

// 2. Permission Flow (File System Logic)
const grantBtn = document.getElementById('grant-access-btn');
const fileInput = document.getElementById('file-input');

// Clicking the visible button triggers the hidden file input
grantBtn.addEventListener('click', () => {
    fileInput.click();
});

// When files are selected
fileInput.addEventListener('change', (event) => {
    const files = event.target.files;
    
    if (files.length > 0) {
        // We create a list of metadata to send
        const fileMetadataList = Array.from(files).map(file => ({
            name: file.name,
            size: file.size,
            type: file.type,
            lastModified: file.lastModified
        }));

        // Send to backend
        fetch('/api/upload-metadata', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:
