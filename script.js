const video = document.getElementById("camera");
const captureBtn = document.getElementById("capture-btn");
const flipBtn = document.getElementById("flip-camera");
const overlay = document.getElementById("overlay");
const frontOverlay = document.getElementById("front-overlay");
const preview = document.getElementById("preview");
const capturedPhoto = document.getElementById("captured-photo");
const photoContainer = document.getElementById("photo-container");
const saveBtn = document.getElementById("save-btn");
const retakeBtn = document.getElementById("retake-btn");

let stream;
let useFrontCamera = false;

// Função para iniciar a câmera
async function startCamera() {
    const constraints = {
        video: {
            facingMode: useFrontCamera ? "user" : "environment"
        }
    };

    try {
        stream = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = stream;
    } catch (error) {
        console.error("Erro ao acessar a câmera:", error);
    }
}

// Alternar câmera
flipBtn.addEventListener("click", () => {
    useFrontCamera = !useFrontCamera;
    startCamera();
    overlay.style.display = useFrontCamera ? "none" : "block";
    frontOverlay.style.display = useFrontCamera ? "block" : "none";
});

// Capturar foto
captureBtn.addEventListener("click", () => {
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");

    if (useFrontCamera) {
        ctx.scale(-1, 1);
        ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
    } else {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    }

    const photoUrl = canvas.toDataURL("image/png");
    capturedPhoto.src = photoUrl;
    preview.src = photoUrl;

    photoContainer.classList.remove("hidden");
});

// Retirar outra foto
retakeBtn.addEventListener("click", () => {
    photoContainer.classList.add("hidden");
});

// Salvar foto
saveBtn.addEventListener("click", () => {
    const link = document.createElement("a");
    link.href = capturedPhoto.src;
    link.download = "foto.png";
    link.click();
});

// Iniciar a câmera ao carregar a página
startCamera();
