/* ===== JANSETU AI - SHARED JS ===== */

// ===== WARNING SYSTEM CONSTANTS =====
const WARNING_THRESHOLD_FLAG = 3;
const WARNING_THRESHOLD_SUSPEND = 5;

// Civic issue keywords for Vision AI validation
const CIVIC_KEYWORDS = [
  'pothole', 'road', 'asphalt', 'pavement', 'street', 'highway', 'sidewalk', 'curb',
  'garbage', 'trash', 'waste', 'litter', 'rubbish', 'debris', 'dump', 'landfill',
  'water', 'flood', 'leak', 'pipe', 'drainage', 'sewage', 'puddle', 'waterlogged',
  'light', 'streetlight', 'lamp', 'pole', 'electrical', 'wire', 'cable',
  'graffiti', 'vandalism', 'wall', 'spray paint',
  'crack', 'broken', 'damaged', 'deterioration', 'crumbling', 'construction',
  'infrastructure', 'building', 'public', 'urban', 'city', 'municipal',
  'manhole', 'gutter', 'drain', 'concrete', 'brick', 'mud', 'soil'
];

const CIVIC_CATEGORIES_MAP = {
  pothole: ['pothole', 'asphalt', 'road surface', 'pavement crack', 'hole'],
  garbage: ['garbage', 'trash', 'waste', 'litter', 'rubbish', 'dump', 'debris', 'landfill'],
  streetlight: ['light', 'streetlight', 'lamp post', 'street light', 'lighting'],
  water: ['water', 'flood', 'leak', 'pipe', 'puddle', 'waterlog', 'sewage', 'drain'],
  road: ['road', 'highway', 'street', 'pavement', 'crack', 'damaged road', 'construction'],
  dumping: ['illegal dump', 'debris', 'construction waste', 'dumping'],
  graffiti: ['graffiti', 'vandalism', 'spray paint', 'tag']
};

// ===== SHARED DATA STORE =====
const CivicStore = {
  pendingReviews: parseInt(localStorage.getItem('pendingReviews') || '5'),
  trainingData: parseInt(localStorage.getItem('trainingData') || '23'),
  totalReports: parseInt(localStorage.getItem('totalReports') || '12847'),
  resolvedIssues: parseInt(localStorage.getItem('resolvedIssues') || '9432'),
  activeUsers: parseInt(localStorage.getItem('activeUsers') || '34219'),
  citizenPoints: parseInt(localStorage.getItem('citizenPoints') || '1250'),
  trustScore: parseInt(localStorage.getItem('trustScore') || '92'),
  myReports: JSON.parse(localStorage.getItem('myReports') || '[]'),
  warnings: JSON.parse(localStorage.getItem('civicWarnings') || '{}'),
  suspensions: JSON.parse(localStorage.getItem('civicSuspensions') || '{}'),
  appeals: JSON.parse(localStorage.getItem('civicAppeals') || '[]'),

  save() {
    localStorage.setItem('pendingReviews', this.pendingReviews);
    localStorage.setItem('trainingData', this.trainingData);
    localStorage.setItem('totalReports', this.totalReports);
    localStorage.setItem('resolvedIssues', this.resolvedIssues);
    localStorage.setItem('activeUsers', this.activeUsers);
    localStorage.setItem('citizenPoints', this.citizenPoints);
    localStorage.setItem('trustScore', this.trustScore);
    localStorage.setItem('myReports', JSON.stringify(this.myReports));
    localStorage.setItem('civicWarnings', JSON.stringify(this.warnings));
    localStorage.setItem('civicSuspensions', JSON.stringify(this.suspensions));
    localStorage.setItem('civicAppeals', JSON.stringify(this.appeals));
  },

  addReport(report) {
    this.myReports.unshift(report);
    this.totalReports++;
    this.save();
  },

  addPendingReview() { this.pendingReviews++; this.save(); },
  resolveReview() {
    if (this.pendingReviews > 0) this.pendingReviews--;
    this.trainingData++;
    this.save();
  },

  getWarnings(username) {
    return this.warnings[username] || { count: 0, history: [], flagged: false };
  },

  issueWarning(username, reason, type) {
    if (!this.warnings[username]) {
      this.warnings[username] = { count: 0, history: [], flagged: false };
    }
    const w = this.warnings[username];
    w.count++;
    w.history.unshift({ id: Date.now(), reason, type: type || 'wrong_image', date: new Date().toISOString(), count: w.count });
    if (w.count >= WARNING_THRESHOLD_FLAG) w.flagged = true;
    if (w.count >= WARNING_THRESHOLD_SUSPEND) {
      this.suspendUser(username, 'Automatic: Exceeded false report threshold (5)');
    }
    this.save();
    return w;
  },

  suspendUser(username, reason) {
    this.suspensions[username] = { suspended: true, reason, date: new Date().toISOString(), appealSubmitted: false };
    this.trustScore = Math.max(0, this.trustScore - 20);
    this.save();
  },

  restoreUser(username) {
    if (this.suspensions[username]) this.suspensions[username].suspended = false;
    if (this.warnings[username]) this.warnings[username].flagged = false;
    this.save();
  },

  isSuspended(username) {
    return !!(this.suspensions[username] && this.suspensions[username].suspended);
  },

  submitAppeal(username, reason) {
    const appeal = { id: Date.now(), username, reason, date: new Date().toISOString(), status: 'pending' };
    this.appeals.unshift(appeal);
    if (this.suspensions[username]) this.suspensions[username].appealSubmitted = true;
    this.save();
    return appeal;
  }
};

// ===== SESSION =====
const Session = {
  get() { return JSON.parse(localStorage.getItem('civicSession') || 'null'); },
  set(user) { localStorage.setItem('civicSession', JSON.stringify(user)); },
  clear() { localStorage.removeItem('civicSession'); },
  isLoggedIn() { return this.get() !== null; },
  getRole() { const s = this.get(); return s ? s.role : null; }
};

// ===== USERS & DEMO WARNING STATES =====
const USERS = {
  citizen_demo:   { password: 'demo123', role: 'citizen', name: 'Alex Rivera', city: 'Mumbai' },
  admin_demo:     { password: 'demo123', role: 'admin', name: 'Priya Sharma', city: 'Mumbai' },
  dev_demo:       { password: 'demo123', role: 'developer', name: 'Rahul Verma', city: 'System' },
  warned_user:    { password: 'demo123', role: 'citizen', name: 'Raj Patel', city: 'Bangalore' },
  flagged_user:   { password: 'demo123', role: 'citizen', name: 'Meera Singh', city: 'Delhi' },
  suspended_user: { password: 'demo123', role: 'citizen', name: 'Suresh Kumar', city: 'Chennai' }
};

function initDemoWarningStates() {
  if (!CivicStore.warnings['warned_user']) {
    CivicStore.warnings['warned_user'] = {
      count: 1, flagged: false,
      history: [{ id: Date.now() - 86400000, reason: 'Uploaded image not recognized as a civic issue (selfie photo detected)', type: 'wrong_image', date: new Date(Date.now() - 86400000).toISOString(), count: 1 }]
    };
  }
  if (!CivicStore.warnings['flagged_user']) {
    CivicStore.warnings['flagged_user'] = {
      count: 3, flagged: true,
      history: [
        { id: Date.now() - 7200000, reason: 'Inappropriate content detected in uploaded image', type: 'inappropriate', date: new Date(Date.now() - 7200000).toISOString(), count: 3 },
        { id: Date.now() - 172800000, reason: 'Uploaded image showed a food item, not a civic issue', type: 'wrong_image', date: new Date(Date.now() - 172800000).toISOString(), count: 2 },
        { id: Date.now() - 259200000, reason: 'Uploaded image showed a person, not a civic issue', type: 'wrong_image', date: new Date(Date.now() - 259200000).toISOString(), count: 1 }
      ]
    };
  }
  if (!CivicStore.warnings['suspended_user']) {
    CivicStore.warnings['suspended_user'] = {
      count: 5, flagged: true,
      history: [
        { id: Date.now() - 3600000, reason: 'Deliberately submitted false reports repeatedly', type: 'false_report', date: new Date(Date.now() - 3600000).toISOString(), count: 5 },
        { id: Date.now() - 86400000, reason: 'Uploaded image showed a car interior, not a civic issue', type: 'wrong_image', date: new Date(Date.now() - 86400000).toISOString(), count: 4 },
        { id: Date.now() - 172800000, reason: 'Inappropriate content detected in uploaded image', type: 'inappropriate', date: new Date(Date.now() - 172800000).toISOString(), count: 3 },
        { id: Date.now() - 259200000, reason: 'Uploaded image showed a pet animal, not a civic issue', type: 'wrong_image', date: new Date(Date.now() - 259200000).toISOString(), count: 2 },
        { id: Date.now() - 345600000, reason: 'Uploaded image was a screenshot, not a real civic issue photo', type: 'wrong_image', date: new Date(Date.now() - 345600000).toISOString(), count: 1 }
      ]
    };
  }
  if (!CivicStore.suspensions['suspended_user']) {
    CivicStore.suspensions['suspended_user'] = { suspended: true, reason: 'Automatic: Exceeded false report threshold (5)', date: new Date(Date.now() - 3600000).toISOString(), appealSubmitted: false };
  }

  // --- HACKATHON JURY DEMO DATA FOR RAJKOT ---
  if (!CivicStore.myReports || CivicStore.myReports.length < 5) {
    const statuses = ['unresolved', 'in_process', 'resolved', 'pending_review'];
    const categories = ['pothole', 'garbage', 'streetlight', 'water', 'road', 'dumping', 'graffiti'];
    
    // Real coordinates of major public areas/junctions in Rajkot to cluster around
    const rajkotLocations = [
      { lat: 22.3050, lng: 70.8030, name: 'Jubilee Garden Area' },
      { lat: 22.2890, lng: 70.7890, name: 'Kalawad Road' },
      { lat: 22.2965, lng: 70.7965, name: 'Yagnik Road' },
      { lat: 22.3160, lng: 70.8050, name: 'Race Course Ring Road' },
      { lat: 22.3000, lng: 70.7710, name: '150 Feet Ring Road' },
      { lat: 22.2810, lng: 70.8060, name: 'Bhakti Nagar' },
      { lat: 22.2740, lng: 70.8250, name: 'Aji Dam Area' },
      { lat: 22.3300, lng: 70.7780, name: 'Madhapar Chowk' }
    ];
    
    const fakeData = Array.from({ length: 45 }).map((_, i) => {
      const isCritical = Math.random() > 0.8;
      const cat = categories[Math.floor(Math.random() * categories.length)];
      const loc = rajkotLocations[Math.floor(Math.random() * rajkotLocations.length)];
      
      // Add a slight random noise (approx 0 to 1.5km spread) around the selected real location cluster
      const jitterLat = (Math.random() - 0.5) * 0.012; 
      const jitterLng = (Math.random() - 0.5) * 0.012;
      
      return {
        id: 'DEMO-' + Date.now() + '-' + i,
        category: cat,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        severity: isCritical ? (4 + Math.floor(Math.random()*2)) : (1 + Math.floor(Math.random()*3)), // 1-5
        lat: (loc.lat + jitterLat).toFixed(6),
        lng: (loc.lng + jitterLng).toFixed(6),
        description: `Demo report for ${cat} observed near ${loc.name}. Auto-generated for presentation.`,
        location: loc.name + ' Vicinity',
        citizenId: 'citizen_demo',
        timestamp: new Date(Date.now() - Math.floor(Math.random() * 86400000 * 7)).toISOString(), // Last 7 days
        imageUrl: null
      };
    });
    
    // Add some specific high priority ones
    fakeData.push({
      id: 'CRIT-1', category: 'water', status: 'unresolved', severity: 5,
      lat: '22.305000', lng: '70.803000', description: 'Massive waterlogging near Jubilee Garden. Traffic blocked.',
      location: 'Jubilee Garden', citizenId: 'citizen_demo', timestamp: new Date().toISOString()
    });
    fakeData.push({
      id: 'CRIT-2', category: 'pothole', status: 'in_process', severity: 4,
      lat: '22.290000', lng: '70.790000', description: 'Deep crater on Kalawad Road causing accidents.',
      location: 'Kalawad Road', citizenId: 'dev_demo', timestamp: new Date(Date.now() - 3600000).toISOString()
    });
    
    CivicStore.myReports = fakeData;
  }

  CivicStore.save();
}

function login(username, password) {
  const user = USERS[username];
  if (user && user.password === password) {
    if (CivicStore.isSuspended(username)) {
      return { success: false, suspended: true, username };
    }
    Session.set({ username, ...user });
    return { success: true, role: user.role };
  }
  return { success: false };
}

function logout() {
  Session.clear();
  window.location.href = '/';
}

// ===== GOOGLE VISION AI =====
async function analyzeImageWithVisionAPI(imageBase64) {
  try {
    const response = await fetch('/api/vision/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageBase64 })
    });
    const data = await response.json();
    if (data.simulated) return simulateVisionResult();
    return processVisionResults(data);
  } catch (err) {
    return simulateVisionResult();
  }
}

function processVisionResults(data) {
  if (!data.responses || !data.responses[0]) {
    return { success: false, error: true, reason: 'No response from Vision API', confidence: 0 };
  }
  const response = data.responses[0];

  // Safe search — inappropriate = immediate warning
  const ss = response.safeSearchAnnotation;
  if (ss && (['LIKELY', 'VERY_LIKELY'].includes(ss.adult) || ['LIKELY', 'VERY_LIKELY'].includes(ss.violence))) {
    return { success: false, inappropriate: true, reason: 'Inappropriate content detected in your image. This has been logged.', confidence: 0, labels: [] };
  }

  const labels = response.labelAnnotations || [];
  let matchedCategory = null;
  let highestConfidence = 0;

  for (const [category, keywords] of Object.entries(CIVIC_CATEGORIES_MAP)) {
    for (const label of labels) {
      const desc = label.description.toLowerCase();
      if (keywords.some(kw => desc.includes(kw) || kw.includes(desc))) {
        if (label.score > highestConfidence) {
          highestConfidence = label.score;
          matchedCategory = category;
        }
      }
    }
  }

  let civicScore = 0;
  for (const label of labels) {
    const desc = label.description.toLowerCase();
    if (CIVIC_KEYWORDS.some(kw => desc.includes(kw) || kw.includes(desc))) civicScore += label.score;
  }

  const confidencePct = Math.round(highestConfidence * 100);
  const civicScorePct = Math.min(100, Math.round(civicScore * 60));
  const categoryNames = { pothole: 'Pothole', garbage: 'Garbage / Waste', streetlight: 'Broken Streetlight', water: 'Water Leakage / Flooding', road: 'Road Damage', dumping: 'Illegal Dumping', graffiti: 'Graffiti / Vandalism' };

  if (matchedCategory && confidencePct >= 60) {
    return { success: true, category: categoryNames[matchedCategory] || matchedCategory, confidence: Math.max(confidencePct, 75), labels: labels.slice(0, 5).map(l => l.description) };
  } else if (civicScorePct >= 40) {
    return { success: false, lowConfidence: true, reason: 'AI confidence below 80%. Sent for manual admin review.', confidence: civicScorePct, labels: labels.slice(0, 5).map(l => l.description.toLowerCase()) };
  } else {
    const topLabels = labels.slice(0, 3).map(l => l.description).join(', ') || 'unrecognized content';
    return { success: false, notCivic: true, reason: `Your image does not appear to show a civic issue. AI detected: ${topLabels}.`, confidence: confidencePct, detectedAs: topLabels };
  }
}

function simulateVisionResult() {
  const rand = Math.random();
  if (rand < 0.65) {
    const cats = ['Pothole', 'Garbage / Waste', 'Broken Streetlight', 'Water Leakage / Flooding', 'Road Damage', 'Illegal Dumping'];
    return { success: true, category: cats[Math.floor(Math.random() * cats.length)], confidence: Math.floor(Math.random() * 15) + 82, labels: ['road', 'pavement', 'asphalt', 'outdoor', 'damage'], simulated: true };
  } else if (rand < 0.85) {
    return { success: false, lowConfidence: true, reason: 'AI confidence below 80%. Sent for manual admin review.', confidence: Math.floor(Math.random() * 20) + 55, labels: ['outdoor', 'ground', 'surface'], simulated: true };
  } else {
    const nonCivic = ['a food item', 'a person', 'an animal', 'indoor furniture', 'a vehicle interior'];
    const detected = nonCivic[Math.floor(Math.random() * nonCivic.length)];
    return { success: false, notCivic: true, reason: `Your image does not appear to show a civic issue. AI detected: ${detected}.`, confidence: Math.floor(Math.random() * 30) + 10, detectedAs: detected, simulated: true };
  }
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.navbar');
  if (nav) window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 50));

  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));

  initScrollAnimations();
  initCounters();
  initDemoWarningStates();
});

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
  const elements = document.querySelectorAll('[data-animate]');
  if (!elements.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        setTimeout(() => el.classList.add('animated'), parseInt(el.dataset.delay || 0));
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  elements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s cubic-bezier(.4,0,.2,1), transform 0.6s cubic-bezier(.4,0,.2,1)';
    observer.observe(el);
  });
}

const _style = document.createElement('style');
_style.textContent = '[data-animate].animated { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(_style);

// ===== COUNTERS =====
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target, parseInt(entry.target.dataset.count), entry.target.dataset.prefix || '', entry.target.dataset.suffix || '');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  counters.forEach(c => observer.observe(c));
}

function animateCounter(el, target, prefix, suffix) {
  const duration = 2000, start = performance.now();
  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = prefix + Math.floor(eased * target).toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// ===== PRIORITY BARS =====
function initPriorityBars() {
  const bars = document.querySelectorAll('.priority-bar-fill');
  if (!bars.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.style.width = entry.target.dataset.width; observer.unobserve(entry.target); } });
  }, { threshold: 0.3 });
  bars.forEach(b => observer.observe(b));
}

// ===== CHART BARS =====
function initChartBars() {
  const charts = document.querySelectorAll('.chart-placeholder');
  if (!charts.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.chart-bar').forEach((b, i) => { setTimeout(() => { b.style.height = b.dataset.height; }, i * 100); });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  charts.forEach(c => observer.observe(c));
}

// ===== TOAST =====
function showToast(message, type) {
  type = type || 'info';
  const toast = document.createElement('div');
  toast.className = 'toast toast-' + type;
  toast.textContent = message;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 400); }, 3500);
}

// ===== VOTING =====
function vote(btn, issueId, dir) {
  const session = Session.get();
  const userId = session ? session.username : 'guest';
  const voteKey = 'vote_' + userId + '_' + issueId;
  const existing = localStorage.getItem(voteKey);

  const card = btn.closest('.issue-card') || btn.closest('.vote-actions').parentElement;
  const countEl = card.querySelector('.vote-count');
  let count = parseInt(countEl.textContent);

  // Already voted — show which way and block
  if (existing) {
    showToast('You have already ' + (existing === 'up' ? 'upvoted' : 'downvoted') + ' this issue.', 'warning');
    return;
  }

  card.querySelectorAll('.vote-btn').forEach(b => b.classList.remove('active-up', 'active-down'));
  if (dir === 'up') {
    btn.classList.add('active-up'); count++;
    showToast('Upvote recorded! +5 points', 'success');
    CivicStore.citizenPoints += 5;
  } else {
    btn.classList.add('active-down'); count = Math.max(0, count - 1);
    showToast('Downvote recorded.', 'info');
  }

  localStorage.setItem(voteKey, dir);
  countEl.textContent = count;
  CivicStore.save();

  // Disable both buttons visually after voting
  card.querySelectorAll('.vote-btn').forEach(b => {
    b.style.opacity = b === btn ? '1' : '0.4';
    b.style.cursor = 'not-allowed';
  });

  btn.style.transform = 'scale(0.9)';
  setTimeout(() => { btn.style.transform = ''; }, 150);
}

// Restore vote state on page load
function restoreVoteStates() {
  const session = Session.get();
  const userId = session ? session.username : 'guest';
  document.querySelectorAll('.issue-card').forEach(card => {
    const upBtn = card.querySelector('.vote-btn.upvote');
    const downBtn = card.querySelector('.vote-btn.downvote');
    if (!upBtn || !downBtn) return;
    const onclickAttr = upBtn.getAttribute('onclick') || '';
    const match = onclickAttr.match(/'(i\d+)'/);
    if (!match) return;
    const issueId = match[1];
    const voteKey = 'vote_' + userId + '_' + issueId;
    const existing = localStorage.getItem(voteKey);
    if (existing) {
      if (existing === 'up') upBtn.classList.add('active-up');
      else downBtn.classList.add('active-down');
      upBtn.style.opacity = existing === 'up' ? '1' : '0.4';
      downBtn.style.opacity = existing === 'down' ? '1' : '0.4';
      upBtn.style.cursor = 'not-allowed';
      downBtn.style.cursor = 'not-allowed';
    }
  });
}

// ===== NAV HTML HELPER =====
function getNavHTML(role, activePage) {
  const links = {
    citizen: [
      { href: '/citizen/dashboard', icon: '📊', label: 'Dashboard' },
      { href: '/citizen/report', icon: '📝', label: 'Report Issue' },
      { href: '/citizen/voting', icon: '🗳️', label: 'Community Voting' },
      { href: '/citizen/profile', icon: '👤', label: 'My Profile' },
      { href: '/citizen/warnings', icon: '⚠️', label: 'Warning History' },
      { href: '/priority', icon: '⚡', label: 'Priority Engine' },
      { href: '/ledger', icon: '🏛️', label: 'National Ledger' },
    ],
    admin: [
      { href: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
      { href: '/admin/review', icon: '🔍', label: 'AI Review Queue' },
      { href: '/admin/flagged', icon: '🚩', label: 'Flagged Users' },
      { href: '/priority', icon: '⚡', label: 'Priority Engine' },
      { href: '/ledger', icon: '🏛️', label: 'National Ledger' },
    ],
    developer: [
      { href: '/dev/dashboard', icon: '📊', label: 'Dashboard' },
      { href: '/dev/training', icon: '🧠', label: 'Training Data' },
      { href: '/dev/users', icon: '👥', label: 'User Management' },
      { href: '/dev/analytics', icon: '📈', label: 'Analytics' },
    ]
  };
  return (links[role] || []).map(l =>
    `<li><a href="${l.href}" class="${activePage === l.href ? 'active' : ''}"><span class="nav-icon">${l.icon}</span>${l.label}</a></li>`
  ).join('');
}

function getWarningBadgeHTML(username) {
  const w = CivicStore.getWarnings(username);
  const suspended = CivicStore.isSuspended(username);
  if (suspended) return '<span class="badge badge-red">🚫 Suspended</span>';
  if (w.flagged) return '<span class="badge badge-red">🚩 Flagged (' + w.count + ' warnings)</span>';
  if (w.count > 0) return '<span class="badge badge-amber">⚠️ ' + w.count + ' Warning' + (w.count > 1 ? 's' : '') + '</span>';
  return '<span class="badge badge-green">✅ Good Standing</span>';
}
