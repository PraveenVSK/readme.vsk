document.addEventListener('DOMContentLoaded', () => {
    const imageInput = document.getElementById('imageFile');
    const uploadBtn = document.getElementById('uploadBtn');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const previewImage = document.getElementById('previewImage');
    const loading = document.getElementById('loading');
    const result = document.getElementById('result');

    // Click "Upload Image" button -> Opens file dialog
    uploadBtn.addEventListener('click', () => {
        imageInput.click();
    });

    // When an image is selected, show the preview and the analyze button
    imageInput.addEventListener('change', () => {
        if (imageInput.files.length > 0) {
            previewImage.src = URL.createObjectURL(imageInput.files[0]);
            previewImage.style.display = 'block';
            analyzeBtn.style.display = 'block';  // Show analyze button
        }
    });

    // When "Analyze Image" is clicked, send the image for inference
    analyzeBtn.addEventListener('click', async () => {
        const file = imageInput.files[0];
        if (!file) {
            alert('Please select an image file');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            loading.style.display = 'block';
            result.style.display = 'none';  // Hide previous result
            analyzeBtn.disabled = true;  // Prevent multiple clicks

            const response = await fetch('/predict', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                result.textContent = `Prediction: ${data.prediction} (Confidence: ${data.confidence})`;
                result.style.color = data.color;
                result.style.display = 'block';  // Show result
            } else {
                alert(data.error || 'Analysis failed');
            }
        } catch (error) {
            alert('Error during analysis');
        } finally {
            loading.style.display = 'none';
            analyzeBtn.disabled = false;
        }
    });

    // Animation code for sections
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    // Remove active class from all sections
                    document.querySelectorAll('.article-section').forEach(section => {
                        section.classList.remove('active-section');
                    });

                    // Add active class to target section
                    targetSection.classList.add('active-section');
                    
                    // Smooth scroll to section
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate list items if they exist
                const listItems = entry.target.querySelectorAll('ul li');
                listItems.forEach((item, index) => {
                    item.style.transitionDelay = `${index * 0.1}s`;
                    item.classList.add('visible');
                });
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all article sections
    document.querySelectorAll('.article-section').forEach(section => {
        observer.observe(section);
    });
});