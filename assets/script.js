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

function toggleModal() {
  let modal = document.getElementById("modal");
  let modalText = document.getElementById("modal-text");
  let page = document.getElementById("outer-container");

  if (modal.dataset.visible === "false") {
    let directory = document.getElementById("directory-path").textContent;
    let projectName = document.getElementById("projectName").value;
    let pack = document.getElementById("pack").value;
    let textContent = `<h3>Do you wish to proceed with the following settings?</h3><br/><p>Pack: <strong>${pack}</strong></p><br/><p>Project Name: <strong>${projectName}</strong></p><br/><p>Location: <strong>${directory}</strong></p>`;
    modalText.innerHTML = textContent;
    modal.dataset.visible = "true";
    page.classList.add("body-overlay");
    modal.classList.remove("hidden");
  } else {
    modal.dataset.visible = "false";
    modal.classList.add("hidden");
    page.classList.remove("body-overlay");
    modalText.innerHTML = "";
  }
}

function disableAllInputs() {
  const inputs = document.querySelectorAll("input");
  const buttons = document.querySelectorAll("button");
  const selects = document.querySelectorAll("select");
  inputs.forEach((el) => (el.disabled = true));
  buttons.forEach((el) => (el.disabled = true));
  selects.forEach((el) => (el.disabled = true));
}

function enableAllInputs() {
  const inputs = document.querySelectorAll("input");
  const buttons = document.querySelectorAll("button");
  const selects = document.querySelectorAll("select");
  inputs.forEach((el) => (el.disabled = false));
  buttons.forEach((el) => (el.disabled = false));
  selects.forEach((el) => (el.disabled = false));
}

function handleCreateProject(event) {
  disableAllInputs();
  toggleModal();
  createProject(event);
}

async function createProject(event) {
  event.preventDefault();
  let directory = document.getElementById("directory-path").textContent;
  let projectName = document.getElementById("projectName").value;
  let pack = document.getElementById("pack").value;
  let responseEl = document.getElementById("response");
  let submitButton = document.getElementById("btn-submit");
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
    enableAllInputs();
  }
}
