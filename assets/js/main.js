/* Build a Table‑of‑Contents and enable smooth scrolling */
document.addEventListener('DOMContentLoaded', () => {
    const content = document.querySelector('.post-content');
    const toc     = document.getElementById('toc');

    if (!content || !toc) return;

    const headings = content.querySelectorAll('h1, h2, h3');
    if (headings.length === 0) return;

    const ul = document.createElement('ul');

    headings.forEach(h => {
        // slugify heading text -> id
        const id = h.id || h.textContent.trim()
            .toLowerCase().replace(/[^\w]+/g,'-').replace(/^-+|-+$/g,'');
        h.id = id;

        const li = document.createElement('li');
        li.style.marginLeft = (h.tagName === 'H2' ? '0.75rem' : h.tagName === 'H3' ? '1.5rem' : '0');

        const a = document.createElement('a');
        a.href = '#'+id;
        a.textContent = h.textContent;

        li.appendChild(a);
        ul.appendChild(li);
    });

    toc.appendChild(ul);

    // smooth‑scroll
    toc.addEventListener('click', e => {
        if (e.target.tagName === 'A') {
            e.preventDefault();
            document.querySelector(e.target.getAttribute('href'))
                .scrollIntoView({behavior:'smooth'});
            history.pushState(null,'',e.target.getAttribute('href'));
        }
    });
});
