let model;

async function loadModel() {
  model = await mobilenet.load();
  console.log("Modello caricato");
}

loadModel();

document.getElementById('imageUpload').addEventListener('change', function(event) {
  const reader = new FileReader();
  reader.onload = function(){
    const img = document.getElementById('preview');
    img.src = reader.result;
  }
  reader.readAsDataURL(event.target.files[0]);
});

async function classifyImage() {
  const img = document.getElementById('preview');
  const predictions = await model.classify(img);

  const filtered = predictions.filter(p =>
    p.className.toLowerCase().includes("cat") ||
    p.className.toLowerCase().includes("dog")
  );

  if(filtered.length > 0){
    document.getElementById("result").innerText =
      `${filtered[0].className} - Accuratezza: ${(filtered[0].probability * 100).toFixed(2)}%`;
  } else {
    document.getElementById("result").innerText =
      "Non riconosciuto come gatto o cane.";
  }
}
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}
