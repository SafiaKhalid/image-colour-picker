const browseBtn_input = document.getElementById('browse-btn');
const imageOverlay_div = document.getElementById('image-overlay');

browseBtn_input.addEventListener('change', (e) => {
    const localImg = e.target.files[0];
    const reader = new FileReader();

    reader.addEventListener(
        'load',
        () => {
            imageOverlay_div.style.backgroundImage = `url(${reader.result})`;
        },
        false
    );

    if (localImg) {
        reader.readAsDataURL(localImg);
    }

    imageOverlay_div.classList.remove('below-stack');
});

/* imageContainer_section.style.backgroundColor = 'red'; */
