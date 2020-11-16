async function getDir(direction, path, event = undefined) {
  if (event) event.preventDefault();
  try {
    const response = await axios.post("/dir", {
      path,
      direction,
    });
    let directoriesList = document.getElementById("directories-list");
    let directoryNavbar = document.getElementById("directory-navbar");

    let backButton = `<div class="folder-icon" role="button" onclick="getDir('back', undefined, event)"></div>`;

    let directoryNavbarHTML = `
    <div class="directory-navbar" id="directory-navbar">
      <div class="directory-path">${response.data.path.replaceAll("/", backButton)}</div>
      <p id="directory-path" class="hidden">${response.data.path}</p>
    </div>`;

    let responseHTML = response.data.directories
      .map(
        (folder) =>
          `<button class="directory-option" onclick="getDir('forward', '${folder}', event)">${folder}</button>`
      )
      .join("");

    directoriesList.innerHTML = responseHTML;
    directoryNavbar.innerHTML = directoryNavbarHTML;
  } catch (error) {
    console.error(error);
  }
}
getDir("forward", "/");

function handlePackChange(event) {
  let pack = event.target.value;
  let packImg = document.getElementById("pack-img");
  let img = `<img src="packs/${pack}.png"} alt="${pack}" class="pack-img"/>`;
  packImg.innerHTML = img;
}

async function createProject(event) {
  event.preventDefault();
  let directory = document.getElementById("directory-path").textContent;
  let projectName = document.getElementById("projectName").value;
  let pack = document.getElementById("pack").value;
  let responseEl = document.getElementById("response");
  let submitButton = document.getElementById("submit-button");
  try {
    submitButton.textContent = "Creating pack...";
    submitButton.disabled = true;
    const response = await axios.post("/", {
      directory,
      projectName,
      pack,
    });
    if (response.status === 200) {
      submitButton.textContent = "Success!";
    }
    responseEl.innerHTML = response.data;
  } catch (error) {
    submitButton.value = "Submit";
    submitButton.disabled = false;
    console.error(error);
    responseEl.innerHTML = error;
  }
}
