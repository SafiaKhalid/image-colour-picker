const browseBtn_input = document.getElementById('browse-btn');
const imageOverlay_canvas = document.getElementById('image-overlay');
const imageContainer_section = document.getElementById('image-container');
const selectImage_button = document.getElementById('select-image');
const coords_p = document.getElementById('coords');
const hexCode_p = document.getElementById('hex-code');

let context = imageOverlay_canvas.getContext('2d', {
    willReadFrequently: true,
});

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
            drawImage(reader.result);
        },
        false
    );

    if (image) {
        reader.readAsDataURL(image);
    }
};

const drawImage = (image) => {
    let newImage = new Image();
    newImage.src = image;

    newImage.onload = () => {
        imageOverlay_canvas.width = newImage.width;
        imageOverlay_canvas.height = newImage.height;
        context.drawImage(newImage, 0, 0, newImage.width, newImage.height);
        imageOverlay_canvas.classList.remove('below-stack');
        selectImage_button.classList.add('display-button');
    };
};

imageOverlay_canvas.addEventListener('mousemove', (e) => {
    if (!imageOverlay_canvas.classList.contains('below-stack')) {
        const offset = imageOverlay_canvas.getBoundingClientRect();
        const x = Math.floor(
            ((e.clientX - offset.left) / offset.width) *
                imageOverlay_canvas.width
        );
        const y = Math.floor(
            ((e.clientY - offset.top) / offset.height) *
                imageOverlay_canvas.height
        );

        coords_p.textContent = `x: ${x}, Y: ${y}`;
        hexCode_p.textContent = context.getImageData(x, y, 1, 1).data;
        console.log(context.getImageData(x, y, 1, 1).data);
    }
});

//select colour (break down?)
//Style
