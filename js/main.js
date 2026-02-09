import { ctfData } from './data.js';

// --- 1. INISIALISASI PETA ---
const map = L.map('map', {
    center: [25, 0], // Center dunia
    zoom: 2,
    zoomControl: false,
    attributionControl: false
});

// Pakai Tile Gelap
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    opacity: 0.9
}).addTo(map);

// --- 2. SETUP DASHBOARD ---
function initDashboard() {
    renderMarkers();
    renderCards();
    startClock();

    // MULAI SIMULASI SERANGAN (Interval 800ms - 2000ms)
    setInterval(simulateAttack, 1500);
}

// --- 3. RENDER MARKER & CARD ---
function renderMarkers() {
    ctfData.forEach(team => {
        // Lingkaran di Peta
        const marker = L.circleMarker(team.coords, {
            color: team.color,
            fillColor: team.color,
            fillOpacity: 0.8,
            radius: 6,
            weight: 2
        }).addTo(map);

        // Efek "Pulse" lingkaran luar (Gimmick)
        L.circleMarker(team.coords, {
            color: team.color,
            fillColor: 'transparent',
            radius: 15,
            weight: 1,
            opacity: 0.3
        }).addTo(map);

        marker.bindPopup(`<b>${team.name}</b><br>${team.ip}`);
    });
}

function renderCards() {
    const grid = document.getElementById('team-grid');
    grid.innerHTML = ""; // Bersihkan dulu

    ctfData.forEach(team => {
        const cardHTML = `
            <div class="card ${team.class}">
                <div class="card-header">
                    <h3>${team.name}</h3>
                    <span class="card-location"><i class="fas fa-map-marker-alt"></i> ${team.city}</span>
                </div>
                <span class="card-ip"><i class="fas fa-network-wired"></i> ${team.ip}</span>
                
                <div class="card-stats">
                    <div class="stat-box"><span class="val">${team.members}</span><span class="label">User</span></div>
                    <div class="stat-box"><span class="val">${team.score}</span><span class="label">Score</span></div>
                    <div class="stat-box"><span class="val">${team.solved}</span><span class="label">Flag</span></div>
                </div>

                <div class="status-badge ${team.status.toLowerCase()}">
                    ${team.status === 'HIGH' ? '<i class="fas fa-exclamation-triangle"></i>' : '<i class="fas fa-check"></i>'} 
                    ${team.status} ACTIVITY
                </div>
            </div>
        `;
        grid.innerHTML += cardHTML;
    });
}

// --- 4. LOGIKA SERANGAN (PENTING) ---
function simulateAttack() {
    // A. Pilih Penyerang (Attacker) & Korban (Victim) secara acak
    const attackerIdx = Math.floor(Math.random() * ctfData.length);
    let victimIdx = Math.floor(Math.random() * ctfData.length);

    // Pastikan korban bukan diri sendiri
    while (attackerIdx === victimIdx) {
        victimIdx = Math.floor(Math.random() * ctfData.length);
    }

    const attacker = ctfData[attackerIdx];
    const victim = ctfData[victimIdx];

    // B. Gambar Garis Serangan (Polyline)
    // ClassName 'attack-line' akan memicu animasi CSS di style.css
    const attackLine = L.polyline([attacker.coords, victim.coords], {
        color: attacker.color, // Warna ikut warna penyerang
        weight: 2,
        opacity: 0.8,
        className: 'attack-line' // <--- INI KUNCINYA
    }).addTo(map);

    // C. Update Log Kecil di Kiri Bawah Peta
    addLog(attacker.name, victim.name, attacker.color);

    // D. Hapus Garis setelah 2 detik (Biar seolah-olah tembakan selesai)
    setTimeout(() => {
        map.removeLayer(attackLine);
    }, 2000);
}

function addLog(attacker, victim, color) {
    const logBox = document.getElementById('log-content');
    const time = new Date().toLocaleTimeString('en-US', { hour12: false });

    // Tambah log baru ke atas
    const newLog = document.createElement('div');
    newLog.innerHTML = `<span style="color:#8b949e">[${time}]</span> <span style="color:${color}">${attacker}</span> ➔ ${victim}`;

    logBox.insertBefore(newLog, logBox.firstChild);

    // Batasi cuma 5 log terakhir biar gak panjang
    if (logBox.children.length > 5) {
        logBox.removeChild(logBox.lastChild);
    }
}

// Fitur Jam
function startClock() {
    setInterval(() => {
        document.getElementById('clock').innerText = new Date().toLocaleTimeString();
    }, 1000);
}

// Start
initDashboard();