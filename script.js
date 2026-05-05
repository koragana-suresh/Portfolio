// Load main data
fetch('data.json')
.then(res => res.json())
.then(data => {

    // Header
    document.getElementById('name').innerText = data.about.name;
    document.getElementById('role').innerText = data.about.role;

    const emailEl = document.getElementById('email');
    emailEl.href = `mailto:${data.about.email}`;
    emailEl.innerText = data.about.email;

    // ===== SKILLS =====
    const skillsContainer = document.getElementById('skills-list');

    for (const [category, skills] of Object.entries(data.skills)) {
        const div = document.createElement('div');

        div.innerHTML = `
            <h3>${category.replace("_", " ").toUpperCase()}</h3>
            <ul>
                ${skills.map(s => `<li>${s}</li>`).join("")}
            </ul>
        `;

        skillsContainer.appendChild(div);
    }

    // ===== EXPERIENCE =====
    const expContainer = document.getElementById('experience-list');

    data.experience.forEach(exp => {
        const div = document.createElement('div');
        div.classList.add('card');

        div.innerHTML = `
            <h3>${exp.role} - ${exp.company}</h3>
            <p>${exp.duration}</p>
            <ul>
                ${exp.details.map(d => `<li>${d}</li>`).join("")}
            </ul>
        `;

        expContainer.appendChild(div);
    });

    // ===== SOCIALS =====
    const socialContainer = document.getElementById('socials-list');

    for (const [platform, link] of Object.entries(data.socials)) {
        const li = document.createElement('li');
        li.innerHTML = `<a href="${link}" target="_blank">${platform}</a>`;
        socialContainer.appendChild(li);
    }

});


// ===== GITHUB PROJECTS =====
const GITHUB_USERNAME = "koragana-suresh";

fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`)
.then(res => res.json())
.then(repos => {
    const container = document.getElementById('projects-list');

    repos
    .filter(r => !r.fork)
    .slice(0,5)
    .forEach(repo => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${repo.name}</strong><br>
            ${repo.description || ""}
            <br><a href="${repo.html_url}" target="_blank">View</a>
        `;
        container.appendChild(li);
    });
});
