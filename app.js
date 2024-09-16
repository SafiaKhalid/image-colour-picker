const browseBtn_input = document.getElementById('browse-btn');
const imageOverlay_canvas = document.getElementById('image-overlay');
const imageContainer_section = document.getElementById('image-container');
const selectImage_button = document.getElementById('select-image');
const focusColour_div = document.getElementById('focus-colour');
const hexCode_p = document.getElementById('hex-code');
const recentsContainer_section = document.getElementById('recents-container');

let context = imageOverlay_canvas.getContext('2d', {
    willReadFrequently: true,
});
let recentColoursArray = [];
let hex;

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
        focusColour_div.classList.add('display');
    };
};

const toHex = (rgba) => {
    const redHex = rgba[0].toString(16);
    const greenHex = rgba[1].toString(16);
    const blueHex = rgba[2].toString(16);

    return `#${redHex.length === 1 ? '0' + redHex : redHex}${
        greenHex.length === 1 ? '0' + greenHex : greenHex
    }${blueHex.length === 1 ? '0' + blueHex : blueHex}`;
};

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
    recentColoursArray = [];
    const localImg = e.target.files[0];
    getImage(localImg);
});

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

        hex = toHex(context.getImageData(x, y, 1, 1).data);
        focusColour_div.style.background = hex;
        hexCode_p.textContent = hex;
    }
});

imageOverlay_canvas.addEventListener('click', () => {
    if (!imageOverlay_canvas.classList.contains('below-stack')) {
        console.log(hex);
        if (!recentColoursArray.includes(hex)) {
            recentColoursArray.push(hex);
            const recentDiv = document.createElement('article');
            const recentText = document.createElement('p');
            const recentColour = document.createElement('div');
            recentText.textContent = hex;
            recentColour.style.background = hex;
            recentDiv.appendChild(recentColour);
            recentDiv.appendChild(recentText);
            recentsContainer_section.appendChild(recentDiv);
        }
    }
});

//Recent colours list
//Style
