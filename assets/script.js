const searchForm = document.getElementById("searchForm")

searchForm.addEventListener("submit", function(e) {
    e.preventDefault();
    fetchData();
});

async function fetchData() {
    const username = document.getElementById("input").value.trim();
    const profileCard = document.getElementById("profileCard");
    const gitStats = document.getElementById("gitStats");
    const url = `https://api.github.com/users/${username}`;


    if(!username) {
        profileCard.innerHTML = "";
        gitStats.innerHTML = "";
        return;
    }

    input.value = "";

    try {
        const response = await fetch(url, {
            headers: {
                "Accept": "application/vnd.github+json",
                "Authorization": `Bearer ${token.GITHUB_TOKEN}`,
                "User-Agent": "GITUSERFINDER"
            }
        })

        if(!response.ok) {
            throw new Error("Could Not Find User")
        }

        const data = await response.json();

        profileCard.innerHTML = `
            <img src="${data.avatar_url}" alt="${data.login}" id="pfp">
            <h2>${data.login}</h2>
            <h3>${data.name}</h3>
            <p>${data.bio}</p>
            <p>${data.location}</p>
        `;

        gitStats.innerHTML = `
            <p> Followers: ${data.followers}</p>
            <p> Following: ${data.following}</p>
            <p> Repos: ${data.public_repos}</p>
        `;

    } catch (error) {
        profileCard.innerHTML = "";
        gitStats.innerHTML = "";
        console.error(error);
    }
}