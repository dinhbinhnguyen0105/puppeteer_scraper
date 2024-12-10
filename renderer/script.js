// const fileInput = document.getElementById("input-directory");

// fileInput.addEventListener("change", (event) => {
//     const file = event.target.files[0];
//     if(file) {
//         window.electronAPIs.send("selected-directory", { file });
//     } else {
//         console.error("No files selected");
//     }
// });

// user-data-dir
// target-url
// count
// submit-btn

const myFormElm = document.getElementById("my-form");
myFormElm.addEventListener("submit", event => {
    event.preventDefault();
    const userDataDirElm = document.getElementById("user-data-dir");
    userDataDirElm.files[0]
});