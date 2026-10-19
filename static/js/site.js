const filters = document.querySelectorAll('[data-filter]');
const projects = document.querySelectorAll('[data-category]');
filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(filter => {
    const active = filter === button;
    filter.classList.toggle('selected', active);
    filter.setAttribute('aria-pressed', String(active));
  });
  let count = 0;
  projects.forEach(project => {
    project.hidden = button.dataset.filter !== 'All' && project.dataset.category !== button.dataset.filter;
    if (!project.hidden) count++;
  });
  document.querySelector('#project-count').textContent = `${count} ${count === 1 ? 'project' : 'projects'}`;
}));

// Documentation URLs are managed in each GitHub repository's About → Website.
(async function loadDocumentation() {
  const targets = document.querySelectorAll('[data-repo-docs]');
  const cacheKey = 'asv-repository-websites-v1';
  const maxAge = 15 * 60 * 1000;
  function showLinks(repositories) {
    const urls = new Map(repositories.map(repo => [repo.name, repo.homepage]));
    targets.forEach(target => {
      const homepage = urls.get(target.dataset.repoDocs);
      if (typeof homepage !== 'string' || !homepage.trim()) return;
      let url;
      try { url = new URL(homepage); } catch { return; }
      if (url.protocol !== 'https:' && url.protocol !== 'http:') return;
      const link = document.createElement('a');
      link.href = url.href;
      link.textContent = 'Documentation ↗';
      target.replaceChildren(link);
    });
  }
  try {
    const cached = JSON.parse(sessionStorage.getItem(cacheKey));
    if (cached && Array.isArray(cached.repositories) && Date.now() - cached.time < maxAge) {
      showLinks(cached.repositories);
      return;
    }
  } catch { /* Storage is optional. */ }
  try {
    const repositories = [];
    for (let page = 1; ; page++) {
      const response = await fetch(`https://api.github.com/orgs/asv-soft/repos?per_page=100&type=public&page=${page}`, {
        headers: { Accept: 'application/vnd.github+json' },
        signal: AbortSignal.timeout(8000),
      });
      if (!response.ok) return;
      const batch = await response.json();
      if (!Array.isArray(batch)) return;
      repositories.push(...batch.map(({ name, homepage }) => ({ name, homepage })));
      if (batch.length < 100) break;
    }
    showLinks(repositories);
    try { sessionStorage.setItem(cacheKey, JSON.stringify({ time: Date.now(), repositories })); } catch { /* Storage is optional. */ }
  } catch { /* Source links remain usable if GitHub is unavailable. */ }
})();
