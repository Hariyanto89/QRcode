document.getElementById("generate").addEventListener("click", function () {
  let text = document.getElementById("text").value.trim();
  let qrContainer = document.getElementById("qrcode");
  let downloadBtn = document.getElementById("download");

  qrContainer.innerHTML = "";
  downloadBtn.style.display = "none";

  if (text) {
    // Buat QR di canvas
    let qr = new QRCode(qrContainer, {
      text: text,
      width: 200,
      height: 200,
      colorDark: "#0077b6", // biru DIPAYANG
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });

    // Tunggu QR terbentuk, lalu tambahkan logo
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

  // Load logo DIPAYANG (sesuaikan path/logo)
  let logo = new Image();
  logo.src = "https://blogger.googleusercontent.com/img/a/AVvXsEg3QdFkAA1gN_OKWFohljNuj3FWvTvYpdyCdfZBHtR1HyLyVpN0bR6TU66lV6X-m5KA1fOKYan6D78PzGcl3Ex0yI1ygqAg9Q2TjSJB4iASAJka9w9E1usoto1CF6wopLbv8vfEa6lZCdiEz074CSAzUlvrag4ShF5VZe_mbwuXMmZ_3K6kJ71xvoaX71M"; // ganti dengan logo DIPAYANG asli
  logo.onload = () => {
    let logoSize = canvas.width * 0.25; // 25% dari ukuran QR
    let x = (canvas.width - logoSize) / 2;
    let y = (canvas.height - logoSize) / 2;

    ctx.fillStyle = "white";
    ctx.fillRect(x, y, logoSize, logoSize); // background putih untuk logo
    ctx.drawImage(logo, x, y, logoSize, logoSize);

    // Tampilkan tombol download
    downloadBtn.href = canvas.toDataURL("image/png");
    downloadBtn.style.display = "inline-block";
  };
}
