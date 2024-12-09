const fileInput = document.getElementById("input-directory");

fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if(file) {
        window.electronAPIs.send("selected-directory", { file });
    } else {
        console.error("No files selected");
    }
});