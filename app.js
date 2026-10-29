/* ===== INTERACTIVE JAVASCRIPT ===== */

// ---- SIDEBAR TOGGLE ----
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}

// ---- TAB SWITCHING ----
function switchTab(tab, el) {
  event.preventDefault();
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  el.classList.add('active');
}

// ---- GENERATE GITHUB HEATMAP ----
function generateHeatmap() {
  const heatmap = document.getElementById('heatmap');
  if (!heatmap) return;
  heatmap.innerHTML = '';
  const levels = [0, 0, 0, 1, 1, 2, 2, 3, 4];
  for (let i = 0; i < 90; i++) {
    const cell = document.createElement('div');
    cell.className = 'hm-cell';
    const lvl = levels[Math.floor(Math.random() * levels.length)];
    if (lvl > 0) cell.classList.add(`l${lvl}`);
    cell.title = `${Math.floor(Math.random() * 10)} contributions`;
    heatmap.appendChild(cell);
  }
}

// ---- OPEN NOTE (ANIMATION) ----
function openNote(el) {
  el.style.background = 'var(--bg3)';
  el.style.borderColor = 'var(--border-glow)';
  setTimeout(() => {
    el.style.background = '';
    el.style.borderColor = '';
  }, 600);
}

// ---- JOIN SESSION ----
function joinSession() {
  const btn = document.querySelector('.btn-join');
  btn.textContent = '● Connecting...';
  btn.style.opacity = '0.7';
  setTimeout(() => {
    btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Joined!`;
    btn.style.opacity = '1';
    btn.style.background = 'linear-gradient(135deg, #00FF9D, #00cc7a)';
    setTimeout(() => {
      btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg> Join Session`;
      btn.style.background = '';
    }, 2500);
  }, 1400);
}

// ---- AI CHAT ----
const aiResponses = [
  "Great question! Let me search through your notes... 🔍\n\nBased on your DSA notes, here's a concise explanation with examples.",
  "I found this in your **Process Scheduling** notes! \n\n• FCFS: First-Come, First-Served — simple but can cause convoy effect\n• SJF: Shortest Job First — optimal for average wait time\n• Round Robin: Each process gets equal <code>time quantum</code>",
  "That's related to your **DBMS** chapter on normalization! \n\n**1NF** → Atomic values only\n**2NF** → No partial dependencies\n**3NF** → No transitive dependencies",
  "Here's a quick breakdown from your CN notes:\n\nThe **OSI Model** has 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, Application. Remember: **'Please Do Not Throw Sausage Pizza Away'** 🍕",
];
let aiResponseIndex = 0;

function handleAIInput(e) {
  if (e.key === 'Enter') sendAIMessage();
}

function sendAIMessage() {
  const input = document.getElementById('ai-input');
  const chat = document.getElementById('ai-chat');
  const msg = input.value.trim();
  if (!msg) return;

  // User message
  const userMsg = document.createElement('div');
  userMsg.className = 'chat-msg user';
  userMsg.innerHTML = `<div class="chat-bubble user-bubble">${msg}</div>`;
  chat.appendChild(userMsg);
  input.value = '';

  // Typing indicator
  const typing = document.createElement('div');
  typing.className = 'chat-msg ai';
  typing.innerHTML = `
    <div class="chat-avatar-ai">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
    </div>
    <div class="chat-bubble" style="opacity:0.6;">
      <span class="typing-dots">●&nbsp;●&nbsp;●</span>
    </div>`;
  chat.appendChild(typing);
  chat.scrollTop = chat.scrollHeight;

  // AI response after delay
  setTimeout(() => {
    typing.remove();
    const resp = aiResponses[aiResponseIndex % aiResponses.length];
    aiResponseIndex++;
    const aiMsg = document.createElement('div');
    aiMsg.className = 'chat-msg ai';
    aiMsg.innerHTML = `
      <div class="chat-avatar-ai">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
      </div>
      <div class="chat-bubble">${resp.replace(/\n/g, '<br>').replace(/\*\*(.+?)\*\*/g, '<strong style="color:var(--cyan)">$1</strong>').replace(/`([^`]+)`/g, '<code>$1</code>')}</div>`;
    chat.appendChild(aiMsg);
    chat.scrollTop = chat.scrollHeight;
  }, 1200);
}

// ---- SUBJECT CHIP FILTER ----
document.addEventListener('DOMContentLoaded', () => {
  generateHeatmap();

  // Subject chip toggle
  document.querySelectorAll('.subj-chip').forEach(chip => {
    chip.addEventListener('click', function () {
      document.querySelectorAll('.subj-chip').forEach(c => c.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Animate bars with stagger
  document.querySelectorAll('.bar-fill').forEach((bar, i) => {
    bar.style.animationDelay = `${i * 0.07}s`;
  });

  // Animate progress bars
  document.querySelectorAll('.progress-bar').forEach((bar, i) => {
    bar.style.transition = `width 1.2s cubic-bezier(0.4,0,0.2,1) ${i * 0.15}s`;
  });

  // Keyboard shortcut for search
  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      document.getElementById('search-input').focus();
    }
  });

  // Typing dots animation
  const style = document.createElement('style');
  style.textContent = `
    .typing-dots { animation: typingAnim 1s steps(3, end) infinite; }
    @keyframes typingAnim {
      0% { opacity: 0.2; }
      50% { opacity: 1; }
      100% { opacity: 0.2; }
    }
  `;
  document.head.appendChild(style);

  // Close sidebar on outside click (mobile)
  document.querySelector('.main-wrapper').addEventListener('click', () => {
    const sidebar = document.getElementById('sidebar');
    if (sidebar.classList.contains('open')) {
      sidebar.classList.remove('open');
    }
  });

  console.log('%cPeervo Dashboard 🚀', 'color:#00D9FF;font-size:22px;font-weight:900;');
  console.log('%cBuilt with ❤️ for MSBTE K-Scheme', 'color:#9B59FF;font-size:12px;');
});
