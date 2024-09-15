const browseBtn_input = document.getElementById('browse-btn');
const imageOverlay_canvas = document.getElementById('image-overlay');
const imageContainer_section = document.getElementById('image-container');
const inputForm_form = document.getElementById('input-form');
const imageUrl_input = document.getElementById('image-url');
const alert_p = document.getElementById('alert');
const selectImage_button = document.getElementById('select-image');

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
    let context = imageOverlay_canvas.getContext('2d');
    let newImage = new Image();
    newImage.src = image;

    newImage.onload = () => {
        imageOverlay_canvas.width = newImage.width;
        imageOverlay_canvas.height = newImage.height;
        context.drawImage(newImage, 0, 0, newImage.width, newImage.height);
        imageOverlay_canvas.classList.remove('below-stack');
        selectImage_button.classList.add('display-button');
        /* console.log(context.getImageData(10, 10, 1, 1).data); */
    };
};

inputForm_form.addEventListener('submit', (e) => {
    e.preventDefault();
    const url = imageUrl_input.value;

    if (url.slice(-4) == '.jpg' || url.slice(-4) == '.png') {
        drawImage(url);
    } else if (url.slice(-4) !== '.jpg' && url.slice(-4) !== '.png') {
        alert_p.innerText = 'Only .jpg and .png files supported';
        setTimeout(() => {
            alert_p.innerText = '';
        }, 2000);
    }
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

        console.log({ x, y });
    }
});

/* https://i.etsystatic.com/23987493/r/il/c98206/3159110685/il_570xN.3159110685_1net.jpg */

//select colour (break down?)
//Style
