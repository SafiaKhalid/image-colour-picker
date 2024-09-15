const browseBtn_input = document.getElementById('browse-btn');
const imageOverlay_div = document.getElementById('image-overlay');
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
            imageOverlay_div.style.backgroundImage = `url(${reader.result})`;
        },
        false
    );

    if (image) {
        reader.readAsDataURL(image);
    }

    imageOverlay_div.classList.remove('below-stack');
    selectImage_button.classList.add('display-button');
};

inputForm_form.addEventListener('submit', (e) => {
    e.preventDefault();
    const url = imageUrl_input.value;

    console.log(url.slice(-4));

    if (url.slice(-4) == '.jpg' || url.slice(-4) == '.png') {
        imageOverlay_div.style.backgroundImage = `url(${url})`;
    } else if (url.slice(-4) !== '.jpg' && url.slice(-4) !== '.png') {
        alert_p.innerText = 'Only .jpg and .png files supported';
        setTimeout(() => {
            alert_p.innerText = '';
        }, 2000);
    }
});

/* https://i.etsystatic.com/23987493/r/il/c98206/3159110685/il_570xN.3159110685_1net.jpg */

//Remove images/pick other images
//select colour (break down?)
//Style
