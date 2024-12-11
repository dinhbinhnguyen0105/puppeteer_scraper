const myFormElm = document.getElementById("my-form");
myFormElm.addEventListener("submit", event => {
    event.preventDefault();
    const userDataDir = document.getElementById("user-data-dir").files[0];
    const groupUrl = document.getElementById("group-url").value;
    const count = document.getElementById("count").value;
    const keywords = document.getElementById("keywords").value;
    if(userDataDir && groupUrl && count && keywords) window.electronAPIs.send("crawl", { userDataDir, groupUrl, count, keywords });
    else console.error("Invalid input");
});