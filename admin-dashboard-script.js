// BullBear Trading - Interactive Admin Dashboard Script
const API_URL = 'http://localhost:5000/api';
let adminToken = localStorage.getItem('adminToken');
let connectionStatus = false;
let autoRefreshInterval;
let refreshCountdown = 30;
let allPurchasesData = [];
let pendingPurchasesData = [];
let allUsersData = [];

// Initialize
window.addEventListener('load', async () => {
    await checkConnection();
    if (adminToken && connectionStatus) await verifyToken();
});

// Connection Check
async function checkConnection() {
    const el = document.getElementById('connectionStatus');
    el.className = 'connection-status checking';
    el.textContent = '🟡 Checking...';
    try {
        const res = await fetch(`${API_URL}/health`);
        if (res.ok) {
            connectionStatus = true;
            el.textContent = '🟢 Connected';
            el.className = 'connection-status connected';
            return true;
        }
        throw new Error('Failed');
    } catch (e) {
        connectionStatus = false;
        el.textContent = '🔴 Offline';
        el.className = 'connection-status disconnected';
        return false;
    }
}

// Messages
function showMessage(text, type) {
    const el = document.getElementById('loginMessage');
    el.innerHTML = text;
    el.className = `message ${type} show`;
    if (type === 'success') setTimeout(() => el.classList.remove('show'), 3000);
}

// Token Verification
async function verifyToken() {
    try {
        const res = await fetch(`${API_URL}/admin/verify`, { headers: { 'Authorization': `Bearer ${adminToken}` } });
        if (res.ok) { showDashboard(); return true; }
        localStorage.removeItem('adminToken');
        adminToken = null;
        showMessage('Session expired. Please login again.', 'error');
        return false;
    } catch (e) {
        localStorage.removeItem('adminToken');
        adminToken = null;
        return false;
    }
}

// Login Handler
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!await checkConnection()) {
        showMessage('❌ Backend offline. Start server on port 5000.', 'error');
        return;
    }
    const email = document.getElementById('adminEmail').value;
    const password = document.getElementById('adminPassword').value;
    const btn = document.getElementById('loginBtn');
    btn.disabled = true;
    btn.textContent = 'Logging in...';
    try {
        const res = await fetch(`${API_URL}/admin/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (res.ok) {
            adminToken = data.data.token;
            localStorage.setItem('adminToken', adminToken);
            showMessage('✅ Login successful!', 'success');
            btn.textContent = 'Success!';
            setTimeout(() => showDashboard(), 500);
        } else {
            showMessage(`❌ ${data.message || 'Invalid credentials'}`, 'error');
            btn.disabled = false;
            btn.textContent = 'Login to Dashboard';
        }
    } catch (e) {
        showMessage('❌ Connection failed.', 'error');
        btn.disabled = false;
        btn.textContent = 'Login to Dashboard';
    }
});


// Show Dashboard
function showDashboard() {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('dashboardSection').style.display = 'block';
    renderDashboardHTML();
    loadDashboardData();
    startAutoRefresh();
}

function renderDashboardHTML() {
    document.getElementById('dashboardSection').innerHTML = `
        <div class="header">
            <div class="header-content">
                <div>
                    <h1>🎯 Admin Dashboard</h1>
                    <p>BullBear Trading Platform Management</p>
                </div>
                <div class="header-actions">
                    <button class="refresh-btn" onclick="refreshDashboard()">🔄 Refresh</button>
                    <button class="logout-btn" onclick="logout()">🚪 Logout</button>
                </div>
            </div>
        </div>
        <div class="stats-grid" id="statsGrid"></div>
        <div class="tabs" id="tabsContainer"></div>
        <div class="section" id="pendingSection"></div>
        <div class="section" id="purchasesSection"></div>
        <div class="section" id="usersSection"></div>
    `;
    addDashboardStyles();
}

function addDashboardStyles() {
    if (document.getElementById('dashStyles')) return;
    const style = document.createElement('style');
    style.id = 'dashStyles';
    style.textContent = `
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .stat-card { background: rgba(255,255,255,0.05); backdrop-filter: blur(10px); border: 1px solid rgba(99,102,241,0.3); border-radius: 15px; padding: 25px; transition: all 0.3s ease; cursor: pointer; }
        .stat-card:hover { transform: translateY(-5px); box-shadow: 0 15px 40px rgba(99,102,241,0.4); }
        .stat-card h3 { color: #94a3b8; font-size: 0.9rem; margin-bottom: 10px; text-transform: uppercase; }
        .stat-card .value { font-size: 2.5rem; font-weight: bold; background: linear-gradient(135deg, #6366f1, #06b6d4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .stat-card .change { font-size: 0.85rem; margin-top: 10px; color: #22c55e; }
        .section { background: rgba(255,255,255,0.05); backdrop-filter: blur(10px); border: 1px solid rgba(99,102,241,0.3); border-radius: 15px; padding: 30px; margin-bottom: 30px; }
        .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 15px; }
        .section h2 { font-size: 1.5rem; }
        .section-actions { display: flex; gap: 10px; align-items: center; }
        .filter-select, .search-input { padding: 8px 15px; background: rgba(255,255,255,0.05); border: 1px solid rgba(99,102,241,0.3); border-radius: 8px; color: white; font-size: 0.9rem; }
        .filter-select option { background: #1e293b; }
        .table-container { overflow-x: auto; border-radius: 10px; }
        table { width: 100%; border-collapse: collapse; min-width: 700px; }
        th, td { padding: 12px 15px; text-align: left; border-bottom: 1px solid rgba(99,102,241,0.2); }
        th { background: rgba(99,102,241,0.2); font-weight: 600; text-transform: uppercase; font-size: 0.8rem; }
        tr:hover { background: rgba(99,102,241,0.1); }
        .status { padding: 5px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; }
        .status.pending { background: rgba(251,191,36,0.2); color: #fbbf24; }
        .status.approved, .status.completed { background: rgba(34,197,94,0.2); color: #22c55e; }
        .status.rejected { background: rgba(239,68,68,0.2); color: #ef4444; }
        .status.admin { background: rgba(99,102,241,0.2); color: #6366f1; }
        .status.user { background: rgba(6,182,212,0.2); color: #06b6d4; }
        .btn { padding: 6px 14px; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; transition: all 0.3s ease; margin: 2px; font-size: 0.8rem; }
        .btn-approve { background: linear-gradient(135deg, #22c55e, #10b981); color: white; }
        .btn-reject { background: linear-gradient(135deg, #ef4444, #dc2626); color: white; }
        .btn-view { background: linear-gradient(135deg, #06b6d4, #0891b2); color: white; }
        .btn-role { background: linear-gradient(135deg, #8b5cf6, #6366f1); color: white; }
        .btn:hover { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(0,0,0,0.3); }
        .btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
        .no-data { text-align: center; padding: 40px; color: rgba(255,255,255,0.6); }
        .loading { text-align: center; padding: 40px; color: rgba(255,255,255,0.6); }
        .tabs { display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap; }
        .tab-btn { padding: 10px 20px; background: rgba(255,255,255,0.05); border: 1px solid rgba(99,102,241,0.3); border-radius: 8px; color: white; cursor: pointer; transition: all 0.3s ease; }
        .tab-btn.active { background: linear-gradient(135deg, #6366f1, #8b5cf6); border-color: transparent; }
        .tab-btn:hover { background: rgba(99,102,241,0.2); }
    `;
    document.head.appendChild(style);
}


// Load Dashboard Data
async function loadDashboardData() {
    await Promise.all([loadStats(), loadPendingPurchases(), loadAllPurchases(), loadUsers()]);
}

async function loadStats() {
    try {
        const res = await fetch(`${API_URL}/admin/stats`, { headers: { 'Authorization': `Bearer ${adminToken}` } });
        if (res.ok) {
            const stats = await res.json();
            const d = stats.data;
            document.getElementById('statsGrid').innerHTML = `
                <div class="stat-card"><h3>💰 Total Revenue</h3><div class="value">$${d.totalRevenue || 0}</div><div class="change">From approved purchases</div></div>
                <div class="stat-card"><h3>👥 Total Users</h3><div class="value">${d.totalUsers || 0}</div><div class="change">${d.totalAdmins || 0} admins</div></div>
                <div class="stat-card"><h3>🛒 Total Purchases</h3><div class="value">${d.totalPurchases || 0}</div><div class="change">All time</div></div>
                <div class="stat-card"><h3>⏳ Pending</h3><div class="value">${d.pendingApprovals || 0}</div><div class="change">Needs attention</div></div>
            `;
        }
    } catch (e) { console.error('Stats error:', e); }
}

async function loadPendingPurchases() {
    try {
        const res = await fetch(`${API_URL}/admin/purchases?status=pending`, { headers: { 'Authorization': `Bearer ${adminToken}` } });
        if (res.ok) {
            const data = await res.json();
            pendingPurchasesData = data.data.purchases || [];
            renderPendingPurchases(pendingPurchasesData);
        }
    } catch (e) { console.error('Pending error:', e); renderPendingPurchases([]); }
}

async function loadAllPurchases() {
    try {
        const res = await fetch(`${API_URL}/admin/purchases`, { headers: { 'Authorization': `Bearer ${adminToken}` } });
        if (res.ok) {
            const data = await res.json();
            allPurchasesData = data.data.purchases || [];
            renderAllPurchases(allPurchasesData);
        }
    } catch (e) { console.error('Purchases error:', e); renderAllPurchases([]); }
}

async function loadUsers() {
    try {
        const res = await fetch(`${API_URL}/admin/users`, { headers: { 'Authorization': `Bearer ${adminToken}` } });
        if (res.ok) {
            const data = await res.json();
            allUsersData = data.data.users || [];
            renderUsers(allUsersData);
        }
    } catch (e) { console.error('Users error:', e); renderUsers([]); }
}

// Render Functions
function renderPendingPurchases(purchases) {
    const section = document.getElementById('pendingSection');
    section.innerHTML = `
        <div class="section-header">
            <h2>📋 Pending Approvals (${purchases.length})</h2>
            <div class="section-actions">
                <input type="text" class="search-input" placeholder="Search..." onkeyup="searchPending(this.value)">
            </div>
        </div>
        <div class="table-container">
            <table><thead><tr><th>Order</th><th>User</th><th>Course</th><th>Amount</th><th>Date</th><th>Actions</th></tr></thead>
            <tbody id="pendingBody">${purchases.length === 0 ? '<tr><td colspan="6" class="no-data">🎉 No pending approvals!</td></tr>' : purchases.map(p => `
                <tr>
                    <td><strong>${p.orderId || 'N/A'}</strong></td>
                    <td>${p.user?.firstName || ''} ${p.user?.lastName || ''}<br><small style="color:#94a3b8">${p.user?.email || p.userEmail || ''}</small></td>
                    <td>${p.course?.title || 'N/A'}</td>
                    <td><strong>$${p.amount || 0}</strong></td>
                    <td>${new Date(p.createdAt).toLocaleDateString()}</td>
                    <td>
                        <button class="btn btn-approve" onclick="approvePurchase('${p._id}')">✓ Approve</button>
                        <button class="btn btn-reject" onclick="rejectPurchase('${p._id}')">✗ Reject</button>
                    </td>
                </tr>
            `).join('')}</tbody></table>
        </div>
    `;
}


function renderAllPurchases(purchases) {
    const section = document.getElementById('purchasesSection');
    section.innerHTML = `
        <div class="section-header">
            <h2>📊 All Purchases (${purchases.length})</h2>
            <div class="section-actions">
                <select class="filter-select" onchange="filterPurchases(this.value)">
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                    <option value="completed">Completed</option>
                </select>
                <input type="text" class="search-input" placeholder="Search..." onkeyup="searchPurchases(this.value)">
            </div>
        </div>
        <div class="table-container">
            <table><thead><tr><th>Order</th><th>User</th><th>Course</th><th>Amount</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody id="purchasesBody">${purchases.length === 0 ? '<tr><td colspan="7" class="no-data">📊 No purchases yet</td></tr>' : purchases.map(p => `
                <tr>
                    <td><strong>${p.orderId || 'N/A'}</strong></td>
                    <td>${p.user?.firstName || ''} ${p.user?.lastName || ''}<br><small style="color:#94a3b8">${p.user?.email || p.userEmail || ''}</small></td>
                    <td>${p.course?.title || 'N/A'}</td>
                    <td><strong>$${p.amount || 0}</strong></td>
                    <td>${new Date(p.createdAt).toLocaleDateString()}</td>
                    <td><span class="status ${p.status}">${p.status}</span></td>
                    <td>
                        <button class="btn btn-view" onclick="viewPurchase('${p._id}')">👁 View</button>
                        ${p.status === 'pending' ? `<button class="btn btn-approve" onclick="approvePurchase('${p._id}')">✓</button><button class="btn btn-reject" onclick="rejectPurchase('${p._id}')">✗</button>` : ''}
                    </td>
                </tr>
            `).join('')}</tbody></table>
        </div>
    `;
}

function renderUsers(users) {
    const section = document.getElementById('usersSection');
    section.innerHTML = `
        <div class="section-header">
            <h2>👥 Users (${users.length})</h2>
            <div class="section-actions">
                <select class="filter-select" onchange="filterUsers(this.value)">
                    <option value="all">All Roles</option>
                    <option value="user">Users</option>
                    <option value="admin">Admins</option>
                </select>
                <input type="text" class="search-input" placeholder="Search..." onkeyup="searchUsers(this.value)">
            </div>
        </div>
        <div class="table-container">
            <table><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Joined</th><th>Last Login</th><th>Actions</th></tr></thead>
            <tbody id="usersBody">${users.length === 0 ? '<tr><td colspan="6" class="no-data">👥 No users yet</td></tr>' : users.map(u => `
                <tr>
                    <td><strong>${u.firstName || ''} ${u.lastName || ''}</strong></td>
                    <td>${u.email}</td>
                    <td><span class="status ${u.role}">${u.role}</span></td>
                    <td>${new Date(u.createdAt).toLocaleDateString()}</td>
                    <td>${u.lastLogin ? new Date(u.lastLogin).toLocaleDateString() : 'Never'}</td>
                    <td>
                        <button class="btn btn-role" onclick="toggleRole('${u._id}', '${u.role}')">${u.role === 'admin' ? '👤 Make User' : '👑 Make Admin'}</button>
                    </td>
                </tr>
            `).join('')}</tbody></table>
        </div>
    `;
}

// Purchase Actions
async function approvePurchase(id) {
    if (!confirm('Approve this purchase?')) return;
    try {
        const res = await fetch(`${API_URL}/admin/purchases/${id}/approve`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${adminToken}` }
        });
        if (res.ok) {
            alert('✅ Purchase approved!');
            await loadDashboardData();
        } else {
            const data = await res.json();
            alert(`❌ ${data.message || 'Error'}`);
        }
    } catch (e) { alert('❌ Error approving purchase'); }
}

async function rejectPurchase(id) {
    const reason = prompt('Rejection reason (optional):');
    if (reason === null) return;
    try {
        const res = await fetch(`${API_URL}/admin/purchases/${id}/reject`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${adminToken}` },
            body: JSON.stringify({ reason })
        });
        if (res.ok) {
            alert('✅ Purchase rejected');
            await loadDashboardData();
        } else {
            const data = await res.json();
            alert(`❌ ${data.message || 'Error'}`);
        }
    } catch (e) { alert('❌ Error rejecting purchase'); }
}


// User Actions
async function toggleRole(id, currentRole) {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    if (!confirm(`Change user role to ${newRole}?`)) return;
    try {
        const res = await fetch(`${API_URL}/admin/users/${id}/role`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${adminToken}` },
            body: JSON.stringify({ role: newRole })
        });
        if (res.ok) {
            alert(`✅ User role changed to ${newRole}`);
            await loadUsers();
        } else {
            const data = await res.json();
            alert(`❌ ${data.message || 'Error'}`);
        }
    } catch (e) { alert('❌ Error changing role'); }
}

// View Purchase Modal
function viewPurchase(id) {
    const p = [...pendingPurchasesData, ...allPurchasesData].find(x => x._id === id);
    if (!p) return alert('Purchase not found');
    document.getElementById('modalContent').innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
            <h3>📋 Purchase Details</h3>
            <button onclick="closeModal()" style="background:none;border:none;color:white;font-size:1.5rem;cursor:pointer;">&times;</button>
        </div>
        <div style="line-height:2;">
            <p><strong>Order ID:</strong> ${p.orderId || 'N/A'}</p>
            <p><strong>User:</strong> ${p.user?.firstName || ''} ${p.user?.lastName || ''}</p>
            <p><strong>Email:</strong> ${p.user?.email || p.userEmail || 'N/A'}</p>
            <p><strong>Course:</strong> ${p.course?.title || 'N/A'}</p>
            <p><strong>Amount:</strong> $${p.amount || 0}</p>
            <p><strong>Status:</strong> <span class="status ${p.status}">${p.status}</span></p>
            <p><strong>Created:</strong> ${new Date(p.createdAt).toLocaleString()}</p>
            ${p.verifiedAt ? `<p><strong>Verified:</strong> ${new Date(p.verifiedAt).toLocaleString()}</p>` : ''}
            ${p.rejectionReason ? `<p><strong>Rejection Reason:</strong> ${p.rejectionReason}</p>` : ''}
        </div>
        ${p.status === 'pending' ? `
            <div style="margin-top:20px;display:flex;gap:10px;">
                <button class="btn btn-approve" onclick="approvePurchase('${p._id}');closeModal();">✓ Approve</button>
                <button class="btn btn-reject" onclick="rejectPurchase('${p._id}');closeModal();">✗ Reject</button>
            </div>
        ` : ''}
    `;
    document.getElementById('purchaseModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('purchaseModal').style.display = 'none';
}

// Filter & Search Functions
function filterPurchases(status) {
    const filtered = status === 'all' ? allPurchasesData : allPurchasesData.filter(p => p.status === status);
    renderFilteredPurchases(filtered);
}

function searchPurchases(term) {
    const t = term.toLowerCase();
    const filtered = allPurchasesData.filter(p => 
        (p.orderId || '').toLowerCase().includes(t) ||
        (p.user?.email || p.userEmail || '').toLowerCase().includes(t) ||
        (p.user?.firstName || '').toLowerCase().includes(t) ||
        (p.course?.title || '').toLowerCase().includes(t)
    );
    renderFilteredPurchases(filtered);
}

function renderFilteredPurchases(purchases) {
    const tbody = document.getElementById('purchasesBody');
    tbody.innerHTML = purchases.length === 0 ? '<tr><td colspan="7" class="no-data">No matching purchases</td></tr>' : purchases.map(p => `
        <tr>
            <td><strong>${p.orderId || 'N/A'}</strong></td>
            <td>${p.user?.firstName || ''} ${p.user?.lastName || ''}<br><small style="color:#94a3b8">${p.user?.email || p.userEmail || ''}</small></td>
            <td>${p.course?.title || 'N/A'}</td>
            <td><strong>$${p.amount || 0}</strong></td>
            <td>${new Date(p.createdAt).toLocaleDateString()}</td>
            <td><span class="status ${p.status}">${p.status}</span></td>
            <td>
                <button class="btn btn-view" onclick="viewPurchase('${p._id}')">👁 View</button>
                ${p.status === 'pending' ? `<button class="btn btn-approve" onclick="approvePurchase('${p._id}')">✓</button><button class="btn btn-reject" onclick="rejectPurchase('${p._id}')">✗</button>` : ''}
            </td>
        </tr>
    `).join('');
}

function searchPending(term) {
    const t = term.toLowerCase();
    const filtered = pendingPurchasesData.filter(p => 
        (p.orderId || '').toLowerCase().includes(t) ||
        (p.user?.email || p.userEmail || '').toLowerCase().includes(t) ||
        (p.user?.firstName || '').toLowerCase().includes(t)
    );
    renderPendingPurchases(filtered);
}

function filterUsers(role) {
    const filtered = role === 'all' ? allUsersData : allUsersData.filter(u => u.role === role);
    renderFilteredUsers(filtered);
}

function searchUsers(term) {
    const t = term.toLowerCase();
    const filtered = allUsersData.filter(u => 
        (u.email || '').toLowerCase().includes(t) ||
        (u.firstName || '').toLowerCase().includes(t) ||
        (u.lastName || '').toLowerCase().includes(t)
    );
    renderFilteredUsers(filtered);
}

function renderFilteredUsers(users) {
    const tbody = document.getElementById('usersBody');
    tbody.innerHTML = users.length === 0 ? '<tr><td colspan="6" class="no-data">No matching users</td></tr>' : users.map(u => `
        <tr>
            <td><strong>${u.firstName || ''} ${u.lastName || ''}</strong></td>
            <td>${u.email}</td>
            <td><span class="status ${u.role}">${u.role}</span></td>
            <td>${new Date(u.createdAt).toLocaleDateString()}</td>
            <td>${u.lastLogin ? new Date(u.lastLogin).toLocaleDateString() : 'Never'}</td>
            <td><button class="btn btn-role" onclick="toggleRole('${u._id}', '${u.role}')">${u.role === 'admin' ? '👤 Make User' : '👑 Make Admin'}</button></td>
        </tr>
    `).join('');
}


// Auto-refresh
function startAutoRefresh() {
    refreshCountdown = 30;
    document.getElementById('autoRefresh').style.display = 'block';
    autoRefreshInterval = setInterval(() => {
        refreshCountdown--;
        document.getElementById('refreshCountdown').textContent = refreshCountdown;
        if (refreshCountdown <= 0) {
            refreshDashboard();
            refreshCountdown = 30;
        }
    }, 1000);
}

function stopAutoRefresh() {
    if (autoRefreshInterval) {
        clearInterval(autoRefreshInterval);
        document.getElementById('autoRefresh').style.display = 'none';
    }
}

async function refreshDashboard() {
    if (adminToken && connectionStatus) {
        await loadDashboardData();
        refreshCountdown = 30;
    }
}

// Logout
function logout() {
    if (confirm('Logout?')) {
        localStorage.removeItem('adminToken');
        adminToken = null;
        stopAutoRefresh();
        location.reload();
    }
}

// Event Listeners
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
document.getElementById('purchaseModal').addEventListener('click', (e) => { if (e.target.id === 'purchaseModal') closeModal(); });

// Connection check every 10 seconds
setInterval(checkConnection, 10000);

console.log('🎯 BullBear Admin Dashboard Loaded');
console.log('📋 Features: Stats, Purchases, Users, Filters, Search, Auto-refresh');