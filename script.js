document.getElementById("generate").addEventListener("click", function () {
  let text = document.getElementById("text").value.trim();
  let qrContainer = document.getElementById("qrcode");

  // Kosongkan QR sebelumnya
  qrContainer.innerHTML = "";

  if (text) {
    new QRCode(qrContainer, {
      text: text,
      width: 200,
      height: 200,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });
  } else {
    alert("Masukkan teks atau URL terlebih dahulu!");
  }
});
