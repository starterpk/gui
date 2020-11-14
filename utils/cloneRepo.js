const { exec } = require("child_process");

async function cloneRepo(directory, projectName, pack, res) {
  switch (pack) {
    case "angular":
      return exec(
        `cd / && cd ${directory} && npx -p @angular/cli ng new ${projectName} --defaults=true`,
        (error, stdout, stderr) => res.send(execResponse(error, stdout, stderr))
      );
    case "react":
      return exec(
        `cd / && cd ${directory} && npx create-react-app ${projectName}`,
        (error, stdout, stderr) => res.send(execResponse(error, stdout, stderr))
      );
    case "react-next":
      return exec(
        `cd / && cd ${directory} && npx create-next-app ${projectName}`,
        (error, stdout, stderr) => res.send(execResponse(error, stdout, stderr))
      );
    case "react-express":
      return exec(
        `cd / && cd ${directory} && mkdir ${projectName} && cd ${projectName} && git init && git remote add origin https://github.com/starterpk/pack-react-express.git && git pull origin master && npm install`,
        (error, stdout, stderr) => res.send(execResponse(error, stdout, stderr))
      );
    case "react-typescript":
      return exec(
        `cd / && cd ${directory} && npx create-react-app ${projectName} --template typescript`,
        (error, stdout, stderr) => res.send(execResponse(error, stdout, stderr))
      );
    case "svelte":
      return exec(
        `cd / && cd ${directory} && npx degit 'sveltejs/template' ${projectName} && cd ${projectName} && npm install`,
        (error, stdout, stderr) => res.send(execResponse(error, stdout, stderr))
      );
    case "vue":
      return exec(
        `cd / && cd ${directory} && npx vue create ${projectName} -d`,
        (error, stdout, stderr) => res.send(execResponse(error, stdout, stderr))
      );
    case "vue-typescript":
      return exec(
        `cd / && cd ${directory} && npx vue create ${projectName} -d && cd ${projectName} && npx vue add typescript -d`,
        (error, stdout, stderr) => res.send(execResponse(error, stdout, stderr))
      );
    case "website":
      return exec(
        `cd / && cd ${directory} && mkdir ${projectName} && cd ${projectName} && git init && git remote add origin https://github.com/starterpk/pack-website.git && git pull origin master`,
        (error, stdout, stderr) => res.send(execResponse(error, stdout, stderr))
      );
    default:
      return "You didn't pick anything...";
  }
}

function execResponse(error, stdout, stderr) {
  if (error) {
    return "Your Starter Pack was unable to create your project. " + error.message;
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return "Your Starter Pack has been created. Have fun building stuff!";
  }
  console.log(`stdout: ${stdout}`);
  return "Your Starter Pack has been created. Have fun building stuff!";
}

module.exports = cloneRepo;
