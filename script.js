document.getElementById("generate").addEventListener("click", function () {
  let text = document.getElementById("text").value.trim();
  let qrContainer = document.getElementById("qrcode");
  let downloadBtn = document.getElementById("download");

  qrContainer.innerHTML = "";
  downloadBtn.style.display = "none";

  if (text) {
    let qr = new QRCode(qrContainer, {
      text: text,
      width: 200,
      height: 200,
      colorDark: "#00b4d8",  // Biru kotak
      colorLight: "#000000", // Hitam background
      correctLevel: QRCode.CorrectLevel.H
    });

    setTimeout(() => {
      let canvas = qrContainer.querySelector("canvas");
      if (!canvas) {
        let img = qrContainer.querySelector("img");
        let tempCanvas = document.createElement("canvas");
        tempCanvas.width = img.width;
        tempCanvas.height = img.height;
        let ctx = tempCanvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        addLogoAndDownload(tempCanvas, downloadBtn);
      } else {
        addLogoAndDownload(canvas, downloadBtn);
      }
    }, 300);
  } else {
    alert("Masukkan teks atau URL terlebih dahulu!");
  }
});

function addLogoAndDownload(canvas, downloadBtn) {
  let ctx = canvas.getContext("2d");

  let logo = new Image();
  logo.src = "https://bkd.kepahiangkab.go.id/dipayang/assets/img/logo.png"; 
  logo.onload = () => {
    let logoSize = canvas.width * 0.25;
    let x = (canvas.width - logoSize) / 2;
    let y = (canvas.height - logoSize) / 2;

    // Background logo hitam agar menyatu dengan QR
    ctx.fillStyle = "#000000";
    ctx.fillRect(x, y, logoSize, logoSize);

    ctx.drawImage(logo, x, y, logoSize, logoSize);

    downloadBtn.href = canvas.toDataURL("image/png");
    downloadBtn.style.display = "inline-block";
  };
}
