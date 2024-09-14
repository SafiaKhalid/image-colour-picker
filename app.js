const browseBtn_input = document.getElementById('browse-btn');
const imageOverlay_div = document.getElementById('image-overlay');
const imageContainer_section = document.getElementById('image-container');

imageContainer_section.addEventListener('dragover', (e) => {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
});

imageContainer_section.addEventListener('drop', (e) => {
    e.stopPropagation();
    e.preventDefault();
    const localImg = e.dataTransfer.files[0];
    getImage(localImg);
});

browseBtn_input.addEventListener('change', (e) => {
    const localImg = e.target.files[0];
    getImage(localImg);
});

const getImage = (image) => {
    const reader = new FileReader();

    reader.addEventListener(
        'load',
        () => {
            imageOverlay_div.style.backgroundImage = `url(${reader.result})`;
        },
        false
    );

    if (image) {
        reader.readAsDataURL(image);
    }

    imageOverlay_div.classList.remove('below-stack');
};

//Drag-drop
//Allow url upload
//Remove images/pick other images
//select colour (break down?)
//Style
