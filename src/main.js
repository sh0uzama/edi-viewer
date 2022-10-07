import template from "./template";
import { parseEDIText } from "./parseEDIText";

import pkg from "../package.json";

function readerOnLoad(event) {
  const text = event.target.result;
  const result = parseEDIText(text);

  const data = {
    root: result
  };

  document.getElementById("content").innerHTML = Eta.render(template, data);
}

const reader = new FileReader();
reader.onload = readerOnLoad;

export default function bootstrap() {

  // set version in footer
  document.getElementById("package-version").innerHTML = pkg.version;

  // setup fileInput to readFile on change
  const fileInput = document.getElementById("file");
  fileInput.addEventListener("change", readFile, false);

  // on page reload, reload file if any
  if (fileInput.files && fileInput.files.length) 
    readFile();

  // add drag and drop functionality
  document.body.addEventListener('dragover', (event) => {
    event.stopPropagation();
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
  });
  document.body.addEventListener('drop', (event) => {
    event.stopPropagation();
    event.preventDefault();
    fileInput.files = event.dataTransfer.files;
    readFile();
  });

  function readFile() {
    const files = fileInput.files;
    const file = files[0];
    reader.readAsText(file);
  }
}