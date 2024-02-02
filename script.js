const fileInput = document.querySelector("input");
let downloadBtn = document.querySelector("button");

downloadBtn.addEventListener("click", (e) => {
  e.preventDefault();
  downloadBtn.innerText = "Downloading file...";
  fetchFile(fileInput.value);
});

function fetchFile(url) {
  //fetching file and returning response as blob
  fetch(url)
    .then((response) => response.blob())
    .then((file) => {
      // URL.createObject creates a url of passed object
      let tempUrl = URL.createObjectURL(file);
      let aTag = document.createElement("a");
      aTag.href = tempUrl; // passing tempUrl as href value of <a> tag pasing file lst name and extension as //download value of <a> tag aTag.download = "filename";

      aTag.download = url.replace(/^.*[\\\/]/, "");
      document.body.appendChild(aTag);
      // console.log(tempUrl);
      
      aTag.click(); // clicking <a> tag so file can be download
      aTag.remove(); // removing <a> tag once file download.
      URL.revokeObjectURL(tempUrl);
      downloadBtn.innerText = "Download File";
    })
    .catch(() => {
      downloadBtn.innerText = "Download File";
      alert("Failed to download file!");
    });
}
