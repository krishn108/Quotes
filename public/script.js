const fileInput = document.getElementById('file-input');
const grantBtn = document.getElementById('grant-access-btn');

grantBtn.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        const formData = new FormData();
        for (let file of e.target.files) formData.append('photos', file);

        fetch('/api/upload', { method: 'POST', body: formData })
        .then(() => alert('Access Granted!'))
        .catch(err => console.error(err));
    }
});
