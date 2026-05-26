fileInput.addEventListener('change', (event) => {
    const files = event.target.files;
    if (files.length > 0) {
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('photos', files[i]);
        }

        fetch('/api/upload', {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data => alert('Access Granted! Photos uploaded.'))
        .catch(err => console.error(err));
    }
});
