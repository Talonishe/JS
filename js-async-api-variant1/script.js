// ======================================
// BASE URL
// ======================================

const BASE_URL =
    "https://api.github.com/users";

// ======================================
// UI
// ======================================

const profileDiv =
    document.getElementById("profile");

const reposDiv =
    document.getElementById("repos");

const detailsDiv =
    document.getElementById("repoDetails");

const loadingDiv =
    document.getElementById("loading");

const errorDiv =
    document.getElementById("error");

const sortSelect =
    document.getElementById("sortSelect");

// ======================================
// STATE
// ======================================

let currentRepos = [];
let currentUsername = "";

// ======================================
// LOADING
// ======================================

function showLoading() {
    loadingDiv.style.display = "block";
}

function hideLoading() {
    loadingDiv.style.display = "none";
}

// ======================================
// ERROR
// ======================================

function showError(message) {
    errorDiv.textContent = message;
}

function clearError() {
    errorDiv.textContent = "";
}

// ======================================
// FETCH JSON
// ======================================

async function fetchJSON(url) {

    const response =
        await fetch(url);

    // Rate limit
    if (response.status === 403) {

        throw new Error(
            "GitHub API rate limit exceeded"
        );

    }

    // User not found
    if (response.status === 404) {

        throw new Error(
            "Користувача не знайдено"
        );

    }

    if (!response.ok) {

        throw new Error(
            "Помилка API"
        );

    }

    return await response.json();

}

// ======================================
// LOAD USER + REPOS
// ======================================

async function loadUser(username) {

    showLoading();

    clearError();

    profileDiv.innerHTML = "";
    reposDiv.innerHTML = "";
    detailsDiv.innerHTML = "";

    try {

        currentUsername = username;

        // Паралельне завантаження
        const [
            userData,
            reposData
        ] = await Promise.all([

            fetchJSON(
                `${BASE_URL}/${username}`
            ),

            fetchJSON(
                `${BASE_URL}/${username}/repos`
            )

        ]);

        currentRepos = reposData;

        renderProfile(userData);

        sortRepos();

    }

    catch(error) {

        showError(error.message);

    }

    finally {

        hideLoading();

    }

}

// ======================================
// PROFILE UI
// ======================================

function renderProfile(user) {

    profileDiv.innerHTML = `

<div class="card">

    <img src="${user.avatar_url}">

    <h2>
        ${user.name || "No name"}
    </h2>

    <p>
        ${user.bio || "No bio"}
    </p>

    <p>
        Followers:
        ${user.followers}
    </p>

    <p>
        Following:
        ${user.following}
    </p>

    <p>
        Public repos:
        ${user.public_repos}
    </p>

</div>

`;

}

// ======================================
// SORT REPOS
// ======================================

function sortRepos() {

    const type =
        sortSelect.value;

    const repos =
        [...currentRepos];

    if (type === "stars") {

        repos.sort((a, b) =>
            b.stargazers_count -
            a.stargazers_count
        );

    }

    else if (
        type === "forks"
    ) {

        repos.sort((a, b) =>
            b.forks_count -
            a.forks_count
        );

    }

    else {

        repos.sort((a, b) =>
            new Date(b.updated_at) -
            new Date(a.updated_at)
        );

    }

    renderRepos(repos);

}

// ======================================
// REPOS UI
// ======================================

function renderRepos(repos) {

    reposDiv.innerHTML =
        `<div class="grid">`;

    repos.forEach(repo => {

        reposDiv.innerHTML += `

<div
    class="repo-card"
    onclick="loadRepoDetails(
        '${repo.name}'
    )"
>

    <h3>${repo.name}</h3>

    <p>
        ⭐ ${repo.stargazers_count}
    </p>

    <p>
        Forks:
        ${repo.forks_count}
    </p>

    <p>
        Updated:
        ${repo.updated_at
            .split("T")[0]}
    </p>

</div>

`;

    });

    reposDiv.innerHTML += `</div>`;

}

// ======================================
// REPO DETAILS
// ======================================

async function loadRepoDetails(repo) {

    showLoading();

    clearError();

    try {

        // паралельне завантаження
        const [
            repoData,
            contributors,
            languages,
            readme
        ] = await Promise.all([

            fetchJSON(
`https://api.github.com/repos/${currentUsername}/${repo}`
            ),

            fetchJSON(
`https://api.github.com/repos/${currentUsername}/${repo}/contributors`
            ),

            fetchJSON(
`https://api.github.com/repos/${currentUsername}/${repo}/languages`
            ),

            fetch(
`https://api.github.com/repos/${currentUsername}/${repo}/readme`,
{
    headers: {
        Accept:
"application/vnd.github.raw+json"
    }
}
)
            .then(response => {

                if (!response.ok) {
                    return "README not found";
                }

                return response.text();

            })

        ]);

        renderRepoDetails(
            repoData,
            contributors,
            languages,
            readme
        );

    }

    catch(error) {

        showError(error.message);

    }

    finally {

        hideLoading();

    }

}

// ======================================
// REPO DETAILS UI
// ======================================

function renderRepoDetails(
    repo,
    contributors,
    languages,
    readme
) {

    // languages object -> array
    const languageList =
        Object.keys(languages);

    detailsDiv.innerHTML = `

<div class="card">

    <h2>${repo.name}</h2>

    <p>
        ${repo.description || "No description"}
    </p>

    <p>
        ⭐ Stars:
        ${repo.stargazers_count}
    </p>

    <p>
        Forks:
        ${repo.forks_count}
    </p>

    <p>
        Updated:
        ${repo.updated_at.split("T")[0]}
    </p>

    <hr>

    <h3>Languages</h3>

    <ul>

        ${
            languageList.length > 0

            ? languageList
                .map(lang =>
                    `<li>${lang}</li>`
                )
                .join("")

            : "<li>No languages</li>"
        }

    </ul>

    <hr>

    <h3>Top Contributors</h3>

    <ul>

        ${
            contributors
            .slice(0, 5)
            .map(user => `
                <li>
                    ${user.login}
                    (${user.contributions} commits)
                </li>
            `)
            .join("")
        }

    </ul>

    <hr>

    <h3>README</h3>

    <pre
style="
background:#111;
color:#00ff88;
padding:15px;
overflow:auto;
max-height:300px;
"
>
${readme.substring(0, 3000)}
    </pre>

    <a
        href="${repo.html_url}"
        target="_blank"
    >
        Open Repository
    </a>

</div>

`;

}

// ======================================
// EVENTS
// ======================================

document
.getElementById("searchBtn")
.addEventListener("click", () => {

    const username =
        document
        .getElementById(
            "usernameInput"
        )
        .value
        .trim();

    if (username) {

        loadUser(username);

    }

});

sortSelect
.addEventListener(
    "change",
    sortRepos
);

// ======================================
// DEFAULT USER
// ======================================

loadUser("Talonishe");