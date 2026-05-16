/* ============================================================
   SwapFit — App Logic
============================================================ */

// ---- DATA ----
const CLOTHES_DATA = [
  { id:1, emoji:'👗', name:'Vintage Floral Midi Dress', brand:'Zara', category:'Dresses', size:'S', condition:'Like New', value:800, location:'Mumbai', user:'Aisha K.', userInitials:'AK', userColor:'#F5C5B0', desc:'Absolutely obsessed with this dress but it became too small for me after moving cities and stress-eating lol. It has the most gorgeous floral print and falls mid-calf. Wore it twice.', stars:5 },
  { id:2, emoji:'🧥', name:'Oversized Denim Jacket', brand:'Vintage', category:'Outerwear', size:'M', condition:'Good', value:600, location:'Delhi', user:'Rohan S.', userInitials:'RS', userColor:'#C8BEE8', desc:'Found this at a thrift store, wore it maybe 10 times. Classic 90s oversized vibe. Some slight fading which just adds to the aesthetic ngl.', stars:4 },
  { id:3, emoji:'👕', name:'Graphic Tee — BAPE Collab', brand:'BAPE', category:'Tops', size:'L', condition:'Good', value:1200, location:'Bangalore', user:'Priya M.', userInitials:'PM', userColor:'#A8D5C2', desc:'Got this as a gift but not really my style tbh. It\'s a legit BAPE collab tee, 100% cotton, never been washed wrong. Comes with the OG tags.', stars:5 },
  { id:4, emoji:'👟', name:'Nike Air Force 1 Low', brand:'Nike', category:'Shoes', size:'M', condition:'Fair', value:900, location:'Hyderabad', user:'Dev T.', userInitials:'DT', userColor:'#F5E3A0', desc:'These got me through college. Some creasing on the toe box, soles still have great grip. Classic silhouette that never goes out of style.', stars:3 },
  { id:5, emoji:'👛', name:'Structured Mini Bag — Beige', brand:'H&M', category:'Accessories', size:'M', condition:'Like New', value:450, location:'Pune', user:'Shruti V.', userInitials:'SV', userColor:'#F2A07B', desc:'Bought this for a wedding and never used it after. Still has the tissue paper inside. Matches literally everything.', stars:5 },
  { id:6, emoji:'🩳', name:'Linen Wide-Leg Pants', brand:'Mango', category:'Bottoms', size:'XS', condition:'Good', value:550, location:'Chennai', user:'Aditi R.', userInitials:'AR', userColor:'#B5C9A8', desc:'The most comfortable pants I\'ve ever owned. Switching to a new wardrobe aesthetic so these need to go. Never dry-cleaned, always hand washed.', stars:4 },
  { id:7, emoji:'🧣', name:'Cashmere Knit Cardigan', brand:'Uniqlo', category:'Tops', size:'M', condition:'Like New', value:1500, location:'Mumbai', user:'Kavya P.', userInitials:'KP', userColor:'#C8BEE8', desc:'Uniqlo cashmere feels criminally good. Got two in the same color by mistake — listing the extra one. Washed gently, zero pilling.', stars:5 },
  { id:8, emoji:'👒', name:'Bucket Hat — Sage Green', brand:'New Era', category:'Accessories', size:'S', condition:'Good', value:350, location:'Kolkata', user:'Mehul D.', userInitials:'MD', userColor:'#A8D5C2', desc:'Perfect summer accessory but I moved somewhere colder. Barely worn, no stains, has the adjustable strap inside.', stars:4 },
];

const SWAP_REQUESTS = [
  { id:1, type:'incoming', from:'Rohan S.', fromInitials:'RS', fromColor:'#C8BEE8', theirItem:'Oversized Denim Jacket', yourItem:'Vintage Floral Midi Dress', status:'pending', date:'2 hours ago', value:'₹600 vs ₹800' },
  { id:2, type:'incoming', from:'Priya M.', fromInitials:'PM', fromColor:'#A8D5C2', theirItem:'BAPE Graphic Tee', yourItem:'Linen Wide-Leg Pants', status:'pending', date:'1 day ago', value:'₹1200 vs ₹550' },
  { id:3, type:'incoming', from:'Dev T.', fromInitials:'DT', fromColor:'#F5E3A0', theirItem:'Nike Air Force 1', yourItem:'Cashmere Cardigan', status:'pending', date:'3 days ago', value:'₹900 vs ₹1500' },
  { id:4, type:'outgoing', from:'Aisha K.', fromInitials:'AK', fromColor:'#F5C5B0', theirItem:'Mini Beige Bag', yourItem:'Bucket Hat', status:'accepted', date:'5 hours ago', value:'₹450 vs ₹350' },
  { id:5, type:'outgoing', from:'Shruti V.', fromInitials:'SV', fromColor:'#F2A07B', theirItem:'Vintage Floral Dress', yourItem:'BAPE Graphic Tee', status:'pending', date:'2 days ago', value:'₹800 vs ₹1200' },
  { id:6, type:'history', from:'Kavya P.', fromInitials:'KP', fromColor:'#C8BEE8', theirItem:'Linen Pants', yourItem:'Denim Jacket', status:'completed', date:'Apr 12, 2025', value:'₹550 vs ₹600' },
  { id:7, type:'history', from:'Mehul D.', fromInitials:'MD', fromColor:'#A8D5C2', theirItem:'Graphic Tee', yourItem:'Beige Mini Bag', status:'completed', date:'Mar 28, 2025', value:'₹1200 vs ₹450' },
  { id:8, type:'history', from:'Aditi R.', fromInitials:'AR', fromColor:'#B5C9A8', theirItem:'Nike Shoes', yourItem:'Bucket Hat', status:'completed', date:'Mar 10, 2025', value:'₹900 vs ₹350' },
];

const CHAT_USERS = [
  { id:1, name:'Aisha Khan', initials:'AK', color:'#F5C5B0', textColor:'#D4704A', re:'Vintage Denim Jacket', lastMsg:'That sounds fair to me! 🤝', time:'2m', unread:2 },
  { id:2, name:'Rohan Sharma', initials:'RS', color:'#C8BEE8', textColor:'#8A78C8', re:'BAPE Graphic Tee', lastMsg:'Can we meet in Bandra?', time:'1h', unread:1 },
  { id:3, name:'Priya M.', initials:'PM', color:'#A8D5C2', textColor:'#5A9E85', re:'Cashmere Cardigan', lastMsg:'Love the item btw!', time:'3h', unread:0 },
  { id:4, name:'Dev T.', initials:'DT', color:'#F5E3A0', textColor:'#8A7020', re:'Bucket Hat', lastMsg:'Shipped it yesterday 📦', time:'1d', unread:0 },
];

const CHAT_MESSAGES = {
  1: [
    { from:'them', text:'Hey! I saw your vintage denim jacket listing — I\'m obsessed 😭', time:'10:22 AM' },
    { from:'me', text:'Omg thank you! It\'s such a gem. What are you offering to swap?', time:'10:25 AM' },
    { from:'them', text:'I have a vintage floral midi dress from Zara, worn twice, listed at ₹800. Your jacket is at ₹750 — think we could make it work?', time:'10:26 AM' },
    { from:'me', text:'I literally love that dress 👗 The values are super close so yeah that works for me!', time:'10:30 AM' },
    { from:'them', text:'That sounds fair to me! 🤝', time:'10:31 AM' },
  ],
  2: [
    { from:'me', text:'Hi Rohan! I\'m interested in your BAPE tee', time:'Yesterday 4:00 PM' },
    { from:'them', text:'Hey! Yes it\'s available. What do you have to offer?', time:'Yesterday 4:15 PM' },
    { from:'me', text:'I have a cashmere Uniqlo cardigan, valued at ₹1500. The tee is ₹1200 — I\'d be open to a straight swap?', time:'Yesterday 4:18 PM' },
    { from:'them', text:'Can we meet in Bandra?', time:'Yesterday 5:00 PM' },
  ],
  3: [
    { from:'them', text:'Hey! Love the cashmere cardigan listing 💜', time:'Today 9:00 AM' },
    { from:'me', text:'Thanks! It\'s honestly SO soft', time:'Today 9:05 AM' },
    { from:'them', text:'Love the item btw!', time:'Today 9:06 AM' },
  ],
  4: [
    { from:'me', text:'Hi Dev, sent the bucket hat via Delhivery!', time:'Yesterday' },
    { from:'them', text:'Shipped it yesterday 📦', time:'Yesterday' },
    { from:'me', text:'Amazing! Tracking both 🙌', time:'Today' },
  ],
};

let currentPage = 'home';
let currentUser = null;
let activeChatUser = 1;
let activeSwapTab = 'incoming';

// ---- PAGE NAVIGATION ----
function showPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');
  currentPage = page;
  window.scrollTo(0, 0);

  // Page-specific init
  if (page === 'listings') renderListings(CLOTHES_DATA);
  if (page === 'home') renderHomePreview();
  if (page === 'swap') renderSwapRequests(activeSwapTab);
  if (page === 'chat') { renderChatUsers(); loadChat(activeChatUser); }
  if (page === 'dashboard') { renderDashListings(); renderDashHistory(); }
  if (page === 'admin') renderAdminTable('users');
}

// ---- HOME PREVIEW ----
function renderHomePreview() {
  const grid = document.getElementById('home-preview-cards');
  if (!grid) return;
  const preview = CLOTHES_DATA.slice(0, 4);
  grid.innerHTML = preview.map(item => clothCard(item, true)).join('');
}

// ---- CLOTHING CARD HTML ----
function clothCard(item, compact = false) {
  const condColor = { 'Like New': 'tag-sage', 'Good': 'tag-lavender', 'Fair': 'tag-butter' };
  const stars = '★'.repeat(item.stars) + '☆'.repeat(5 - item.stars);
  return `
    <div class="cloth-card" onclick="showDetail(${item.id})">
      <div class="cloth-img">${item.emoji}</div>
      <div class="cloth-info">
        <div class="cloth-title">${item.name}</div>
        <div class="cloth-meta">${item.brand} · Size ${item.size}</div>
        <div style="margin-top:6px;display:flex;gap:6px;flex-wrap:wrap;">
          <span class="tag ${condColor[item.condition] || 'tag-lavender'}" style="font-size:0.72rem;padding:3px 10px;">${item.condition}</span>
          <span class="tag tag-mint" style="font-size:0.72rem;padding:3px 10px;">📍 ${item.location}</span>
        </div>
        <div style="margin-top:4px;font-size:0.75rem;color:#E8B400;">${stars}</div>
        <div class="cloth-value">
          <span class="value-badge">₹${item.value}</span>
          <button class="swap-btn" onclick="event.stopPropagation();requestSwap(${item.id})">Swap ↔</button>
        </div>
      </div>
    </div>
  `;
}

// ---- LISTINGS RENDER ----
function renderListings(data) {
  const grid = document.getElementById('listings-grid');
  if (!grid) return;
  if (data.length === 0) {
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1;">
      <span class="emoji">🕵️</span>
      <h3>No items found</h3>
      <p class="text-muted text-sm mt-2">Try different filters!</p>
    </div>`;
    return;
  }
  grid.innerHTML = data.map(i => clothCard(i)).join('');
}

function filterListings() {
  const q = document.getElementById('search-input').value.toLowerCase();
  const cat = document.getElementById('filter-cat').value;
  const size = document.getElementById('filter-size').value;
  const cond = document.getElementById('filter-cond').value;

  const filtered = CLOTHES_DATA.filter(i => {
    const matchQ = !q || i.name.toLowerCase().includes(q) || i.brand.toLowerCase().includes(q);
    const matchCat = !cat || i.category === cat;
    const matchSize = !size || i.size === size;
    const matchCond = !cond || i.condition === cond;
    return matchQ && matchCat && matchSize && matchCond;
  });
  renderListings(filtered);
}

// ---- ITEM DETAIL ----
function showDetail(id) {
  const item = CLOTHES_DATA.find(i => i.id === id);
  if (!item) return;
  showPage('item-detail');

  const condColor = { 'Like New': '#5A9E85', 'Good': '#8A78C8', 'Fair': '#8A7020' };
  const condBg = { 'Like New': '#DDF2EB', 'Good': '#EBE7F7', 'Fair': '#FBF5D5' };
  const stars = '★'.repeat(item.stars) + '☆'.repeat(5 - item.stars);

  document.getElementById('item-detail-content').innerHTML = `
    <div>
      <div style="aspect-ratio:3/4;background:linear-gradient(135deg,var(--blush),var(--lavender));border-radius:var(--radius-xl);display:flex;align-items:center;justify-content:center;font-size:8rem;animation:float 4s ease-in-out infinite;">
        ${item.emoji}
      </div>
    </div>
    <div style="display:flex;flex-direction:column;gap:1.5rem;">
      <div>
        <div style="display:flex;gap:0.75rem;flex-wrap:wrap;margin-bottom:1rem;">
          <span class="tag" style="background:${condBg[item.condition]};color:${condColor[item.condition]};">✓ ${item.condition}</span>
          <span class="tag tag-mint">📍 ${item.location}</span>
        </div>
        <h1 style="font-size:2rem;font-weight:800;line-height:1.2;margin-bottom:0.5rem;">${item.name}</h1>
        <div style="color:var(--medium-brown);font-size:0.95rem;">${item.brand} · Size ${item.size} · ${item.category}</div>
        <div style="color:#E8B400;margin-top:6px;font-size:1rem;">${stars}</div>
      </div>

      <div style="background:var(--butter);border-radius:var(--radius-md);padding:1.25rem;display:flex;align-items:center;justify-content:space-between;">
        <div>
          <div class="text-muted text-sm">Estimated Swap Value</div>
          <div style="font-family:'Syne',sans-serif;font-size:2rem;font-weight:800;color:#6B5B10;">₹${item.value}</div>
        </div>
        <div style="font-size:2.5rem;">💰</div>
      </div>

      <p style="line-height:1.8;color:var(--medium-brown);">${item.desc}</p>

      <div style="background:var(--warm-white);border-radius:var(--radius-md);padding:1.25rem;border:1.5px solid var(--border);">
        <div style="display:flex;align-items:center;gap:10px;">
          <div class="avatar" style="background:${item.userColor};color:var(--charcoal);font-size:0.8rem;">${item.userInitials}</div>
          <div>
            <div style="font-weight:600;font-size:0.9rem;">${item.user}</div>
            <div class="text-muted text-sm">Listed by</div>
          </div>
        </div>
      </div>

      <div style="display:flex;gap:0.75rem;flex-wrap:wrap;">
        <button class="btn btn-primary" style="flex:1;justify-content:center;" onclick="requestSwap(${item.id})">Request Swap 🔄</button>
        <button class="btn btn-outline" onclick="startChat(1)" style="padding:14px 20px;">💬 Chat</button>
      </div>
    </div>
  `;

  // Calc
  renderCalc(item);
}

function renderCalc(item) {
  const yourValue = Math.round(item.value * 0.9);
  const theirValue = item.value;
  const max = Math.max(yourValue, theirValue);
  const diff = Math.abs(yourValue - theirValue);
  const fair = diff < 150;

  document.getElementById('calc-content').innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:center;">
      <div>
        <div class="text-muted text-sm mb-2" style="font-weight:500;">Their Item</div>
        <div style="font-weight:700;margin-bottom:8px;">${item.name}</div>
        <div style="background:var(--blush);border-radius:4px;height:14px;width:${Math.round((theirValue/max)*100)}%;transition:width 0.6s ease;"></div>
        <div style="font-family:'Syne',sans-serif;font-size:1.4rem;font-weight:800;margin-top:6px;">₹${theirValue}</div>
      </div>
      <div>
        <div class="text-muted text-sm mb-2" style="font-weight:500;">Your Offer (est.)</div>
        <div style="font-weight:700;margin-bottom:8px;">Your listed item</div>
        <div style="background:var(--sage);border-radius:4px;height:14px;width:${Math.round((yourValue/max)*100)}%;transition:width 0.6s ease;"></div>
        <div style="font-family:'Syne',sans-serif;font-size:1.4rem;font-weight:800;margin-top:6px;">₹${yourValue}</div>
      </div>
    </div>
    <div style="margin-top:1.5rem;padding:1rem;border-radius:var(--radius-md);background:${fair ? '#E0EDD9' : '#FAEEDA'};text-align:center;">
      <span style="color:${fair ? '#4A7A3D' : '#8A5010'};font-weight:600;">
        ${fair ? '✅ Fair swap! Difference is only ₹' + diff : '⚠️ Values differ by ₹' + diff + ' — you may want to negotiate'}
      </span>
    </div>
  `;
}

// ---- LIST ITEM ----
function updateEstimate() {
  const price = parseFloat(document.getElementById('item-price').value) || 0;
  const cond = document.getElementById('item-cond').value;
  const mult = { 'Like New': 0.65, 'Good': 0.45, 'Fair': 0.25 };
  const est = Math.round(price * (mult[cond] || 0.45));
  document.getElementById('est-value').textContent = est ? '₹' + est : '₹ —';
}

function fakeUpload(el) {
  el.querySelector('#upload-icon').textContent = '✅';
  el.querySelector('#upload-text').textContent = '3 photos uploaded!';
  el.style.borderColor = 'var(--sage-dark)';
  el.style.background = '#E8F5E2';
}

function submitListing() {
  const name = document.getElementById('item-name').value.trim();
  const brand = document.getElementById('item-brand').value.trim();
  const loc = document.getElementById('item-loc').value.trim();

  if (!name || !brand || !loc) {
    showToast('Please fill in all required fields! 📝', 'info');
    return;
  }

  // Add to data
  const newItem = {
    id: CLOTHES_DATA.length + 1,
    emoji: ['👗','👕','🧥','👟','👛','🧣','🎒','👒'][Math.floor(Math.random()*8)],
    name, brand,
    category: document.getElementById('item-cat').value,
    size: document.getElementById('item-size').value,
    condition: document.getElementById('item-cond').value,
    value: parseInt(document.getElementById('est-value').textContent.replace('₹','')) || 500,
    location: loc,
    user: 'Zara K.',
    userInitials: 'ZK',
    userColor: '#C8BEE8',
    desc: document.getElementById('item-desc').value || 'Great item in excellent condition!',
    stars: 5
  };
  CLOTHES_DATA.unshift(newItem);
  showToast('Item listed! Your piece is live 🚀', 'success');
  setTimeout(() => showPage('listings'), 1000);
}

// ---- SWAP REQUESTS ----
function renderSwapRequests(tab) {
  activeSwapTab = tab;
  const list = document.getElementById('swap-list');
  const filtered = SWAP_REQUESTS.filter(r => r.type === tab);

  if (!filtered.length) {
    list.innerHTML = `<div class="empty-state"><span class="emoji">📭</span><p>Nothing here yet!</p></div>`;
    return;
  }

  list.innerHTML = filtered.map(req => {
    const statusColors = { pending:'tag-butter', accepted:'tag-sage', completed:'tag-mint' };
    const statusLabels = { pending:'⏳ Pending', accepted:'✅ Accepted', completed:'🎉 Completed' };

    return `
      <div class="card" style="padding:1.5rem;">
        <div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap;">
          <div class="avatar" style="background:${req.fromColor};color:var(--charcoal);font-size:0.82rem;flex-shrink:0;">${req.fromInitials}</div>
          <div style="flex:1;min-width:200px;">
            <div style="font-weight:600;">${req.from}</div>
            <div class="text-muted text-sm">${req.theirItem} ↔ ${req.yourItem}</div>
            <div class="text-muted text-sm">${req.value}</div>
          </div>
          <div style="display:flex;align-items:center;gap:0.75rem;flex-wrap:wrap;">
            <span class="tag ${statusColors[req.status]}">${statusLabels[req.status]}</span>
            <span class="text-muted text-sm">${req.date}</span>
          </div>
          ${tab === 'incoming' && req.status === 'pending' ? `
            <div style="display:flex;gap:0.5rem;">
              <button class="btn btn-sage" style="padding:8px 16px;font-size:0.82rem;" onclick="acceptSwap(${req.id})">Accept ✅</button>
              <button class="btn btn-outline" style="padding:8px 16px;font-size:0.82rem;" onclick="rejectSwap(${req.id})">Decline</button>
              <button class="btn btn-lavender" style="padding:8px 16px;font-size:0.82rem;" onclick="showPage('chat')">Chat 💬</button>
            </div>
          ` : ''}
          ${tab === 'outgoing' ? `
            <button class="btn btn-outline" style="padding:8px 16px;font-size:0.82rem;" onclick="showPage('chat')">Message 💬</button>
          ` : ''}
        </div>
      </div>
    `;
  }).join('');
}

function switchSwapTab(tab, btn) {
  document.querySelectorAll('.swap-tab-btn').forEach(b => {
    b.style.background = 'transparent';
    b.style.color = 'var(--medium-brown)';
  });
  btn.style.background = 'var(--charcoal)';
  btn.style.color = 'var(--cream)';
  renderSwapRequests(tab);
}

function acceptSwap(id) {
  const req = SWAP_REQUESTS.find(r => r.id === id);
  if (req) req.status = 'accepted';
  renderSwapRequests('incoming');
  showToast('Swap accepted! Chat to arrange details 🎉', 'success');
}

function rejectSwap(id) {
  const idx = SWAP_REQUESTS.findIndex(r => r.id === id);
  if (idx > -1) SWAP_REQUESTS.splice(idx, 1);
  renderSwapRequests('incoming');
  showToast('Swap declined.', 'info');
}

function requestSwap(itemId) {
  const item = CLOTHES_DATA.find(i => i.id === itemId);
  if (!currentUser) {
    showToast('Log in to send swap requests! 🔑', 'info');
    showPage('login');
    return;
  }
  showToast(`Swap request sent for ${item.name}! ✌️`, 'success');
}

// ---- CHAT ----
function renderChatUsers() {
  const container = document.getElementById('chat-users');
  container.innerHTML = CHAT_USERS.map(u => `
    <div class="chat-user-item ${u.id === activeChatUser ? 'active' : ''}" onclick="loadChat(${u.id})">
      <div class="avatar" style="background:${u.color};color:var(--charcoal);font-size:0.78rem;">${u.initials}</div>
      <div style="flex:1;min-width:0;">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span style="font-weight:600;font-size:0.9rem;">${u.name}</span>
          <span class="text-muted" style="font-size:0.72rem;">${u.time}</span>
        </div>
        <div class="text-muted text-sm" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${u.lastMsg}</div>
      </div>
      ${u.unread ? `<div style="background:var(--peach);color:var(--charcoal);width:18px;height:18px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.7rem;font-weight:700;flex-shrink:0;">${u.unread}</div>` : ''}
    </div>
  `).join('');
}

function loadChat(userId) {
  activeChatUser = userId;
  const user = CHAT_USERS.find(u => u.id === userId);
  if (!user) return;

  document.getElementById('chat-partner-name').textContent = user.name;
  document.getElementById('chat-item-name').textContent = 'Re: ' + user.re;
  document.getElementById('chat-partner-avatar').textContent = user.initials;
  document.getElementById('chat-partner-avatar').style.background = user.color;

  const msgs = CHAT_MESSAGES[userId] || [];
  const container = document.getElementById('chat-messages');
  container.innerHTML = msgs.map(m => `
    <div class="msg ${m.from}">
      <div class="msg-bubble">${m.text}</div>
      <div class="msg-time">${m.time}</div>
    </div>
  `).join('');
  container.scrollTop = container.scrollHeight;

  // Mark as read
  const u = CHAT_USERS.find(u => u.id === userId);
  if (u) u.unread = 0;
  renderChatUsers();

  document.querySelectorAll('.chat-user-item').forEach((el, i) => {
    if (i === userId - 1) el.classList.add('active');
    else el.classList.remove('active');
  });
}

function sendMsg() {
  const input = document.getElementById('chat-input-field');
  const text = input.value.trim();
  if (!text) return;

  if (!CHAT_MESSAGES[activeChatUser]) CHAT_MESSAGES[activeChatUser] = [];
  CHAT_MESSAGES[activeChatUser].push({ from: 'me', text, time: 'Just now' });

  input.value = '';
  loadChat(activeChatUser);

  // Simulate reply
  const replies = [
    'Sounds good! 🙌',
    'Totally down for that!',
    'Let me check and get back to you 👀',
    'Yes!! When works for you?',
    'Amazing, I was literally just thinking about this 😭',
  ];
  setTimeout(() => {
    CHAT_MESSAGES[activeChatUser].push({ from: 'them', text: replies[Math.floor(Math.random()*replies.length)], time: 'Just now' });
    loadChat(activeChatUser);
  }, 1200);
}

function startChat(userId) {
  showPage('chat');
  loadChat(userId);
}

// ---- DASHBOARD ----
function renderDashListings() {
  const myItems = CLOTHES_DATA.slice(0, 5);
  const grid = document.getElementById('dash-listings');
  if (!grid) return;
  grid.innerHTML = myItems.map(item => `
    <div class="cloth-card">
      <div class="cloth-img">${item.emoji}</div>
      <div class="cloth-info">
        <div class="cloth-title" style="font-size:0.9rem;">${item.name}</div>
        <div class="cloth-meta">${item.brand} · ${item.size}</div>
        <div style="margin-top:6px;display:flex;align-items:center;justify-content:space-between;">
          <span class="value-badge">₹${item.value}</span>
          <button onclick="showToast('Listing removed!','info')" style="background:none;border:none;color:var(--light-brown);cursor:pointer;font-size:0.8rem;">🗑</button>
        </div>
      </div>
    </div>
  `).join('');
}

function renderDashHistory() {
  const tbody = document.querySelector('#dash-history tbody');
  if (!tbody) return;
  const history = SWAP_REQUESTS.filter(r => r.type === 'history');
  tbody.innerHTML = history.map(r => `
    <tr>
      <td style="font-weight:500;">${r.theirItem}</td>
      <td>${r.from}</td>
      <td>${r.date}</td>
      <td><span class="tag tag-sage" style="font-size:0.75rem;">✅ Completed</span></td>
    </tr>
  `).join('');
}

// ---- ADMIN ----
function renderAdminTable(tab) {
  const table = document.getElementById('admin-table-body');

  const tables = {
    users: {
      headers: ['User', 'Location', 'Listings', 'Swaps', 'Joined', 'Action'],
      rows: [
        ['Aisha Khan', 'Mumbai', '5', '8', 'Mar 2025', 'warn'],
        ['Rohan Sharma', 'Delhi', '3', '4', 'Feb 2025', 'ok'],
        ['Priya M.', 'Bangalore', '7', '12', 'Jan 2025', 'ok'],
        ['Dev T.', 'Hyderabad', '2', '3', 'Apr 2025', 'ok'],
        ['Shruti V.', 'Pune', '4', '6', 'Mar 2025', 'ok'],
        ['Aditi R.', 'Chennai', '6', '9', 'Feb 2025', 'warn'],
      ]
    },
    listings: {
      headers: ['Item', 'Category', 'Seller', 'Value', 'Status', 'Action'],
      rows: [
        ['Vintage Floral Dress', 'Dresses', 'Aisha K.', '₹800', 'Active', 'ok'],
        ['Oversized Denim Jacket', 'Outerwear', 'Rohan S.', '₹600', 'Active', 'ok'],
        ['BAPE Graphic Tee', 'Tops', 'Priya M.', '₹1200', 'Active', 'ok'],
        ['Nike Air Force 1', 'Shoes', 'Dev T.', '₹900', 'Flagged', 'warn'],
        ['Mini Beige Bag', 'Accessories', 'Shruti V.', '₹450', 'Active', 'ok'],
      ]
    },
    swaps: {
      headers: ['Item A', 'Item B', 'Users', 'Value Match', 'Status', 'Date'],
      rows: [
        ['Floral Dress', 'Denim Jacket', 'Aisha ↔ Rohan', '₹50 diff', 'Completed', 'Apr 12'],
        ['BAPE Tee', 'Mini Bag', 'Priya ↔ Shruti', '₹750 diff', 'Pending', 'May 2'],
        ['Nike Shoes', 'Bucket Hat', 'Dev ↔ Mehul', '₹550 diff', 'Completed', 'Mar 28'],
        ['Cashmere Cardi', 'Linen Pants', 'Kavya ↔ Aditi', '₹950 diff', 'Negotiating', 'May 10'],
      ]
    },
    disputes: {
      headers: ['Dispute ID', 'Users', 'Item', 'Reason', 'Status', 'Action'],
      rows: [
        ['#D001', 'Dev T. vs Mehul D.', 'Nike Air Force 1', 'Item not as described', 'Open', 'warn'],
        ['#D002', 'Priya M. vs Shruti V.', 'BAPE Tee', 'Swap not completed', 'Resolved', 'ok'],
      ]
    }
  };

  const t = tables[tab];
  if (!t) return;

  table.innerHTML = `
    <thead><tr>${t.headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>
    <tbody>
      ${t.rows.map(row => `
        <tr>
          ${row.slice(0,-1).map((cell,i) => `<td>${cell}</td>`).join('')}
          <td>
            ${row[row.length-1] === 'warn'
              ? `<button class="btn" style="padding:5px 12px;font-size:0.78rem;background:var(--blush);color:var(--peach-dark);" onclick="showToast('Action taken!','success')">⚠️ Review</button>`
              : `<button class="btn" style="padding:5px 12px;font-size:0.78rem;background:#E0EDD9;color:#4A7A3D;" onclick="showToast('All good!','success')">✅ OK</button>`
            }
          </td>
        </tr>
      `).join('')}
    </tbody>
  `;
}

function switchAdminTab(tab, btn) {
  document.querySelectorAll('.admin-tab').forEach(b => {
    b.style.fontWeight = '500';
    b.style.color = 'var(--medium-brown)';
    b.style.borderBottom = '2.5px solid transparent';
  });
  btn.style.fontWeight = '600';
  btn.style.color = 'var(--charcoal)';
  btn.style.borderBottom = '2.5px solid var(--charcoal)';
  renderAdminTable(tab);
}

// ---- AUTH ----
function switchAuthTab(tab) {
  const loginForm = document.getElementById('form-login');
  const registerForm = document.getElementById('form-register');
  const loginBtn = document.getElementById('tab-login');
  const regBtn = document.getElementById('tab-register');

  if (tab === 'login') {
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
    loginBtn.style.background = 'var(--charcoal)';
    loginBtn.style.color = 'var(--cream)';
    regBtn.style.background = 'transparent';
    regBtn.style.color = 'var(--medium-brown)';
  } else {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
    regBtn.style.background = 'var(--charcoal)';
    regBtn.style.color = 'var(--cream)';
    loginBtn.style.background = 'transparent';
    loginBtn.style.color = 'var(--medium-brown)';
  }
}

function doLogin() {
  const email = document.getElementById('login-email').value.trim();
  const pass = document.getElementById('login-pass').value;
  if (!email || !pass) { showToast('Please fill in your details!', 'info'); return; }

  currentUser = { name: 'Zara', email };
  document.getElementById('nav-auth-btn').textContent = 'Zara 👤';
  document.getElementById('nav-auth-btn').onclick = () => showPage('dashboard');
  showToast('Welcome back, Zara! ✨', 'success');
  showPage('listings');
}

function doRegister() {
  currentUser = { name: 'New User' };
  document.getElementById('nav-auth-btn').textContent = 'Profile 👤';
  document.getElementById('nav-auth-btn').onclick = () => showPage('dashboard');
  showToast('Account created! Welcome to SwapFit 🌿', 'success');
  showPage('listings');
}

// ---- MODAL ----
function showSwapModal() {
  document.getElementById('swap-modal').classList.add('open');
}
function closeModal(e) {
  if (e.target === e.currentTarget) e.currentTarget.classList.remove('open');
}
function confirmSwap() {
  document.getElementById('swap-modal').classList.remove('open');
  showToast('Swap confirmed! Happy swapping 🎉', 'success');
}

// ---- TOAST ----
function showToast(msg, type = 'success') {
  const container = document.getElementById('toasts');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = (type === 'success' ? '✅ ' : 'ℹ️ ') + msg;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  renderHomePreview();
});