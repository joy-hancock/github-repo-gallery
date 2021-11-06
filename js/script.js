//Selection of div where profile info will appear.
const profileInfo = document.querySelector(".overview");

//GitHub username
const username = "joy-hancock";

//Unordered list to display repos.
const repoList = document.querySelector(".repo-list");

//Section where all repos info appears.
const myRepos = document.querySelector(".repos");

//Section where individual repo data appears.
const repoData = document.querySelector(".repo-data");

//Button to go back to repos after choosing single repo.  Remember--will need to remove hide, then add hide.
const galleryButton = document.querySelector(".view-repos");

//Placeholder for input for search filter. Will need to add and remove hide.
const filterInput = document.querySelector(".filter-repos");




//Fetch information from GitHub profile using API.
const userFetch = async function() {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();
    displayUser(data);

};
//Fetches user.
userFetch();

//Use results of Json call in function to find and display user bio.
const displayUser = function(data) {
    //Add element and class for element showing user info.
    const userInfo = document.createElement("div");
    userInfo.classList.add("user-info");
    userInfo.innerHTML = `<figure>
    <img alt="user avatar" src=${data.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
  </div>`;
;
//Add userInfo, i.e. lsit of elements/attributes to the overview class.
profileInfo.append(userInfo);
repoFetch();
};

//Get the repos from personal profile.
const repoFetch = async function() {
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await res.json();
    repoDisplay(repoData);
};

//Display containers with lists of individual repos.
const repoDisplay = function (repos) {
    filterInput.classList.remove("hide");
    for (const repo of repos) {
        //Create elements to store list of repos, and add HTML to index.
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
}
    
};

//Create what happens when you click on a repo name. H3 is the target that starts the action.
repoList.addEventListener("click", function(e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        singleRepo(repoName);
    }
    
});

const singleRepo = async function (repoName) {
    const res = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await res.json();
    console.log(repoInfo);
    //Get languages
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    console.log(languageData);
    //Make list of languages
    const languages = [];
    for (const language in languageData) {
    languages.push(language);
}
specificRepo(repoInfo, languages);
};

    


//Create place where individual data of repo is displayed.
const specificRepo = function (repoInfo, languages) {
    repoData.innerHTML = "";
    //Show the one repo.
    repoData.classList.remove("hide");
    //Hide the gallery
    myRepos.classList.add("hide");
    const about = document.createElement("div");
    about.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    repoData.append(about);
    galleryButton.classList.remove("hide");
    filterInput(e);
}

galleryButton.addEventListener("click", function () {
    //Show gallery again
    myRepos.classList.remove("hide");
    repoData.classList.add("hide");
    galleryButton.classList.add("hide");
});

filterInput.addEventListener("input", function(e) {
    const search = e.target.value;
    const repos = document.querySelectorAll(".repo");
    const searchText = search.toLowerCase();

    for (const repo of repos) {
    const repoLower = repo.innerText.toLowerCase();
        if (repoLower.includes(searchText)) {
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    }
});
   
