//Selection of div where profile info will appear.
const profileInfo = document.querySelector(".overview");

//GitHub username
const username = "joy-hancock";

//Unordered list to display repos.
const repoList = document.querySelector(".repo-list");



const userFetch = async function() {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const user = await res.json();
    
    console.log(user);
    userProperties(user);

};

userFetch();


const userProperties = function (username) {
    const avatar_url = username.avatar_url;
    const name = username.name;
    const bio = username.bio;
    const location = username.location;
    const public_repos = username.public_repos;
    const div = document.createElement("div");
    div.classList.add("user-info");
    
    div.innerHTML = `<figure>
    <img alt="user avatar" src=${avatar_url} />
  </figure>

  <div>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Bio:</strong> ${bio}</p>
    <p><strong>Location:</strong> ${location}</p>
    <p><strong>Number of public repos:</strong> ${public_repos}</p>
  </div>`;
    
  profileInfo.append(div);
  repoFetch();
  
};

const repoFetch = async function () {
    const fetchRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoGallery = await fetchRepos.json();
    repoInfo(repoGallery);
};

const repoInfo = function (repos) {
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</>`;
        repoList.append(repoItem);
    }
}


