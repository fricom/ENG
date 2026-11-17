(() => {
  const main = document.querySelector('.main-content');
  if (!main) return;

  // One viewport declaration, preserving pinch zoom and supporting display cutouts.
  const viewport = document.querySelector('meta[name="viewport"]');
  if (viewport) viewport.content = 'width=device-width, initial-scale=1, viewport-fit=cover';

  main.querySelectorAll('table').forEach((table) => {
    let wrapper = table.closest('.table-wrapper');
    if (!wrapper) {
      wrapper = document.createElement('div');
      wrapper.className = 'table-wrapper';
      table.before(wrapper);
      wrapper.append(table);
    }
    wrapper.tabIndex = 0;
    wrapper.setAttribute('role', 'region');
    const heading = [...main.querySelectorAll('h2, h3')].filter((h) => h.compareDocumentPosition(table) & Node.DOCUMENT_POSITION_FOLLOWING).pop();
    wrapper.setAttribute('aria-label', (heading ? heading.textContent.trim() + ' — ' : '') + '표, 좌우로 스크롤 가능');
    const hint = document.createElement('p');
    hint.className = 'table-scroll-hint';
    hint.textContent = '표가 잘리면 좌우로 밀어서 확인하세요.';
    wrapper.before(hint);
  });

  const days = [...main.querySelectorAll('h2')].filter((h) => /^Day\s+\d+/i.test(h.textContent.trim()));
  if (days.length) {
    const nav = document.createElement('nav');
    nav.className = 'reading-nav';
    nav.setAttribute('aria-label', '학습일 바로가기');
    const label = document.createElement('p');
    label.textContent = '오늘 공부할 날을 선택하세요';
    const links = document.createElement('div');
    links.className = 'reading-nav-links';
    days.forEach((heading) => {
      const a = document.createElement('a');
      a.href = '#' + heading.id;
      a.textContent = heading.textContent.trim().match(/^Day\s+\d+/i)[0];
      a.setAttribute('aria-label', heading.textContent.trim());
      links.append(a);
    });
    nav.append(label, links);
    const title = main.querySelector('h1');
    if (title) title.after(nav);
    days.forEach((heading) => {
      let next = heading.nextElementSibling;
      while (next && next.tagName !== 'H2') {
        if (next.tagName === 'H3' && /^\d{2}\./.test(next.textContent.trim())) {
          next.classList.add('sentence-heading');
          if (next.nextElementSibling?.tagName === 'UL') next.nextElementSibling.classList.add('sentence-notes');
        }
        next = next.nextElementSibling;
      }
    });
  }
  const footer = document.createElement('nav');
  footer.className = 'reading-footer';
  footer.setAttribute('aria-label', '본문 이동');
  const top = document.createElement('a');
  top.href = '#top';
  top.textContent = '맨 위로 돌아가기';
  footer.append(top);
  main.append(footer);
})();
