fetch('data.json')
.then(res => res.json())
.then(data => {

  // Header
  document.getElementById("name").innerText = data.about.name;
  document.getElementById("role").innerText = data.about.role;
  document.getElementById("summary").innerText = data.about.summary;

  const email = document.getElementById("email");
  email.href = `mailto:${data.about.email}`;
  email.innerText = data.about.email;

  // Skills
  const skillsDiv = document.getElementById("skills-list");

  Object.values(data.skills).flat().forEach(skill => {
    const span = document.createElement("span");
    span.textContent = skill;
    skillsDiv.appendChild(span);
  });

  // Experience
  const expDiv = document.getElementById("experience-list");

  data.experience.forEach(exp => {
    const div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `
      <h3>${exp.role} - ${exp.company}</h3>
      <p>${exp.duration}</p>
      <ul>
        ${exp.details.map(d => `<li>${d}</li>`).join("")}
      </ul>
    `;

    expDiv.appendChild(div);
  });

  // Projects
  const projDiv = document.getElementById("projects-list");

  data.projects.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("project-card");

    div.innerHTML = `
      <h3>${p.name}</h3>
      <p>${p.description}</p>
      <ul>
        ${p.highlights.map(h => `<li>${h}</li>`).join("")}
      </ul>
      <a href="${p.link}" target="_blank">View Project →</a>
    `;

    projDiv.appendChild(div);
  });

  // Education
  const eduDiv = document.getElementById("education-list");

  data.education.forEach(e => {
    const div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `
      <h3>${e.degree}</h3>
      <p>${e.institute}</p>
      <p>${e.year}</p>
      <p>${e.grade}</p>
    `;

    eduDiv.appendChild(div);
  });

  // Socials
  const socialDiv = document.getElementById("socials-list");

  for (const [k, v] of Object.entries(data.socials)) {
    const a = document.createElement("a");
    a.href = v;
    a.target = "_blank";
    a.innerText = k + " ";
    socialDiv.appendChild(a);
  }

});
