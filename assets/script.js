async function getDir(event, path, direction) {
  event.preventDefault();
  try {
    const response = await axios.post("/dir", {
      path,
      direction,
    });
    let div = document.getElementById("dir");
    let directory = document.getElementById("directory");
    let responseHTML = response.data.directories
      .map((folder) => `<button onclick="getDir(event, '${folder}')">${folder}</button>`)
      .join("");
    console.log(response);
    div.innerHTML = responseHTML;
    directory.value = response.data.path;
  } catch (error) {
    console.error(error);
  }
}

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
