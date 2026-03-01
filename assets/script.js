const searchForm = document.getElementById("searchForm")

searchForm.addEventListener("submit", function(e) {
    e.preventDefault();
    fetchData();
});

async function fetchData() {
    const username = document.getElementById("input").value.trim();
    const content = document.getElementById("content");
    const url = `https://api.github.com/users/${username}`;

    if(!username) {
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
        console.log(data)

        content.innerHTML = `
        <p>${data.login}</p>
        `;

    } catch (error) {
        console.error(error);
    }
}