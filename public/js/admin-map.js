const CATEGORY_COLORS = {
  pothole:        '#f59e0b',
  streetlight:    '#fbbf24',
  waterlogging:   '#00d4ff',
  garbage:        '#22c55e',
  sewage:         '#a855f7',
  road_damage:    '#f97316',
  encroachment:   '#ef4444',
  other:          '#6b7280',
};

function createMarkerElement(complaint) {
  const color = CATEGORY_COLORS[complaint.category] || '#6b7280';

  const wrapper = document.createElement('div');
  wrapper.className = 'marker-wrapper';
  // Fixed size wrapper so the text label does not alter the bounding box. 
  // This ensures 'anchor: bottom' keeps the pin tip exactly at the coordinates.
  wrapper.style.cssText = 'position:relative; width:28px; height:28px; display:flex; justify-content:center; align-items:center; cursor:pointer; z-index:1;';

  const iconContainer = document.createElement('div');
  iconContainer.style.cssText = `
    width: 28px;
    height: 28px;
    transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
    filter: drop-shadow(0 4px 6px rgba(0,0,0,0.5)) drop-shadow(0 0 8px ${color}80);
    display: flex;
    justify-content: center;
    align-items: center;
  `;
  
  // Lucide MapPin SVG geometry Custom styled
  iconContainer.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="${color}" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
      <circle cx="12" cy="10" r="3" fill="#ffffff" stroke="none" />
    </svg>
  `;

  wrapper.addEventListener('mouseenter', () => {
    iconContainer.style.transform = 'scale(1.2) translateY(-4px)';
    wrapper.style.zIndex = '100';
  });
  wrapper.addEventListener('mouseleave', () => {
    iconContainer.style.transform = 'scale(1) translateY(0)';
    wrapper.style.zIndex = '1';
  });

  const label = document.createElement('div');
  label.textContent = complaint.category.replace('_', ' ');
  label.style.cssText = `
    position: absolute;
    top: 100%; /* Sits exactly below the 28px wrapper bounds */
    left: 50%;
    transform: translateX(-50%);
    margin-top: 4px;
    font-size: 9px;
    font-family: 'IBM Plex Mono', monospace;
    font-weight: 600;
    color: ${color};
    text-transform: uppercase;
    letter-spacing: 0.06em;
    white-space: nowrap;
    text-shadow: 0 1px 4px rgba(0,0,0,0.8);
    pointer-events: none;
  `;

  wrapper.appendChild(iconContainer);
  wrapper.appendChild(label);
  return wrapper;
}

function createPopupHTML(complaint) {
  const color = CATEGORY_COLORS[complaint.category] || '#6b7280';
  const statusColors = {
    unresolved: '#ff4d4d',
    in_process: '#ffaa00',
    resolved: '#00ff9d'
  };
  const statusColor = statusColors[complaint.status] || '#6b7280';

  return `
    <div style="border-radius:12px; overflow:hidden; min-width:260px; max-width:300px;">
      
      ${complaint.imageUrl ? `
        <div style="position:relative; height:130px; overflow:hidden; border-radius:12px 12px 0 0;">
          <img src="${complaint.imageUrl}"
               alt="${complaint.category}"
               style="width:100%; height:100%; object-fit:cover; display:block;" />
          <div style="position:absolute; inset:0; background:linear-gradient(to bottom, transparent 50%, rgba(8,12,24,0.8)); pointer-events:none;"></div>
          <span style="position:absolute; top:8px; left:8px; background:rgba(8,12,24,0.85); border:1px solid ${color}40; color:${color}; font-size:10px; font-family:'IBM Plex Mono',monospace; font-weight:600; text-transform:uppercase; letter-spacing:0.06em; padding:2px 7px; border-radius:4px;">
            ${complaint.category.replace('_',' ')}
          </span>
        </div>
      ` : `
        <div style="height:60px; background:linear-gradient(135deg, ${color}15, rgba(8,12,24,0.9)); display:flex; align-items:center; justify-content:center; border-radius:12px 12px 0 0; border-bottom:1px solid ${color}30;">
          <span style="font-size:10px; font-family:'IBM Plex Mono',monospace; color:${color}; text-transform:uppercase; letter-spacing:0.1em;">
            ${complaint.category.replace('_',' ')}
          </span>
        </div>
      `}

      <div style="padding:12px 14px 14px; display:flex; flex-direction:column; gap:8px;">

        <div>
          <div style="font-size:10px; font-family:'IBM Plex Mono',monospace; color:#8892a4; text-transform:uppercase; letter-spacing:0.08em; margin-bottom:3px;">
            Report #${complaint.id?.slice(-6) || 'N/A'}
          </div>
          <div style="font-size:13px; font-weight:600; color:#e8eaf0; font-family:'IBM Plex Sans',sans-serif; line-height:1.3;">
            ${complaint.description?.slice(0, 60) || 'No description'}${complaint.description?.length > 60 ? '...' : ''}
          </div>
        </div>

        <div style="display:flex; align-items:center; gap:10px; font-size:11px;">
          <div style="display:flex; align-items:center; gap:5px;">
            <div style="width:7px; height:7px; border-radius:50%; background:${statusColor};"></div>
            <span style="color:${statusColor}; font-family:'IBM Plex Mono',monospace; text-transform:uppercase; font-size:10px; font-weight:600;">
              ${complaint.status?.replace('_',' ') || 'unknown'}
            </span>
          </div>
          ${complaint.severity ? `
            <div style="display:flex; gap:2px;">
              ${Array.from({length:5}).map((_,i) => `
                <div style="width:5px; height:5px; border-radius:1px; background:${i < complaint.severity ? color : 'rgba(255,255,255,0.1)'};"></div>
              `).join('')}
            </div>
          ` : ''}
        </div>

        <div style="display:flex; align-items:flex-start; gap:6px; font-size:11px; color:#8892a4; font-family:'IBM Plex Sans',sans-serif;">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-top:1px; flex-shrink:0;">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
          </svg>
          <span>${complaint.location || complaint.address || 'Location unavailable'}</span>
        </div>

        <div style="display:flex; align-items:center; gap:6px; font-size:10px; color:#4a5568; font-family:'IBM Plex Mono',monospace;">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
          </svg>
          <span>${complaint.citizenId || 'Anonymous'}</span>
          <span style="color:#2d3748;">•</span>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/>
          </svg>
          <span>${complaint.timestamp ? new Date(complaint.timestamp).toLocaleDateString('en-IN',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'}) : 'Unknown time'}</span>
        </div>

        <div style="display:flex; gap:8px; margin-top:4px;">
          <button
            onclick="adminOpenReview('${complaint.id}')"
            style="flex:1; padding:6px 0; background:rgba(0,212,255,0.12); border:1px solid rgba(0,212,255,0.3); color:#00d4ff; font-family:'IBM Plex Sans',sans-serif; font-size:11px; font-weight:600; border-radius:6px; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:5px; transition:background 0.15s ease;"
            onmouseenter="this.style.background='rgba(0,212,255,0.22)'"
            onmouseleave="this.style.background='rgba(0,212,255,0.12)'"
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            Review
          </button>
          <button
            onclick="adminLocate('${complaint.lat}','${complaint.lng}')"
            style="padding:6px 10px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#8892a4; font-size:11px; border-radius:6px; cursor:pointer; transition:all 0.15s ease;"
            onmouseenter="this.style.borderColor='rgba(0,212,255,0.3)'; this.style.color='#00d4ff';"
            onmouseleave="this.style.borderColor='rgba(255,255,255,0.1)'; this.style.color='#8892a4';"
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="12" y1="2" x2="12" y2="22"/>
            </svg>
          </button>
        </div>

      </div>
    </div>
  `;
}

function initAdminMap(containerId) {
  const map = new maplibregl.Map({
    container: containerId,
    style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
    center: [70.8022, 22.3039],
    zoom: 12,
    attributionControl: false
  });

  map.addControl(new maplibregl.AttributionControl({ compact: true }), 'bottom-right');
  map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');

  return map;
}

function addHeatmapLayer(map, complaints) {
  const geojson = {
    type: 'FeatureCollection',
    features: complaints
      .filter(c => c.lat && c.lng)
      .map(c => ({
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [parseFloat(c.lng), parseFloat(c.lat)] },
        properties: { severity: c.severity || 3, category: c.category }
      }))
  };

  if (map.getSource('complaints-heat')) {
    map.getSource('complaints-heat').setData(geojson);
    return;
  }

  map.addSource('complaints-heat', { type: 'geojson', data: geojson });
  map.addLayer({
    id: 'complaints-heatmap',
    type: 'heatmap',
    source: 'complaints-heat',
    maxzoom: 15,
    paint: {
      'heatmap-weight': ['interpolate',['linear'],['get','severity'],1,0.2,5,1.0],
      'heatmap-intensity': ['interpolate',['linear'],['zoom'],0,1,15,3],
      'heatmap-color': [
        'interpolate',['linear'],['heatmap-density'],
        0,   'rgba(0,0,0,0)',
        0.1, 'rgba(0,212,255,0.2)',
        0.3, 'rgba(0,212,255,0.5)',
        0.5, 'rgba(255,170,0,0.6)',
        0.7, 'rgba(255,102,0,0.7)',
        1.0, 'rgba(255,77,77,0.9)'
      ],
      'heatmap-radius': ['interpolate',['linear'],['zoom'],0,20,15,40],
      'heatmap-opacity': 0.65,
    }
  });
}

function renderComplaintMarkers(map, complaints, existingMarkers) {
  existingMarkers.forEach(m => m.remove());
  existingMarkers.length = 0;

  complaints.forEach(complaint => {
    if (!complaint.lat || !complaint.lng) return;

    const el = createMarkerElement(complaint);

    const popup = new maplibregl.Popup({
      offset: [0, -32],
      closeButton: true,
      closeOnClick: false,
      maxWidth: '300px',
      className: 'admin-complaint-popup'
    }).setHTML(createPopupHTML(complaint));

    const marker = new maplibregl.Marker({ element: el, anchor: 'bottom' })
      .setLngLat([parseFloat(complaint.lng), parseFloat(complaint.lat)])
      .setPopup(popup)
      .addTo(map);

    existingMarkers.push(marker);
  });
}

window.adminOpenReview = function(complaintId) {
  window.location.href = `/admin-review.html?id=${complaintId}`;
}
window.adminLocate = function(lat, lng) {
  if (window.adminMapInstance) {
    window.adminMapInstance.flyTo({ center: [parseFloat(lng), parseFloat(lat)], zoom: 16, duration: 1200 });
  }
}
