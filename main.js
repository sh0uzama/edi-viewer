import template from "./template";
import { parseEDIText } from "./parseEDIText";

function load() {
  document.getElementById("file").addEventListener("change", readFile, false);

  function readFile(evt) {
    const files = evt.target.files;
    const file = files[0];
    const reader = new FileReader();

    reader.onload = readerOnLoad;

    reader.readAsText(file);
  }
}

function readerOnLoad(event) {
  const text = event.target.result;
  const result = parseEDIText(text);

  const data = {
    root: result
  };

  document.getElementById("content").innerHTML = Eta.render(template, data);
}

window.addEventListener("load", load);
