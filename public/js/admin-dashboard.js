function mockCoords(index) {
  const base = { lat: 22.3039, lng: 70.8022 };
  const spread = 0.04;
  return {
    lat: base.lat + (Math.random() - 0.5) * spread,
    lng: base.lng + (Math.random() - 0.5) * spread
  };
}

function animateCounter(element, targetValue) {
  if (!element) return;
  const startValue = parseInt(element.textContent) || 0;
  const duration = 600;
  const startTime = performance.now();
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    
    const currentVal = Math.floor(startValue + (targetValue - startValue) * easeOutQuart);
    element.textContent = currentVal;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = targetValue;
    }
  }
  
  requestAnimationFrame(update);
}

document.addEventListener('DOMContentLoaded', () => {
  const session = typeof Session !== 'undefined' ? Session.get() : null;
  if (!session || session.role !== 'admin') {
    window.location.href = '/login';
    return;
  }


  const nameEl = document.getElementById('admin-name');
  if (nameEl) nameEl.textContent = session.name || session.username;

  window.adminMapInstance = initAdminMap('admin-command-map');
  window.existingMarkers = [];

  let allReports = typeof CivicStore !== 'undefined' ? (CivicStore.myReports || []) : [];
    
  allReports.forEach((r, i) => {
    if (!r.lat || !r.lng) {
      const coords = mockCoords(i);
      r.lat = coords.lat.toString();
      r.lng = coords.lng.toString();
    }
  });

  const filters = { search: '', categories: [], status: 'all', minSeverity: 1, dateRange: 'all', showHeatmap: true, showMarkers: true };

  // Initial load
  updateMapAndList();

  setInterval(() => {
    const el = document.getElementById('admin-live-clock');
    if (el) {
      const d = new Date();
      el.textContent = d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + '  ' + d.toLocaleTimeString('en-GB') + ' IST';
    }
  }, 1000);

  function filterReports() {
    return allReports.filter(r => {
      // Search
      if (filters.search) {
        const text = ((r.description || '') + ' ' + (r.location || '') + ' ' + (r.category || '')).toLowerCase();
        if (!text.includes(filters.search.toLowerCase())) return false;
      }
      // Categories
      if (filters.categories.length > 0 && !filters.categories.includes('all')) {
        if (!filters.categories.includes(r.category)) return false;
      }
      // Status
      if (filters.status !== 'all') {
        if (filters.status === 'pending_review' && r.status !== 'pending_review') return false;
        if (filters.status === 'unresolved' && r.status !== 'unresolved' && r.status !== 'pending_review') return false; // assuming unresolved includes pending? the prompt implies status checking
        if (filters.status !== 'unresolved' && filters.status !== 'pending_review' && r.status !== filters.status) return false;
      }
      // Severity
      if ((r.severity || 1) < filters.minSeverity) return false;
      
      // Date range
      if (filters.dateRange !== 'all' && r.timestamp) {
        const tsDiff = Date.now() - new Date(r.timestamp).getTime();
        const hr = 3600000;
        if (filters.dateRange === '24h' && tsDiff > 24 * hr) return false;
        if (filters.dateRange === '7d' && tsDiff > 7 * 24 * hr) return false;
        if (filters.dateRange === '30d' && tsDiff > 30 * 24 * hr) return false;
      }
      
      return true;
    });
  }

  function updateMapAndList() {
    const filtered = filterReports();
    
    // Update count display
    const countEl = document.getElementById('filter-result-count');
    if (countEl) countEl.textContent = `Showing ${filtered.length} reports`;

    // Map Layers
    if (window.adminMapInstance.isStyleLoaded() || window.adminMapInstance.loaded()) {
      applyMapUpdates(filtered);
    } else {
      window.adminMapInstance.once('load', () => applyMapUpdates(filtered));
    }

    // AI Insight Panel
    updateAiInsightPanel(filtered);
    
    // Metric counts
    updateMetrics(filtered);
  }
  
  function applyMapUpdates(filtered) {
    if (filters.showMarkers) {
      renderComplaintMarkers(window.adminMapInstance, filtered, window.existingMarkers);
    } else {
      window.existingMarkers.forEach(m => m.remove());
      window.existingMarkers.length = 0;
    }
    
    if (filters.showHeatmap) {
      addHeatmapLayer(window.adminMapInstance, filtered);
      if (window.adminMapInstance.getLayer('complaints-heatmap')) {
        window.adminMapInstance.setLayoutProperty('complaints-heatmap', 'visibility', 'visible');
      }
    } else {
      if (window.adminMapInstance.getLayer('complaints-heatmap')) {
        window.adminMapInstance.setLayoutProperty('complaints-heatmap', 'visibility', 'none');
      }
    }
  }

  function updateAiInsightPanel(filtered) {
    const listEl = document.getElementById('ai-insights-list');
    if (!listEl) return;
    
    if (filtered.length === 0) {
      listEl.innerHTML = '<div style="text-align:center; padding:30px; color:var(--admin-text-muted); font-family:var(--admin-font-data); font-size:11px;">NO REPORTS MATCH FILTER</div>';
      return;
    }

    const sorted = [...filtered].sort((a, b) => (b.severity || 0) - (a.severity || 0)).slice(0, 5);
    
    let html = sorted.map(c => {
      const color = (typeof CATEGORY_COLORS !== 'undefined' && CATEGORY_COLORS[c.category]) || '#6b7280';
      const desc = c.description ? (c.description.length > 50 ? c.description.substring(0, 50) + '...' : c.description) : 'No description';
      
      const dotsHTML = Array.from({length: 5}).map((_, i) => 
        `<div class="severity-dot" style="background:${i < (c.severity||3) ? color : 'rgba(255,255,255,0.1)'}"></div>`
      ).join('');
      
      return `
        <div class="insight-report-card">
          <div class="insight-report-header">
            <span class="category-badge cat-${c.category}">
              <span class="status-dot ${c.status || 'unresolved'}"></span>
              ${c.category.replace('_', ' ')}
            </span>
            <div class="severity-dots">${dotsHTML}</div>
          </div>
          <div class="insight-desc">${desc}</div>
          <div class="insight-location">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            ${c.location || 'Unknown Location'}
          </div>
          <button class="btn-view-map" onclick="adminLocate('${c.lat}','${c.lng}')">
            View on Map →
          </button>
        </div>
      `;
    }).join('');
    
    // Category Distribution mini stats
    const catCounts = {};
    filtered.forEach(r => { catCounts[r.category] = (catCounts[r.category] || 0) + 1; });
    
    const catStatsHTML = Object.entries(catCounts)
      .filter(([_, count]) => count > 0)
      .map(([cat, count]) => {
        const color = (typeof CATEGORY_COLORS !== 'undefined' && CATEGORY_COLORS[cat]) || '#6b7280';
        return `<div style="display:flex; align-items:center; justify-content:space-between; font-size:11px; font-family:var(--admin-font-ui); color:var(--admin-text-secondary); margin-bottom:4px;">
          <span>${cat.replace('_', ' ')}</span>
          <span style="font-family:var(--admin-font-data); color:${color};">${count} ●</span>
        </div>`;
      }).join('');
      
    if (catStatsHTML) {
      html += `
        <div style="margin-top:14px;">
          <div style="font-size:10px; font-family:var(--admin-font-data); color:var(--admin-text-muted); text-transform:uppercase; letter-spacing:0.1em; margin-bottom:8px;">Category Distribution</div>
          ${catStatsHTML}
        </div>
      `;
    }

    listEl.innerHTML = html;
  }

  function updateMetrics(filtered) {
    const t = filtered.length;
    const c = filtered.filter(status => (status.severity || 1) >= 4).length;
    const u = filtered.filter(r => r.status === 'unresolved').length;
    const i = filtered.filter(r => r.status === 'in_process').length;
    const rT = filtered.filter(r => {
      if (r.status !== 'resolved') return false;
      const ts = r.timestamp ? new Date(r.timestamp) : new Date();
      return ts.toDateString() === new Date().toDateString();
    }).length;
    const p = filtered.filter(r => r.status === 'pending_review').length;

    animateCounter(document.getElementById('metric-total'), t);
    animateCounter(document.getElementById('metric-critical'), c);
    animateCounter(document.getElementById('metric-unresolved'), u);
    animateCounter(document.getElementById('metric-inprocess'), i);
    animateCounter(document.getElementById('metric-resolved'), rT);
    animateCounter(document.getElementById('metric-pending'), p);
    
    const critPulse = document.getElementById('metric-critical-pulse');
    if (critPulse) {
      critPulse.style.display = c > 0 ? 'block' : 'none';
    }
  }

  // Filter Event Listeners
  const searchInput = document.getElementById('filter-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      filters.search = e.target.value;
      updateMapAndList();
    });
  }

  document.querySelectorAll('.filter-cat-cb').forEach(cb => {
    cb.addEventListener('change', (e) => {
      const cat = e.target.dataset.cat;
      if (cat === 'all') {
        if (e.target.checked) {
          filters.categories = ['all'];
          document.querySelectorAll('.filter-cat-cb').forEach(c => { if(c !== e.target) c.checked = false; });
        } else {
          filters.categories = [];
        }
      } else {
        const allCb = document.querySelector('.filter-cat-cb[data-cat="all"]');
        if (allCb && allCb.checked) allCb.checked = false;
        
        if (e.target.checked) {
          filters.categories = filters.categories.filter(c => c !== 'all');
          filters.categories.push(cat);
        } else {
          filters.categories = filters.categories.filter(c => c !== cat);
        }
        
        if (filters.categories.length === 0 && allCb) {
          allCb.checked = true;
          filters.categories = ['all'];
        }
      }
      updateMapAndList();
    });
  });

  document.querySelectorAll('.filter-status-radio').forEach(radio => {
    radio.addEventListener('change', (e) => {
      if (e.target.checked) {
        filters.status = e.target.value;
        updateMapAndList();
      }
    });
  });

  const sevSlider = document.getElementById('filter-severity');
  if (sevSlider) {
    sevSlider.addEventListener('input', (e) => {
      filters.minSeverity = parseInt(e.target.value);
      document.getElementById('filter-severity-val').textContent = filters.minSeverity;
      updateMapAndList();
    });
  }

  document.querySelectorAll('.filter-date-radio').forEach(radio => {
    radio.addEventListener('change', (e) => {
      if (e.target.checked) {
        filters.dateRange = e.target.value;
        updateMapAndList();
      }
    });
  });

  const heatmapToggle = document.getElementById('toggle-heatmap');
  if (heatmapToggle) {
    heatmapToggle.addEventListener('change', (e) => {
      filters.showHeatmap = e.target.checked;
      updateMapAndList();
    });
  }

  const markersToggle = document.getElementById('toggle-markers');
  if (markersToggle) {
    markersToggle.addEventListener('change', (e) => {
      filters.showMarkers = e.target.checked;
      updateMapAndList();
    });
  }

  const resetBtn = document.getElementById('btn-reset-filters');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      filters.search = '';
      filters.categories = ['all'];
      filters.status = 'all';
      filters.minSeverity = 1;
      filters.dateRange = 'all';
      filters.showHeatmap = true;
      filters.showMarkers = true;
      
      if (searchInput) searchInput.value = '';
      document.querySelectorAll('.filter-cat-cb').forEach(c => c.checked = (c.dataset.cat === 'all'));
      document.querySelector('.filter-status-radio[value="all"]').checked = true;
      if (sevSlider) { sevSlider.value = 1; document.getElementById('filter-severity-val').textContent = 1; }
      document.querySelector('.filter-date-radio[value="all"]').checked = true;
      if (heatmapToggle) heatmapToggle.checked = true;
      if (markersToggle) markersToggle.checked = true;
      
      updateMapAndList();
    });
  }

});
