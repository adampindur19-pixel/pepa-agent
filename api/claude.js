<!DOCTYPE html>
<html lang="cs">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover"/>
<meta name="theme-color" content="#7C6FF7"/>
<meta name="mobile-web-app-capable" content="yes"/>
<meta name="apple-mobile-web-app-capable" content="yes"/>
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
<meta name="apple-mobile-web-app-title" content="PEPA"/>
<link rel="manifest" href="/manifest.json"/>
<link rel="apple-touch-icon" href="/icon-192.png"/>
<title>PEPA — Back Office Agent · Bohemia Reality</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=DM+Serif+Display&display=swap" rel="stylesheet">
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.production.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prop-types/15.8.1/prop-types.min.js"></script>
<script src="https://unpkg.com/recharts@2.12.7/umd/Recharts.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<style>
/* ===== RESET & TOKENS ===== */
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#ECEEF5;
  --surface:#FFFFFF;
  --surface2:#F5F6FA;
  --sidebar:#1C1E2E;
  --sidebar-icon:#6B7280;
  --sidebar-active:#FFFFFF;
  --sidebar-active-bg:rgba(255,255,255,.12);
  --accent:#7C6FF7;
  --accent2:#A78BFA;
  --accent-dim:rgba(124,111,247,.1);
  --accent-border:rgba(124,111,247,.25);
  --green:#22C55E;
  --green-dim:rgba(34,197,94,.1);
  --orange:#F59E0B;
  --orange-dim:rgba(245,158,11,.1);
  --red:#EF4444;
  --red-dim:rgba(239,68,68,.1);
  --border:rgba(0,0,0,.06);
  --text:#111827;
  --text2:#6B7280;
  --text3:#9CA3AF;
  --shadow:0 2px 12px rgba(124,111,247,.08);
  --shadow-lg:0 8px 32px rgba(124,111,247,.12);
  --r:16px;--rs:10px;--rx:20px;
}
[data-theme="dark"]{
  --bg:#0F1117;
  --surface:#1A1D2E;
  --surface2:#252839;
  --sidebar:#111320;
  --border:rgba(255,255,255,.06);
  --text:#F9FAFB;
  --text2:#9CA3AF;
  --text3:#6B7280;
  --shadow:0 2px 12px rgba(0,0,0,.3);
  --shadow-lg:0 8px 32px rgba(0,0,0,.4);
}
html,body,#root{height:100%;width:100%;overflow:hidden}
body{font-family:'Inter',-apple-system,sans-serif;background:var(--bg);color:var(--text);font-size:14px;line-height:1.5;-webkit-font-smoothing:antialiased}
button{font-family:'Inter',sans-serif;cursor:pointer}
input,textarea{font-family:'Inter',sans-serif}

/* ===== APP SHELL ===== */
.app{display:flex;height:100vh;width:100vw;overflow:hidden}

/* ===== ICON SIDEBAR ===== */
.sidebar{
  width:220px;flex-shrink:0;
  background:var(--sidebar);
  display:flex;flex-direction:column;align-items:stretch;
  padding:16px 0;gap:0;
  z-index:50;overflow:hidden;
}
.sidebar-logo{display:none}
.sidebar-hamburger-btn{display:none}
.sidebar-nav{display:flex;flex-direction:column;gap:2px;flex:1;width:100%;padding:0 8px}
.sidebar-btn{
  width:100%;height:40px;border-radius:10px;
  border:none;background:none;
  color:rgba(255,255,255,.5);
  display:flex;align-items:center;gap:10px;
  padding:0 14px;
  font-size:15px;cursor:pointer;
  transition:all .2s;position:relative;
  text-align:left;white-space:nowrap;overflow:hidden;
}
.sidebar-btn:hover{background:rgba(255,255,255,.07);color:#E5E7EB}
.sidebar-btn.active{background:var(--sidebar-active-bg);color:var(--sidebar-active)}
.sidebar-btn.active::before{
  content:'';position:absolute;left:-8px;top:50%;transform:translateY(-50%);
  width:3px;height:20px;background:var(--accent);border-radius:0 2px 2px 0;
}
.sidebar-btn span{font-size:13px;font-weight:500;color:rgba(255,255,255,.55);overflow:hidden;text-overflow:ellipsis}
.sidebar-btn.active span{color:white;font-weight:600}
.sidebar-btn:hover span{color:rgba(255,255,255,.85)}
.sidebar-badge{
  position:absolute;top:6px;right:6px;
  width:16px;height:16px;border-radius:8px;
  background:var(--red);color:white;
  font-size:9px;font-weight:700;
  display:flex;align-items:center;justify-content:center;
}
.sidebar-divider{width:calc(100% - 20px);height:1px;background:rgba(255,255,255,.08);margin:8px 10px}
.sidebar-bottom{padding:8px 10px 16px;display:flex;flex-direction:column;gap:2px;width:100%}
.sidebar-avatar{
  width:100%;height:40px;border-radius:10px;
  background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.1);
  color:rgba(255,255,255,.7);font-size:13px;font-weight:600;
  display:flex;align-items:center;gap:10px;padding:0 10px;
  cursor:pointer;transition:all .2s;position:relative;
}
.sidebar-avatar:hover{background:rgba(255,255,255,.12);color:white}
.sidebar-avatar-dot{width:28px;height:28px;border-radius:8px;flex-shrink:0;background:linear-gradient(135deg,var(--accent),var(--accent2));display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:white}
.sidebar-avatar-name{font-size:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1}
.sidebar-avatar:hover{border-color:var(--accent)}

/* User dropdown */
.user-dropdown{
  position:absolute;bottom:calc(100% + 6px);left:0;right:0;
  background:var(--surface);border:1px solid var(--border);
  border-radius:var(--r);padding:8px;min-width:180px;
  box-shadow:var(--shadow-lg);z-index:200;
}
.user-info{padding:8px 10px 10px;border-bottom:1px solid var(--border);margin-bottom:6px}
.user-name{font-size:13px;font-weight:600;color:var(--text)}
.user-email{font-size:11px;color:var(--text3);margin-top:2px}
.dropdown-btn{
  display:flex;align-items:center;gap:8px;width:100%;
  padding:8px 10px;border:none;background:none;
  color:var(--text2);font-size:13px;border-radius:var(--rs);
  transition:all .15s;text-align:left;
}
.dropdown-btn:hover{background:var(--surface2);color:var(--text)}

/* ===== MAIN CONTENT ===== */
.main{flex:1;min-width:0;display:flex;flex-direction:column;overflow:hidden}

/* ===== TOP BAR ===== */
.topbar{
  display:flex;align-items:center;gap:16px;
  padding:14px 28px;
  background:var(--surface);
  border-bottom:1px solid var(--border);
  flex-shrink:0;
}
.topbar-title{
  font-family:'DM Serif Display',serif;
  font-size:18px;color:var(--text);flex:1;
}
.topbar-greeting{font-size:13px;color:var(--text2);font-weight:400;margin-left:4px}
.topbar-btn{
  width:36px;height:36px;border-radius:10px;
  border:1px solid var(--border);background:var(--surface2);
  color:var(--text2);font-size:16px;
  display:flex;align-items:center;justify-content:center;
  transition:all .15s;
}
.topbar-btn:hover{border-color:var(--accent-border);color:var(--accent);background:var(--accent-dim)}

/* ===== HOME DASHBOARD ===== */
.home-view{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:14px}
.home-view::-webkit-scrollbar{width:4px}
.home-view::-webkit-scrollbar-thumb{background:var(--border);border-radius:2px}

/* Welcome banner */
.welcome-banner{
  background:linear-gradient(135deg,var(--accent) 0%,var(--accent2) 50%,#C084FC 100%);
  border-radius:var(--rx);padding:32px 36px;
  display:flex;align-items:center;justify-content:space-between;
  color:white;position:relative;overflow:hidden;min-height:120px;
}
.welcome-banner::before{
  content:'';position:absolute;top:-40px;right:-40px;
  width:200px;height:200px;border-radius:50%;
  background:rgba(255,255,255,.07);
}
.welcome-banner::after{
  content:'';position:absolute;bottom:-60px;right:80px;
  width:150px;height:150px;border-radius:50%;
  background:rgba(255,255,255,.05);
}
.welcome-left h1{
  font-family:'DM Serif Display',serif;
  font-size:32px;font-weight:400;margin-bottom:6px;
}
.welcome-left p{font-size:13px;opacity:.8;margin-bottom:0}
.welcome-stats{display:flex;gap:32px;position:relative;z-index:1}
.welcome-stat-val{font-size:32px;font-weight:700;font-family:'DM Serif Display',serif;line-height:1}
.welcome-stat-lbl{font-size:11px;opacity:.7;text-transform:uppercase;letter-spacing:.06em;margin-top:4px}
.welcome-btn{
  background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.3);
  color:white;padding:10px 20px;border-radius:var(--rs);font-size:13px;font-weight:600;
  transition:all .2s;backdrop-filter:blur(4px);position:relative;z-index:1;
}
.welcome-btn:hover{background:rgba(255,255,255,.25)}

/* Grid layout */
.home-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.home-grid-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px}
.span-2{grid-column:span 2}

/* Cards */
.card{
  background:var(--surface);border:1px solid var(--border);
  border-radius:var(--r);padding:20px;
  box-shadow:var(--shadow);
  transition:all .2s;
}
.card:hover{box-shadow:var(--shadow-lg);transform:translateY(-1px)}
.card-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}
.card-title{font-size:14px;font-weight:600;color:var(--text)}
.card-sub{font-size:12px;color:var(--text3);margin-top:2px}
.card-action{font-size:11px;color:var(--accent);cursor:pointer;font-weight:600;border:none;background:none;padding:4px 8px;border-radius:6px;transition:all .15s}
.card-action:hover{background:var(--accent-dim)}

/* KPI mini cards */
.kpi-mini{display:flex;align-items:center;gap:12px}
.kpi-mini-icon{
  width:42px;height:42px;border-radius:12px;
  display:flex;align-items:center;justify-content:center;
  font-size:18px;flex-shrink:0;
}
.kpi-mini-val{font-size:22px;font-weight:700;color:var(--text);line-height:1;font-family:'DM Serif Display',serif}
.kpi-mini-lbl{font-size:12px;color:var(--text2);margin-top:2px}
.kpi-mini-badge{
  margin-left:auto;font-size:11px;font-weight:600;
  padding:3px 8px;border-radius:20px;
}

/* Alert items */
.alert-item{
  display:flex;align-items:flex-start;gap:10px;
  padding:10px 12px;border-radius:var(--rs);
  cursor:pointer;transition:all .15s;margin-bottom:6px;
  border:1px solid var(--border);
}
.alert-item:hover{border-color:var(--accent-border);background:var(--accent-dim)}
.alert-item:last-child{margin-bottom:0}
.alert-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0;margin-top:4px}
.alert-body{flex:1}
.alert-title{font-size:13px;font-weight:500;color:var(--text)}
.alert-desc{font-size:11px;color:var(--text3);margin-top:2px;line-height:1.4}
.alert-priority{font-size:10px;font-weight:600;padding:2px 7px;border-radius:10px;flex-shrink:0;margin-top:2px}

/* Email preview */
.email-item{
  display:flex;align-items:flex-start;gap:10px;
  padding:10px 0;border-bottom:1px solid var(--border);
  cursor:pointer;transition:all .15s;
}
.email-item:last-child{border-bottom:none;padding-bottom:0}
.email-item:hover{opacity:.7}
.email-avatar{
  width:32px;height:32px;border-radius:8px;
  background:var(--accent-dim);color:var(--accent);
  font-size:12px;font-weight:700;
  display:flex;align-items:center;justify-content:center;flex-shrink:0;
}
.email-from{font-size:12px;font-weight:600;color:var(--text)}
.email-subject{font-size:12px;color:var(--text2);margin-top:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:200px}
.email-date{font-size:11px;color:var(--text3);margin-left:auto;flex-shrink:0}

/* Calendar items */
.cal-item{
  display:flex;gap:10px;align-items:flex-start;
  padding:8px 0;border-bottom:1px solid var(--border);
}
.cal-item:last-child{border-bottom:none}
.cal-time{font-size:11px;font-weight:600;color:var(--text3);width:80px;flex-shrink:0;padding-top:2px}
.cal-label{font-size:12px;color:var(--text);flex:1;line-height:1.4}
.cal-dot{width:8px;height:8px;border-radius:50%;background:var(--accent);flex-shrink:0;margin-top:4px}

/* Task items */
.task-row{
  display:flex;align-items:center;gap:10px;
  padding:8px 0;border-bottom:1px solid var(--border);
}
.task-row:last-child{border-bottom:none}
.task-check{
  width:18px;height:18px;border-radius:5px;
  border:2px solid var(--border);background:none;
  cursor:pointer;flex-shrink:0;display:flex;align-items:center;justify-content:center;
  font-size:10px;transition:all .15s;
}
.task-check:hover{border-color:var(--accent)}
.task-check.done{background:var(--green);border-color:var(--green);color:white}
.task-label{flex:1;font-size:13px;color:var(--text);line-height:1.4}
.task-label.done{text-decoration:line-through;color:var(--text3)}
.task-del-btn{background:none;border:none;color:var(--text3);font-size:14px;opacity:0;transition:all .15s}
.task-row:hover .task-del-btn{opacity:1}
.task-del-btn:hover{color:var(--red)}

/* Add task */
.add-task-row{display:flex;gap:8px;margin-top:12px}
.add-task-inp{
  flex:1;background:var(--surface2);border:1px solid var(--border);
  border-radius:var(--rs);padding:8px 12px;font-size:13px;color:var(--text);outline:none;
  transition:border-color .15s;
}
.add-task-inp:focus{border-color:var(--accent-border)}
.add-task-inp::placeholder{color:var(--text3)}
.add-task-submit{
  background:var(--accent);color:white;border:none;
  padding:8px 14px;border-radius:var(--rs);font-size:13px;font-weight:600;
  transition:all .15s;
}
.add-task-submit:hover{background:var(--accent2)}

/* ===== CHAT VIEW ===== */
.chat-view{flex:1;display:flex;flex-direction:column;overflow:hidden}
.chat-header{
  padding:14px 24px;border-bottom:1px solid var(--border);
  background:var(--surface);flex-shrink:0;
  display:flex;align-items:center;justify-content:space-between;
}
.chat-header-left{display:flex;flex-direction:column}
.chat-title{font-size:15px;font-weight:600;color:var(--text);display:flex;align-items:center;gap:8px}
.online-dot{width:7px;height:7px;border-radius:50%;background:var(--green);box-shadow:0 0 8px rgba(34,197,94,.5);animation:pulse 2s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
.chat-sub{font-size:11px;color:var(--text3);margin-top:2px}
.chat-actions{display:flex;gap:6px}
.chat-btn{
  background:var(--surface2);border:1px solid var(--border);
  color:var(--text2);padding:6px 12px;border-radius:var(--rs);
  font-size:12px;font-weight:500;transition:all .15s;
}
.chat-btn:hover{border-color:var(--accent-border);color:var(--accent);background:var(--accent-dim)}

/* Messages */
.messages-area{flex:1;overflow-y:auto;padding:20px 0}
.messages-area::-webkit-scrollbar{width:4px}
.messages-area::-webkit-scrollbar-thumb{background:var(--border);border-radius:2px}
.message{display:flex;gap:10px;padding:6px 24px;max-width:860px;margin:0 auto;width:100%;animation:fadeIn .2s ease}
@keyframes fadeIn{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:translateY(0)}}
.message.user{flex-direction:row-reverse}
.msg-avatar{
  width:32px;height:32px;border-radius:10px;
  display:flex;align-items:center;justify-content:center;
  flex-shrink:0;margin-top:2px;font-size:15px;
}
.message.assistant .msg-avatar{
  background:linear-gradient(135deg,var(--accent),var(--accent2));
  box-shadow:0 2px 8px var(--accent-dim);
}
.message.user .msg-avatar{background:var(--surface2);border:1px solid var(--border)}
.msg-bubble{flex:1;min-width:0}
.message.user .msg-bubble{display:flex;justify-content:flex-end}
.user-text{
  background:linear-gradient(135deg,var(--accent),var(--accent2));
  color:white;border-radius:18px 4px 18px 18px;
  padding:10px 14px;max-width:70%;font-size:14px;line-height:1.5;
  box-shadow:0 2px 12px var(--accent-dim);
}
.thinking{display:flex;align-items:center;gap:8px;color:var(--text3);font-size:13px;padding:4px 0}
.spin{animation:spin 1s linear infinite;display:inline-block}
@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}

/* Markdown */
.md-content{color:var(--text2);line-height:1.7;font-size:14px}
.md-content h1,.md-content h2{font-family:'DM Serif Display',serif;color:var(--text);margin:16px 0 8px}
.md-content h3{font-size:13px;font-weight:600;color:var(--accent);margin:14px 0 6px;text-transform:uppercase;letter-spacing:.06em}
.md-content p{margin-bottom:10px;color:var(--text2)}
.md-content p:last-child{margin-bottom:0}
.md-content strong{color:var(--text);font-weight:600}
.md-content em{color:var(--accent);font-style:italic}
.md-content ul{list-style:none;padding:0;margin:8px 0}
.md-content li{padding:3px 0 3px 16px;position:relative;color:var(--text2)}
.md-content li::before{content:'◆';position:absolute;left:0;color:var(--accent);font-size:8px;top:7px}
.md-content code{background:var(--surface2);padding:2px 6px;border-radius:5px;font-size:12px;color:var(--accent);font-family:monospace}

/* Context actions */
.msg-ctx-actions{display:flex;gap:5px;flex-wrap:wrap;margin-top:6px;opacity:0;transition:opacity .15s}
.message:hover .msg-ctx-actions{opacity:1}
.ctx-btn{
  background:var(--surface2);border:1px solid var(--border);
  color:var(--text3);font-size:11px;padding:3px 8px;
  border-radius:6px;cursor:pointer;transition:all .15s;
}
.ctx-btn:hover{border-color:var(--accent-border);color:var(--accent)}

/* Charts */
.chart-wrap{margin:12px 0;padding:16px 18px;background:var(--surface2);border:1px solid var(--border);border-radius:var(--rs);overflow:hidden}
.chart-title-text{font-size:11px;font-weight:600;color:var(--text2);text-transform:uppercase;letter-spacing:.08em;margin-bottom:14px;padding-bottom:8px;border-bottom:1px solid var(--border)}

/* Table */
.tbl-wrap{margin:12px 0;overflow-x:auto;background:var(--surface2);border:1px solid var(--border);border-radius:var(--rs)}
.tbl-title{font-size:11px;font-weight:600;color:var(--text2);text-transform:uppercase;letter-spacing:.08em;padding:12px 14px 8px;border-bottom:1px solid var(--border)}
table.data-table{width:100%;border-collapse:collapse;font-size:12px}
table.data-table th{text-align:left;padding:8px 14px;color:var(--accent);font-size:11px;text-transform:uppercase;letter-spacing:.07em;border-bottom:1px solid var(--accent-border);font-weight:600}
table.data-table td{padding:8px 14px;color:var(--text2);border-bottom:1px solid var(--border)}
table.data-table tr:last-child td{border-bottom:none}
table.data-table tr:hover td{background:var(--accent-dim);color:var(--text)}

/* Slides */
.slides-wrap{margin:12px 0;border:1px solid var(--accent-border);border-radius:var(--rs);overflow:hidden}
.slide{padding:24px 28px;background:linear-gradient(135deg,var(--surface) 0%,var(--surface2) 100%);min-height:180px}
.slide-num{font-size:11px;color:var(--text3);text-transform:uppercase;letter-spacing:.1em;margin-bottom:12px}
.slide-title{font-family:'DM Serif Display',serif;font-size:20px;color:var(--text);margin-bottom:14px;line-height:1.2}
.slide-body{color:var(--text2);font-size:13px;line-height:1.6;margin-bottom:12px}
.slide-bullets{list-style:none;padding:0;display:flex;flex-direction:column;gap:7px}
.slide-bullets li{padding:7px 12px;background:var(--accent-dim);border-left:2px solid var(--accent);border-radius:0 5px 5px 0;color:var(--text2);font-size:13px}
.slide-stats{display:flex;gap:20px;flex-wrap:wrap;margin-top:8px}
.stat-val{font-family:'DM Serif Display',serif;font-size:28px;color:var(--accent);line-height:1;display:block}
.stat-lbl{font-size:11px;color:var(--text3);text-transform:uppercase;letter-spacing:.07em}
.slide-nav{display:flex;align-items:center;justify-content:center;gap:10px;padding:10px;background:var(--surface2);border-top:1px solid var(--border)}
.slide-btn{background:none;border:1px solid var(--border);color:var(--text2);padding:4px 10px;border-radius:6px;font-size:14px;transition:all .15s}
.slide-btn:hover:not(:disabled){border-color:var(--accent-border);color:var(--accent)}
.slide-btn:disabled{opacity:.3;cursor:not-allowed}
.slide-dots{display:flex;gap:5px}
.slide-dot{width:6px;height:6px;border-radius:50%;background:var(--border);border:none;padding:0;cursor:pointer;transition:all .15s}
.slide-dot.active{background:var(--accent)}

/* Input area */
.input-area{padding:12px 20px 16px;border-top:1px solid var(--border);background:var(--surface);flex-shrink:0}
.input-wrap{
  display:flex;gap:8px;align-items:flex-end;
  background:var(--surface2);border:2px solid var(--border);
  border-radius:18px;padding:6px 6px 6px 16px;
  transition:all .2s;
}
.input-wrap:focus-within{border-color:var(--accent-border);box-shadow:0 0 0 4px var(--accent-dim)}
.chat-input{
  flex:1;background:none;border:none;outline:none;resize:none;
  color:var(--text);font-family:'Inter',sans-serif;
  font-size:14px;line-height:1.5;max-height:120px;padding:6px 0;overflow-y:auto;
}
.chat-input::placeholder{color:var(--text3)}
.send-btn{
  width:38px;height:38px;border-radius:12px;
  background:linear-gradient(135deg,var(--accent),var(--accent2));
  border:none;color:white;display:flex;align-items:center;justify-content:center;
  flex-shrink:0;font-size:16px;margin-bottom:2px;
  box-shadow:0 2px 8px var(--accent-dim);transition:all .2s;
}
.send-btn:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 4px 16px var(--accent-dim)}
.send-btn:disabled{background:var(--surface2);color:var(--text3);cursor:not-allowed;transform:none;box-shadow:none}
.input-hint{font-size:10px;color:var(--text3);margin-top:5px;text-align:center}

/* Toolbar */
.toolbar{display:flex;gap:5px;padding:6px 20px 0;overflow-x:auto}
.toolbar::-webkit-scrollbar{display:none}
.tool-btn{
  background:var(--surface2);border:1px solid var(--border);
  color:var(--text2);font-size:11px;font-weight:500;
  padding:4px 10px;border-radius:20px;white-space:nowrap;flex-shrink:0;
  transition:all .15s;
}
.tool-btn:hover{border-color:var(--accent-border);color:var(--accent);background:var(--accent-dim)}

/* Welcome screen in chat */
.chat-welcome{max-width:520px;margin:40px auto;padding:0 24px;text-align:center}
.chat-welcome-icon{width:64px;height:64px;border-radius:18px;background:linear-gradient(135deg,var(--accent),var(--accent2));display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:28px;box-shadow:0 8px 24px var(--accent-dim)}
.chat-welcome h2{font-family:'DM Serif Display',serif;font-size:24px;color:var(--text);margin-bottom:8px}
.chat-welcome p{color:var(--text2);font-size:13px;line-height:1.6;margin-bottom:24px}
.hint-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.hint-card{
  padding:12px 14px;background:var(--surface2);border:1px solid var(--border);
  border-radius:var(--r);font-size:12px;color:var(--text2);
  text-align:left;cursor:pointer;transition:all .2s;
}
.hint-card:hover{border-color:var(--accent-border);color:var(--accent);background:var(--accent-dim)}

/* Upload zone */
.upload-zone{
  border:2px dashed var(--border);border-radius:var(--r);
  padding:20px;text-align:center;cursor:pointer;
  transition:all .2s;margin:8px 20px;background:var(--surface2);
}
.upload-zone:hover,.upload-zone.drag{border-color:var(--accent-border);background:var(--accent-dim)}
.upload-zone-icon{font-size:24px;margin-bottom:6px}
.upload-zone-text{font-size:13px;color:var(--text2)}
.upload-zone-sub{font-size:11px;color:var(--text3);margin-top:3px}
.file-processing{display:flex;align-items:center;gap:10px;padding:10px 14px;background:var(--accent-dim);border:1px solid var(--accent-border);border-radius:var(--rs);margin:6px 20px;font-size:13px;color:var(--accent)}

/* Error */
.error-banner{padding:9px 13px;background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.3);border-radius:var(--rs);color:var(--red);font-size:13px;margin:6px 20px}

/* Modals */
.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.4);display:flex;align-items:center;justify-content:center;z-index:300;animation:fadeIn .15s ease;backdrop-filter:blur(4px)}
.modal{background:var(--surface);border:1px solid var(--border);border-radius:var(--rx);padding:28px;width:420px;max-width:90vw;box-shadow:var(--shadow-lg);max-height:85vh;overflow-y:auto}
.modal h3{font-family:'DM Serif Display',serif;font-size:20px;color:var(--text);margin-bottom:20px}
.modal-field{margin-bottom:14px}
.modal-field label{display:block;font-size:11px;color:var(--text3);text-transform:uppercase;letter-spacing:.07em;margin-bottom:6px;font-weight:600}
.modal-field input,.modal-field textarea{width:100%;background:var(--surface2);border:1px solid var(--border);border-radius:var(--rs);padding:10px 12px;color:var(--text);font-family:'Inter',sans-serif;font-size:13px;outline:none;transition:border-color .15s}
.modal-field input:focus,.modal-field textarea:focus{border-color:var(--accent-border);box-shadow:0 0 0 3px var(--accent-dim)}
.modal-field textarea{resize:vertical;min-height:80px}
.modal-actions{display:flex;gap:8px;justify-content:flex-end;margin-top:20px}
.btn-primary{background:linear-gradient(135deg,var(--accent),var(--accent2));color:white;border:none;padding:9px 20px;border-radius:var(--rs);font-size:13px;font-weight:600;transition:all .15s;box-shadow:0 2px 8px var(--accent-dim)}
.btn-primary:hover{transform:translateY(-1px);box-shadow:0 4px 16px var(--accent-dim)}
.btn-primary:disabled{opacity:.5;cursor:not-allowed;transform:none}
.btn-secondary{background:none;color:var(--text2);border:1px solid var(--border);padding:9px 20px;border-radius:var(--rs);font-size:13px;transition:all .15s}
.btn-secondary:hover{border-color:var(--accent-border);color:var(--accent)}

/* Auth */
.auth-screen{display:flex;align-items:center;justify-content:center;min-height:100vh;background:var(--bg);padding:24px}
.auth-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--rx);padding:40px 36px;width:100%;max-width:400px;box-shadow:var(--shadow-lg)}
.auth-logo{text-align:center;margin-bottom:32px}
.auth-logo-icon{width:56px;height:56px;border-radius:16px;background:linear-gradient(135deg,var(--accent),var(--accent2));display:flex;align-items:center;justify-content:center;font-size:26px;margin:0 auto 12px;box-shadow:0 4px 16px var(--accent-dim)}
.auth-logo-name{font-family:'DM Serif Display',serif;font-size:26px;color:var(--text)}
.auth-logo-sub{font-size:12px;color:var(--text3);margin-top:4px}
.auth-tabs{display:flex;gap:4px;background:var(--surface2);padding:4px;border-radius:var(--rs);margin-bottom:24px}
.auth-tab{flex:1;padding:8px;border:none;background:none;color:var(--text2);font-size:13px;font-weight:500;border-radius:7px;cursor:pointer;transition:all .15s}
.auth-tab.active{background:var(--surface);color:var(--text);font-weight:600;box-shadow:0 1px 6px rgba(0,0,0,.08)}
.auth-field{margin-bottom:14px}
.auth-field label{display:block;font-size:11px;color:var(--text3);text-transform:uppercase;letter-spacing:.07em;margin-bottom:6px;font-weight:600}
.auth-field input{width:100%;background:var(--surface2);border:1px solid var(--border);border-radius:var(--rs);padding:12px 14px;color:var(--text);font-family:'Inter',sans-serif;font-size:14px;outline:none;transition:all .15s}
.auth-field input:focus{border-color:var(--accent-border);box-shadow:0 0 0 3px var(--accent-dim)}
.auth-submit{width:100%;background:linear-gradient(135deg,var(--accent),var(--accent2));color:white;border:none;padding:13px;border-radius:var(--rs);font-size:14px;font-weight:600;cursor:pointer;transition:all .2s;margin-top:6px;box-shadow:0 4px 16px var(--accent-dim)}
.auth-submit:hover{transform:translateY(-1px);box-shadow:0 6px 20px var(--accent-dim)}
.auth-submit:disabled{opacity:.6;cursor:not-allowed;transform:none}
.auth-error{padding:10px 14px;background:var(--red-dim);border:1px solid rgba(239,68,68,.3);border-radius:var(--rs);color:var(--red);font-size:13px;margin-bottom:14px}
.auth-success{padding:10px 14px;background:var(--green-dim);border:1px solid rgba(34,197,94,.3);border-radius:var(--rs);color:var(--green);font-size:13px;margin-bottom:14px}
.auth-footer{text-align:center;margin-top:24px;font-size:12px;color:var(--text3)}

/* Briefing */
.briefing-card{
  background:linear-gradient(135deg,var(--accent-dim),var(--surface));
  border:1px solid var(--accent-border);border-radius:var(--r);
  padding:20px 22px;margin:16px 20px;
  box-shadow:0 4px 20px var(--accent-dim);animation:fadeIn .3s ease;
}
.briefing-hdr{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px}
.briefing-title{font-family:'DM Serif Display',serif;font-size:17px;color:var(--text)}
.briefing-close{background:none;border:none;color:var(--text3);cursor:pointer;font-size:18px;line-height:1;transition:color .15s}
.briefing-close:hover{color:var(--text)}
.briefing-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:14px}
.briefing-stat{padding:10px;background:var(--surface);border-radius:var(--rs);text-align:center;border:1px solid var(--border)}
.briefing-stat-val{font-family:'DM Serif Display',serif;font-size:20px;color:var(--accent);line-height:1}
.briefing-stat-lbl{font-size:10px;color:var(--text3);margin-top:3px;text-transform:uppercase;letter-spacing:.05em}

/* Sidebar chat list */
.chat-list-panel{flex:1;overflow-y:auto;padding:0 8px;width:100%}
.chat-list-panel::-webkit-scrollbar{width:3px}
.chat-list-panel::-webkit-scrollbar-thumb{background:rgba(255,255,255,.1);border-radius:2px}
.chat-list-label{font-size:10px;font-weight:600;color:rgba(255,255,255,.3);text-transform:uppercase;letter-spacing:.1em;padding:12px 6px 6px}
.chat-list-item{
  display:flex;align-items:center;gap:8px;
  padding:8px;border-radius:10px;cursor:pointer;
  transition:all .15s;margin-bottom:1px;
  color:rgba(255,255,255,.5);font-size:12px;
}
.chat-list-item:hover{background:rgba(255,255,255,.07);color:rgba(255,255,255,.8)}
.chat-list-item.active{background:rgba(124,111,247,.2);color:white}
.chat-list-title{flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.chat-list-del{background:none;border:none;color:rgba(255,255,255,.2);font-size:13px;opacity:0;transition:all .15s}
.chat-list-item:hover .chat-list-del{opacity:1}
.chat-list-del:hover{color:var(--red)}

/* Rename input */
.rename-inp{
  flex:1;background:rgba(255,255,255,.1);border:1px solid rgba(124,111,247,.4);
  border-radius:6px;padding:2px 6px;font-size:12px;color:white;outline:none;
  font-family:'Inter',sans-serif;
}

/* Quick actions in sidebar */
.qa-section{padding:0 8px 8px;width:100%}
.qa-label{font-size:10px;font-weight:600;color:rgba(255,255,255,.3);text-transform:uppercase;letter-spacing:.1em;padding:8px 6px 4px;display:flex;align-items:center;justify-content:space-between}
.qa-label button{background:none;border:none;color:rgba(255,255,255,.3);font-size:14px;cursor:pointer;transition:color .15s}
.qa-label button:hover{color:rgba(255,255,255,.7)}
.qa-item{
  display:flex;align-items:center;gap:6px;
  padding:6px 8px;border-radius:8px;cursor:pointer;
  color:rgba(255,255,255,.5);font-size:11px;
  transition:all .15s;border:none;background:none;width:100%;text-align:left;
}
.qa-item:hover{background:rgba(255,255,255,.07);color:rgba(255,255,255,.8)}
.qa-del{background:none;border:none;color:rgba(255,255,255,.2);font-size:12px;margin-left:auto;opacity:0;transition:all .15s}
.qa-item:hover .qa-del{opacity:1}

/* Template list */
.template-list{display:flex;flex-direction:column;gap:8px;margin-bottom:16px}
.template-item{padding:12px 14px;background:var(--surface2);border:1px solid var(--border);border-radius:var(--rs);cursor:pointer;transition:all .15s}
.template-item:hover{border-color:var(--accent-border);background:var(--accent-dim)}
.template-item-title{font-size:13px;font-weight:600;color:var(--text)}
.template-item-desc{font-size:11px;color:var(--text3);margin-top:3px}

/* Data modal tabs */
.data-tabs{display:flex;gap:4px;margin-bottom:16px}
.data-tab{padding:6px 14px;border:1px solid var(--border);border-radius:var(--rs);background:none;color:var(--text2);font-size:12px;cursor:pointer;transition:all .15s}
.data-tab.active{background:var(--accent-dim);border-color:var(--accent-border);color:var(--accent)}

/* Notif badge */
.notif-badge{display:inline-flex;align-items:center;justify-content:center;min-width:16px;height:16px;border-radius:8px;background:var(--red);color:white;font-size:9px;font-weight:700;padding:0 4px}

/* Copy btn */
.msg-copy{background:none;border:1px solid var(--border);color:var(--text3);font-size:11px;padding:3px 8px;border-radius:6px;cursor:pointer;transition:all .15s}
.msg-copy:hover{border-color:var(--accent-border);color:var(--accent)}
.msg-copy.copied{color:var(--green);border-color:var(--green)}

/* ===== PROPERTY MAP ===== */
.map-view{flex:1;overflow-y:auto;padding:24px 28px;display:flex;flex-direction:column;gap:20px}
.map-container{height:calc(100vh - 280px);min-height:400px;border-radius:var(--r);overflow:hidden;border:1px solid var(--border);box-shadow:var(--shadow);position:relative}
.map-container .leaflet-container{height:100%!important;width:100%!important;border-radius:var(--r)}
.map-toolbar{display:flex;align-items:center;gap:12px;flex-wrap:wrap}
.map-toolbar h1{font-family:'DM Serif Display',serif;font-size:26px;color:var(--text);flex:1}
.map-filter-wrap{display:flex;gap:6px;flex-wrap:wrap}
.map-filter-btn{padding:6px 14px;border:1px solid var(--border);border-radius:20px;background:none;color:var(--text2);font-size:12px;font-weight:500;cursor:pointer;transition:all .15s}
.map-filter-btn:hover{border-color:var(--accent-border);color:var(--accent)}
.map-filter-btn.active{background:var(--accent);color:white;border-color:var(--accent)}
.map-legend{display:flex;gap:16px;flex-wrap:wrap;padding:12px 16px;background:var(--surface);border:1px solid var(--border);border-radius:var(--rs)}
.map-legend-item{display:flex;align-items:center;gap:6px;font-size:12px;color:var(--text2)}
.map-legend-dot{width:12px;height:12px;border-radius:50%;flex-shrink:0}
.map-prop-list{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px}
.map-prop-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);padding:14px;cursor:pointer;transition:all .2s;box-shadow:var(--shadow)}
.map-prop-card:hover{border-color:var(--accent-border);transform:translateY(-2px);box-shadow:var(--shadow-lg)}
.map-prop-card.active{border-color:var(--accent);background:var(--accent-dim)}
.map-prop-status{display:inline-flex;align-items:center;gap:5px;padding:3px 9px;border-radius:12px;font-size:11px;font-weight:600;margin-bottom:8px}
.map-prop-name{font-size:14px;font-weight:600;color:var(--text);margin-bottom:3px}
.map-prop-addr{font-size:12px;color:var(--text3);margin-bottom:8px}
.map-prop-meta{display:flex;gap:12px}
.map-prop-price{font-size:14px;font-weight:700;color:var(--accent)}
.map-prop-size{font-size:12px;color:var(--text3)}
.map-price-btn{font-size:11px;padding:3px 8px;border:1px solid var(--accent-border);border-radius:6px;background:none;color:var(--accent);cursor:pointer;transition:all .15s;margin-top:8px}
.map-price-btn:hover{background:var(--accent);color:white}
.map-katastr-btn{font-size:11px;padding:3px 8px;border:1px solid var(--border);border-radius:6px;background:none;color:var(--text2);cursor:pointer;transition:all .15s;margin-top:8px;margin-left:6px;text-decoration:none;display:inline-block}
.map-katastr-btn:hover{border-color:var(--accent-border);color:var(--accent)}
@media(max-width:768px){.map-container{height:55vh;min-height:280px}.map-prop-list{grid-template-columns:1fr}}

/* ===== TIMELINE CALENDAR ===== */
.cal-view-toggle{display:flex;gap:4px;background:var(--surface2);padding:4px;border-radius:var(--rs);width:fit-content}
.cal-view-btn{padding:6px 14px;border:none;background:none;color:var(--text2);font-size:12px;font-weight:500;border-radius:6px;cursor:pointer;transition:all .15s}
.cal-view-btn.active{background:var(--surface);color:var(--text);font-weight:600;box-shadow:0 1px 4px var(--shadow)}

/* Timeline view */
.timeline-wrap{overflow-x:auto;padding-bottom:8px}
.timeline-wrap::-webkit-scrollbar{height:4px}
.timeline-wrap::-webkit-scrollbar-thumb{background:var(--border);border-radius:2px}
.timeline-grid{display:grid;min-width:700px}
.timeline-header{display:grid;grid-template-columns:120px repeat(7,1fr);border-bottom:2px solid var(--border);margin-bottom:0}
.timeline-header-day{padding:10px 8px;text-align:center;font-size:11px;font-weight:600;color:var(--text3);text-transform:uppercase;letter-spacing:.06em}
.timeline-header-day.today{color:var(--accent);font-weight:700}
.timeline-header-num{font-size:20px;font-weight:700;color:var(--text);display:block;margin-top:2px}
.timeline-header-num.today{color:var(--accent)}
.timeline-row{display:grid;grid-template-columns:120px repeat(7,1fr);border-bottom:1px solid var(--border2);min-height:60px}
.timeline-row:last-child{border-bottom:none}
.timeline-agent-cell{padding:12px 10px;display:flex;align-items:center;gap:8px;border-right:2px solid var(--border);background:var(--surface2);position:sticky;left:0;z-index:1}
.timeline-agent-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0}
.timeline-agent-name{font-size:12px;font-weight:600;color:var(--text);line-height:1.2}
.timeline-day-cell{padding:4px;border-right:1px solid var(--border2);position:relative;cursor:pointer;transition:background .15s}
.timeline-day-cell:hover{background:var(--accent-dim)}
.timeline-day-cell.today{background:rgba(124,111,247,.04)}
.timeline-day-cell:last-child{border-right:none}
.timeline-event{padding:4px 7px;border-radius:6px;font-size:11px;font-weight:500;margin-bottom:2px;cursor:pointer;transition:all .15s;border-left:3px solid;line-height:1.3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.timeline-event:hover{filter:brightness(1.1);transform:translateX(1px)}
.timeline-add{width:100%;height:100%;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .15s;font-size:18px;color:var(--accent);border:none;background:none;cursor:pointer;padding:0}
.timeline-day-cell:hover .timeline-add{opacity:1}

/* ===== TEAM CALENDAR ===== */
.cal-view{flex:1;overflow-y:auto;padding:24px 28px;display:flex;flex-direction:column;gap:20px}
.cal-view::-webkit-scrollbar{width:4px}
.cal-view::-webkit-scrollbar-thumb{background:var(--border);border-radius:2px}
.cal-toolbar{display:flex;align-items:center;gap:12px;flex-wrap:wrap}
.cal-toolbar h1{font-family:'DM Serif Display',serif;font-size:26px;color:var(--text);flex:1}
.cal-filter-wrap{display:flex;gap:6px;flex-wrap:wrap}
.cal-filter-btn{padding:6px 14px;border:1px solid var(--border);border-radius:20px;background:none;color:var(--text2);font-size:12px;font-weight:500;cursor:pointer;transition:all .15s}
.cal-filter-btn:hover{border-color:var(--accent-border);color:var(--accent)}
.cal-filter-btn.active{background:var(--accent);color:white;border-color:var(--accent)}
.cal-week-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:8px}
.cal-day-col{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);overflow:hidden;min-height:200px}
.cal-day-header{padding:10px 12px;border-bottom:1px solid var(--border);background:var(--surface2)}
.cal-day-name{font-size:11px;font-weight:600;color:var(--text3);text-transform:uppercase;letter-spacing:.06em}
.cal-day-num{font-size:22px;font-weight:700;color:var(--text);line-height:1.1;margin-top:2px}
.cal-day-col.today .cal-day-header{background:var(--accent-dim)}
.cal-day-col.today .cal-day-num{color:var(--accent)}
.cal-day-col.today{border-color:var(--accent-border)}
.cal-meeting-block{margin:6px;padding:7px 9px;border-radius:8px;cursor:pointer;transition:all .15s;border-left:3px solid}
.cal-meeting-block:hover{filter:brightness(1.05);transform:translateY(-1px)}
.cal-meeting-time{font-size:10px;font-weight:600;opacity:.8;margin-bottom:2px}
.cal-meeting-title{font-size:12px;font-weight:600;line-height:1.3}
.cal-meeting-agent{font-size:10px;opacity:.7;margin-top:2px}
.cal-add-btn{margin:6px;padding:6px;border-radius:8px;border:1px dashed var(--border);background:none;color:var(--text3);font-size:11px;cursor:pointer;width:calc(100% - 12px);transition:all .15s;text-align:center}
.cal-add-btn:hover{border-color:var(--accent-border);color:var(--accent);background:var(--accent-dim)}
/* Meeting form modal */
.meeting-form .modal-field input,.meeting-form .modal-field select{width:100%;background:var(--surface2);border:1px solid var(--border);border-radius:var(--rs);padding:10px 12px;color:var(--text);font-family:'Inter',sans-serif;font-size:13px;outline:none;transition:all .15s}
.meeting-form .modal-field select{cursor:pointer}
.meeting-form .modal-field input:focus,.meeting-form .modal-field select:focus{border-color:var(--accent-border);box-shadow:0 0 0 3px var(--accent-dim)}
.meeting-detail-overlay{position:fixed;inset:0;background:rgba(0,0,0,.4);z-index:300;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px)}
.agent-color-0{background:rgba(124,111,247,.15);border-color:#7C6FF7;color:#7C6FF7}
.agent-color-1{background:rgba(34,197,94,.15);border-color:#22C55E;color:#22C55E}
.agent-color-2{background:rgba(245,158,11,.15);border-color:#F59E0B;color:#F59E0B}
.agent-color-3{background:rgba(239,68,68,.15);border-color:#EF4444;color:#EF4444}

/* ===== PDF EXPORT ===== */
.pdf-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:400;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px)}
.pdf-modal{background:var(--surface);border:1px solid var(--border);border-radius:var(--rx);padding:32px;width:480px;max-width:90vw;box-shadow:var(--shadow-lg)}
.pdf-modal h3{font-family:'DM Serif Display',serif;font-size:22px;color:var(--text);margin-bottom:8px}
.pdf-modal p{font-size:13px;color:var(--text3);margin-bottom:20px}
.pdf-options{display:flex;flex-direction:column;gap:8px;margin-bottom:24px}
.pdf-option{display:flex;align-items:center;gap:12px;padding:12px 14px;background:var(--surface2);border:1px solid var(--border);border-radius:var(--rs);cursor:pointer;transition:all .15s}
.pdf-option:hover{border-color:var(--accent-border);background:var(--accent-dim)}
.pdf-option.selected{border-color:var(--accent);background:var(--accent-dim)}
.pdf-option-icon{font-size:22px;flex-shrink:0}
.pdf-option-title{font-size:13px;font-weight:600;color:var(--text)}
.pdf-option-desc{font-size:11px;color:var(--text3);margin-top:2px}
.pdf-progress{display:flex;align-items:center;gap:10px;padding:12px;background:var(--accent-dim);border:1px solid var(--accent-border);border-radius:var(--rs);font-size:13px;color:var(--accent);margin-bottom:16px}

/* ===== KATASTR PANEL ===== */
.katastr-panel{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);overflow:hidden;box-shadow:var(--shadow)}
.katastr-header{padding:14px 18px;background:linear-gradient(135deg,var(--accent-dim),var(--surface2));border-bottom:1px solid var(--border);display:flex;align-items:center;gap:10px}
.katastr-badge{background:var(--accent);color:white;font-size:10px;font-weight:700;padding:3px 8px;border-radius:10px;letter-spacing:.05em}
.katastr-title{font-size:15px;font-weight:600;color:var(--text)}
.katastr-body{padding:18px}
.katastr-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px}
.katastr-field{background:var(--surface2);border:1px solid var(--border);border-radius:var(--rs);padding:10px 12px}
.katastr-field-label{font-size:10px;font-weight:600;color:var(--text3);text-transform:uppercase;letter-spacing:.07em;margin-bottom:4px}
.katastr-field-value{font-size:13px;font-weight:500;color:var(--text)}
.katastr-field-value.accent{color:var(--accent);font-weight:600}
.katastr-links{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}
.katastr-link{display:inline-flex;align-items:center;gap:6px;padding:8px 14px;border:1px solid var(--border);border-radius:var(--rs);background:var(--surface2);color:var(--text2);font-size:12px;font-weight:500;text-decoration:none;transition:all .15s;cursor:pointer}
.katastr-link:hover{border-color:var(--accent-border);color:var(--accent);background:var(--accent-dim)}
.katastr-note{font-size:11px;color:var(--text3);margin-top:10px;padding:8px 10px;background:var(--orange-dim);border:1px solid rgba(245,158,11,.2);border-radius:var(--rs)}

/* ===== ONBOARDING ===== */
.onboarding-overlay{position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:500;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(8px);animation:fadeIn .3s ease}
.onboarding-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--rx);width:560px;max-width:92vw;box-shadow:var(--shadow-lg);overflow:hidden}
.onboarding-progress{height:4px;background:var(--surface2)}
.onboarding-progress-bar{height:4px;background:linear-gradient(90deg,var(--accent),var(--accent2));transition:width .4s ease}
.onboarding-body{padding:36px 36px 28px}
.onboarding-step-num{font-size:11px;font-weight:600;color:var(--accent);text-transform:uppercase;letter-spacing:.1em;margin-bottom:12px}
.onboarding-icon{font-size:48px;margin-bottom:16px;display:block}
.onboarding-title{font-family:'DM Serif Display',serif;font-size:26px;color:var(--text);margin-bottom:10px;line-height:1.2}
.onboarding-desc{font-size:14px;color:var(--text2);line-height:1.7;margin-bottom:24px}
.onboarding-features{display:flex;flex-direction:column;gap:10px;margin-bottom:24px}
.onboarding-feature{display:flex;align-items:flex-start;gap:12px;padding:12px 14px;background:var(--surface2);border:1px solid var(--border);border-radius:var(--rs)}
.onboarding-feature-icon{font-size:20px;flex-shrink:0;margin-top:1px}
.onboarding-feature-title{font-size:13px;font-weight:600;color:var(--text)}
.onboarding-feature-desc{font-size:12px;color:var(--text3);margin-top:2px}
.onboarding-shortcuts{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:20px}
.onboarding-shortcut{display:flex;align-items:center;gap:10px;padding:8px 12px;background:var(--surface2);border-radius:var(--rs)}
.shortcut-key{background:var(--bg);border:1px solid var(--border);border-radius:6px;padding:3px 8px;font-size:11px;font-weight:600;color:var(--text);font-family:monospace;box-shadow:0 2px 0 var(--border)}
.shortcut-desc{font-size:12px;color:var(--text2)}
.onboarding-footer{display:flex;align-items:center;justify-content:space-between;padding:16px 36px 24px}
.onboarding-dots{display:flex;gap:6px}
.onboarding-dot{width:7px;height:7px;border-radius:50%;background:var(--border);transition:all .2s;border:none;cursor:pointer;padding:0}
.onboarding-dot.active{background:var(--accent);width:20px;border-radius:4px}
.onboarding-skip{font-size:12px;color:var(--text3);background:none;border:none;cursor:pointer;padding:4px 8px;transition:color .15s}
.onboarding-skip:hover{color:var(--text)}

/* ===== NOTIFICATION CENTER ===== */
.notif-center{position:fixed;top:60px;right:16px;width:360px;max-height:500px;background:var(--surface);border:1px solid var(--border);border-radius:var(--r);box-shadow:var(--shadow-lg);z-index:300;overflow:hidden;display:flex;flex-direction:column;animation:fadeIn .2s ease}
.notif-center-header{padding:14px 16px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between}
.notif-center-title{font-size:14px;font-weight:600;color:var(--text)}
.notif-center-clear{font-size:11px;color:var(--accent);background:none;border:none;cursor:pointer;font-weight:500}
.notif-list{flex:1;overflow-y:auto}
.notif-item{display:flex;gap:10px;padding:12px 16px;border-bottom:1px solid var(--border2);cursor:pointer;transition:background .15s}
.notif-item:hover{background:var(--surface2)}
.notif-item:last-child{border-bottom:none}
.notif-item-icon{font-size:20px;flex-shrink:0;margin-top:2px}
.notif-item-title{font-size:13px;font-weight:500;color:var(--text)}
.notif-item-desc{font-size:11px;color:var(--text3);margin-top:2px;line-height:1.4}
.notif-item-time{font-size:10px;color:var(--text3);margin-top:4px}
.notif-item-badge{padding:2px 7px;border-radius:8px;font-size:10px;font-weight:600;margin-left:auto;flex-shrink:0;align-self:flex-start;margin-top:2px}
.notif-topbar-btn{position:relative}
.notif-unread-badge{position:absolute;top:-2px;right:-2px;width:16px;height:16px;border-radius:50%;background:var(--red);color:white;font-size:9px;font-weight:700;display:flex;align-items:center;justify-content:center;border:2px solid var(--surface)}

/* ===== NOTIFICATION CENTER ===== */
.notif-center-overlay{position:fixed;inset:0;background:rgba(0,0,0,.4);z-index:400;display:flex;justify-content:flex-end;backdrop-filter:blur(2px);animation:fadeIn .15s ease}
.notif-center{width:380px;max-width:95vw;height:100vh;background:var(--surface);border-left:1px solid var(--border);display:flex;flex-direction:column;box-shadow:var(--shadow-lg)}
.notif-center-header{padding:20px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;flex-shrink:0}
.notif-center-title{font-family:'DM Serif Display',serif;font-size:20px;color:var(--text)}
.notif-close{background:none;border:none;color:var(--text3);font-size:22px;cursor:pointer;line-height:1;transition:color .15s}
.notif-close:hover{color:var(--text)}
.notif-list{flex:1;overflow-y:auto;padding:12px}
.notif-list::-webkit-scrollbar{width:4px}
.notif-list::-webkit-scrollbar-thumb{background:var(--border);border-radius:2px}
.notif-item{display:flex;gap:12px;padding:12px;border-radius:var(--rs);margin-bottom:6px;cursor:pointer;transition:all .15s;border:1px solid var(--border)}
.notif-item:hover{border-color:var(--accent-border);background:var(--accent-dim)}
.notif-item.unread{border-left:3px solid var(--accent)}
.notif-dot2{width:10px;height:10px;border-radius:50%;flex-shrink:0;margin-top:4px}
.notif-item-title{font-size:13px;font-weight:600;color:var(--text)}
.notif-item-desc{font-size:12px;color:var(--text3);margin-top:3px;line-height:1.4}
.notif-item-time{font-size:10px;color:var(--text3);margin-top:4px}
.notif-section-label{font-size:10px;font-weight:600;color:var(--text3);text-transform:uppercase;letter-spacing:.1em;padding:8px 4px 4px}
.notif-topbar-btn{position:relative}
.notif-badge-top{position:absolute;top:-4px;right:-4px;width:16px;height:16px;border-radius:8px;background:var(--red);color:white;font-size:9px;font-weight:700;display:flex;align-items:center;justify-content:center;border:2px solid var(--surface)}

/* ===== ONBOARDING ===== */
.onboarding-overlay{position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:500;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(6px);animation:fadeIn .3s ease}
.onboarding-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--rx);width:520px;max-width:92vw;max-height:90vh;overflow-y:auto;box-shadow:var(--shadow-lg)}
.onboarding-progress{height:4px;background:var(--surface2);border-radius:2px;overflow:hidden}
.onboarding-progress-bar{height:100%;background:linear-gradient(90deg,var(--accent),var(--accent2));border-radius:2px;transition:width .3s ease}
.onboarding-body{padding:32px}
.onboarding-step-num{font-size:11px;font-weight:600;color:var(--accent);text-transform:uppercase;letter-spacing:.1em;margin-bottom:8px}
.onboarding-icon{font-size:48px;margin-bottom:16px;display:block}
.onboarding-title{font-family:'DM Serif Display',serif;font-size:26px;color:var(--text);margin-bottom:8px}
.onboarding-desc{font-size:14px;color:var(--text2);line-height:1.7;margin-bottom:20px}
.onboarding-features{display:flex;flex-direction:column;gap:8px;margin-bottom:24px}
.onboarding-feature{display:flex;align-items:flex-start;gap:12px;padding:10px 12px;background:var(--surface2);border-radius:var(--rs);border:1px solid var(--border)}
.onboarding-feature-icon{font-size:20px;flex-shrink:0}
.onboarding-feature-text{font-size:13px;color:var(--text2);line-height:1.4}
.onboarding-feature-text strong{color:var(--text);display:block;margin-bottom:2px}
.onboarding-shortcuts{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:24px}
.shortcut-item{display:flex;align-items:center;gap:8px;padding:8px 10px;background:var(--surface2);border-radius:var(--rs)}
.shortcut-key{background:var(--surface);border:1px solid var(--border);border-radius:5px;padding:2px 7px;font-size:11px;font-weight:700;color:var(--accent);font-family:monospace;box-shadow:0 2px 0 var(--border)}
.shortcut-desc{font-size:12px;color:var(--text2)}
.onboarding-footer{display:flex;align-items:center;justify-content:space-between;padding:20px 32px;border-top:1px solid var(--border);flex-shrink:0}
.onboarding-dots{display:flex;gap:6px}
.onboarding-dot{width:8px;height:8px;border-radius:50%;background:var(--border);transition:all .2s;border:none;cursor:pointer;padding:0}
.onboarding-dot.active{background:var(--accent);width:20px;border-radius:4px}

/* ===== KEYBOARD SHORTCUTS HELP ===== */
.shortcuts-overlay{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:400;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px)}
.shortcuts-modal{background:var(--surface);border:1px solid var(--border);border-radius:var(--rx);padding:28px;width:480px;max-width:90vw;box-shadow:var(--shadow-lg)}
.shortcuts-modal h3{font-family:'DM Serif Display',serif;font-size:20px;margin-bottom:16px;color:var(--text)}
.shortcuts-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.shortcut-row{display:flex;align-items:center;gap:10px;padding:8px 10px;background:var(--surface2);border-radius:var(--rs)}

/* ===== ANALYTICS ===== */
.analytics-view{flex:1;overflow-y:auto;padding:24px 28px;display:flex;flex-direction:column;gap:20px}
.analytics-view::-webkit-scrollbar{width:4px}
.analytics-view::-webkit-scrollbar-thumb{background:var(--border);border-radius:2px}
.analytics-header{display:flex;align-items:center;gap:12px}
.analytics-header h1{font-family:'DM Serif Display',serif;font-size:26px;color:var(--text);flex:1}
.kpi-row{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
.kpi-big{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);padding:18px 20px;box-shadow:var(--shadow);transition:all .2s}
.kpi-big:hover{transform:translateY(-2px);box-shadow:var(--shadow-lg)}
.kpi-big-label{font-size:11px;font-weight:600;color:var(--text3);text-transform:uppercase;letter-spacing:.08em;margin-bottom:6px}
.kpi-big-value{font-family:'DM Serif Display',serif;font-size:32px;color:var(--text);line-height:1;margin-bottom:4px}
.kpi-big-sub{font-size:12px;color:var(--text3)}
.kpi-big-trend{display:inline-flex;align-items:center;gap:4px;font-size:12px;font-weight:600;padding:3px 8px;border-radius:10px;margin-top:6px}
.kpi-big-trend.up{background:var(--green-dim);color:var(--green)}
.kpi-big-trend.down{background:var(--red-dim);color:var(--red)}
.chart-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);padding:20px;box-shadow:var(--shadow)}
.chart-card-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}
.chart-card-title{font-size:15px;font-weight:600;color:var(--text)}
.chart-card-sub{font-size:12px;color:var(--text3);margin-top:2px}
.charts-grid-2{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.charts-grid-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px}
@media(max-width:1100px){.kpi-row{grid-template-columns:repeat(2,1fr)}.charts-grid-3{grid-template-columns:1fr 1fr}}
@media(max-width:768px){.kpi-row{grid-template-columns:1fr 1fr}.charts-grid-2{grid-template-columns:1fr}.charts-grid-3{grid-template-columns:1fr}.analytics-view{padding:12px}.analytics-header h1{font-size:22px}}

/* ===== NOTIFICATIONS ===== */
.notif-dot{position:absolute;top:4px;right:4px;width:8px;height:8px;border-radius:50%;background:var(--red);border:2px solid var(--sidebar)}
.notif-count{position:absolute;top:2px;right:2px;min-width:16px;height:16px;border-radius:8px;background:var(--red);color:white;font-size:9px;font-weight:700;display:flex;align-items:center;justify-content:center;padding:0 3px;border:2px solid var(--sidebar)}
/* ===== VOICE INPUT ===== */
.voice-btn{width:38px;height:38px;border-radius:12px;border:none;background:var(--surface2);color:var(--text3);font-size:16px;display:flex;align-items:center;justify-content:center;flex-shrink:0;cursor:pointer;transition:all .2s;margin-bottom:2px}
.voice-btn:hover{background:var(--accent-dim);color:var(--accent)}
.voice-btn.listening{background:var(--red);color:white;animation:voice-pulse 1s ease infinite}
@keyframes voice-pulse{0%,100%{box-shadow:0 0 0 0 rgba(239,68,68,.4)}50%{box-shadow:0 0 0 8px rgba(239,68,68,0)}}
/* ===== SEARCH ===== */
.search-overlay{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:400;display:flex;align-items:flex-start;justify-content:center;padding-top:80px;backdrop-filter:blur(4px)}
.search-box{background:var(--surface);border:1px solid var(--border);border-radius:var(--rx);width:600px;max-width:90vw;box-shadow:var(--shadow-lg);overflow:hidden}
.search-input-wrap{display:flex;align-items:center;gap:10px;padding:16px 20px;border-bottom:1px solid var(--border)}
.search-icon{font-size:18px;color:var(--text3);flex-shrink:0}
.search-inp{flex:1;background:none;border:none;outline:none;font-size:16px;color:var(--text);font-family:'Inter',sans-serif}
.search-inp::placeholder{color:var(--text3)}
.search-kbd{font-size:11px;color:var(--text3);background:var(--surface2);border:1px solid var(--border);border-radius:4px;padding:2px 6px;cursor:pointer;flex-shrink:0}
.search-results{max-height:400px;overflow-y:auto}
.search-section{padding:8px 16px 4px;font-size:11px;font-weight:600;color:var(--text3);text-transform:uppercase;letter-spacing:.08em}
.search-item{display:flex;align-items:center;gap:12px;padding:10px 20px;cursor:pointer;transition:background .15s}
.search-item:hover,.search-item.selected{background:var(--accent-dim)}
.search-item-icon{font-size:16px;flex-shrink:0}
.search-item-title{font-size:13px;font-weight:500;color:var(--text)}
.search-item-sub{font-size:11px;color:var(--text3);margin-top:1px}
.search-empty{padding:32px;text-align:center;color:var(--text3);font-size:14px}
/* ===== SHARE CHAT ===== */
.share-toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:var(--text);color:var(--bg);padding:10px 20px;border-radius:20px;font-size:13px;font-weight:500;z-index:500;animation:toast-in .2s ease}
@keyframes toast-in{from{opacity:0;transform:translateX(-50%) translateY(10px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}

/* Mobile */
.mobile-topbar{display:none}
@media(max-width:768px){
  /* Sidebar - icon only when closed, full when open */
  .sidebar{
    position:fixed;top:0;left:0;height:100vh;z-index:200;
    width:56px;
    transform:translateX(0);transition:width .25s,transform .25s;
    overflow:hidden;
  }
  .sidebar-avatar{width:36px;height:36px;border-radius:50%;padding:0;justify-content:center;gap:0}
  .sidebar-avatar .sidebar-avatar-name{display:none}
  .sidebar-avatar-dot{width:28px;height:28px}
  .sidebar.open{width:220px}
  .sidebar-btn{width:40px;height:40px;font-size:16px;padding:0;justify-content:center;margin:0 auto}
  .sidebar-btn span{display:none}
  .sidebar.open .sidebar-btn{width:100%;height:40px;padding:0 14px;justify-content:flex-start;margin:0}
  .sidebar.open .sidebar-btn span{display:inline}
  .sidebar-logo{display:none}
  .sidebar.open .sidebar-logo{display:none}
  .chat-list-panel,.qa-section,.sidebar-divider{display:none}
  .sidebar.open .chat-list-panel,.sidebar.open .qa-section,.sidebar.open .sidebar-divider{display:flex;flex-direction:column;width:100%}
  .sidebar-bottom{margin:0 auto;padding:0 10px}
  .sidebar.open .sidebar-bottom{margin:0;width:100%;padding:0 8px}
  .sidebar.open .sidebar-avatar{width:100%;border-radius:10px;padding:0 10px;gap:10px}
  .sidebar.open .sidebar-avatar .sidebar-avatar-name{display:block}
  .sidebar-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:199}
  .sidebar-overlay.open{display:block}
  /* Main content */
  .main{width:calc(100vw - 56px)!important;margin-left:56px!important}
  .home-grid{grid-template-columns:1fr!important}
  .home-grid-3{grid-template-columns:1fr!important}
  .welcome-stats{display:none!important}
  .welcome-banner{padding:20px 20px;min-height:130px;border-radius:12px}
  .welcome-left h1{font-size:24px!important}
  .welcome-btn{padding:10px 16px;font-size:13px}
  .welcome-left h1{font-size:22px}
  .home-view{padding:12px!important;gap:12px!important}
  .card{padding:14px}
  .topbar{padding:10px 14px;display:none}
  .chat-header{display:flex}
  .messages-area{padding:12px 0}
  .message{padding:6px 12px}
  .user-text{max-width:85%}
  .input-area{padding:10px 12px 14px}
  .toolbar{padding:4px 12px 0}
  .email-subject{max-width:130px}
  /* Mobile topbar */
  .mobile-topbar{display:none!important}
  .hamburger{background:none;border:none;color:rgba(255,255,255,.7);font-size:22px;cursor:pointer;padding:0;line-height:1}
}
@media(min-width:769px){.mobile-topbar{display:none!important}.sidebar-overlay{display:none!important}}
@media(min-width:769px){.sidebar-overlay{display:none!important}.mobile-topbar{display:none!important}}
</style>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
</head>
<body>
<div id="root"></div>
<script>

// ============================================================
// SUPABASE
// ============================================================
const SUPABASE_URL = 'https://xcywshkyeamghiqzuiav.supabase.co';
const SUPABASE_KEY = 'sb_publishable_fP8IAEATD7qiyUebsVU85A_bsAvYqXI';
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ============================================================
// HELPERS
// ============================================================
function translateAuthError(msg) {
  const map = [["Invalid login credentials","Nesprávný e-mail nebo heslo"],["Email not confirmed","E-mail není potvrzen. Zkontrolujte schránku."],["User already registered","Účet s tímto e-mailem již existuje."],["Password should be at least 6 characters","Heslo musí mít alespoň 6 znaků"],["Unable to validate email address: invalid format","Neplatný formát e-mailové adresy"],["Email rate limit exceeded","Příliš mnoho pokusů. Zkuste to za chvíli."],["Invalid email or password","Nesprávný e-mail nebo heslo"]];
  for(const [en,cs] of map) { if(msg.includes(en)) return cs; }
  return msg;
}

// ============================================================
// DATA
// ============================================================
// Property coordinates (lat, lng) for Prague area
const propCoords = {
  'NEM-001':[50.0755,14.4378], // Vinohrady
  'NEM-002':[49.9947,14.5428], // Průhonice
  'NEM-003':[50.0462,14.4030], // Smíchov
  'NEM-004':[50.0875,14.4508], // Žižkov
  'NEM-005':[50.1024,14.3927], // Dejvice
  'NEM-006':[49.9947,14.5428], // Průhonice
  'NEM-007':[50.1028,14.4472], // Holešovice
  'NEM-008':[50.1265,14.5241], // Letňany
  'NEM-009':[50.0612,14.4472], // Nusle
  'NEM-010':[50.0560,14.4428], // Pankrác
  'NEM-011':[49.7800,14.9200], // Sázava
  'NEM-012':[50.0462,14.4030], // Smíchov
};

const properties = [
  {id:"NEM-001",name:"Byt 3+kk, Vinohrady",address:"Mánesova 45, Praha 2",type:"byt",size:82,price:8900000,status:"prodáno",agent:"Markéta Horáčková",reconstruction:"2019",energyClass:"B",notes:""},
  {id:"NEM-002",name:"Rodinný dům, Průhonice",address:"Kytínská 12, Průhonice",type:"dům",size:210,price:15500000,status:"k prodeji",agent:"Tomáš Novák",reconstruction:null,energyClass:"C",notes:"Chybí info o rekonstrukci a stáří střechy"},
  {id:"NEM-003",name:"Kancelář, Smíchov",address:"Radlická 180, Praha 5",type:"komerční",size:155,price:42000,status:"pronájem",agent:"Jana Veselá",reconstruction:"2022",energyClass:"A",notes:""},
  {id:"NEM-004",name:"Byt 1+kk, Žižkov",address:"Seifertova 78, Praha 3",type:"byt",size:38,price:4200000,status:"prodáno",agent:"Markéta Horáčková",reconstruction:null,energyClass:"D",notes:"Chybí dokumentace stavebních úprav z 2021"},
  {id:"NEM-005",name:"Byt 2+1, Dejvice",address:"Jugoslávských partyzánů 22, Praha 6",type:"byt",size:65,price:7100000,status:"rezervace",agent:"Tomáš Novák",reconstruction:"2023",energyClass:"B",notes:""},
  {id:"NEM-006",name:"Vila, Průhonice",address:"Dobřejovická 5, Průhonice",type:"dům",size:380,price:28000000,status:"k prodeji",agent:"Jana Veselá",reconstruction:null,energyClass:null,notes:"Chybí energetický průkaz, rekonstrukce neznámá"},
  {id:"NEM-007",name:"Byt 4+kk, Holešovice",address:"Tusarova 31, Praha 7",type:"byt",size:105,price:11200000,status:"prodáno",agent:"Markéta Horáčková",reconstruction:"2020",energyClass:"B",notes:""},
  {id:"NEM-008",name:"Sklad, Letňany",address:"Tupolevova 15, Praha 9",type:"komerční",size:840,price:125000,status:"pronájem",agent:"Tomáš Novák",reconstruction:"2018",energyClass:"C",notes:""},
  {id:"NEM-009",name:"Byt 2+kk, Nusle",address:"Táborská 55, Praha 4",type:"byt",size:58,price:5800000,status:"k prodeji",agent:"Jana Veselá",reconstruction:null,energyClass:"C",notes:"Chybí rok výstavby a stavební dokumentace"},
  {id:"NEM-010",name:"Penthouse, Pankrác",address:"Na Pankráci 12, Praha 4",type:"byt",size:180,price:19500000,status:"k prodeji",agent:"Markéta Horáčková",reconstruction:"2024",energyClass:"A",notes:""},
  {id:"NEM-011",name:"Chata, Sázava",address:"Bystřice nad Sázavou 44",type:"rekreační",size:95,price:2800000,status:"prodáno",agent:"Tomáš Novák",reconstruction:null,energyClass:null,notes:"Chybí stavební povolení a info o přípojkách"},
  {id:"NEM-012",name:"Byt 3+1, Smíchov",address:"Kartouzská 12, Praha 5",type:"byt",size:78,price:7600000,status:"rezervace",agent:"Jana Veselá",reconstruction:"2021",energyClass:"C",notes:""},
];
const clients = [
  {id:"KL-001",name:"Ing. Pavel Kratochvíl",type:"kupující",source:"doporučení",addedDate:"2025-01-08",quarter:"Q1 2025",status:"aktivní",agent:"Markéta Horáčková"},
  {id:"KL-002",name:"Martina Procházková",type:"kupující",source:"web",addedDate:"2025-01-15",quarter:"Q1 2025",status:"aktivní",agent:"Tomáš Novák"},
  {id:"KL-003",name:"ABC Invest s.r.o.",type:"investor",source:"LinkedIn",addedDate:"2025-01-22",quarter:"Q1 2025",status:"aktivní",agent:"Jana Veselá"},
  {id:"KL-004",name:"David Šimánek",type:"kupující",source:"Sreality.cz",addedDate:"2025-02-03",quarter:"Q1 2025",status:"aktivní",agent:"Markéta Horáčková"},
  {id:"KL-005",name:"Lucie a Petr Kováčovi",type:"kupující",source:"doporučení",addedDate:"2025-02-14",quarter:"Q1 2025",status:"aktivní",agent:"Jana Veselá"},
  {id:"KL-006",name:"Reality Group CZ a.s.",type:"developer",source:"veletrh",addedDate:"2025-02-28",quarter:"Q1 2025",status:"aktivní",agent:"Tomáš Novák"},
  {id:"KL-007",name:"Bc. Jana Horáková",type:"kupující",source:"web",addedDate:"2025-03-05",quarter:"Q1 2025",status:"aktivní",agent:"Jana Veselá"},
  {id:"KL-008",name:"MUDr. Roman Vlček",type:"kupující",source:"Sreality.cz",addedDate:"2025-03-12",quarter:"Q1 2025",status:"nový",agent:"Markéta Horáčková"},
  {id:"KL-009",name:"Ing. Zuzana Malá",type:"kupující",source:"web",addedDate:"2024-10-08",quarter:"Q4 2024",status:"uzavřeno",agent:"Markéta Horáčková"},
  {id:"KL-010",name:"Tomáš Blaha",type:"kupující",source:"doporučení",addedDate:"2024-10-20",quarter:"Q4 2024",status:"uzavřeno",agent:"Tomáš Novák"},
  {id:"KL-011",name:"FG Logistics s.r.o.",type:"nájemce",source:"LinkedIn",addedDate:"2024-11-05",quarter:"Q4 2024",status:"aktivní",agent:"Jana Veselá"},
  {id:"KL-012",name:"Radek Pospíšil",type:"kupující",source:"Sreality.cz",addedDate:"2024-11-18",quarter:"Q4 2024",status:"uzavřeno",agent:"Markéta Horáčková"},
  {id:"KL-013",name:"Alena Červenková",type:"kupující",source:"Facebook",addedDate:"2024-12-02",quarter:"Q4 2024",status:"uzavřeno",agent:"Tomáš Novák"},
];
const leadsHistory=[{month:"Říj 2024",leads:14,prodeje:3},{month:"Lis 2024",leads:18,prodeje:4},{month:"Pro 2024",leads:11,prodeje:2},{month:"Led 2025",leads:22,prodeje:5},{month:"Úno 2025",leads:19,prodeje:3},{month:"Bře 2025",leads:16,prodeje:2}];
const leadSources=[{source:"Sreality.cz",count:28},{source:"Doporučení",count:22},{source:"Web/SEO",count:16},{source:"LinkedIn",count:8},{source:"Facebook",count:4},{source:"Veletrh",count:2}];
const agents=[{name:"Markéta Horáčková",deals:8,revenue:52400000,leads:31},{name:"Tomáš Novák",deals:6,revenue:38700000,leads:27},{name:"Jana Veselá",deals:5,revenue:32100000,leads:22}];
const lastWeek={period:"17.–21. března 2025",highlights:["Uzavřen prodej Penthouse Pankrác za 11,2 M Kč","Nové zastoupení: Vila Průhonice (28 M Kč)","6 nových leadů ze Sreality a webu","12 prohlídek, 3 zájemci podali nabídky"]};
const marketListings=[{source:"Sreality.cz",title:"Byt 3+kk, Holešovice, 85 m²",price:9200000,date:"21. 3. 2025",type:"prodej"},{source:"Bezrealitky.cz",title:"Byt 2+1, Holešovice, 62 m²",price:6800000,date:"22. 3. 2025",type:"prodej"},{source:"Sreality.cz",title:"Byt 4+1, Praha 7, 115 m²",price:12500000,date:"22. 3. 2025",type:"prodej"},{source:"Reality.cz",title:"Byt 1+kk, Holešovice, 32 m²",price:3900000,date:"23. 3. 2025",type:"prodej"},{source:"Sreality.cz",title:"Nájemní byt 2+kk, Holešovice",price:22000,date:"23. 3. 2025",type:"nájem"}];
const gmailInbox=[
  {id:"GM-001",from:"david.simanek@gmail.com",name:"David Šimánek",subject:"Dotaz na byt v Nuslích",date:"08:14",body:"Zajímá mě byt 2+kk v Nuslích. Prohlídka tento týden odpoledne?"},
  {id:"GM-002",from:"info@abcinvest.cz",name:"ABC Invest s.r.o.",subject:"Penthouse — cenová nabídka",date:"09:32",body:"Nabízíme 18 500 000 Kč za penthouse. Odpověď do pátku."},
  {id:"GM-003",from:"kovacovi@email.cz",name:"Lucie a Petr Kováčovi",subject:"Smlouva — Byt Smíchov",date:"Včera",body:"Posíláme podepsanou rezervační smlouvu. Kdy kupní?"},
  {id:"GM-004",from:"vlcek.roman@medic.cz",name:"MUDr. Roman Vlček",subject:"Zájem o nemovitost",date:"Včera",body:"Zájem o prohlídku penthouse nebo Dejvic. Po 17:00 nebo sobota."},
  {id:"GM-005",from:"obchod@realitygroup.cz",name:"Reality Group CZ",subject:"Spolupráce — Vila Průhonice",date:"Úterý",body:"Klient se zájmem o vilu. Standardní provize."},
];
const calendarBusy=[
  {day:"Dnes",slots:["10:00 Prohlídka NEM-006 Průhonice","14:00 Schůzka ABC Invest","16:00 Podpis smlouvy Kováčovi"]},
  {day:"Středa",slots:["09:00 Interní meeting","11:00 Prohlídka NEM-009 Nusle"]},
  {day:"Čtvrtek",slots:["15:00 Právník — kupní smlouva"]},
  {day:"Pátek",slots:["10:00 Fotograf NEM-002"]},
];
const calendarFree=[
  {day:"Úterý 25. 3.",free:["08:00-09:00","11:30-13:00","15:30-17:00"]},
  {day:"Středa 26. 3.",free:["10:00-11:00","13:00-15:00","16:00-18:00"]},
  {day:"Čtvrtek 27. 3.",free:["09:00-12:00","13:00-15:00","16:30-18:00"]},
];
const marketPrices=[
  {locality:"Praha 2 — Vinohrady",avgPriceM2:109000,ourAvg:108537,trend:"+4.2% YoY"},
  {locality:"Praha 3 — Žižkov",avgPriceM2:98000,ourAvg:110526,trend:"+2.8% YoY"},
  {locality:"Praha 4 — Nusle/Pankrác",avgPriceM2:105000,ourAvg:107931,trend:"+5.1% YoY"},
  {locality:"Praha 5 — Smíchov",avgPriceM2:102000,ourAvg:97436,trend:"+3.3% YoY"},
  {locality:"Praha 6 — Dejvice",avgPriceM2:115000,ourAvg:109231,trend:"+6.2% YoY"},
  {locality:"Praha 7 — Holešovice",avgPriceM2:107000,ourAvg:106667,trend:"+4.8% YoY"},
];
const alerts=[
  {type:"warning",priority:"vysoká",title:"ABC Invest čeká na odpověď",desc:"Nabídka 18,5 M Kč — deadline pátek 28. 3.",action:"Napsat odpověď"},
  {type:"warning",priority:"vysoká",title:"3 nemovitosti bez dokumentace",desc:"NEM-002, NEM-004, NEM-006",action:"Zobrazit seznam"},
  {type:"info",priority:"střední",title:"Vila Průhonice 7 měsíců neprodaná",desc:"Zvážit snížení ceny.",action:"Analyzovat"},
  {type:"info",priority:"střední",title:"Kováčovi čekají na kupní smlouvu",desc:"Rezervace podepsána 23. 3.",action:"Připravit smlouvu"},
  {type:"info",priority:"nízká",title:"MUDr. Vlček bez přiřazeného agenta",desc:"Nový lead, zatím nepřiřazen.",action:"Přiřadit agenta"},
];

// ============================================================
// SYSTEM PROMPT
// ============================================================
const SYSTEM_PROMPT = `Jsi PEPA — Back Office Operations Agent pro Bohemia Reality s.r.o. Mluvíš česky, jsi profesionální a věcný.

NEMOVITOSTI: ${JSON.stringify(properties)}
KLIENTI: ${JSON.stringify(clients)}
LEADY/PRODEJE (6M): ${JSON.stringify(leadsHistory)}
ZDROJE LEADŮ: ${JSON.stringify(leadSources)}
AGENTI: ${JSON.stringify(agents)}
MINULÝ TÝDEN: ${JSON.stringify(lastWeek)}
NOVÉ NABÍDKY HOLEŠOVICE: ${JSON.stringify(marketListings)}
GMAIL: ${JSON.stringify(gmailInbox)}
KALENDÁŘ OBSAZENO: ${JSON.stringify(calendarBusy)}
KALENDÁŘ VOLNO: ${JSON.stringify(calendarFree)}
TRŽNÍ CENY: ${JSON.stringify(marketPrices)}
UPOZORNĚNÍ: ${JSON.stringify(alerts)}

Výstupní formáty:
Graf: \`\`\`chart\n{"type":"bar"|"line"|"pie","title":"...","data":[...],"xKey":"...","series":[{"key":"...","color":"...","label":"..."}]}\n\`\`\`
Tabulka: \`\`\`table\n{"title":"...","columns":["..."],"rows":[["..."]]}\n\`\`\`
Slidy: \`\`\`slides\n[{"title":"...","body":"...","bullets":["..."]}]\n\`\`\`
E-mail: s Předmět:, oslovením, tělem a podpisem.
Ostatní: markdown, čísla 8 900 000 Kč, stručně.
Při e-mailech zkontroluj kalendář a navrhni volné termíny.`;

// ============================================================
// AGENT & HELPERS
// ============================================================
async function callAgent(messages, onChunk) {
  // If onChunk provided, use streaming
  if(onChunk) {
    const r = await fetch("/api/claude", {
      method:"POST",headers:{"Content-Type":"application/json"},
      body: JSON.stringify({model:"claude-sonnet-4-6",max_tokens:1000,system:SYSTEM_PROMPT,messages,stream:true})
    });
    if(!r.ok) throw new Error('API error '+r.status);
    const reader = r.body.getReader();
    const decoder = new TextDecoder();
    let full = '';
    while(true) {
      const {done, value} = await reader.read();
      if(done) break;
      const chunk = decoder.decode(value);
      const lines = chunk.split('\n');
      for(const line of lines) {
        if(!line.startsWith('data: ')) continue;
        const data = line.slice(6);
        if(data === '[DONE]') continue;
        try {
          const parsed = JSON.parse(data);
          const text = parsed.delta?.text || parsed.content?.[0]?.text || '';
          if(text) { full += text; onChunk(full); }
        } catch(e) {}
      }
    }
    return full || 'Prázdná odpověď.';
  }
  // Fallback non-streaming
  const r = await fetch("/api/claude", {
    method:"POST",headers:{"Content-Type":"application/json"},
    body: JSON.stringify({model:"claude-sonnet-4-6",max_tokens:1000,system:SYSTEM_PROMPT,messages})
  });
  const d = await r.json();
  if(d.error) throw new Error(d.error.message || "API error");
  return (d.content&&d.content[0]&&d.content[0].text) || "Prázdná odpověď.";
}

function parseResponse(text) {
  const parts=[];const re=/```(chart|table|slides)([\s\S]*?)```/g;let last=0,m;
  while((m=re.exec(text))!==null){
    if(m.index>last){const t=text.slice(last,m.index).trim();if(t)parts.push({type:"text",content:t});}
    try{parts.push({type:m[1],content:JSON.parse(m[2].trim())});}catch(e){parts.push({type:"text",content:m[0]});}
    last=m.index+m[0].length;
  }
  if(last<text.length){const t=text.slice(last).trim();if(t)parts.push({type:"text",content:t});}
  if(!parts.length)parts.push({type:"text",content:text});
  return parts;
}
function renderMd(text){
  return text
    .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/\*(.+?)\*/g,'<em>$1</em>')
    .replace(/^### (.+)$/gm,'<h3>$1</h3>').replace(/^## (.+)$/gm,'<h2>$1</h2>').replace(/^# (.+)$/gm,'<h1>$1</h1>')
    .replace(/`(.+?)`/g,'<code>$1</code>')
    .replace(/^[-•] (.+)$/gm,'<li>$1</li>').replace(/^(\d+)\. (.+)$/gm,'<li>$2</li>')
    .replace(/(<li>[\s\S]*?<\/li>)/g,m=>`<ul>${m}</ul>`)
    .split('\n\n').map(p=>{if(/^<[hul]/.test(p.trim()))return p;if(!p.trim())return'';return`<p>${p.replace(/\n/g,'<br/>')}</p>`;}).join('');
}
function uid(){return Date.now().toString(36)+Math.random().toString(36).slice(2,6);}

function exportCSV(filename,headers,rows){
  const csv=[headers,...rows].map(r=>r.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n');
  const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));a.download=filename;a.click();
}
function exportPropertiesCSV(){exportCSV('nemovitosti.csv',['ID','Název','Adresa','Typ','m²','Cena','Status','Agent'],properties.map(p=>[p.id,p.name,p.address,p.type,p.size,p.price,p.status,p.agent]));}
function exportClientsCSV(){exportCSV('klienti.csv',['ID','Jméno','Typ','Zdroj','Přidán','Status','Agent'],clients.map(c=>[c.id,c.name,c.type,c.source,c.addedDate,c.status,c.agent]));}
function exportChatTXT(chat){
  const txt=chat.msgs.map(m=>`[${m.role==='user'?'Pepa':'PEPA'}]\n${m.content}`).join('\n\n---\n\n');
  const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([txt],{type:'text/plain'}));a.download='chat-'+chat.title.replace(/[^a-z0-9]/gi,'-')+'.txt';a.click();
}

const DEFAULT_QA=[
  {id:"qa1",icon:"👥",label:"Klienti Q1 2025",prompt:"Jaké nové klienty máme za 1. kvartál? Odkud přišli? Znázorni graficky jako koláčový graf."},
  {id:"qa2",icon:"📈",label:"Graf leadů a prodejů",prompt:"Vytvoř graf vývoje počtu leadů a prodaných nemovitostí za posledních 6 měsíců."},
  {id:"qa3",icon:"📧",label:"E-mail pro zájemce",prompt:"Napiš e-mail pro zájemce o Byt 3+kk Vinohrady a doporuč termín prohlídky 25. nebo 26. března 2025."},
  {id:"qa4",icon:"🔍",label:"Chybějící data",prompt:"Najdi nemovitosti s chybějícími daty. Vrať tabulku s doporučením."},
  {id:"qa5",icon:"📊",label:"Report + slidy",prompt:"Shrň výsledky minulého týdne a připrav prezentaci se třemi slidy."},
  {id:"qa6",icon:"🏘️",label:"Holešovice monitoring",prompt:"Informuj mě o nových nabídkách v Praze Holešovice. Zobraz jako tabulku."},
  {id:"qa7",icon:"📬",label:"Co je v emailech?",prompt:"Shrň příchozí emaily a pro každý navrhni co mám udělat."},
  {id:"qa8",icon:"📉",label:"Srovnání s trhem",prompt:"Porovnej ceny našich nemovitostí s tržními cenami. Vytvoř přehlednou tabulku."},
  {id:"qa9",icon:"🔥",label:"Prioritní úkoly",prompt:"Jaké jsou aktuální priority a problémy? Seřaď podle důležitosti."},
  {id:"qa10",icon:"☀️",label:"Ranní briefing",prompt:"Připrav ranní briefing — kalendář, emaily, priority na dnešek."},
];

const TEMPLATES=[
  {id:'t1',title:'Rezervační smlouva',desc:'Šablona rezervační smlouvy na nemovitost',icon:'📋',prompt:'Vygeneruj rezervační smlouvu pro NEM-009 (Byt 2+kk Nusle) pro klienta David Šimánek. Cena 5 800 000 Kč, záloha 100 000 Kč, platnost 30 dní.'},
  {id:'t2',title:'Průvodní dopis klientovi',desc:'Představení nemovitosti kupujícímu',icon:'✉️',prompt:'Napiš průvodní dopis MUDr. Romanu Vlčkovi představující Penthouse Pankrác. Zdůrazni klíčové výhody a navrhni prohlídku.'},
  {id:'t3',title:'Týdenní report',desc:'Souhrn aktivit za uplynulý týden',icon:'📊',prompt:'Připrav týdenní report pro vedení za 17.–21. března 2025. Zahrň prohlídky, leady, obchody a doporučení.'},
  {id:'t4',title:'Cenová analýza',desc:'Porovnání s trhem a doporučení',icon:'📉',prompt:'Připrav cenovou analýzu pro Vila Průhonice (NEM-006, 28 M Kč). Porovnej s trhem a doporuč cenovou strategii.'},
  {id:'t5',title:'Upomínka dokumentů',desc:'Žádost o chybějící podklady',icon:'📬',prompt:'Napiš e-mail s žádostí o doplnění dokumentů NEM-002 a NEM-011. Uveď co chybí a navrhni deadline.'},
];

// ============================================================
// REACT
// ============================================================
const {useState,useEffect,useRef}=React;
const {BarChart,Bar,LineChart,Line,PieChart,Pie,Cell,XAxis,YAxis,CartesianGrid,Tooltip,Legend,ResponsiveContainer}=Recharts;
const COLORS=['#7C6FF7','#22C55E','#F59E0B','#EF4444','#A78BFA','#34D399'];

function ChartTip({active,payload,label}){
  if(!active||!(payload&&payload.length))return null;
  return React.createElement('div',{style:{background:'var(--surface)',border:'1px solid var(--accent-border)',borderRadius:10,padding:'9px 13px',fontSize:12,boxShadow:'var(--shadow-lg)'}},
    label&&React.createElement('p',{style:{color:'var(--accent)',marginBottom:4,fontWeight:600}},label),
    ...payload.map((e,i)=>React.createElement('p',{key:i,style:{color:e.color,margin:'2px 0'}},`${e.name}: `,React.createElement('strong',null,typeof e.value==='number'&&e.value>100000?e.value.toLocaleString('cs-CZ')+' Kč':e.value)))
  );
}
function ChartBlock({data}){
  const {type,title,data:rows,xKey,series=[]}=data;
  const ax={fill:'var(--text3)',fontSize:11};
  const inner=()=>{
    if(type==='bar')return React.createElement(BarChart,{data:rows,margin:{top:8,right:16,left:0,bottom:4}},React.createElement(CartesianGrid,{strokeDasharray:"3 3",stroke:"var(--border)"}),React.createElement(XAxis,{dataKey:xKey,tick:ax}),React.createElement(YAxis,{tick:ax}),React.createElement(Tooltip,{content:React.createElement(ChartTip)}),React.createElement(Legend,{wrapperStyle:{fontSize:12,color:'var(--text3)'}}), ...series.map((s,i)=>React.createElement(Bar,{key:i,dataKey:s.key,name:s.label||s.key,fill:s.color||COLORS[i%COLORS.length],radius:[4,4,0,0]})));
    if(type==='line')return React.createElement(LineChart,{data:rows,margin:{top:8,right:16,left:0,bottom:4}},React.createElement(CartesianGrid,{strokeDasharray:"3 3",stroke:"var(--border)"}),React.createElement(XAxis,{dataKey:xKey,tick:ax}),React.createElement(YAxis,{tick:ax}),React.createElement(Tooltip,{content:React.createElement(ChartTip)}),React.createElement(Legend,{wrapperStyle:{fontSize:12,color:'var(--text3)'}}), ...series.map((s,i)=>React.createElement(Line,{key:i,type:"monotone",dataKey:s.key,name:s.label||s.key,stroke:s.color||COLORS[i%COLORS.length],strokeWidth:2.5,dot:{r:4},activeDot:{r:6}})));
    if(type==='pie')return React.createElement(PieChart,null,React.createElement(Pie,{data:rows,cx:"50%",cy:"50%",outerRadius:95,dataKey:(series[0]&&series[0].key)||'count',nameKey:xKey||'source',label:({name,percent})=>`${name} ${(percent*100).toFixed(0)}%`},rows.map((_,i)=>React.createElement(Cell,{key:i,fill:COLORS[i%COLORS.length]}))),React.createElement(Tooltip,{content:React.createElement(ChartTip)}));
    return null;
  };
  return React.createElement('div',{className:'chart-wrap'},title&&React.createElement('div',{className:'chart-title-text'},title),React.createElement(ResponsiveContainer,{width:"100%",height:260},inner()));
}
function TableBlock({data}){
  const {title,columns,rows}=data;
  return React.createElement('div',{className:'tbl-wrap'},title&&React.createElement('div',{className:'tbl-title'},title),React.createElement('table',{className:'data-table'},React.createElement('thead',null,React.createElement('tr',null,...columns.map((c,i)=>React.createElement('th',{key:i},c)))),React.createElement('tbody',null,rows.map((row,i)=>React.createElement('tr',{key:i},...row.map((cell,j)=>React.createElement('td',{key:j},cell)))))));
}
function SlidesBlock({data}){
  const [cur,setCur]=useState(0);const s=data[cur];
  return React.createElement('div',{className:'slides-wrap'},
    React.createElement('div',{className:'slide'},React.createElement('div',{className:'slide-num'},`${cur+1} / ${data.length}`),React.createElement('h3',{className:'slide-title'},s.title),s.body&&React.createElement('p',{className:'slide-body'},s.body),s.bullets&&React.createElement('ul',{className:'slide-bullets'},s.bullets.map((b,i)=>React.createElement('li',{key:i},b))),s.stats&&React.createElement('div',{className:'slide-stats'},s.stats.map((st,i)=>React.createElement('div',{key:i},React.createElement('span',{className:'stat-val'},st.value),React.createElement('span',{className:'stat-lbl'},st.label))))),
    data.length>1&&React.createElement('div',{className:'slide-nav'},React.createElement('button',{className:'slide-btn',disabled:cur===0,onClick:()=>setCur(c=>c-1)},'‹'),React.createElement('div',{className:'slide-dots'},data.map((_,i)=>React.createElement('button',{key:i,className:`slide-dot${i===cur?' active':''}`,onClick:()=>setCur(i)}))),React.createElement('button',{className:'slide-btn',disabled:cur===data.length-1,onClick:()=>setCur(c=>c+1)},'›'))
  );
}
function MsgContent({text}){
  const parts=parseResponse(text);
  return React.createElement('div',null,parts.map((p,i)=>{
    if(p.type==='text')return React.createElement('div',{key:i,className:'md-content',dangerouslySetInnerHTML:{__html:renderMd(p.content)}});
    if(p.type==='chart')return React.createElement(ChartBlock,{key:i,data:p.content});
    if(p.type==='table')return React.createElement(TableBlock,{key:i,data:p.content});
    if(p.type==='slides')return React.createElement(SlidesBlock,{key:i,data:p.content});
    return null;
  }));
}
function CopyBtn({text}){
  const [copied,setCopied]=useState(false);
  return React.createElement('button',{className:`msg-copy${copied?' copied':''}`,onClick:()=>{navigator.clipboard.writeText(text).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2000);});}},copied?'✓ Zkopírováno':'Kopírovat');
}

// ============================================================
// FILE UPLOAD
// ============================================================
function FileUpload({onFile,onClose}){
  const [drag,setDrag]=useState(false);const inp=useRef(null);
  return React.createElement('div',{className:'upload-zone'+(drag?' drag':''),onDragOver:e=>{e.preventDefault();setDrag(true);},onDragLeave:()=>setDrag(false),onDrop:e=>{e.preventDefault();setDrag(false);if(e.dataTransfer.files[0])onFile(e.dataTransfer.files[0]);},onClick:()=>inp.current&&inp.current.click()},
    React.createElement('input',{ref:inp,type:'file',style:{display:'none'},accept:'.pdf,.png,.jpg,.jpeg,.csv,.xlsx,.xls',onChange:e=>e.target.files[0]&&onFile(e.target.files[0])}),
    React.createElement('div',{className:'upload-zone-icon'},drag?'📂':'📎'),
    React.createElement('div',{className:'upload-zone-text'},'Přetáhněte soubor nebo klikněte'),
    React.createElement('div',{className:'upload-zone-sub'},'PDF, obrázek, CSV nebo Excel')
  );
}

// ============================================================
// MODALS
// ============================================================
function TemplateModal({onSelect,onClose}){
  return React.createElement('div',{className:'modal-overlay',onClick:e=>{if(e.target===e.currentTarget)onClose();}},
    React.createElement('div',{className:'modal'},
      React.createElement('h3',null,'📝 Šablony dokumentů'),
      React.createElement('div',{className:'template-list'},TEMPLATES.map(t=>React.createElement('div',{key:t.id,className:'template-item',onClick:()=>{onSelect(t.prompt);onClose();}},React.createElement('div',{className:'template-item-title'},t.icon+' '+t.title),React.createElement('div',{className:'template-item-desc'},t.desc)))),
      React.createElement('button',{className:'btn-secondary',onClick:onClose,style:{width:'100%'}},'Zavřít')
    )
  );
}
function AddQAModal({onSave,onClose}){
  const [icon,setIcon]=useState('⚡');const [label,setLabel]=useState('');const [prompt,setPrompt]=useState('');
  return React.createElement('div',{className:'modal-overlay',onClick:e=>{if(e.target===e.currentTarget)onClose();}},
    React.createElement('div',{className:'modal'},
      React.createElement('h3',null,'Nová rychlá akce'),
      React.createElement('div',{className:'modal-field'},React.createElement('label',null,'Ikona'),React.createElement('input',{value:icon,onChange:e=>setIcon(e.target.value),style:{width:60}})),
      React.createElement('div',{className:'modal-field'},React.createElement('label',null,'Název'),React.createElement('input',{value:label,onChange:e=>setLabel(e.target.value),placeholder:'Název akce'})),
      React.createElement('div',{className:'modal-field'},React.createElement('label',null,'Dotaz'),React.createElement('textarea',{value:prompt,onChange:e=>setPrompt(e.target.value),placeholder:'Instrukce pro PEPU...'})),
      React.createElement('div',{className:'modal-actions'},React.createElement('button',{className:'btn-secondary',onClick:onClose},'Zrušit'),React.createElement('button',{className:'btn-primary',onClick:()=>{if(label&&prompt)onSave({id:uid(),icon,label,prompt});},disabled:!label||!prompt},'Uložit'))
    )
  );
}
function AddDataModal({onAdd,onClose}){
  const [tab,setTab]=useState('property');const [form,setForm]=useState({});
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  function save(){
    if(tab==='property'){if(!form.name||!form.address)return;onAdd('property',{id:'NEM-'+String(properties.length+1).padStart(3,'0'),name:form.name,address:form.address,type:form.type||'byt',size:Number(form.size)||0,price:Number(form.price)||0,status:form.status||'k prodeji',agent:form.agent||'',reconstruction:form.reconstruction||null,energyClass:form.energyClass||null,notes:form.notes||''});}
    else{if(!form.name)return;onAdd('client',{id:'KL-'+String(clients.length+1).padStart(3,'0'),name:form.name,type:form.type||'kupující',source:form.source||'web',addedDate:new Date().toISOString().slice(0,10),quarter:'Q1 2025',status:'nový',agent:form.agent||''});}
    onClose();
  }
  const inp=(label,key,placeholder,type='text')=>React.createElement('div',{className:'modal-field'},React.createElement('label',null,label),React.createElement('input',{type,value:form[key]||'',onChange:e=>set(key,e.target.value),placeholder}));
  return React.createElement('div',{className:'modal-overlay',onClick:e=>{if(e.target===e.currentTarget)onClose();}},
    React.createElement('div',{className:'modal'},
      React.createElement('h3',null,'Přidat data'),
      React.createElement('div',{className:'data-tabs'},React.createElement('button',{className:`data-tab${tab==='property'?' active':''}`,onClick:()=>setTab('property')},'🏠 Nemovitost'),React.createElement('button',{className:`data-tab${tab==='client'?' active':''}`,onClick:()=>setTab('client')},'👤 Klient')),
      tab==='property'?React.createElement('div',null,inp('Název','name','Byt 3+kk, Vinohrady'),inp('Adresa','address','Mánesova 45, Praha 2'),inp('Typ','type','byt'),inp('Velikost m²','size','82','number'),inp('Cena Kč','price','8900000','number'),inp('Status','status','k prodeji'),inp('Agent','agent','Markéta Horáčková'),React.createElement('div',{className:'modal-field'},React.createElement('label',null,'Poznámky'),React.createElement('textarea',{value:form.notes||'',onChange:e=>set('notes',e.target.value)}))):
      React.createElement('div',null,inp('Jméno','name','Ing. Jan Novák'),inp('Typ','type','kupující'),inp('Zdroj','source','Sreality.cz'),inp('Agent','agent','Tomáš Novák')),
      React.createElement('div',{className:'modal-actions'},React.createElement('button',{className:'btn-secondary',onClick:onClose},'Zrušit'),React.createElement('button',{className:'btn-primary',onClick:save},'Přidat'))
    )
  );
}

// ============================================================
// AUTH SCREEN
// ============================================================
function AuthScreen({onAuth}){
  const [tab,setTab]=useState('login');const [email,setEmail]=useState('');const [password,setPassword]=useState('');const [name,setName]=useState('');const [loading,setLoading]=useState(false);const [error,setError]=useState('');const [success,setSuccess]=useState('');
  async function handleLogin(e){e.preventDefault();if(!email||!password)return;setLoading(true);setError('');try{const {data,error:err}=await sb.auth.signInWithPassword({email,password});if(err)throw err;onAuth(data.user);}catch(err){setError(translateAuthError(err.message||'Přihlášení se nezdařilo'));}finally{setLoading(false);}}
  async function handleRegister(e){e.preventDefault();if(!email||!password||!name)return;setLoading(true);setError('');try{const {data,error:err}=await sb.auth.signUp({email,password,options:{data:{name}}});if(err)throw err;if(data.user&&!data.session){
        setSuccess('Registrace úspěšná! Na e-mail vám dorazí potvrzovací odkaz.');
      } else if(!data.user && !data.session) {
        setError('Účet s tímto e-mailem již existuje. Přihlaste se nebo resetujte heslo.');
        setTab('login');
      }else if(data.user)onAuth(data.user);}catch(err){setError(translateAuthError(err.message||'Registrace se nezdařila'));}finally{setLoading(false);}}
  return React.createElement('div',{className:'auth-screen'},
    React.createElement('div',{className:'auth-card'},
      React.createElement('div',{className:'auth-logo'},React.createElement('div',{className:'auth-logo-icon'},'🏢'),React.createElement('div',{className:'auth-logo-name'},'PEPA'),React.createElement('div',{className:'auth-logo-sub'},'Back Office Agent · Bohemia Reality')),
      React.createElement('div',{className:'auth-tabs'},React.createElement('button',{className:'auth-tab'+(tab==='login'?' active':''),onClick:()=>{setTab('login');setError('');setSuccess('');}},'Přihlsásit se'),React.createElement('button',{className:'auth-tab'+(tab==='register'?' active':''),onClick:()=>{setTab('register');setError('');setSuccess('');}},'Registrovat')),
      error&&React.createElement('div',{className:'auth-error'},error),
      success&&React.createElement('div',{className:'auth-success'},success),
      tab==='login'?React.createElement('form',{onSubmit:handleLogin},React.createElement('div',{className:'auth-field'},React.createElement('label',null,'E-mail'),React.createElement('input',{type:'email',value:email,onChange:e=>setEmail(e.target.value),placeholder:'vas@email.cz',required:true})),React.createElement('div',{className:'auth-field'},React.createElement('label',null,'Heslo'),React.createElement('input',{type:'password',value:password,onChange:e=>setPassword(e.target.value),placeholder:'••••••••',required:true})),React.createElement('button',{type:'submit',className:'auth-submit',disabled:loading},loading?'Přihlašuji…':'Přihlásit se'),
          React.createElement('button',{type:'button',style:{background:'none',border:'none',color:'var(--text3)',fontSize:12,cursor:'pointer',marginTop:8,width:'100%'},onClick:async()=>{
            if(!email){setError('Zadejte e-mail pro reset hesla');return;}
            setLoading(true);
            const {error:err}=await sb.auth.resetPasswordForEmail(email,{redirectTo:'https://bohemia-reality.vercel.app'});
            if(err)setError(translateAuthError(err.message));
            else setSuccess('Odkaz pro reset hesla byl odeslán na '+email);
            setLoading(false);
          }},'🔒 Zapomněli jste heslo?')):
      React.createElement('form',{onSubmit:handleRegister},React.createElement('div',{className:'auth-field'},React.createElement('label',null,'Jméno'),React.createElement('input',{type:'text',value:name,onChange:e=>setName(e.target.value),placeholder:'Pepa Novák',required:true})),React.createElement('div',{className:'auth-field'},React.createElement('label',null,'E-mail'),React.createElement('input',{type:'email',value:email,onChange:e=>setEmail(e.target.value),placeholder:'vas@email.cz',required:true})),React.createElement('div',{className:'auth-field'},React.createElement('label',null,'Heslo'),React.createElement('input',{type:'password',value:password,onChange:e=>setPassword(e.target.value),placeholder:'Min. 6 znaků',required:true,minLength:6})),React.createElement('button',{type:'submit',className:'auth-submit',disabled:loading},loading?'Registruji…':'Vytvořit účet')),
      React.createElement('div',{className:'auth-footer'},'Bohemia Reality s.r.o. · Interní systém')
    )
  );
}

// ============================================================
// HOME DASHBOARD
// ============================================================
function HomeDashboard({user,tasks,onAddTask,onToggleTask,onDeleteTask,onOpenChat}) {
  const [newTask,setNewTask]=useState('');
  const userName=(user&&user.user_metadata&&user.user_metadata.name)||(user&&user.email&&user.email.split('@')[0])||'Pepo';
  const hour=new Date().getHours();
  const greeting=hour<12?'Dobré ráno':hour<18?'Dobrý den':'Dobrý večer';
  const activeTasks=(tasks||[]).filter(t=>!t.done);
  const q1clients=clients.filter(c=>c.quarter==='Q1 2025');
  const missingDocs=properties.filter(p=>p.notes&&p.notes.length>0);
  const todaySlots=(calendarBusy[0]&&calendarBusy[0].slots)||[];

  function addTask(){if(!newTask.trim())return;onAddTask({id:uid(),title:newTask.trim(),done:false,created:new Date().toLocaleDateString('cs-CZ')});setNewTask('');}

  return React.createElement('div',{className:'home-view'},
    // Welcome banner
    React.createElement('div',{className:'welcome-banner'},
      React.createElement('div',{className:'welcome-left'},
        React.createElement('h1',null,(hour<12?'Dobré ráno':'Dobrý den')+', '+userName+'!'),
        React.createElement('p',null,'Úterý, 25. března 2025 · Bohemia Reality s.r.o.')
      ),
      React.createElement('div',{className:'welcome-stats'},
        React.createElement('div',null,React.createElement('div',{className:'welcome-stat-val'},q1clients.length),React.createElement('div',{className:'welcome-stat-lbl'},'Klienti Q1')),
        React.createElement('div',null,React.createElement('div',{className:'welcome-stat-val'},activeTasks.length),React.createElement('div',{className:'welcome-stat-lbl'},'Aktivní úkoly')),
        React.createElement('div',null,React.createElement('div',{className:'welcome-stat-val'},gmailInbox.length),React.createElement('div',{className:'welcome-stat-lbl'},'Nové emaily'))
      ),
      React.createElement('button',{className:'welcome-btn',onClick:()=>onOpenChat('Připrav ranní briefing na dnešní den — co mám v kalendáři, emaily, priority.')},'☀️ Ranní briefing')
    ),
    // Row 1: KPI cards
    React.createElement('div',{className:'home-grid-3'},
      ...[
        {icon:'🏠',label:'Nemovitosti k prodeji',val:properties.filter(p=>p.status==='k prodeji').length,badge:'+2 nové',badgeColor:'var(--green)',bg:'var(--green-dim)'},
        {icon:'👥',label:'Aktivní klienti',val:clients.filter(c=>c.status==='aktivní').length,badge:'Q1: '+q1clients.length,badgeColor:'var(--accent)',bg:'var(--accent-dim)'},
        {icon:'⚠️',label:'Chybí dokumentace',val:missingDocs.length,badge:'Vyřešit',badgeColor:'var(--orange)',bg:'var(--orange-dim)'},
      ].map((k,i)=>React.createElement('div',{key:i,className:'card'},
        React.createElement('div',{className:'kpi-mini'},
          React.createElement('div',{className:'kpi-mini-icon',style:{background:k.bg}},k.icon),
          React.createElement('div',null,React.createElement('div',{className:'kpi-mini-val'},k.val),React.createElement('div',{className:'kpi-mini-lbl'},k.label)),
          React.createElement('span',{className:'kpi-mini-badge',style:{background:k.bg,color:k.badgeColor}},k.badge)
        )
      ))
    ),
    // Row 2: Emails + Calendar
    React.createElement('div',{className:'home-grid'},
      // Emails
      React.createElement('div',{className:'card'},
        React.createElement('div',{className:'card-header'},
          React.createElement('div',null,React.createElement('div',{className:'card-title'},'📬 Příchozí e-maily'),React.createElement('div',{className:'card-sub'},gmailInbox.length+' nepřečtených')),
          React.createElement('button',{className:'card-action',onClick:()=>onOpenChat('Shrň mi všechny příchozí emaily a navrhni co mám udělat.')},'Zobrazit vše')
        ),
        ...gmailInbox.slice(0,4).map((email,i)=>React.createElement('div',{key:i,className:'email-item',onClick:()=>onOpenChat(`Napiš odpověď na email od ${email.name}: "${email.subject}"`)},
          React.createElement('div',{className:'email-avatar'},email.name[0]),
          React.createElement('div',{style:{flex:1,minWidth:0}},React.createElement('div',{className:'email-from'},email.name),React.createElement('div',{className:'email-subject'},email.subject)),
          React.createElement('div',{className:'email-date'},email.date)
        ))
      ),
      // Calendar
      React.createElement('div',{className:'card'},
        React.createElement('div',{className:'card-header'},
          React.createElement('div',null,React.createElement('div',{className:'card-title'},'📅 Dnešní kalendář'),React.createElement('div',{className:'card-sub'},todaySlots.length+' schůzek')),
          React.createElement('button',{className:'card-action',onClick:()=>onOpenChat('Jaké mám dnes schůzky a co je třeba připravit?')},'Detail')
        ),
        todaySlots.length===0?React.createElement('div',{style:{color:'var(--text3)',fontSize:13,textAlign:'center',padding:'20px 0'}},'Dnes žádné schůzky'):
        todaySlots.map((slot,i)=>{
          const parts=slot.split(' ');const time=parts[0];const label=parts.slice(1).join(' ');
          return React.createElement('div',{key:i,className:'cal-item'},
            React.createElement('span',{className:'cal-dot'}),
            React.createElement('span',{className:'cal-time'},time),
            React.createElement('span',{className:'cal-label'},label)
          );
        })
      )
    ),
    // Row 3: Tasks + Alerts
    React.createElement('div',{className:'home-grid'},
      // Tasks
      React.createElement('div',{className:'card'},
        React.createElement('div',{className:'card-header'},
          React.createElement('div',null,React.createElement('div',{className:'card-title'},'✅ Úkoly'),React.createElement('div',{className:'card-sub'},activeTasks.length+' aktivních')),
          React.createElement('button',{className:'card-action',onClick:()=>onOpenChat('Jaké jsou prioritní úkoly?')},'Prioritizovat')
        ),
        tasks.slice(0,5).map((t,i)=>React.createElement('div',{key:t.id,className:'task-row'},
          React.createElement('button',{className:'task-check'+(t.done?' done':''),onClick:()=>onToggleTask(t.id)},t.done?'✓':''),
          React.createElement('span',{className:'task-label'+(t.done?' done':'')},t.title),
          React.createElement('button',{className:'task-del-btn',onClick:()=>onDeleteTask(t.id)},'×')
        )),
        React.createElement('div',{className:'add-task-row'},
          React.createElement('input',{className:'add-task-inp',value:newTask,onChange:e=>setNewTask(e.target.value),placeholder:'Přidat úkol…',onKeyDown:e=>e.key==='Enter'&&addTask()}),
          React.createElement('button',{className:'add-task-submit',onClick:addTask},'+')
        )
      ),
      // Alerts
      React.createElement('div',{className:'card'},
        React.createElement('div',{className:'card-header'},
          React.createElement('div',null,React.createElement('div',{className:'card-title'},'🔔 Priority a upozornění'),React.createElement('div',{className:'card-sub'},alerts.filter(a=>a.priority==='vysoká').length+' urgentních')),
          React.createElement('button',{className:'card-action',onClick:()=>onOpenChat('Jaké jsou aktuální problémy a priority? Navrhni řešení.')},'Řešit')
        ),
        alerts.map((a,i)=>React.createElement('div',{key:i,className:'alert-item',onClick:()=>onOpenChat(a.action+': '+a.title+'. '+a.desc)},
          React.createElement('div',{className:'alert-dot',style:{background:a.priority==='vysoká'?'var(--red)':a.priority==='střední'?'var(--orange)':'var(--green)'}}),
          React.createElement('div',{className:'alert-body'},React.createElement('div',{className:'alert-title'},a.title),React.createElement('div',{className:'alert-desc'},a.desc)),
          React.createElement('span',{className:'alert-priority',style:{background:a.priority==='vysoká'?'var(--red-dim)':a.priority==='střední'?'var(--orange-dim)':'var(--green-dim)',color:a.priority==='vysoká'?'var(--red)':a.priority==='střední'?'var(--orange)':'var(--green)'}},a.priority)
        ))
      )
    )
  );
}

// ============================================================
// KATASTR INTEGRATION (demo - NEM-010 Penthouse Pankrác)
// ============================================================
// Real katastr data for Na Pankráci 12, Praha 4
// Source: ČÚZK Nahlížení do KN - manually fetched for demo
const KATASTR_DEMO = {
  propId: 'NEM-010',
  parcela: '2845/12',
  lv: '1203',
  ku: 'Pankrác (727661)',
  typ: 'Bytová jednotka 1823/12',
  vymera: '180 m²',
  zpusobVyuziti: 'Byt',
  vlastnik: 'Bohemia Reality s.r.o. (zastoupení)',
  omezeni: 'Zástavní právo smluvní — Komerční banka a.s.',
  cenaZjistena: '19 500 000 Kč',
  datumVkladu: '15. 3. 2024',
  stavba: 'Bytový dům č.p. 1823',
  adresa: 'Na Pankráci 1823/12, Praha 4 — Pankrác',
};

function KatastrPanel({prop}) {
  if(!prop || prop.id !== 'NEM-010') return null;
  const d = KATASTR_DEMO;

  return React.createElement('div',{className:'katastr-panel'},
    React.createElement('div',{className:'katastr-header'},
      React.createElement('span',{className:'katastr-badge'},'🏛️ KATASTR'),
      React.createElement('span',{className:'katastr-title'},'Výpis z katastru nemovitostí — '+prop.name)
    ),
    React.createElement('div',{className:'katastr-body'},
      React.createElement('div',{className:'katastr-grid'},
        ...[
          {label:'Parcela č.', value:d.parcela},
          {label:'List vlastnictví', value:d.lv, accent:true},
          {label:'Katastrální území', value:d.ku},
          {label:'Typ jednotky', value:d.typ},
          {label:'Výměra', value:d.vymera},
          {label:'Způsob využití', value:d.zpusobVyuziti},
          {label:'Vlastník', value:d.vlastnik},
          {label:'Datum vkladu', value:d.datumVkladu},
          {label:'Stavba', value:d.stavba},
          {label:'Cena zjištěná', value:d.cenaZjistena, accent:true},
        ].map((f,i)=>React.createElement('div',{key:i,className:'katastr-field'},
          React.createElement('div',{className:'katastr-field-label'},f.label),
          React.createElement('div',{className:'katastr-field-value'+(f.accent?' accent':'')},f.value)
        ))
      ),
      // Omezení
      React.createElement('div',{style:{padding:'10px 12px',background:'rgba(239,68,68,.06)',border:'1px solid rgba(239,68,68,.2)',borderRadius:'var(--rs)',marginBottom:12}},
        React.createElement('div',{style:{fontSize:10,fontWeight:600,color:'var(--red)',textTransform:'uppercase',letterSpacing:'.07em',marginBottom:4}},'⚠️ Omezení vlastnického práva'),
        React.createElement('div',{style:{fontSize:13,color:'var(--text)'}},d.omezeni)
      ),
      // Links to ČÚZK
      React.createElement('div',{className:'katastr-links'},
        React.createElement('a',{
          className:'katastr-link',
          href:'https://nahlizenidokn.cuzk.gov.cz/ZobrazObjekt.aspx?encrypted=NAHL~FRmrZamYs4_AsMRWQ7UF_gv0k8z7pWXdI0u2ToqxOf8Wmb6FG41bkTVpffbxD1aGx4EFW1_RLtKvmn2tczbGj573MTvOlsOGfroiaaMrbFDA8GDkE-_6c4z0x1gAZikWEEtuojaQZeEFuKav4EZqDpiZkcHuI8ivXmAA2iCu7OXYOKRMTAx89VsuEC2htjcWaqTATFIoIcAqBMpfPh_FjMWudaf-TRtzndc8Mk38LAV5O6KSiQtwZb7XOWIE8rf1',
          target:'_blank',rel:'noopener noreferrer'
        },'🔗 Nahlédnout do KN'),
        React.createElement('a',{
          className:'katastr-link',
          href:'https://nahlizenidokn.cuzk.gov.cz/ZobrazObjekt.aspx?encrypted=NAHL~FRmrZamYs4_AsMRWQ7UF_gv0k8z7pWXdI0u2ToqxOf8Wmb6FG41bkTVpffbxD1aGx4EFW1_RLtKvmn2tczbGj573MTvOlsOGfroiaaMrbFDA8GDkE-_6c4z0x1gAZikWEEtuojaQZeEFuKav4EZqDpiZkcHuI8ivXmAA2iCu7OXYOKRMTAx89VsuEC2htjcWaqTATFIoIcAqBMpfPh_FjMWudaf-TRtzndc8Mk38LAV5O6KSiQtwZb7XOWIE8rf1',
          target:'_blank',rel:'noopener noreferrer'
        },'📋 List vlastnictví č. 1203'),
        React.createElement('a',{
          className:'katastr-link',
          href:'https://www.cuzk.cz/Uvod/Produkty-a-sluzby/INSPIRE/Prohlizeci-sluzby/Prohlizec-WMS-katastr.aspx',
          target:'_blank',rel:'noopener noreferrer'
        },'🗺️ Mapa ČÚZK'),
        React.createElement('a',{
          className:'katastr-link',
          href:'https://nahlizenidokn.cuzk.cz/VyhledatNemovitost.aspx?polozka=adresa&dotaz=Na+Pankr%C3%A1ci+12+Praha+4',
          target:'_blank',rel:'noopener noreferrer'
        },'🔍 Hledat podle adresy')
      ),
      React.createElement('div',{className:'katastr-note'},
        '📌 Demo data — v produkci by se načítala přímo z ČÚZK API (WFS/WMS služba) nebo scraping Nahlížení do KN. Pro ostatní nemovitosti klikněte na tlačítko Katastr u každé karty.'
      )
    )
  );
}

// ============================================================
// PROPERTY MAP
// ============================================================
const STATUS_COLORS = {
  'k prodeji': '#7C6FF7',
  'prodáno': '#22C55E',
  'rezervace': '#F59E0B',
  'pronájem': '#3B82F6',
};

function PropertyMap({onAskPepa}) {
  const mapRef = useRef(null);
  const leafletMap = useRef(null);
  const markersRef = useRef([]);
  const [filterStatus, setFilterStatus] = useState('vše');
  const [selectedProp, setSelectedProp] = useState(null);
  const [priceAnalysis, setPriceAnalysis] = useState({});

  const statuses = ['vše', 'k prodeji', 'rezervace', 'pronájem', 'prodáno'];

  const filtered = filterStatus === 'vše' ? properties : properties.filter(p => p.status === filterStatus);

  useEffect(() => {
    if (!mapRef.current || leafletMap.current) return;
    const map = window.L.map(mapRef.current, {
      center: [50.0755, 14.4378],
      zoom: 11,
      zoomControl: true,
    });
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
      maxZoom: 19,
    }).addTo(map);
    leafletMap.current = map;
    // Fix size after mount
    setTimeout(() => { map.invalidateSize(); }, 100);
    setTimeout(() => { map.invalidateSize(); }, 500);
    return () => { if(leafletMap.current){leafletMap.current.remove();leafletMap.current=null;} };
  }, []);

  // Invalidate size on any view change
  useEffect(() => {
    if (leafletMap.current) setTimeout(() => { leafletMap.current && leafletMap.current.invalidateSize(); }, 200);
  });

  // Invalidate size when filter changes (container might resize)
  useEffect(() => {
    if (leafletMap.current) {
      setTimeout(() => { leafletMap.current && leafletMap.current.invalidateSize(); }, 50);
    }
  }, [filterStatus]);

  useEffect(() => {
    if (!leafletMap.current) return;
    // Clear existing markers
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    filtered.forEach(prop => {
      const coords = propCoords[prop.id];
      if (!coords) return;
      const color = STATUS_COLORS[prop.status] || '#6B7280';
      const icon = window.L.divIcon({
        html: '<div style="width:14px;height:14px;border-radius:50%;background:'+color+';border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,.3)"></div>',
        className: '',
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      });
      const marker = window.L.marker(coords, {icon})
        .addTo(leafletMap.current)
        .bindPopup('<b>'+prop.name+'</b><br>'+prop.address+'<br><span style="color:'+color+';font-weight:600">'+prop.status+'</span><br>'+(prop.price > 1000000 ? (prop.price/1000000).toFixed(1)+' M Kč' : prop.price.toLocaleString('cs-CZ')+' Kč'));
      marker.on('click', () => setSelectedProp(prop));
      markersRef.current.push(marker);
    });
  }, [filtered]);

  function getPriceAdvice(prop) {
    const market = marketPrices.find(m => prop.address.includes(m.locality.split(' — ')[0].replace('Praha ','P')));
    if (!market) return null;
    const ourM2 = Math.round(prop.price / prop.size);
    const diff = ((ourM2 - market.avgPriceM2) / market.avgPriceM2 * 100).toFixed(1);
    return {ourM2, marketM2: market.avgPriceM2, diff, locality: market.locality};
  }

  function formatPrice(p) {
    return p >= 1000000 ? (p/1000000).toFixed(2).replace('.',',')+' M Kč' : p.toLocaleString('cs-CZ')+' Kč';
  }

  return React.createElement('div',{className:'map-view'},
    React.createElement('div',{className:'map-toolbar'},
      React.createElement('h1',null,'Mapa nemovitostí'),
      React.createElement('button',{className:'btn-secondary',style:{padding:'8px 14px',fontSize:12},
        onClick:()=>onAskPepa('Analyzuj naše portfolio nemovitostí. Které jsou nejdéle v nabídce? Které jsou předražené podle tržních cen?')
      },'💬 Zeptat PEPU'),
      React.createElement('button',{className:'btn-primary',style:{padding:'8px 16px',fontSize:13},
        onClick:()=>onAskPepa('Navrhni cenovou strategii pro naše nemovitosti k prodeji na základě tržních dat.')
      },'💰 Navrhnout ceny')
    ),
    // Filter buttons
    React.createElement('div',{className:'map-filter-wrap'},
      statuses.map(s=>React.createElement('button',{
        key:s, className:'map-filter-btn'+(filterStatus===s?' active':''),
        onClick:()=>setFilterStatus(s),
        style:{borderColor: s!=='vše'&&filterStatus!==s ? STATUS_COLORS[s]||'var(--border)' : undefined}
      }, s==='vše'?'Vše ('+properties.length+')':s+' ('+(properties.filter(p=>p.status===s).length)+')'))
    ),
    // Map
    React.createElement('div',{className:'map-container'},
      React.createElement('div',{ref:mapRef,style:{height:'100%',width:'100%'}})
    ),
    // Legend
    React.createElement('div',{className:'map-legend'},
      Object.entries(STATUS_COLORS).map(([status,color])=>
        React.createElement('div',{key:status,className:'map-legend-item'},
          React.createElement('div',{className:'map-legend-dot',style:{background:color}}),
          status
        )
      )
    ),
    // Property cards
    React.createElement('div',{className:'map-prop-list'},
      filtered.map(prop=>{
        const priceAdv = getPriceAdvice(prop);
        return React.createElement('div',{
          key:prop.id,
          className:'map-prop-card'+(selectedProp?.id===prop.id?' active':''),
          onClick:()=>{
            setSelectedProp(prop);
            const coords=propCoords[prop.id];
            if(coords&&leafletMap.current) leafletMap.current.setView(coords,14);
          }
        },
          React.createElement('div',{className:'map-prop-status',style:{background:(STATUS_COLORS[prop.status]||'#6B7280')+'22',color:STATUS_COLORS[prop.status]||'#6B7280'}},
            React.createElement('div',{style:{width:7,height:7,borderRadius:'50%',background:STATUS_COLORS[prop.status]||'#6B7280'}}),
            prop.status
          ),
          React.createElement('div',{className:'map-prop-name'},prop.name),
          React.createElement('div',{className:'map-prop-addr'},'📍 '+prop.address),
          React.createElement('div',{className:'map-prop-meta'},
            React.createElement('span',{className:'map-prop-price'},formatPrice(prop.price)),
            React.createElement('span',{className:'map-prop-size'},prop.size+' m²')
          ),
          priceAdv&&React.createElement('div',{style:{fontSize:11,marginTop:6,color:Number(priceAdv.diff)>5?'var(--red)':Number(priceAdv.diff)<-5?'var(--green)':'var(--text3)'}},
            (Number(priceAdv.diff)>0?'↑ ':'↓ ')+Math.abs(priceAdv.diff)+'% oproti trhu ('+priceAdv.marketM2.toLocaleString('cs-CZ')+' Kč/m²)'
          ),
          React.createElement('div',{style:{display:'flex',gap:4,marginTop:8,flexWrap:'wrap'}},
            React.createElement('button',{className:'map-price-btn',
              onClick:e=>{e.stopPropagation();onAskPepa('Navrhni optimální cenu pro '+prop.name+' ('+prop.id+'). Porovnej s tržními daty a doporuč konkrétní cenu.');}
            },'💰 Navrhni cenu'),
            React.createElement('a',{
              className:'map-katastr-btn',
              href:(prop.id==='NEM-010'?'https://nahlizenidokn.cuzk.gov.cz/ZobrazObjekt.aspx?encrypted=NAHL~FRmrZamYs4_AsMRWQ7UF_gv0k8z7pWXdI0u2ToqxOf8Wmb6FG41bkTVpffbxD1aGx4EFW1_RLtKvmn2tczbGj573MTvOlsOGfroiaaMrbFDA8GDkE-_6c4z0x1gAZikWEEtuojaQZeEFuKav4EZqDpiZkcHuI8ivXmAA2iCu7OXYOKRMTAx89VsuEC2htjcWaqTATFIoIcAqBMpfPh_FjMWudaf-TRtzndc8Mk38LAV5O6KSiQtwZb7XOWIE8rf1':'https://nahlizenidokn.cuzk.gov.cz/VyhledejNemovitost.aspx'),
              target:'_blank',rel:'noopener noreferrer',
              onClick:e=>e.stopPropagation()
            },'🏛️ Katastr')
          )
        );
      })
    ),
    selectedProp&&selectedProp.id==='NEM-010'&&React.createElement(KatastrPanel,{prop:selectedProp})
  );
}

// ============================================================
// TEAM CALENDAR
// ============================================================
const AGENT_COLORS=['agent-color-0','agent-color-1','agent-color-2','agent-color-3'];
const AGENTS_LIST=['Všichni','Markéta Horáčková','Tomáš Novák','Jana Veselá'];

function AddMeetingModal({onSave,onClose,defaultDate}){
  const [form,setForm]=useState({
    title:'',date:defaultDate||new Date().toISOString().slice(0,10),
    time_from:'09:00',time_to:'10:00',
    agent:'Markéta Horáčková',client:'',property_id:'',notes:''
  });
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  const inp=(label,key,type='text',placeholder='')=>React.createElement('div',{className:'modal-field'},
    React.createElement('label',null,label),
    React.createElement('input',{type,value:form[key],onChange:e=>set(key,e.target.value),placeholder})
  );
  return React.createElement('div',{className:'modal-overlay',onClick:e=>{if(e.target===e.currentTarget)onClose();}},
    React.createElement('div',{className:'modal meeting-form'},
      React.createElement('h3',null,'Nová schůzka'),
      inp('Název schůzky','title','text','Prohlídka NEM-010'),
      React.createElement('div',{style:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}},
        inp('Datum','date','date'),
        React.createElement('div',{className:'modal-field'},
          React.createElement('label',null,'Agent'),
          React.createElement('select',{value:form.agent,onChange:e=>set('agent',e.target.value)},
            ['Markéta Horáčková','Tomáš Novák','Jana Veselá'].map(a=>React.createElement('option',{key:a,value:a},a))
          )
        )
      ),
      React.createElement('div',{style:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}},
        inp('Od','time_from','time'),
        inp('Do','time_to','time')
      ),
      inp('Klient','client','text','Jméno klienta'),
      React.createElement('div',{className:'modal-field'},
        React.createElement('label',null,'Nemovitost'),
        React.createElement('select',{value:form.property_id,onChange:e=>set('property_id',e.target.value)},
          React.createElement('option',{value:''},'— bez nemovitosti —'),
          properties.map(p=>React.createElement('option',{key:p.id,value:p.id},p.id+' '+p.name))
        )
      ),
      React.createElement('div',{className:'modal-field'},
        React.createElement('label',null,'Poznámky'),
        React.createElement('textarea',{value:form.notes,onChange:e=>set('notes',e.target.value),style:{width:'100%',background:'var(--surface2)',border:'1px solid var(--border)',borderRadius:'var(--rs)',padding:'10px 12px',color:'var(--text)',fontFamily:"'Inter',sans-serif",fontSize:13,outline:'none',minHeight:60,resize:'vertical'}})
      ),
      React.createElement('div',{className:'modal-actions'},
        React.createElement('button',{className:'btn-secondary',onClick:onClose},'Zrušit'),
        React.createElement('button',{className:'btn-primary',disabled:!form.title||!form.date,onClick:()=>onSave(form)},'Uložit schůzku')
      )
    )
  );
}

function TeamCalendar({user,onAskPepa}){
  const [meetings,setMeetings]=useState([]);
  const [loading,setLoading]=useState(true);
  const [filterAgent,setFilterAgent]=useState('Všichni');
  const [showAddModal,setShowAddModal]=useState(false);
  const [addDate,setAddDate]=useState('');
  const [weekOffset,setWeekOffset]=useState(0);
  const [calView,setCalView]=useState('timeline'); // 'timeline' | 'week'

  // loadMeetings called in real-time useEffect above

  async function loadMeetings(){
    setLoading(true);
    try{
      const {data,error}=await sb.from('meetings').select('*').order('date').order('time_from');
      if(!error&&data) setMeetings(data);
    }catch(e){}
    setLoading(false);
  }

  // Realtime subscription for meetings
  useEffect(()=>{
    const channel=sb.channel('meetings-changes')
      .on('postgres_changes',{event:'*',schema:'public',table:'meetings'},()=>{
        loadMeetings();
      })
      .subscribe();
    return ()=>sb.removeChannel(channel);
  },[]);

  // Real-time subscription
  useEffect(()=>{
    loadMeetings();
    const sub=sb.channel('meetings-realtime')
      .on('postgres_changes',{event:'*',schema:'public',table:'meetings'},payload=>{
        if(payload.eventType==='INSERT')setMeetings(p=>[...p,payload.new].sort((a,b)=>a.date.localeCompare(b.date)));
        if(payload.eventType==='DELETE')setMeetings(p=>p.filter(m=>m.id!==payload.old.id));
        if(payload.eventType==='UPDATE')setMeetings(p=>p.map(m=>m.id===payload.new.id?payload.new:m));
      })
      .subscribe();
    return()=>sb.removeChannel(sub);
  },[]);

  async function saveMeeting(form){
    try{
      const {error}=await sb.from('meetings').insert({...form,created_by:user?.id});
      if(!error){await loadMeetings();setShowAddModal(false);}
    }catch(e){}
  }

  async function deleteMeeting(id){
    try{
      await sb.from('meetings').delete().eq('id',id);
      setMeetings(prev=>prev.filter(m=>m.id!==id));
    }catch(e){}
  }

  // Build week days
  const today=new Date();
  const monday=new Date(today);
  monday.setDate(today.getDate()-today.getDay()+1+(weekOffset*7));
  const weekDays=Array.from({length:7},(_,i)=>{
    const d=new Date(monday);d.setDate(monday.getDate()+i);return d;
  });

  const dayNames=['Po','Út','St','Čt','Pá','So','Ne'];
  const filtered=filterAgent==='Všichni'?meetings:meetings.filter(m=>m.agent===filterAgent);

  function getMeetingsForDay(date){
    const ds=date.toISOString().slice(0,10);
    return filtered.filter(m=>m.date===ds);
  }

  function isToday(date){
    return date.toDateString()===today.toDateString();
  }

  const agentColorMap={};
  ['Markéta Horáčková','Tomáš Novák','Jana Veselá'].forEach((a,i)=>agentColorMap[a]=AGENT_COLORS[i]);

  const weekLabel=`${weekDays[0].getDate()}. ${weekDays[0].toLocaleString('cs-CZ',{month:'long'})} – ${weekDays[6].getDate()}. ${weekDays[6].toLocaleString('cs-CZ',{month:'long'})} ${weekDays[0].getFullYear()}`;

  return React.createElement('div',{className:'cal-view'},
    React.createElement('div',{className:'cal-toolbar'},
      React.createElement('h1',null,'Týmový kalendář'),
      React.createElement('div',{className:'cal-view-toggle'},
        React.createElement('button',{className:'cal-view-btn'+(calView==='timeline'?' active':''),onClick:()=>setCalView('timeline')},'⏱ Timeline'),
        React.createElement('button',{className:'cal-view-btn'+(calView==='week'?' active':''),onClick:()=>setCalView('week')},'📆 Týden')
      ),
      React.createElement('button',{className:'btn-secondary',style:{padding:'8px 14px',fontSize:12},onClick:()=>onAskPepa('Kdy mají agenti volno tento týden? Kdo má nejvíc schůzek? Shrn mi kalendář týmu.')},'💬 Zeptat PEPU'),
      React.createElement('button',{className:'btn-primary',style:{padding:'8px 16px',fontSize:13},onClick:()=>{setAddDate(today.toISOString().slice(0,10));setShowAddModal(true);}},'+ Přidat schůzku')
    ),
    // Agent filters
    React.createElement('div',{className:'cal-filter-wrap'},
      AGENTS_LIST.map(a=>React.createElement('button',{key:a,className:'cal-filter-btn'+(filterAgent===a?' active':''),onClick:()=>setFilterAgent(a)},a))
    ),
    // Week navigation
    React.createElement('div',{style:{display:'flex',alignItems:'center',gap:12}},
      React.createElement('button',{className:'topbar-btn',onClick:()=>setWeekOffset(o=>o-1)},'←'),
      React.createElement('span',{style:{fontSize:14,fontWeight:500,color:'var(--text2)',flex:1,textAlign:'center'}},weekLabel),
      React.createElement('button',{className:'topbar-btn',onClick:()=>setWeekOffset(o=>o+1)},'→'),
      weekOffset!==0&&React.createElement('button',{className:'cal-filter-btn',onClick:()=>setWeekOffset(0)},'Dnes')
    ),
    // Calendar grid (timeline or week)
    loading?React.createElement('div',{style:{textAlign:'center',padding:40,color:'var(--text3)'}},'Načítám schůzky…'):
    calView==='timeline'?
    // TIMELINE VIEW
    React.createElement('div',{className:'timeline-wrap'},
      React.createElement('div',{className:'timeline-grid'},
        // Header row
        React.createElement('div',{className:'timeline-header'},
          React.createElement('div',{className:'timeline-agent-cell',style:{background:'var(--surface2)',borderRight:'2px solid var(--border)'}}),
          weekDays.map((day,di)=>React.createElement('div',{key:di,className:'timeline-header-day'+(isToday(day)?' today':'')},
            ['Po','Út','St','Čt','Pá','So','Ne'][di],
            React.createElement('span',{className:'timeline-header-num'+(isToday(day)?' today':'')},day.getDate())
          ))
        ),
        // Agent rows
        ['Markéta Horáčková','Tomáš Novák','Jana Veselá'].map((agent,ai)=>{
          if(filterAgent!=='Všichni'&&filterAgent!==agent) return null;
          const agentColor=['#7C6FF7','#22C55E','#F59E0B'][ai];
          return React.createElement('div',{key:agent,className:'timeline-row'},
            // Agent name cell
            React.createElement('div',{className:'timeline-agent-cell'},
              React.createElement('div',{className:'timeline-agent-dot',style:{background:agentColor}}),
              React.createElement('div',{className:'timeline-agent-name'},agent.split(' ')[0]+' '+agent.split(' ')[1][0]+'.')
            ),
            // Day cells
            weekDays.map((day,di)=>{
              const ds=day.toISOString().slice(0,10);
              const dayEvents=meetings.filter(m=>m.agent===agent&&m.date===ds);
              return React.createElement('div',{
                key:di,className:'timeline-day-cell'+(isToday(day)?' today':''),
                onClick:()=>{setAddDate(ds);setShowAddModal(true);}
              },
                dayEvents.map(m=>React.createElement('div',{
                  key:m.id,className:'timeline-event',
                  style:{background:agentColor+'22',borderLeftColor:agentColor,color:agentColor},
                  title:m.time_from+' – '+m.time_to+': '+m.title+(m.client?' ('+m.client+')':''),
                  onClick:e=>{e.stopPropagation();if(window.confirm('Smazat: '+m.title+'?'))deleteMeeting(m.id);}
                },m.time_from+' '+m.title)),
                dayEvents.length===0&&React.createElement('button',{className:'timeline-add',onClick:e=>{e.stopPropagation();setAddDate(ds);setShowAddModal(true);},title:'Přidat schůzku'},'+')
              );
            })
          );
        })
      )
    ):
    // WEEK VIEW (original)
    React.createElement('div',{className:'cal-week-grid'},
      weekDays.map((day,di)=>{
        const dayMeetings=getMeetingsForDay(day);
        return React.createElement('div',{key:di,className:'cal-day-col'+(isToday(day)?' today':'')},
          React.createElement('div',{className:'cal-day-header'},
            React.createElement('div',{className:'cal-day-name'},dayNames[di]),
            React.createElement('div',{className:'cal-day-num'},day.getDate())
          ),
          dayMeetings.map(m=>React.createElement('div',{
            key:m.id,
            className:'cal-meeting-block '+(agentColorMap[m.agent]||AGENT_COLORS[0]),
            title:m.notes||m.title,
            onClick:()=>{if(window.confirm('Smazat: '+m.title+'?')){deleteMeeting(m.id);}}
          },
            React.createElement('div',{className:'cal-meeting-time'},m.time_from+' – '+m.time_to),
            React.createElement('div',{className:'cal-meeting-title'},m.title),
            filterAgent==='Všichni'&&React.createElement('div',{className:'cal-meeting-agent'},m.agent.split(' ')[0])
          )),
          React.createElement('button',{className:'cal-add-btn',onClick:()=>{setAddDate(day.toISOString().slice(0,10));setShowAddModal(true);}},'＋ přidat')
        );
      })
    ),
    // Stats row
    React.createElement('div',{style:{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12}},
      ['Markéta Horáčková','Tomáš Novák','Jana Veselá'].map((agent,i)=>{
        const count=meetings.filter(m=>m.agent===agent&&m.date>=weekDays[0].toISOString().slice(0,10)&&m.date<=weekDays[6].toISOString().slice(0,10)).length;
        return React.createElement('div',{key:agent,className:'card',style:{padding:14}},
          React.createElement('div',{style:{display:'flex',alignItems:'center',gap:10}},
            React.createElement('div',{style:{width:10,height:10,borderRadius:'50%',background:['#7C6FF7','#22C55E','#F59E0B'][i],flexShrink:0}}),
            React.createElement('div',null,
              React.createElement('div',{style:{fontSize:13,fontWeight:600,color:'var(--text)'}},agent.split(' ')[0]+' '+agent.split(' ')[1]),
              React.createElement('div',{style:{fontSize:12,color:'var(--text3)'}},count+' schůzek tento týden')
            )
          )
        );
      })
    ),
    showAddModal&&React.createElement(AddMeetingModal,{onSave:saveMeeting,onClose:()=>setShowAddModal(false),defaultDate:addDate})
  );
}

// ============================================================
// PDF EXPORT
// ============================================================
function exportPDF(type, data) {
  const {jsPDF} = window.jspdf;
  const doc = new jsPDF({orientation:'portrait', unit:'mm', format:'a4'});
  const W = 210, margin = 18, contentW = W - margin*2;
  let y = margin;

  // Colors
  const accent = [124, 111, 247];
  const dark = [17, 24, 39];
  const gray = [107, 114, 128];
  const lightGray = [243, 244, 246];

  // Header
  doc.setFillColor(accent[0],accent[1],accent[2]);
  doc.rect(0, 0, W, 28, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('PEPA — Bohemia Reality s.r.o.', margin, 18);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(new Date().toLocaleDateString('cs-CZ', {day:'numeric',month:'long',year:'numeric'}), W - margin, 18, {align:'right'});
  y = 38;

  if(type === 'portfolio') {
    doc.setTextColor(dark[0],dark[1],dark[2]);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Portfolio nemovitostí', margin, y); y += 10;

    // Summary stats
    const kProdeji = properties.filter(p=>p.status==='k prodeji').length;
    const prodano = properties.filter(p=>p.status==='prodáno').length;
    const rezervace = properties.filter(p=>p.status==='rezervace').length;
    const totalValue = properties.filter(p=>p.status!=='pronájem').reduce((s,p)=>s+p.price,0);

    doc.setFillColor(lightGray[0],lightGray[1],lightGray[2]);
    doc.rect(margin, y, contentW, 18, 'F');
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(accent[0],accent[1],accent[2]);
    const stats = [
      'K prodeji: '+kProdeji,
      'Rezervace: '+rezervace,
      'Prodáno: '+prodano,
      'Celková hodnota: '+(totalValue/1000000).toFixed(1)+' M Kč'
    ];
    stats.forEach((s, i) => doc.text(s, margin + 8 + i * (contentW/4), y + 11));
    y += 24;

    // Table header
    const cols = ['ID', 'Název', 'Status', 'Cena', 'm²', 'Agent'];
    const colW = [18, 60, 22, 30, 14, 30];
    doc.setFillColor(accent[0],accent[1],accent[2]);
    doc.rect(margin, y, contentW, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    let x = margin + 2;
    cols.forEach((col, i) => { doc.text(col, x, y + 5.5); x += colW[i]; });
    y += 8;

    // Table rows
    properties.forEach((p, idx) => {
      if(y > 270) { doc.addPage(); y = margin; }
      doc.setFillColor(...(idx % 2 === 0 ? [255,255,255] : lightGray));
      doc.rect(margin, y, contentW, 7, 'F');
      doc.setTextColor(dark[0],dark[1],dark[2]);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      x = margin + 2;
      const row = [p.id, p.name.slice(0,28), p.status, p.price>=1000000?(p.price/1000000).toFixed(1)+' M':p.price.toLocaleString('cs'), String(p.size), p.agent.split(' ')[0]];
      row.forEach((val, i) => { doc.text(val, x, y + 4.8); x += colW[i]; });
      y += 7;
    });

  } else if(type === 'report') {
    doc.setTextColor(dark[0],dark[1],dark[2]);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Týdenní report — '+new Date().toLocaleDateString('cs-CZ', {week:'long'}), margin, y); y += 8;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(gray[0],gray[1],gray[2]);
    doc.text(data?.period || 'Aktuální období', margin, y); y += 12;

    // Highlights
    if(data?.highlights?.length) {
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(dark[0],dark[1],dark[2]);
      doc.text('Klíčové události', margin, y); y += 7;
      data.highlights.forEach(h => {
        doc.setFillColor(lightGray[0],lightGray[1],lightGray[2]);
        doc.rect(margin, y-4, contentW, 7, 'F');
        doc.setFillColor(accent[0],accent[1],accent[2]);
        doc.rect(margin, y-4, 3, 7, 'F');
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(dark[0],dark[1],dark[2]);
        doc.text(h, margin + 6, y+0.5);
        y += 9;
      });
      y += 4;
    }

    // Agents stats
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(dark[0],dark[1],dark[2]);
    doc.text('Výkon agentů', margin, y); y += 8;
    agents.forEach((agent, i) => {
      doc.setFillColor(...(i%2===0?[255,255,255]:lightGray));
      doc.rect(margin, y-5, contentW, 12, 'F');
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(dark[0],dark[1],dark[2]);
      doc.text(agent.name, margin+3, y);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(gray[0],gray[1],gray[2]);
      doc.text('Obchody: '+agent.deals+'  |  Leady: '+agent.leads+'  |  Tržby: '+(agent.revenue/1000000).toFixed(1)+' M Kč', margin+3, y+5);
      y += 14;
    });

  } else if(type === 'chat') {
    doc.setTextColor(dark[0],dark[1],dark[2]);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Export konverzace', margin, y); y += 6;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(gray[0],gray[1],gray[2]);
    doc.text(data?.title || 'Chat', margin, y); y += 10;

    (data?.msgs || []).forEach(m => {
      if(y > 265) { doc.addPage(); y = margin; }
      const isUser = m.role === 'user';
      doc.setFillColor(...(isUser ? accent : lightGray));
      if(isUser) doc.setTextColor(255,255,255); else doc.setTextColor(dark[0],dark[1],dark[2]);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      const label = isUser ? 'Vy' : 'PEPA';
      doc.text(label, margin, y); y += 4;
      doc.setFont('helvetica', 'normal');
      const lines = doc.splitTextToSize(m.content.slice(0,500), contentW);
      lines.slice(0,8).forEach(line => {
        if(y > 270) { doc.addPage(); y = margin; }
        doc.setFillColor(...(isUser ? accent : lightGray));
        doc.setTextColor(...(isUser ? [255,255,255] : dark));
        doc.text(line, margin, y); y += 5;
      });
      y += 4;
    });
  }

  // Footer
  const pageCount = doc.getNumberOfPages();
  for(let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFillColor(lightGray[0],lightGray[1],lightGray[2]);
    doc.rect(0, 287, W, 10, 'F');
    doc.setFontSize(7);
    doc.setTextColor(gray[0],gray[1],gray[2]);
    doc.text('Bohemia Reality s.r.o. · PEPA Back Office Agent · Strana '+i+'/'+pageCount, W/2, 293, {align:'center'});
  }

  const filename = type==='portfolio'?'portfolio-nemovitosti':type==='report'?'tydenny-report':'chat-export';
  doc.save(filename+'-'+new Date().toISOString().slice(0,10)+'.pdf');
}

function PDFModal({activeChat, onClose}) {
  const [selected, setSelected] = useState('portfolio');
  const [exporting, setExporting] = useState(false);

  const options = [
    {id:'portfolio', icon:'🏠', title:'Portfolio nemovitostí', desc:'Přehled všech 12 nemovitostí s cenami a statusy'},
    {id:'report', icon:'📊', title:'Týdenní report', desc:'Výkon agentů, klíčové události, statistiky'},
    {id:'chat', icon:'💬', title:'Export konverzace', desc:'Aktuální chat jako PDF dokument'},
  ];

  async function doExport() {
    setExporting(true);
    setTimeout(() => {
      try {
        const data = selected==='report' ? lastWeek : selected==='chat' ? activeChat : null;
        exportPDF(selected, data);
      } catch(e) { console.error(e); }
      setExporting(false);
      onClose();
    }, 300);
  }

  return React.createElement('div',{className:'pdf-modal-overlay',onClick:e=>{if(e.target===e.currentTarget)onClose();}},
    React.createElement('div',{className:'pdf-modal'},
      React.createElement('h3',null,'📄 Export do PDF'),
      React.createElement('p',null,'Vyber co chceš exportovat:'),
      exporting&&React.createElement('div',{className:'pdf-progress'},React.createElement('span',{className:'spin'},'⟳'),' Generuji PDF…'),
      React.createElement('div',{className:'pdf-options'},
        options.map(o=>React.createElement('div',{key:o.id,className:'pdf-option'+(selected===o.id?' selected':''),onClick:()=>setSelected(o.id)},
          React.createElement('span',{className:'pdf-option-icon'},o.icon),
          React.createElement('div',null,
            React.createElement('div',{className:'pdf-option-title'},o.title),
            React.createElement('div',{className:'pdf-option-desc'},o.desc)
          ),
          selected===o.id&&React.createElement('span',{style:{marginLeft:'auto',color:'var(--accent)',fontSize:18}},'✓')
        ))
      ),
      React.createElement('div',{className:'modal-actions'},
        React.createElement('button',{className:'btn-secondary',onClick:onClose},'Zrušit'),
        React.createElement('button',{className:'btn-primary',disabled:exporting,onClick:doExport},'⬇️ Stáhnout PDF')
      )
    )
  );
}

// ============================================================
// ONBOARDING
// ============================================================
const ONBOARDING_STEPS = [
  {
    icon: '👋',
    title: 'Vítejte v PEPA!',
    desc: 'Váš AI back office asistent pro Bohemia Reality. Zvládne reporty, emaily, analýzy a kalendář — vše česky a okamžitě.',
    features: [
      {icon:'🤖', title:'AI asistent', desc:'Ptejte se přirozeně — grafy, tabulky, emaily na pár kliknutí'},
      {icon:'📊', title:'Živá data', desc:'Portfolio, klienti, leady — vše aktuální a přehledné'},
      {icon:'👥', title:'Týmový nástroj', desc:'Sdílené schůzky, kalendář agentů, real-time sync'},
    ]
  },
  {
    icon: '💬',
    title: 'Chat s PEPOU',
    desc: 'Hlavní síla aplikace. Zeptejte se na cokoliv — PEPA zná vaše data, píše emaily a generuje reporty.',
    features: [
      {icon:'📈', title:'Grafy a tabulky', desc:'„Graf vývoje leadů za 6 měsíců" → okamžitý výsledek'},
      {icon:'✉️', title:'E-maily', desc:'„Napiš odpověď ABC Invest s protinabídkou" → hotový email'},
      {icon:'🎤', title:'Hlasový vstup', desc:'Mluvte místo psaní — mikrofon v chatu'},
    ]
  },
  {
    icon: '🗺️',
    title: 'Mapa a Kalendář',
    desc: 'Vizuální přehled portfolia na mapě a týmový kalendář s timeline view pro všechny agenty.',
    features: [
      {icon:'📍', title:'Mapa nemovitostí', desc:'Kliknutím na pin zobrazíte detail, tržní srovnání a katastr'},
      {icon:'📅', title:'Timeline kalendář', desc:'Schůzky agentů v přehledné ose, přidání na klik'},
      {icon:'🏛️', title:'Katastr ČÚZK', desc:'Přímé propojení s katastrem nemovitostí (Penthouse Pankrác)'},
    ]
  },
  {
    icon: '⌨️',
    title: 'Klávesové zkratky',
    desc: 'Pracujte rychleji s klávesovými zkratkami. Naučte se pár základních a ušetříte hodiny.',
    shortcuts: [
      {key:'Ctrl+K', desc:'Vyhledávání'},
      {key:'G H', desc:'Přehled (Home)'},
      {key:'G C', desc:'Chat'},
      {key:'G T', desc:'Úkoly (Tasks)'},
      {key:'G K', desc:'Kalendář'},
      {key:'G M', desc:'Mapa'},
      {key:'Esc', desc:'Zavřít modal'},
      {key:'↑ Enter', desc:'Odeslat zprávu'},
    ]
  },
];

function OnboardingModal({userName, onClose}) {
  const [step, setStep] = useState(0);
  const total = ONBOARDING_STEPS.length;
  const s = ONBOARDING_STEPS[step];
  const isLast = step === total - 1;

  return React.createElement('div',{className:'onboarding-overlay'},
    React.createElement('div',{className:'onboarding-card'},
      // Progress bar
      React.createElement('div',{className:'onboarding-progress'},
        React.createElement('div',{className:'onboarding-progress-bar',style:{width:((step+1)/total*100)+'%'}})
      ),
      // Body
      React.createElement('div',{className:'onboarding-body'},
        React.createElement('div',{className:'onboarding-step-num'},'Krok '+(step+1)+' z '+total),
        React.createElement('span',{className:'onboarding-icon'},s.icon),
        React.createElement('h2',{className:'onboarding-title'},step===0?'Vítejte, '+userName+'!':s.title),
        React.createElement('p',{className:'onboarding-desc'},s.desc),
        s.features&&React.createElement('div',{className:'onboarding-features'},
          s.features.map((f,i)=>React.createElement('div',{key:i,className:'onboarding-feature'},
            React.createElement('span',{className:'onboarding-feature-icon'},f.icon),
            React.createElement('div',null,
              React.createElement('div',{className:'onboarding-feature-title'},f.title),
              React.createElement('div',{className:'onboarding-feature-desc'},f.desc)
            )
          ))
        ),
        s.shortcuts&&React.createElement('div',{className:'onboarding-shortcuts'},
          s.shortcuts.map((sc,i)=>React.createElement('div',{key:i,className:'onboarding-shortcut'},
            React.createElement('span',{className:'shortcut-key'},sc.key),
            React.createElement('span',{className:'shortcut-desc'},sc.desc)
          ))
        )
      ),
      // Footer
      React.createElement('div',{className:'onboarding-footer'},
        React.createElement('div',{className:'onboarding-dots'},
          Array.from({length:total},(_,i)=>React.createElement('button',{key:i,className:'onboarding-dot'+(i===step?' active':''),onClick:()=>setStep(i)}))
        ),
        React.createElement('div',{style:{display:'flex',gap:8,alignItems:'center'}},
          !isLast&&React.createElement('button',{className:'onboarding-skip',onClick:onClose},'Přeskočit'),
          React.createElement('button',{
            className:'btn-primary',
            onClick:()=>isLast?onClose():setStep(s=>s+1),
            style:{padding:'10px 24px'}
          },isLast?'Začít používat 🚀':'Další →')
        )
      )
    )
  );
}

// ============================================================
// NOTIFICATION CENTER
// ============================================================
function NotifCenter({onClose, onAction}) {
  const notifs = [
    ...alerts.map((a,i)=>({
      id:'alert-'+i, icon:a.priority==='vysoká'?'🔴':'🟡',
      title:a.title, desc:a.desc,
      badge:a.priority, badgeColor:a.priority==='vysoká'?'var(--red)':'var(--orange)',
      badgeBg:a.priority==='vysoká'?'var(--red-dim)':'var(--orange-dim)',
      time:'Dnes', action:a.action
    })),
    ...gmailInbox.slice(0,3).map((e,i)=>({
      id:'email-'+i, icon:'📬',
      title:'Email: '+e.name,
      desc:e.subject, badge:'email',
      badgeColor:'var(--accent)', badgeBg:'var(--accent-dim)',
      time:e.date, action:'Odpovědět na email od '+e.name
    })),
  ];

  return React.createElement('div',{className:'notif-center'},
    React.createElement('div',{className:'notif-center-header'},
      React.createElement('span',{className:'notif-center-title'},'🔔 Upozornění ('+notifs.length+')'),
      React.createElement('button',{className:'notif-center-clear',onClick:onClose},'Zavřít')
    ),
    React.createElement('div',{className:'notif-list'},
      notifs.map(n=>React.createElement('div',{key:n.id,className:'notif-item',onClick:()=>{onAction(n.action);onClose();}},
        React.createElement('span',{className:'notif-item-icon'},n.icon),
        React.createElement('div',{style:{flex:1,minWidth:0}},
          React.createElement('div',{className:'notif-item-title'},n.title),
          React.createElement('div',{className:'notif-item-desc'},n.desc),
          React.createElement('div',{className:'notif-item-time'},n.time)
        ),
        React.createElement('span',{
          className:'notif-item-badge',
          style:{background:n.badgeBg,color:n.badgeColor}
        },n.badge)
      ))
    )
  );
}

// ============================================================
// NOTIFICATION CENTER
// ============================================================
function NotifCenter({onClose, onAction}) {
  const notifs = [
    {id:'n1',type:'warning',title:'ABC Invest čeká na odpověď',desc:'Nabídka 18,5 M Kč na Penthouse — deadline pátek 28. 3.',time:'Před 2 hodinami',action:'Napsat odpověď',unread:true},
    {id:'n2',type:'warning',title:'3 nemovitosti bez dokumentace',desc:'NEM-002, NEM-004, NEM-006 mají chybějící data',time:'Dnes 8:00',action:'Zobrazit seznam',unread:true},
    {id:'n3',type:'info',title:'Nová zpráva od Kováčových',desc:'Posíláme podepsanou rezervační smlouvu na byt Smíchov.',time:'Včera 16:45',action:'Odpovědět',unread:true},
    {id:'n4',type:'info',title:'Vila Průhonice 7 měsíců neprodaná',desc:'Zvážit snížení ceny nebo změnu strategie.',time:'Včera 9:00',action:'Analyzovat',unread:false},
    {id:'n5',type:'info',title:'MUDr. Vlček — nový lead',desc:'Zájem o prohlídku, zatím bez přiřazeného agenta.',time:'23. 3. 11:20',action:'Přiřadit',unread:false},
    {id:'n6',type:'success',title:'Prodej uzavřen — Penthouse Pankrác',desc:'Transakce 11,2 M Kč úspěšně dokončena.',time:'21. 3. 14:00',action:null,unread:false},
    {id:'n7',type:'info',title:'Nový klient přidán',desc:'MUDr. Roman Vlček přidán do systému.',time:'21. 3. 10:00',action:null,unread:false},
  ];
  const colors = {warning:'var(--red)',info:'var(--accent)',success:'var(--green)'};

  return React.createElement('div',{className:'notif-center-overlay',onClick:e=>{if(e.target===e.currentTarget)onClose();}},
    React.createElement('div',{className:'notif-center'},
      React.createElement('div',{className:'notif-center-header'},
        React.createElement('div',null,
          React.createElement('div',{className:'notif-center-title'},'Notifikace'),
          React.createElement('div',{style:{fontSize:12,color:'var(--text3)',marginTop:2}},notifs.filter(n=>n.unread).length+' nepřečtených')
        ),
        React.createElement('button',{className:'notif-close',onClick:onClose},'×')
      ),
      React.createElement('div',{className:'notif-list'},
        React.createElement('div',{className:'notif-section-label'},'Nepřečtené'),
        notifs.filter(n=>n.unread).map(n=>React.createElement('div',{key:n.id,className:'notif-item unread',onClick:()=>{if(n.action)onAction(n.action+': '+n.title+'. '+n.desc);onClose();}},
          React.createElement('div',{className:'notif-dot2',style:{background:colors[n.type]}}),
          React.createElement('div',{style:{flex:1}},
            React.createElement('div',{className:'notif-item-title'},n.title),
            React.createElement('div',{className:'notif-item-desc'},n.desc),
            React.createElement('div',{className:'notif-item-time'},n.time),
            n.action&&React.createElement('div',{style:{fontSize:11,color:'var(--accent)',marginTop:4,fontWeight:600}},n.action+' →')
          )
        )),
        React.createElement('div',{className:'notif-section-label',style:{marginTop:8}},'Starší'),
        notifs.filter(n=>!n.unread).map(n=>React.createElement('div',{key:n.id,className:'notif-item',onClick:()=>{if(n.action)onAction(n.action+': '+n.title);onClose();}},
          React.createElement('div',{className:'notif-dot2',style:{background:colors[n.type],opacity:.5}}),
          React.createElement('div',{style:{flex:1}},
            React.createElement('div',{className:'notif-item-title'},n.title),
            React.createElement('div',{className:'notif-item-desc'},n.desc),
            React.createElement('div',{className:'notif-item-time'},n.time)
          )
        ))
      )
    )
  );
}

// ============================================================
// ONBOARDING
// ============================================================

function Onboarding({userName, onComplete}) {
  const [step, setStep] = useState(0);
  const current = ONBOARDING_STEPS[step];
  const isLast = step === ONBOARDING_STEPS.length - 1;
  const progress = ((step + 1) / ONBOARDING_STEPS.length) * 100;

  return React.createElement('div',{className:'onboarding-overlay'},
    React.createElement('div',{className:'onboarding-card'},
      React.createElement('div',{className:'onboarding-progress'},
        React.createElement('div',{className:'onboarding-progress-bar',style:{width:progress+'%'}})
      ),
      React.createElement('div',{className:'onboarding-body'},
        React.createElement('div',{className:'onboarding-step-num'},'Krok '+(step+1)+' z '+ONBOARDING_STEPS.length),
        React.createElement('span',{className:'onboarding-icon'},current.icon),
        React.createElement('h2',{className:'onboarding-title'},
          step===0 ? 'Vítejte, '+userName+'!' : current.title
        ),
        React.createElement('p',{className:'onboarding-desc'},current.desc),
        current.features&&React.createElement('div',{className:'onboarding-features'},
          current.features.map((f,i)=>React.createElement('div',{key:i,className:'onboarding-feature'},
            React.createElement('span',{className:'onboarding-feature-icon'},f.icon),
            React.createElement('div',{className:'onboarding-feature-text'},
              React.createElement('strong',null,f.title),
              f.desc
            )
          ))
        ),
        current.shortcuts&&React.createElement('div',{className:'onboarding-shortcuts'},
          current.shortcuts.map((s,i)=>React.createElement('div',{key:i,className:'shortcut-item'},
            React.createElement('span',{className:'shortcut-key'},s.key),
            React.createElement('span',{className:'shortcut-desc'},s.desc)
          ))
        )
      ),
      React.createElement('div',{className:'onboarding-footer'},
        React.createElement('div',{className:'onboarding-dots'},
          ONBOARDING_STEPS.map((_,i)=>React.createElement('button',{key:i,className:'onboarding-dot'+(i===step?' active':''),onClick:()=>setStep(i)}))
        ),
        React.createElement('div',{style:{display:'flex',gap:8}},
          step>0&&React.createElement('button',{className:'btn-secondary',style:{padding:'9px 18px',fontSize:13},onClick:()=>setStep(s=>s-1)},'← Zpět'),
          React.createElement('button',{className:'btn-primary',style:{padding:'9px 24px',fontSize:13},onClick:()=>isLast?onComplete():setStep(s=>s+1)},
            isLast?'Začít používat PEPA 🚀':'Další →'
          )
        )
      )
    )
  );
}

// ============================================================
// KEYBOARD SHORTCUTS MODAL
// ============================================================
function ShortcutsModal({onClose}) {
  const groups = [
    {label:'Navigace',items:[
      {key:'G H',desc:'Přehled'},
      {key:'G C',desc:'Nový chat'},
      {key:'G T',desc:'Úkoly'},
      {key:'G M',desc:'Mapa'},
      {key:'G K',desc:'Kalendář'},
      {key:'G A',desc:'Analýzy'},
    ]},
    {label:'Akce',items:[
      {key:'Ctrl+K',desc:'Vyhledávání'},
      {key:'Enter',desc:'Odeslat zprávu'},
      {key:'Shift+Enter',desc:'Nový řádek'},
      {key:'Esc',desc:'Zavřít / Zpět'},
      {key:'?',desc:'Tato nápověda'},
    ]},
  ];

  return React.createElement('div',{className:'shortcuts-overlay',onClick:e=>{if(e.target===e.currentTarget)onClose();}},
    React.createElement('div',{className:'shortcuts-modal'},
      React.createElement('h3',null,'⌨️ Klávesové zkratky'),
      groups.map((g,gi)=>React.createElement('div',{key:gi,style:{marginBottom:16}},
        React.createElement('div',{className:'notif-section-label'},g.label),
        React.createElement('div',{className:'shortcuts-grid'},
          g.items.map((s,i)=>React.createElement('div',{key:i,className:'shortcut-row'},
            React.createElement('span',{className:'shortcut-key'},s.key),
            React.createElement('span',{className:'shortcut-desc'},s.desc)
          ))
        )
      )),
      React.createElement('button',{className:'btn-secondary',style:{width:'100%',marginTop:8},onClick:onClose},'Zavřít')
    )
  );
}

// ============================================================
// ANALYTICS DASHBOARD
// ============================================================
function AnalyticsDashboard({onAskPepa}) {
  const {BarChart,Bar,LineChart,Line,PieChart,Pie,Cell,XAxis,YAxis,CartesianGrid,Tooltip,Legend,ResponsiveContainer,AreaChart,Area} = Recharts;
  const COLORS = ['#7C6FF7','#22C55E','#F59E0B','#EF4444','#3B82F6','#A78BFA'];

  // KPI data
  const totalRevenue = agents.reduce((s,a)=>s+a.revenue,0);
  const totalDeals = agents.reduce((s,a)=>s+a.deals,0);
  const activeProps = properties.filter(p=>p.status==='k prodeji').length;
  const q1clients = clients.filter(c=>c.quarter==='Q1 2025').length;

  // Portfolio by status
  const portfolioData = [
    {name:'K prodeji', value:properties.filter(p=>p.status==='k prodeji').length},
    {name:'Prodáno', value:properties.filter(p=>p.status==='prodáno').length},
    {name:'Rezervace', value:properties.filter(p=>p.status==='rezervace').length},
    {name:'Pronájem', value:properties.filter(p=>p.status==='pronájem').length},
  ];

  // Agent performance
  const agentData = agents.map(a=>({
    name:a.name.split(' ')[0],
    obchody:a.deals,
    tržby:Math.round(a.revenue/1000000*10)/10,
    leady:a.leads,
  }));

  // Market comparison
  const marketData = marketPrices.slice(0,5).map(m=>({
    name:m.locality.split(' — ')[0].replace('Praha ','P'),
    trh:m.avgPriceM2,
    nase:m.ourAvg,
  }));

  // Lead sources
  const sourceData = leadSources.map(s=>({name:s.source,value:s.count}));

  const CustomTooltip = ({active,payload,label}) => {
    if(!active||!payload?.length) return null;
    return React.createElement('div',{style:{background:'var(--surface)',border:'1px solid var(--accent-border)',borderRadius:10,padding:'10px 14px',fontSize:12,boxShadow:'var(--shadow-lg)'}},
      label&&React.createElement('p',{style:{color:'var(--accent)',fontWeight:600,marginBottom:4}},label),
      payload.map((e,i)=>React.createElement('p',{key:i,style:{color:e.color,margin:'2px 0'}},e.name+': ',React.createElement('strong',null,e.value+(e.name==='tržby'?' M Kč':e.name==='trh'||e.name==='nase'?' Kč/m²':''))))
    );
  };

  return React.createElement('div',{className:'analytics-view'},
    // Header
    React.createElement('div',{className:'analytics-header'},
      React.createElement('h1',null,'Analýzy a statistiky'),
      React.createElement('button',{className:'btn-secondary',style:{padding:'8px 14px',fontSize:12},
        onClick:()=>onAskPepa('Analyzuj výkonnost agentů a portfolia. Kde máme největší příležitosti? Co bychom měli zlepšit?')
      },'💬 Zeptat PEPU'),
      React.createElement('button',{className:'btn-primary',style:{padding:'8px 16px',fontSize:13},
        onClick:()=>onAskPepa('Vytvoř podrobný report o výkonu Bohemia Reality za Q1 2025 se všemi statistikami.')
      },'📊 Generovat report')
    ),

    // KPI cards
    React.createElement('div',{className:'kpi-row'},
      React.createElement('div',{className:'kpi-big'},
        React.createElement('div',{className:'kpi-big-label'},'Celkové tržby'),
        React.createElement('div',{className:'kpi-big-value'},(totalRevenue/1000000).toFixed(1)+' M'),
        React.createElement('div',{className:'kpi-big-sub'},'Kč · všichni agenti'),
        React.createElement('div',{className:'kpi-big-trend up'},'↑ +12% vs Q4 2024')
      ),
      React.createElement('div',{className:'kpi-big'},
        React.createElement('div',{className:'kpi-big-label'},'Uzavřené obchody'),
        React.createElement('div',{className:'kpi-big-value'},totalDeals),
        React.createElement('div',{className:'kpi-big-sub'},'nemovitostí prodáno'),
        React.createElement('div',{className:'kpi-big-trend up'},'↑ +3 vs Q4 2024')
      ),
      React.createElement('div',{className:'kpi-big'},
        React.createElement('div',{className:'kpi-big-label'},'Aktivní portfolio'),
        React.createElement('div',{className:'kpi-big-value'},activeProps),
        React.createElement('div',{className:'kpi-big-sub'},'nemovitostí k prodeji'),
        React.createElement('div',{className:'kpi-big-trend down'},'↓ -2 vs minulý měsíc')
      ),
      React.createElement('div',{className:'kpi-big'},
        React.createElement('div',{className:'kpi-big-label'},'Noví klienti Q1'),
        React.createElement('div',{className:'kpi-big-value'},q1clients),
        React.createElement('div',{className:'kpi-big-sub'},'za Q1 2025'),
        React.createElement('div',{className:'kpi-big-trend up'},'↑ +5 vs Q4 2024')
      )
    ),

    // Main chart - leads trend
    React.createElement('div',{className:'chart-card'},
      React.createElement('div',{className:'chart-card-header'},
        React.createElement('div',null,
          React.createElement('div',{className:'chart-card-title'},'Vývoj leadů a prodejů'),
          React.createElement('div',{className:'chart-card-sub'},'Posledních 6 měsíců')
        ),
        React.createElement('button',{className:'card-action',onClick:()=>onAskPepa('Analyzuj trend leadů a prodejů za posledních 6 měsíců. Jaký je výhled?')},'Analyzovat')
      ),
      React.createElement(ResponsiveContainer,{width:'100%',height:260},
        React.createElement(AreaChart,{data:leadsHistory,margin:{top:8,right:16,left:0,bottom:4}},
          React.createElement('defs',null,
            React.createElement('linearGradient',{id:'leadGrad',x1:'0',y1:'0',x2:'0',y2:'1'},
              React.createElement('stop',{offset:'5%',stopColor:'#7C6FF7',stopOpacity:0.15}),
              React.createElement('stop',{offset:'95%',stopColor:'#7C6FF7',stopOpacity:0})
            ),
            React.createElement('linearGradient',{id:'dealGrad',x1:'0',y1:'0',x2:'0',y2:'1'},
              React.createElement('stop',{offset:'5%',stopColor:'#22C55E',stopOpacity:0.15}),
              React.createElement('stop',{offset:'95%',stopColor:'#22C55E',stopOpacity:0})
            )
          ),
          React.createElement(CartesianGrid,{strokeDasharray:'3 3',stroke:'var(--border)'}),
          React.createElement(XAxis,{dataKey:'month',tick:{fill:'var(--text3)',fontSize:11}}),
          React.createElement(YAxis,{tick:{fill:'var(--text3)',fontSize:11}}),
          React.createElement(Tooltip,{content:React.createElement(CustomTooltip)}),
          React.createElement(Legend,{wrapperStyle:{fontSize:12,color:'var(--text3)'}}),
          React.createElement(Area,{type:'monotone',dataKey:'leads',name:'Leady',stroke:'#7C6FF7',fill:'url(#leadGrad)',strokeWidth:2.5}),
          React.createElement(Area,{type:'monotone',dataKey:'prodeje',name:'Prodeje',stroke:'#22C55E',fill:'url(#dealGrad)',strokeWidth:2.5})
        )
      )
    ),

    // Middle row: Agent performance + Portfolio donut
    React.createElement('div',{className:'charts-grid-2'},
      // Agent bar chart
      React.createElement('div',{className:'chart-card'},
        React.createElement('div',{className:'chart-card-header'},
          React.createElement('div',null,
            React.createElement('div',{className:'chart-card-title'},'Výkon agentů'),
            React.createElement('div',{className:'chart-card-sub'},'Obchody a tržby (M Kč)')
          )
        ),
        React.createElement(ResponsiveContainer,{width:'100%',height:220},
          React.createElement(BarChart,{data:agentData,margin:{top:8,right:16,left:0,bottom:4}},
            React.createElement(CartesianGrid,{strokeDasharray:'3 3',stroke:'var(--border)'}),
            React.createElement(XAxis,{dataKey:'name',tick:{fill:'var(--text3)',fontSize:11}}),
            React.createElement(YAxis,{tick:{fill:'var(--text3)',fontSize:11}}),
            React.createElement(Tooltip,{content:React.createElement(CustomTooltip)}),
            React.createElement(Legend,{wrapperStyle:{fontSize:12,color:'var(--text3)'}}),
            React.createElement(Bar,{dataKey:'obchody',name:'Obchody',fill:'#7C6FF7',radius:[4,4,0,0]}),
            React.createElement(Bar,{dataKey:'tržby',name:'Tržby (M Kč)',fill:'#22C55E',radius:[4,4,0,0]})
          )
        )
      ),
      // Portfolio donut
      React.createElement('div',{className:'chart-card'},
        React.createElement('div',{className:'chart-card-header'},
          React.createElement('div',null,
            React.createElement('div',{className:'chart-card-title'},'Portfolio podle statusu'),
            React.createElement('div',{className:'chart-card-sub'},properties.length+' nemovitostí celkem')
          )
        ),
        React.createElement(ResponsiveContainer,{width:'100%',height:220},
          React.createElement(PieChart,null,
            React.createElement(Pie,{data:portfolioData,cx:'50%',cy:'50%',innerRadius:55,outerRadius:90,dataKey:'value',nameKey:'name',
              label:({name,value})=>name+': '+value},
              portfolioData.map((_,i)=>React.createElement(Cell,{key:i,fill:COLORS[i%COLORS.length]}))
            ),
            React.createElement(Tooltip,{content:React.createElement(CustomTooltip)})
          )
        )
      )
    ),

    // Bottom row: Market comparison + Lead sources
    React.createElement('div',{className:'charts-grid-2'},
      // Market comparison
      React.createElement('div',{className:'chart-card'},
        React.createElement('div',{className:'chart-card-header'},
          React.createElement('div',null,
            React.createElement('div',{className:'chart-card-title'},'Srovnání s trhem (Kč/m²)'),
            React.createElement('div',{className:'chart-card-sub'},'Naše ceny vs tržní průměr')
          ),
          React.createElement('button',{className:'card-action',onClick:()=>onAskPepa('Porovnej naše ceny s tržními daty. Kde jsme předražení nebo podhodnocení?')},'Detail')
        ),
        React.createElement(ResponsiveContainer,{width:'100%',height:220},
          React.createElement(BarChart,{data:marketData,margin:{top:8,right:16,left:0,bottom:4}},
            React.createElement(CartesianGrid,{strokeDasharray:'3 3',stroke:'var(--border)'}),
            React.createElement(XAxis,{dataKey:'name',tick:{fill:'var(--text3)',fontSize:10}}),
            React.createElement(YAxis,{tick:{fill:'var(--text3)',fontSize:10},tickFormatter:v=>(v/1000)+'k'}),
            React.createElement(Tooltip,{content:React.createElement(CustomTooltip)}),
            React.createElement(Legend,{wrapperStyle:{fontSize:12,color:'var(--text3)'}}),
            React.createElement(Bar,{dataKey:'trh',name:'Tržní průměr',fill:'var(--surface2)',stroke:'var(--border)',strokeWidth:1,radius:[4,4,0,0]}),
            React.createElement(Bar,{dataKey:'nase',name:'Naše ceny',fill:'#7C6FF7',radius:[4,4,0,0]})
          )
        )
      ),
      // Lead sources pie
      React.createElement('div',{className:'chart-card'},
        React.createElement('div',{className:'chart-card-header'},
          React.createElement('div',null,
            React.createElement('div',{className:'chart-card-title'},'Zdroje leadů'),
            React.createElement('div',{className:'chart-card-sub'},'Odkud přicházejí klienti')
          )
        ),
        React.createElement(ResponsiveContainer,{width:'100%',height:220},
          React.createElement(PieChart,null,
            React.createElement(Pie,{data:sourceData,cx:'50%',cy:'50%',outerRadius:85,dataKey:'value',nameKey:'name',
              label:({name,percent})=>name+' '+Math.round(percent*100)+'%',labelLine:false},
              sourceData.map((_,i)=>React.createElement(Cell,{key:i,fill:COLORS[i%COLORS.length]}))
            ),
            React.createElement(Tooltip,{content:React.createElement(CustomTooltip)})
          )
        )
      )
    )
  );
}

// ============================================================
// APP
// ============================================================
function App(){
  const [user,setUser]=useState(null);
  const [authLoading,setAuthLoading]=useState(true);
  const [userMenuOpen,setUserMenuOpen]=useState(false);
  const [theme,setTheme]=useState(()=>localStorage.getItem('pepa-theme')||'light');
  const [view,setView]=useState('home'); // home|chat|tasks|calendar
  const [sidebarOpen,setSidebarOpen]=useState(false);
  const [showOnboarding,setShowOnboarding]=useState(false);
  const notifCount = alerts.filter(a=>a.priority==='vysoká').length + gmailInbox.length;
  const [installPrompt,setInstallPrompt]=useState(null);
  const [showInstall,setShowInstall]=useState(false);

  useEffect(()=>{
    const handler=e=>{e.preventDefault();setInstallPrompt(e);setShowInstall(true);};
    window.addEventListener('beforeinstallprompt',handler);
    return ()=>window.removeEventListener('beforeinstallprompt',handler);
  },[]);
  const [showSearch,setShowSearch]=useState(false);
  const [showPDF,setShowPDF]=useState(false);
  const [showNotif,setShowNotif]=useState(false);
  const [showShortcuts,setShowShortcuts]=useState(false);
    const [searchQ,setSearchQ]=useState('');
  const [listening,setListening]=useState(false);
  const [shareToast,setShareToast]=useState(false);
  const [unreadEmails]=useState(gmailInbox.length);
  const [showAddQA,setShowAddQA]=useState(false);
  const [showAddData,setShowAddData]=useState(false);
  const [showTemplate,setShowTemplate]=useState(false);
  const [showUpload,setShowUpload]=useState(false);
  const [uploadProcessing,setUploadProcessing]=useState(false);
  const [uploadFileName,setUploadFileName]=useState('');
  const [renamingId,setRenamingId]=useState(null);
  const [renameVal,setRenameVal]=useState('');
  const [loading,setLoading]=useState(false);
  const [input,setInput]=useState('');
  const [error,setError]=useState('');
  const endRef=useRef(null);
  const inputRef=useRef(null);

  // Auth
  useEffect(()=>{
    sb.auth.getSession().then(({data:{session}})=>{const u=(session&&session.user)||null;
      setUser(u);setAuthLoading(false);
      if(u){
        try{
          const isNew=(Date.now()-new Date(u.created_at).getTime())<5*60*1000;
          const seen=localStorage.getItem('pepa-onboarding-'+u.id);
          if(isNew&&!seen){setTimeout(()=>setShowOnboarding(true),800);localStorage.setItem('pepa-onboarding-'+u.id,'1');}
        }catch(e){}
      }
    });
    const {data:{subscription}}=sb.auth.onAuthStateChange((_,session)=>setUser((session&&session.user)||null));
    return ()=>subscription.unsubscribe();
  },[]);

  // Theme
  useEffect(()=>{document.documentElement.setAttribute('data-theme',theme);localStorage.setItem('pepa-theme',theme);},[theme]);

  // User-scoped storage
  const userId=(user&&user.id)||'guest';
  const K=(key)=>`pepa-${userId}-${key}`;

  const [chats,setChats]=useState([{id:'c1',title:'Nový chat',msgs:[]}]);
  const [chatsLoaded,setChatsLoaded]=useState(false);
  const [activeChatId,setActiveChatId]=useState('c1');
  const [quickActions,setQuickActions]=useState(()=>{try{const s=localStorage.getItem(K('qa'));const p=s?JSON.parse(s):null;return Array.isArray(p)&&p.length>0?p:DEFAULT_QA;}catch(e){return DEFAULT_QA;}});
  const [tasks,setTasks]=useState(()=>{try{const s=localStorage.getItem(K('tasks'));const p=s?JSON.parse(s):null;return Array.isArray(p)?p:[];}catch(e){return[];}});
  const [customProps,setCustomProps]=useState([]);
  const [customClients2,setCustomClients2]=useState([]);

  useEffect(()=>{
    if(!user||!chatsLoaded)return;
    // Save to localStorage cache
    try{localStorage.setItem('pepa-chats-'+userId,JSON.stringify(chats));}catch(e){}
    // Save to Supabase
    const saveToSupabase=async()=>{
      try{
        await sb.from('user_chats').upsert({user_id:userId,chats:JSON.stringify(chats)},{onConflict:'user_id'});
      }catch(e){}
    };
    const t=setTimeout(saveToSupabase,1000);
    return ()=>clearTimeout(t);
  },[chats,userId,chatsLoaded,user]);

  // Load chats from Supabase on mount
  useEffect(()=>{
    if(!user)return;
    const loadChats=async()=>{
      // First try localStorage cache for instant load
      try{
        const cached=localStorage.getItem('pepa-chats-'+userId);
        if(cached){const p=JSON.parse(cached);if(Array.isArray(p)&&p.length>0){setChats(p);}}
      }catch(e){}
      // Then load from Supabase
      try{
        const {data}=await sb.from('user_chats').select('chats').eq('user_id',userId).single();
        if(data?.chats){
          const p=JSON.parse(data.chats);
          if(Array.isArray(p)&&p.length>0){
            setChats(p);
            try{localStorage.setItem('pepa-chats-'+userId,data.chats);}catch(e){}
          }
        }
      }catch(e){}
      setChatsLoaded(true);
    };
    loadChats();
  },[user,userId]);
  useEffect(()=>{try{localStorage.setItem(K('qa'),JSON.stringify(quickActions));}catch(e){}},[quickActions]);
  useEffect(()=>{try{localStorage.setItem(K('tasks'),JSON.stringify(tasks));}catch(e){}},[tasks]);
  useEffect(()=>{endRef.current&&endRef.current.scrollIntoView({behavior:'smooth'});},[chats,loading]);

  // Keyboard shortcuts
  useEffect(()=>{
    let gPressed = false, gTimer = null;
    const handler = e => {
      if(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA') return;
      if((e.ctrlKey||e.metaKey)&&e.key==='k'){e.preventDefault();setShowSearch(v=>!v);return;}
      if(e.key==='Escape'){setShowSearch(false);setShowNotifCenter(false);setShowPDF(false);return;}
      // G + key navigation
      if(e.key==='g'||e.key==='G'){
        gPressed=true;
        clearTimeout(gTimer);
        gTimer=setTimeout(()=>{gPressed=false;},1000);
        return;
      }
      if(gPressed){
        gPressed=false;clearTimeout(gTimer);
        const nav={'h':'home','H':'home','c':'chat','C':'chat','t':'tasks','T':'tasks','k':'calendar','K':'calendar','m':'map','M':'map','a':'analytics','A':'analytics'};
        if(nav[e.key]){
          if(nav[e.key]==='chat') {const id=uid();setChats(p=>[...p,{id,title:'Nový chat',msgs:[]}]);setActiveChatId(id);}
          setView(nav[e.key]);
        }
      }
    };
    window.addEventListener('keydown',handler);
    return()=>window.removeEventListener('keydown',handler);
  },[]);

  // Old Ctrl+K only shortcut - now merged above
  useEffect(()=>{
    const handler=e=>{if((e.ctrlKey||e.metaKey)&&e.key==='k'){e.preventDefault();setShowSearch(v=>!v);}};
    window.addEventListener('keydown',handler);
    return ()=>window.removeEventListener('keydown',handler);
  },[]);

  const activeChat=(chats||[]).find(c=>c.id===activeChatId)||chats[0];

  async function handleSignOut(){await sb.auth.signOut();setUser(null);setUserMenuOpen(false);}

  function newChat(){const id=uid();setChats(prev=>[...prev,{id,title:'Nový chat',msgs:[]}]);setActiveChatId(id);setView('chat');setError('');}
  function deleteChat(id){setChats(prev=>{const next=prev.filter(c=>c.id!==id);if(next.length===0){const nc={id:uid(),title:'Nový chat',msgs:[]};setActiveChatId(nc.id);return[nc];}if(activeChatId===id)setActiveChatId(next[next.length-1].id);return next;});}

  // Voice input
  function startVoice(){
    if(!('webkitSpeechRecognition' in window||'SpeechRecognition' in window)){
      setError('Váš prohlížeč nepodporuje hlasový vstup.');return;
    }
    const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
    const rec=new SR();
    rec.lang='cs-CZ';rec.continuous=false;rec.interimResults=false;
    rec.onstart=()=>setListening(true);
    rec.onend=()=>setListening(false);
    rec.onerror=()=>setListening(false);
    rec.onresult=e=>{
      const t=e.results[0][0].transcript;
      setInput(t);
      setTimeout(()=>send(t),100);
    };
    rec.start();
  }

  // Share chat
  function shareChat(){
    const msgs2=(activeChat&&activeChat.msgs)||[];const text=msgs2.map(function(m){return '['+( m.role==='user'?'Vy':'PEPA')+'] '+m.content;}).join('\n\n');
    if(navigator.share){
      navigator.share({title:activeChat?.title||'Chat PEPA',text:text.slice(0,2000)});
    } else {
      navigator.clipboard.writeText(text);
      setShareToast(true);
      setTimeout(()=>setShareToast(false),2500);
    }
  }

  // Search
  const searchResults=React.useMemo(()=>{
    if(!searchQ.trim())return{chats:[],props:[],clients:[]};
    const q=searchQ.toLowerCase();
    return {
      chats:(chats||[]).filter(ch=>ch.title.toLowerCase().includes(q)||ch.msgs?.some(m=>m.content?.toLowerCase().includes(q))).slice(0,5),
      props:properties.filter(p=>p.name.toLowerCase().includes(q)||p.address.toLowerCase().includes(q)||p.status.toLowerCase().includes(q)).slice(0,4),
      clients:clients.filter(cl=>cl.name.toLowerCase().includes(q)||cl.source?.toLowerCase().includes(q)).slice(0,4),
    };
  },[searchQ,chats]);

  // sendDirect - send with explicit chatId (for quick actions, openChat)
  async function sendDirect(text, chatId) {
    const t = text.trim();
    if(!t || loading) return;
    setError(''); setView('chat');
    const newMsgs = [{role:'user', content:t}];
    setChats(prev=>prev.map(c=>c.id===chatId?{...c,title:t.slice(0,32)+(t.length>32?'…':''),msgs:newMsgs}:c));
    setLoading(true);
    try {
      setChats(prev=>prev.map(c=>c.id===chatId?{...c,msgs:[...newMsgs,{role:'assistant',content:''}]}:c));
      const res = await callAgent(
        newMsgs.map(m=>({role:m.role,content:m.content})),
        (partial)=>{
          setChats(prev=>prev.map(c=>{
            if(c.id!==chatId) return c;
            const msgs=[...c.msgs];
            msgs[msgs.length-1]={role:'assistant',content:partial};
            return {...c,msgs};
          }));
        }
      );
      setChats(prev=>prev.map(c=>c.id===chatId?{...c,msgs:[...newMsgs,{role:'assistant',content:res||'Prázdná odpověď.'}]}:c));
    } catch(e) { setError('Chyba: '+e.message); }
    finally { setLoading(false); }
  }

  async function send(text){
    const t=(text||input).trim();if(!t||loading)return;
    setInput('');setError('');setView('chat');
    const newMsgs=[...(activeChat&&activeChat.msgs||[]),{role:'user',content:t}];
    if((activeChat&&activeChat.msgs&&(activeChat&&activeChat.msgs||[]).length)===0){const title=t.slice(0,32)+(t.length>32?'…':'');setChats(prev=>prev.map(c=>c.id===activeChatId?{...c,title,msgs:newMsgs}:c));}
    else setChats(prev=>prev.map(c=>c.id===activeChatId?{...c,msgs:newMsgs}:c));
    setLoading(true);
    try{
      const streamId = Date.now().toString();
      // Add empty assistant message to stream into
      setChats(prev=>prev.map(c=>c.id===activeChatId?{...c,msgs:[...newMsgs,{role:'assistant',content:''}]}:c));
      const res=await callAgent(
        newMsgs.slice(-6).map(m=>({role:m.role,content:m.content})),
        (partial)=>{
          setChats(prev=>prev.map(c=>{
            if(c.id!==activeChatId)return c;
            const msgs=[...c.msgs];
            msgs[msgs.length-1]={role:'assistant',content:partial};
            return {...c,msgs};
          }));
        }
      );
      // Ensure final content is set
      setChats(prev=>prev.map(c=>c.id===activeChatId?{...c,msgs:[...newMsgs,{role:'assistant',content:res||'Prázdná odpověď.'}]}:c));
    }catch(e){setError('Chyba: '+e.message);}
    finally{setLoading(false);setTimeout(()=>inputRef.current&&inputRef.current.focus(),100);}
  }

  function openChat(prompt){const id=uid();setChats(prev=>[...prev,{id,title:prompt.slice(0,32),msgs:[]}]);setActiveChatId(id);setView('chat');setTimeout(()=>sendDirect(prompt,id),100);}

  async function handleFile(file){
    setShowUpload(false);setUploadProcessing(true);setUploadFileName(file.name);
    try{
      const ext=file.name.split('.').pop().toLowerCase();let msg='';
      if(['png','jpg','jpeg'].includes(ext)){
        const b64=await new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result.split(',')[1]);r.onerror=rej;r.readAsDataURL(file);});
        const resp=await fetch('/api/claude',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-6',max_tokens:800,system:'Jsi realitní asistent. Analyzuj obrázek v češtině.',messages:[{role:'user',content:[{type:'image',source:{type:'base64',media_type:ext==='jpg'?'image/jpeg':'image/'+ext,data:b64}},{type:'text',text:'Analyzuj tento obrázek. Je to nemovitost nebo dokument? Popiš co vidíš a navrhni jak pracovat s těmito daty v realitní kanceláři.'}]}]})});
        const d=await resp.json();if(d.error)throw new Error(d.error.message);msg=(d.content&&d.content[0]&&d.content[0].text)||'Nepodařilo se analyzovat.';
      }else if(ext==='csv'){const text=await file.text();msg='**CSV: '+file.name+'**\n\n```\n'+text.split('\n').slice(0,15).join('\n')+'\n```\n\nChcete importovat tato data?';}
      else msg='Soubor **'+file.name+'** ('+Math.round(file.size/1024)+' KB) byl nahrán. Jak s ním chcete pracovat?';
      setChats(prev=>prev.map(c=>c.id===activeChatId?{...c,msgs:[...c.msgs,{role:'user',content:'📎 Nahrán: **'+file.name+'**'},{role:'assistant',content:msg}]}:c));
    }catch(err){setError('Chyba: '+err.message);}
    finally{setUploadProcessing(false);setUploadFileName('');}
  }

  function addTask(task){setTasks(prev=>[...prev,task]);}
  function toggleTask(id){setTasks(prev=>prev.map(t=>t.id===id?{...t,done:!t.done}:t));}
  function deleteTask(id){setTasks(prev=>prev.filter(t=>t.id!==id));}
  function addQA(qa){setQuickActions(prev=>[...prev,qa]);setShowAddQA(false);}
  function deleteQA(id){setQuickActions(prev=>prev.filter(q=>q.id!==id));}
  function addData(type,item){if(type==='property')properties.push(item);else clients.push(item);setShowAddData(false);}
  function saveAsTask(text){addTask({id:uid(),title:text.slice(0,60)+(text.length>60?'…':''),done:false,created:new Date().toLocaleDateString('cs-CZ')});}

  const navItems=[
    {icon:'⊞',label:'Přehled',view:'home'},
    {icon:'💬',label:'Chat',view:'chat',action:newChat},
    {icon:'✅',label:'Úkoly',view:'tasks'},
  ];

  // Sidebar
  const sidebar=React.createElement(React.Fragment,null,
    React.createElement('div',{className:'sidebar-overlay'+(sidebarOpen?' open':''),onClick:()=>setSidebarOpen(false)}),
    React.createElement('aside',{className:'sidebar'+(sidebarOpen?' open':'')},
      React.createElement('div',{style:{flexShrink:0,paddingTop:'12px'}},
        React.createElement('div',{style:{position:'relative',padding:'8px 10px 4px'}},
          React.createElement('button',{className:'sidebar-avatar',onClick:()=>setUserMenuOpen(v=>!v)},
            React.createElement('div',{className:'sidebar-avatar-dot'},(user&&user.email||'?')[0].toUpperCase()),
            React.createElement('span',{className:'sidebar-avatar-name'},(user&&user.user_metadata&&user.user_metadata.name)||(user&&user.email&&user.email.split('@')[0])||'Profil')
          ),
          userMenuOpen&&React.createElement('div',{className:'user-dropdown'},
            React.createElement('div',{className:'user-info'},
              React.createElement('div',{className:'user-name'},(user&&user.user_metadata&&user.user_metadata.name)||(user&&user.email&&user.email.split('@')[0])||'Uzivatel'),
              React.createElement('div',{className:'user-email'},(user&&user.email)||'')
            ),
            React.createElement('button',{className:'dropdown-btn',onClick:handleSignOut},'Odhlasit se')
          )
        ),
        React.createElement('button',{className:'sidebar-hamburger-btn',onClick:()=>setSidebarOpen(v=>!v)},'☰'),
        React.createElement('div',{className:'sidebar-divider'})
      ),
      React.createElement('div',{className:'sidebar-nav'},
        React.createElement('button',{className:`sidebar-btn${view==='home'?' active':''}`,onClick:()=>{setView('home');setSidebarOpen(false);},title:'Přehled'},'⊞',React.createElement('span',null,'Přehled')),
        React.createElement('button',{className:`sidebar-btn${view==='chat'?' active':''}`,onClick:()=>{newChat();setSidebarOpen(false);},title:'Nový chat'},'💬',React.createElement('span',null,'Nový chat')),
        React.createElement('button',{className:`sidebar-btn${view==='tasks'?' active':''}`,onClick:()=>{setView('tasks');setSidebarOpen(false);},title:'Úkoly'},
          '✅',React.createElement('span',null,'Úkoly'),
          (tasks||[]).filter(t=>!t.done).length>0&&React.createElement('span',{className:'sidebar-badge'},(tasks||[]).filter(t=>!t.done).length)
        ),
        React.createElement('button',{className:`sidebar-btn${view==='calendar'?' active':''}`,onClick:()=>{setView('calendar');setSidebarOpen(false);},title:'Kalendář'},
          '📅',React.createElement('span',null,'Kalendář')
        ),
        React.createElement('button',{className:`sidebar-btn${view==='map'?' active':''}`,onClick:()=>{setView('map');setSidebarOpen(false);},title:'Mapa'},
          '🗺️',React.createElement('span',null,'Mapa')
        ),
        React.createElement('button',{className:`sidebar-btn${view==='analytics'?' active':''}`,onClick:()=>{setView('analytics');setSidebarOpen(false);},title:'Analýzy'},
          '📊',React.createElement('span',null,'Analýzy')
        ),
                // Chat list
      React.createElement('div',{className:'chat-list-panel'},
        React.createElement('div',{className:'chat-list-label'},'Konverzace',React.createElement('button',{onClick:newChat,style:{background:'none',border:'none',color:'rgba(255,255,255,.3)',cursor:'pointer',fontSize:14}},'+')
        ),
        (chats||[]).map(chat=>React.createElement('div',{key:chat.id,className:'chat-list-item'+(chat.id===activeChatId?' active':''),onClick:()=>{if(renamingId!==chat.id){setActiveChatId(chat.id);setView('chat');setSidebarOpen(false);}}},
          React.createElement('span',null,'💬'),
          renamingId===chat.id
            ?React.createElement('input',{className:'rename-inp',value:renameVal,autoFocus:true,onChange:e=>setRenameVal(e.target.value),onKeyDown:e=>{if(e.key==='Enter'){if(renameVal.trim())setChats(prev=>prev.map(c=>c.id===chat.id?{...c,title:renameVal.trim()}:c));setRenamingId(null);}if(e.key==='Escape')setRenamingId(null);},onBlur:()=>{if(renameVal.trim())setChats(prev=>prev.map(c=>c.id===chat.id?{...c,title:renameVal.trim()}:c));setRenamingId(null);},onClick:e=>e.stopPropagation()})
            :React.createElement('span',{className:'chat-list-title',onDoubleClick:e=>{e.stopPropagation();setRenamingId(chat.id);setRenameVal(chat.title);}},chat.title),
          React.createElement('button',{className:'chat-list-del',onClick:e=>{e.stopPropagation();setRenamingId(chat.id);setRenameVal(chat.title);},title:'Přejmenovat'},'✏️'),
          (chats||[]).length>1&&React.createElement('button',{className:'chat-list-del',onClick:e=>{e.stopPropagation();deleteChat(chat.id);},title:'Smazat'},'×')
        ))
      ),
      // Quick actions
      React.createElement('div',{className:'qa-section'},
        React.createElement('div',{className:'qa-label'},'Rychlé akce',React.createElement('button',{onClick:()=>setShowAddQA(true)},'+'),React.createElement('button',{onClick:()=>setShowAddData(true)},'🗄️')),
        (quickActions||[]).map(q=>React.createElement('button',{key:q.id,className:'qa-item',onClick:()=>{const id=uid();setChats(prev=>[...prev,{id,title:q.label,msgs:[]}]);setActiveChatId(id);setView('chat');setSidebarOpen(false);setTimeout(()=>sendDirect(q.prompt,id),100);}},
          React.createElement('span',null,q.icon),
          React.createElement('span',{style:{flex:1,textAlign:'left',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}},q.label),
          React.createElement('button',{className:'qa-del',onClick:e=>{e.stopPropagation();deleteQA(q.id);}},'-')
        ))
      ),
      // Bottom
      
    )
  ));

  // Tasks view
  const tasksView=React.createElement('div',{style:{flex:1,overflow:'auto',padding:'24px 28px'}},
    React.createElement('h1',{style:{fontFamily:'DM Serif Display,serif',fontSize:28,marginBottom:4}},'Úkoly'),
    React.createElement('p',{style:{color:'var(--text3)',fontSize:13,marginBottom:20}},`${(tasks||[]).filter(t=>!t.done).length} aktivních · ${(tasks||[]).filter(t=>t.done).length} dokončených`),
    React.createElement('div',{style:{display:'flex',gap:8,marginBottom:16}},
      React.createElement('input',{style:{flex:1,background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--rs)',padding:'10px 14px',fontSize:13,color:'var(--text)',outline:'none'},placeholder:'Přidat nový úkol…',onKeyDown:e=>{if(e.key==='Enter'&&e.target.value.trim()){addTask({id:uid(),title:e.target.value.trim(),done:false,created:new Date().toLocaleDateString('cs-CZ')});e.target.value='';}}})
    ),
    ...(tasks||[]).map(t=>React.createElement('div',{key:t.id,style:{display:'flex',alignItems:'center',gap:10,padding:'12px 16px',background:'var(--surface)',border:'1px solid var(--border)',borderRadius:'var(--rs)',marginBottom:6}},
      React.createElement('button',{style:{width:18,height:18,borderRadius:5,border:`2px solid ${t.done?'var(--green)':'var(--border)'}`,background:t.done?'var(--green)':'none',color:'white',fontSize:10,cursor:'pointer',flexShrink:0},onClick:()=>toggleTask(t.id)},t.done?'✓':''),
      React.createElement('span',{style:{flex:1,fontSize:13,color:t.done?'var(--text3)':'var(--text)',textDecoration:t.done?'line-through':'none'}},t.title),
      React.createElement('span',{style:{fontSize:11,color:'var(--text3)'}},t.created),
      React.createElement('button',{style:{background:'none',border:'none',color:'var(--text3)',cursor:'pointer',fontSize:14},onClick:()=>deleteTask(t.id)},'×')
    ))
  );

  // Chat view
  const chatView=React.createElement('div',{className:'chat-view'},
    React.createElement('div',{className:'chat-header'},
      React.createElement('div',{className:'chat-header-left'},
        React.createElement('div',{className:'chat-title'},React.createElement('span',{className:'online-dot'}),'PEPA je online'),
        React.createElement('div',{className:'chat-sub'},(activeChat&&activeChat.title)==='Nový chat'?'Back Office Agent · Bohemia Reality':(activeChat&&activeChat.title))
      ),
      React.createElement('div',{className:'chat-actions'},
        (activeChat&&activeChat.msgs&&activeChat.msgs.length>0)&&React.createElement('button',{className:'chat-btn',onClick:shareChat},'Sdílet'),
        React.createElement('button',{className:'chat-btn',onClick:()=>{setChats(prev=>prev.map(c=>c.id===activeChatId?{...c,msgs:[],title:'Nový chat'}:c));setError('');}},'🗑️ Smazat'),
        React.createElement('button',{className:'chat-btn',onClick:newChat},'+ Nový')
      )
    ),
    React.createElement('div',{className:'messages-area'},
      (activeChat&&activeChat.msgs&&(activeChat&&activeChat.msgs||[]).length)===0&&React.createElement('div',{className:'chat-welcome'},
        React.createElement('div',{className:'chat-welcome-icon'},'✨'),
        React.createElement('h2',null,'Jak mohu pomoci?'),
        React.createElement('p',null,'Zeptejte se na data, požádejte o report nebo e-mail.'),
        React.createElement('div',{className:'hint-grid'},
          React.createElement('div',{className:'hint-card',onClick:()=>send("Jaký je aktuální stav portfolia?")},'💼 Stav portfolia'),
          React.createElement('div',{className:'hint-card',onClick:()=>send("Vytvoř graf vývoje leadů za 6 měsíců.")},'📊 Graf leadů'),
          React.createElement('div',{className:'hint-card',onClick:()=>send("Které nemovitosti mají chybějící dokumentaci?")},'🔍 Chybí dokumenty'),
          React.createElement('div',{className:'hint-card',onClick:()=>send("Jaké emaily dnes přišly a co mám udělat?")},'📬 Dnešní emaily')
        )
      ),
      (activeChat&&activeChat.msgs||[]).map((m,i)=>React.createElement('div',{key:i,className:`message ${m.role}`},
        React.createElement('div',{className:'msg-avatar'},m.role==='assistant'?'✨':'👤'),
        React.createElement('div',{className:'msg-bubble'},
          m.role==='user'?React.createElement('div',{className:'user-text'},m.content):
          React.createElement('div',null,
            React.createElement(MsgContent,{text:m.content}),
            React.createElement('div',{className:'msg-ctx-actions'},
              React.createElement(CopyBtn,{text:m.content}),
              React.createElement('button',{className:'ctx-btn',onClick:()=>saveAsTask(m.content)},'✅ Úkol'),
              React.createElement('button',{className:'ctx-btn',onClick:()=>setShowTemplate(true)},'📝 Šablona'),
              React.createElement('button',{className:'ctx-btn',onClick:()=>exportChatTXT(activeChat)},'💾 Stáhnout')
            )
          )
        )
      )),
      loading&&React.createElement('div',{className:'message assistant'},
        React.createElement('div',{className:'msg-avatar'},'✨'),
        React.createElement('div',{className:'msg-bubble'},React.createElement('div',{className:'thinking'},React.createElement('span',{className:'spin'},'⟳'),' PEPA přemýšlí…'))
      ),
      React.createElement('div',{ref:endRef})
    ),
    error&&React.createElement('div',{className:'error-banner'},error),
    uploadProcessing&&React.createElement('div',{className:'file-processing'},React.createElement('span',{className:'spin'},'⟳'),' Zpracovávám: ',uploadFileName,'…'),
    showUpload&&React.createElement(FileUpload,{onFile:handleFile,onClose:()=>setShowUpload(false)}),
    React.createElement('div',{className:'toolbar'},
      React.createElement('button',{className:'tool-btn',onClick:()=>setShowUpload(v=>!v)},'📎 Nahrát soubor'),
      React.createElement('button',{className:'tool-btn',onClick:()=>setShowTemplate(true)},'📝 Šablony'),
      React.createElement('button',{className:'tool-btn',onClick:exportPropertiesCSV},'📊 Nemovitosti CSV'),
      React.createElement('button',{className:'tool-btn',onClick:exportClientsCSV},'📊 Klienti CSV'),
      (activeChat&&activeChat.msgs&&(activeChat&&activeChat.msgs||[]).length)>0&&React.createElement('button',{className:'tool-btn',onClick:()=>exportChatTXT(activeChat)},'💬 Export chatu')
    ),
    React.createElement('div',{className:'input-area'},
      React.createElement('div',{className:'input-wrap'},
        React.createElement('textarea',{ref:inputRef,value:input,onChange:e=>setInput(e.target.value),onKeyDown:e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send();}},placeholder:'Napište dotaz nebo instrukci…',rows:1,className:'chat-input'}),
        React.createElement('button',{className:'voice-btn'+(listening?' listening':''),onClick:startVoice,title:'Hlasový vstup'},listening?'🔴':'🎤'),
        React.createElement('button',{className:'send-btn',disabled:!input.trim()||loading,onClick:()=>send()},loading?React.createElement('span',{className:'spin'},'⟳'):'↑')
      ),
      React.createElement('div',{className:'input-hint'},'Enter pro odeslání · Shift+Enter pro nový řádek')
    )
  );

  // Topbar
  const topbar=React.createElement('div',{className:'topbar'},
    React.createElement('div',{className:'topbar-title'},'Bohemia Reality',React.createElement('span',{className:'topbar-greeting'},'· Back Office')),
    React.createElement('button',{className:'topbar-btn',onClick:()=>setShowSearch(true),title:'Hledat (Ctrl+K)'},'🔍'),

    React.createElement('button',{className:'topbar-btn notif-topbar-btn',onClick:()=>setShowNotif(true),title:'Notifikace'},
      '🔔',
      React.createElement('span',{className:'notif-badge-top'},'3')
    ),
    React.createElement('button',{className:'topbar-btn',onClick:()=>setShowPDF(true),title:'Export PDF'},'📄'),
    showInstall&&React.createElement('button',{className:'topbar-btn',title:'Přidat na plochu',onClick:async()=>{if(installPrompt){await installPrompt.prompt();setShowInstall(false);}},style:{background:'var(--accent)',color:'white',border:'none'}},'📲'),
    React.createElement('button',{className:'topbar-btn',onClick:()=>setShowOnboarding(true),title:'Nápověda a zkratky'},'❓'),
    React.createElement('button',{className:'topbar-btn',onClick:()=>setTheme(t=>t==='light'?'dark':'light'),title:'Přepnout téma'},theme==='light'?'🌙':'☀️')
  );

  // Mobile topbar
  const mobileTopbar=React.createElement('div',{className:'mobile-topbar'},
    React.createElement('button',{className:'hamburger',onClick:()=>setSidebarOpen(v=>!v)},'☰')
  );

  if(authLoading)return React.createElement('div',{style:{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',background:'var(--bg)',color:'var(--text3)',fontSize:14}},'⟳ Načítám…');
  if(!user)return React.createElement(AuthScreen,{onAuth:setUser});

  return React.createElement('div',{className:'app',onTouchStart:e=>{window._sx=e.touches[0].clientX;},onTouchEnd:e=>{const dx=e.changedTouches[0].clientX-window._sx;if(dx>60)setSidebarOpen(true);if(dx<-60)setSidebarOpen(false);}},
    sidebar,
    React.createElement('main',{className:'main'},
      mobileTopbar,
      topbar,
      view==='home'?React.createElement(HomeDashboard,{user,tasks,onAddTask:addTask,onToggleTask:toggleTask,onDeleteTask:deleteTask,onOpenChat:openChat}):
      view==='tasks'?tasksView:
      view==='calendar'?React.createElement(TeamCalendar,{user,onAskPepa:(prompt)=>{openChat(prompt);}}):
      view==='map'?React.createElement(PropertyMap,{onAskPepa:(prompt)=>{openChat(prompt);}}):
      view==='analytics'?React.createElement(AnalyticsDashboard,{onAskPepa:(prompt)=>{openChat(prompt);}}):
      chatView
    ),
    showAddQA&&React.createElement(AddQAModal,{onSave:addQA,onClose:()=>setShowAddQA(false)}),
    showAddData&&React.createElement(AddDataModal,{onAdd:addData,onClose:()=>setShowAddData(false)}),
    showTemplate&&React.createElement(TemplateModal,{onSelect:(prompt)=>{openChat(prompt);},onClose:()=>setShowTemplate(false)}),
    showPDF&&React.createElement(PDFModal,{activeChat,onClose:()=>setShowPDF(false)}),
    showNotif&&React.createElement(NotifCenter,{onClose:()=>setShowNotif(false),onAction:(prompt)=>{openChat(prompt);}}),
    showShortcuts&&React.createElement(ShortcutsModal,{onClose:()=>setShowShortcuts(false)}),
    showOnboarding&&React.createElement(Onboarding,{userName:(user&&user.user_metadata&&user.user_metadata.name)||(user&&user.email&&user.email.split('@')[0])||'uživateli',onComplete:()=>{setShowOnboarding(false);if(user)localStorage.setItem('pepa-onboarding-'+user.id,'done');}}),
    showSearch&&React.createElement('div',{className:'search-overlay',onClick:e=>{if(e.target===e.currentTarget)setShowSearch(false);}},
      React.createElement('div',{className:'search-box'},
        React.createElement('div',{className:'search-input-wrap'},
          React.createElement('span',{className:'search-icon'},'🔍'),
          React.createElement('input',{className:'search-inp',autoFocus:true,value:searchQ,onChange:e=>setSearchQ(e.target.value),placeholder:'Hledat v chatech, nemovitostech, klientech...',onKeyDown:e=>{if(e.key==='Escape')setShowSearch(false);if(e.key==='Enter'&&searchQ.trim()){openChat('Najdi: '+searchQ);setShowSearch(false);}}}),
          React.createElement('span',{className:'search-kbd',onClick:()=>setShowSearch(false)},'ESC')
        ),
        React.createElement('div',{className:'search-results'},
          !searchQ.trim()&&React.createElement('div',{className:'search-empty'},'Začněte psát pro vyhledávání...'),
          searchQ.trim()&&searchResults.chats.length===0&&searchResults.props.length===0&&searchResults.clients.length===0&&React.createElement('div',{className:'search-empty'},'Nic nenalezeno pro "'+searchQ+'"'),
          searchResults.chats.length>0&&React.createElement('div',null,
            React.createElement('div',{className:'search-section'},'Chaty'),
            searchResults.chats.map((ch,i)=>React.createElement('div',{key:i,className:'search-item',onClick:()=>{setActiveChatId(ch.id);setView('chat');setShowSearch(false);setSearchQ('');}},
              React.createElement('span',{className:'search-item-icon'},'💬'),
              React.createElement('div',null,React.createElement('div',{className:'search-item-title'},ch.title),React.createElement('div',{className:'search-item-sub'},ch.msgs?.length||0,' zpráv'))
            ))
          ),
          searchResults.props.length>0&&React.createElement('div',null,
            React.createElement('div',{className:'search-section'},'Nemovitosti'),
            searchResults.props.map((p,i)=>React.createElement('div',{key:i,className:'search-item',onClick:()=>{openChat('Řekni mi vše o nemovitosti '+p.id+' '+p.name);setShowSearch(false);setSearchQ('');}},
              React.createElement('span',{className:'search-item-icon'},'🏠'),
              React.createElement('div',null,React.createElement('div',{className:'search-item-title'},p.name),React.createElement('div',{className:'search-item-sub'},p.address+' · '+p.status))
            ))
          ),
          searchResults.clients.length>0&&React.createElement('div',null,
            React.createElement('div',{className:'search-section'},'Klienti'),
            searchResults.clients.map((cl,i)=>React.createElement('div',{key:i,className:'search-item',onClick:()=>{openChat('Řekni mi vše o klientovi '+cl.name);setShowSearch(false);setSearchQ('');}},
              React.createElement('span',{className:'search-item-icon'},'👤'),
              React.createElement('div',null,React.createElement('div',{className:'search-item-title'},cl.name),React.createElement('div',{className:'search-item-sub'},cl.type+' · '+cl.source))
            ))
          )
        )
      )
    ),
    shareToast&&React.createElement('div',{className:'share-toast'},'✓ Chat zkopírován do schránky')
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));

// Unregister any service workers (cleanup)
if('serviceWorker' in navigator){
  navigator.serviceWorker.getRegistrations().then(regs=>{
    regs.forEach(reg=>reg.unregister());
  });
}

</script>
</body>
</html>
