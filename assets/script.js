async function getDir(direction, path, event = undefined) {
  if (event) event.preventDefault();
  try {
    const response = await axios.post("/dir", {
      path,
      direction,
    });
    let div = document.getElementById("dir");
    let directory = document.getElementById("directory");
    let directoryNavbar = document.getElementById("directory-navbar");

    let backButton = `<div class="folder-icon" role="button" onclick="getDir('back', undefined, event)"></div>`;

    let directoryNavbarHTML = `
    <div class="directory-navbar" id="directory-navbar">
      <div id="directory">${response.data.path.replaceAll("/", backButton)}</div>
    </div>`;

    let responseHTML = response.data.directories
      .map((folder) => `<button onclick="getDir('forward', '${folder}', event)">${folder}</button>`)
      .join("");
    console.log(response);
    div.innerHTML = responseHTML;
    directoryNavbar.innerHTML = directoryNavbarHTML;
  } catch (error) {
    console.error(error);
  }
}
getDir("forward", "/");

async function createProject(event) {
  event.preventDefault();
  let directory = document.getElementById("directory").value;
  let projectName = document.getElementById("projectName").value;
  let pack = document.getElementById("pack").value;
  console.log(directory);
  console.log(projectName);
  console.log(pack);
  try {
    const response = await axios.post("/", {
      directory,
      projectName,
      pack,
    });
    console.log(response);
    let responseEl = document.getElementById("response");
    responseEl.innerHTML = response.data;
  } catch (error) {
    console.error(error);
  }
}
