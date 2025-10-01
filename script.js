// Create animated particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Get icon SVG for link type
function getLinkIcon(type) {
    const icons = {
        'Website': '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>',
        'Web': '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>',
        'Live': '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>',
        'iOS': '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"></path></svg>',
        'Android': '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85a.637.637 0 00-.83.22l-1.88 3.24a11.43 11.43 0 00-8.94 0L5.65 5.67a.643.643 0 00-.87-.2c-.28.18-.37.54-.22.83L6.4 9.48A10.81 10.81 0 001 18h22a10.81 10.81 0 00-5.4-8.52zM7 15.25a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zm10 0a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5z"></path></svg>',
        'Mobile': '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>'
    };
    return icons[type] || icons['Website'];
}

// Generate links HTML for card header
function generateCardLinks(project) {
    if (!project.links || project.links.length === 0) return '';

    const validLinks = project.links.filter(link => link.url);
    if (validLinks.length === 0) return '';

    // Show only icons if more than one link
    const showIconOnly = validLinks.length > 1;

    return validLinks.map(link => {
        const type = link.type || 'Website';
        const className = type.toLowerCase();
        return `
            <a href="${link.url}" 
               target="_blank" 
               class="project-link-badge ${className} ${showIconOnly ? 'icon-only' : ''}"
               onclick="event.stopPropagation()"
               title="${type}">
                ${getLinkIcon(type)}
                ${showIconOnly ? '' : `<span>${type}</span>`}
            </a>
        `;
    }).join('');
}

// Load and display experiences
async function loadExperiences() {
    try {
        const response = await fetch('experiences.json');
        const data = await response.json();
        const timeline = document.getElementById('timeline');

        data.experiences.forEach((exp, index) => {
            const item = document.createElement('div');
            item.className = `timeline-item ${exp.isCurrent ? 'current' : ''}`;
            item.style.animationDelay = `${index * 0.1}s`;

            const achievements = exp.achievements.map(a => `<li>${a}</li>`).join('');
            const technologies = exp.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('');

            item.innerHTML = `
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <div class="company">
                        ${exp.company}
                        ${exp.isCurrent ? '<span class="current-badge">Current</span>' : ''}
                    </div>
                    <div class="role">${exp.role}</div>
                    <div class="period">${exp.period} • ${exp.location}</div>
                    <div class="description">${exp.description}</div>
                    <ul class="achievements">${achievements}</ul>
                    <div class="tech-tags">${technologies}</div>
                </div>
            `;

            timeline.appendChild(item);
        });
    } catch (error) {
        console.error('Error loading experiences:', error);
    }
}

// Load and display projects
async function loadProjects() {
    try {
        const response = await fetch('projects.json');
        const data = await response.json();
        const projectsGrid = document.getElementById('projects');

        data.projects.forEach((project, index) => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.style.animationDelay = `${index * 0.1}s`;
            card.onclick = () => openModal(project);

            const technologies = project.technologies.slice(0, 5).map(t =>
                `<span class="tech-tag">${t}</span>`
            ).join('');

            const cardLinks = generateCardLinks(project);

            card.innerHTML = `
                <div class="project-header">
                    <div class="project-title-section">
                        <div class="project-title">${project.title}</div>
                    </div>
                    <div class="project-links-header">
                        ${cardLinks}
                    </div>
                </div>
                <div class="project-description">${project.description}</div>
                <div class="tech-tags">${technologies}</div>
            `;

            projectsGrid.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

// Open modal with project details
function openModal(project) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');

    const technologies = project.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('');

    // Generate modal header links
    let modalHeaderLinks = '';
    if (project.links && project.links.length > 0) {
        const validLinks = project.links.filter(link => link.url);
        if (validLinks.length > 0) {
            modalHeaderLinks = `
                <div class="modal-header-links">
                    ${validLinks.map(link => {
                const type = link.type || 'Website';
                const className = type.toLowerCase();
                return `
                            <a href="${link.url}" target="_blank" class="modal-link-badge ${className}">
                                ${getLinkIcon(type)}
                                <span>${link.label || type}</span>
                            </a>
                        `;
            }).join('')}
                </div>
            `;
        }
    }

    let detailsHTML = '';
    if (project.details) {
        for (const [key, value] of Object.entries(project.details)) {
            detailsHTML += `
                <div class="modal-section">
                    <h3>${key.charAt(0).toUpperCase() + key.slice(1)}</h3>
                    <p>${value}</p>
                </div>
            `;
        }
    }

    modalBody.innerHTML = `
        <h2 class="modal-title">${project.title}</h2>
        ${modalHeaderLinks}
        <div class="modal-section">
            <p>${project.description}</p>
        </div>
        ${detailsHTML}
        <div class="modal-section">
            <h3>Technologies</h3>
            <div class="tech-tags">${technologies}</div>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal on background click
document.getElementById('modal').addEventListener('click', (e) => {
    if (e.target.id === 'modal') {
        closeModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// CV Modal Functions
function openCVModal() {
    const modal = document.getElementById('cv-modal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCVModal() {
    const modal = document.getElementById('cv-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close CV modal when clicking outside
document.addEventListener('click', function (event) {
    const modal = document.getElementById('cv-modal');
    if (event.target === modal) {
        closeCVModal();
    }
});

// Close CV modal with Escape key
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closeCVModal();
    }
});

// Initialize
createParticles();
loadExperiences();
loadProjects();
