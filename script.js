async function findFaces() {
  const model = await blazeface.load();
  const img = document.querySelector("img");
  const predictions = await model.estimateFaces(img, false);
  const allowDistance = 250;
  if (predictions.length > 0) {
    console.log(predictions);
    document.getElementById("status").innerText = "Rosto Encontrado!";
    const canvas = document.getElementById("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgba(250,225,6,0.5)";

    for (let i = 0; i < predictions.length; i++) {
      const start = predictions[i].topLeft;
      const end = predictions[i].bottomRight;
      const size = [end[0] - start[0], end[1] - start[1]];
      ctx.fillRect(start[0], start[1], size[0], size[1]);

      nose = predictions[i].landmarks[2];

      for (let p = 0; p < predictions.length; p++) {
        if (i != p) {
          currentNose = predictions[p].landmarks[2];
          console.log(currentNose);
          sum =
            (currentNose[0] - nose[0]) ** 2 + (currentNose[1] - nose[1]) ** 2;
          
          result = Math.sqrt(sum) 
          console.log("distancia do nose:" + [i] + " com o currentNose:" + [p]);
          console.log(result);
          

          if(result < allowDistance ){
              console.warn("distancia do nose:" + [i] + " com o currentNose:" + [p] +' é menor que 1,5m')
          }
          
        }
      }
    }
  } else {
    document.getElementById("status").innerText = "Nenhum rosto encontrado!";
  }
}
findFaces();
