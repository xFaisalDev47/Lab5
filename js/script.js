document.getElementById("fetchImage").addEventListener("click", async () => {
    try {
        const response = await fetch("https://api.unsplash.com/photos/random?query=meme&orientation=landscape&client_id=f-t0VhG5vyxyBUZIeA9KNys_K0qs3NlAMT7u2kij5Gc");
        const data = await response.json();
        loadImage(data.imageUrl);
    } catch {
        alert("Failed to fetch an image.");
    }
});

document.getElementById("uploadImage").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => loadImage(reader.result);
        reader.readAsDataURL(file);
    }
});

document.getElementById("generateMeme").addEventListener("click", drawMeme);

function loadImage(url) {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = url;
    img.onload = () => {
        const canvas = document.getElementById("memeCanvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width / 2;
        canvas.height = img.height / 2;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
}

function drawMeme() {
    const canvas = document.getElementById("memeCanvas");
    const ctx = canvas.getContext("2d");
    const topText = document.getElementById("topText").value;
    const bottomText = document.getElementById("bottomText").value;
    const font = document.getElementById("fontSelect").value;

    ctx.font = `30px ${font}`;
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.textAlign = "center";

    ctx.fillText(topText, canvas.width / 2, 40);
    ctx.strokeText(topText, canvas.width / 2, 40);
    ctx.fillText(bottomText, canvas.width / 2, canvas.height - 20);
    ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 20);
}

document.getElementById("downloadMeme").addEventListener("click", () => {
    const canvas = document.getElementById("memeCanvas");
    const link = document.createElement("a");
    link.download = "meme.png";
    link.href = canvas.toDataURL();
    link.click();
});
