
  // Cursor
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx - 3}px, ${my - 3}px)`;
  });

  (function lerpRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.transform = `translate(${rx - 14}px, ${ry - 14}px)`;
    requestAnimationFrame(lerpRing);
  })();

  document.querySelectorAll('a, button, .skill-card, .project-card, .referral-card, .stat-pill').forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.style.width = '52px'; ring.style.height = '52px';
      ring.style.borderColor = 'rgba(0,229,255,0.8)';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.width = '28px'; ring.style.height = '28px';
      ring.style.borderColor = 'rgba(0,229,255,0.5)';
    });
  });

  // Scroll reveal
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      document.querySelector(a.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Star rating
  let selectedRating = 0;
  const msgs = ['', '😕 Needs Improvement', '😐 Could Be Better', '🙂 Pretty Good!', '😊 Really Good!', '🔥 Absolutely Loved It!'];

  function rateStar(val) {
    selectedRating = val;
    document.querySelectorAll('.star-btn').forEach((b, i) => {
      b.classList.toggle('active', i < val);
      b.style.filter = i < val ? 'none' : 'grayscale(1)';
    });
    document.getElementById('ratingMsg').textContent = msgs[val];
  }

  // Toast
  function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
  }

  // Feedback submit
  function submitFeedback() {
    const name = document.getElementById('fb-name').value.trim();
    const msg = document.getElementById('fb-msg').value.trim();
    if (!name || !msg) { showToast('⚠️ Please fill in name and feedback!'); return; }
    showToast(`✅ Thanks ${name}! Feedback received.`);
    document.getElementById('fb-name').value = '';
    document.getElementById('fb-role').value = '';
    document.getElementById('fb-msg').value = '';
    selectedRating = 0;
    document.querySelectorAll('.star-btn').forEach(b => { b.classList.remove('active'); b.style.filter = 'grayscale(1)'; });
    document.getElementById('ratingMsg').textContent = '';
  }

  // Contact send
  function sendContact() {
    const name = document.getElementById('c-name').value.trim();
    const email = document.getElementById('c-email').value.trim();
    const msg = document.getElementById('c-msg').value.trim();
    if (!name || !email || !msg) { showToast('⚠️ Please fill in all required fields!'); return; }
    showToast(`✅ Message sent! I'll get back to you soon.`);
    document.getElementById('c-name').value = '';
    document.getElementById('c-company').value = '';
    document.getElementById('c-email').value = '';
    document.getElementById('c-msg').value = '';
  }