import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

const resend = new Resend(process.env.RESEND_API_KEY);
const sb = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// Morning report data
const properties = [
  {id:'NEM-001',name:'Byt 3+kk, Vinohrady',price:8900000,status:'k prodeji',agent:'Markéta Horáčková'},
  {id:'NEM-002',name:'Rodinný dům, Průhonice',price:15500000,status:'k prodeji',agent:'Markéta Horáčková'},
  {id:'NEM-005',name:'Byt 2+1, Dejvice',price:7100000,status:'rezervace',agent:'Jana Veselá'},
  {id:'NEM-010',name:'Penthouse, Pankrác',price:19500000,status:'k prodeji',agent:'Tomáš Novák'},
];

const alerts = [
  'ABC Invest čeká na odpověď — deadline pátek',
  'Vila Průhonice 7 měsíců v nabídce — zvážit snížení ceny',
  'MUDr. Vlček — nový lead bez přiřazeného agenta',
];

const holesovice = [
  {name:'Byt 2+kk, Osadní 12',price:'6 200 000 Kč',size:'54 m²',source:'Sreality'},
  {name:'Byt 3+1, Dělnická 8',price:'8 900 000 Kč',size:'78 m²',source:'Sreality'},
  {name:'Byt 1+kk, Přístavní 3',price:'4 100 000 Kč',size:'32 m²',source:'Bezrealitky'},
];

function generateEmailHTML(email) {
  const date = new Date().toLocaleDateString('cs-CZ', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  });

  const activeProps = properties.filter(p => p.status === 'k prodeji');
  const totalValue = activeProps.reduce((s, p) => s + p.price, 0);

  return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#F0F2F8;font-family:'Helvetica Neue',Arial,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F0F2F8;padding:32px 20px">
<tr><td align="center">
<table width="520" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 8px 32px rgba(99,102,241,.1)">

  <!-- Header -->
  <tr><td style="background:linear-gradient(135deg,#6366F1,#818CF8);padding:28px 32px">
    <div style="font-size:11px;color:rgba(255,255,255,.7);text-transform:uppercase;letter-spacing:3px;margin-bottom:6px">BACK OFFICE AGENT</div>
    <div style="font-family:Georgia,serif;font-size:24px;color:#fff;margin-bottom:4px">☀️ Ranní briefing</div>
    <div style="font-size:13px;color:rgba(255,255,255,.75)">${date}</div>
  </td></tr>

  <!-- KPI row -->
  <tr><td style="padding:24px 32px 0">
    <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td width="25%" style="text-align:center;padding:14px;background:#F8F9FF;border-radius:12px;margin:4px">
        <div style="font-size:24px;font-weight:700;color:#6366F1">${activeProps.length}</div>
        <div style="font-size:10px;color:#9CA3AF;text-transform:uppercase;letter-spacing:.06em">K prodeji</div>
      </td>
      <td width="4%"></td>
      <td width="25%" style="text-align:center;padding:14px;background:#F0FDF4;border-radius:12px">
        <div style="font-size:24px;font-weight:700;color:#10B981">${(totalValue/1000000).toFixed(0)} M</div>
        <div style="font-size:10px;color:#9CA3AF;text-transform:uppercase;letter-spacing:.06em">Hodnota Kč</div>
      </td>
      <td width="4%"></td>
      <td width="25%" style="text-align:center;padding:14px;background:#FFFBEB;border-radius:12px">
        <div style="font-size:24px;font-weight:700;color:#F59E0B">${holesovice.length}</div>
        <div style="font-size:10px;color:#9CA3AF;text-transform:uppercase;letter-spacing:.06em">Nové Praha</div>
      </td>
      <td width="4%"></td>
      <td width="25%" style="text-align:center;padding:14px;background:#FEF2F2;border-radius:12px">
        <div style="font-size:24px;font-weight:700;color:#EF4444">${alerts.length}</div>
        <div style="font-size:10px;color:#9CA3AF;text-transform:uppercase;letter-spacing:.06em">Alerty</div>
      </td>
    </tr>
    </table>
  </td></tr>

  <!-- Alerts -->
  <tr><td style="padding:20px 32px 0">
    <div style="font-size:13px;font-weight:700;color:#0F1117;margin-bottom:10px">⚠️ Prioritní úkoly dnes</div>
    ${alerts.map(a => `
    <div style="display:flex;align-items:flex-start;gap:10px;padding:10px 12px;background:#FEF9F0;border-left:3px solid #F59E0B;border-radius:0 8px 8px 0;margin-bottom:6px;font-size:13px;color:#374151">${a}</div>
    `).join('')}
  </td></tr>

  <!-- Active properties -->
  <tr><td style="padding:20px 32px 0">
    <div style="font-size:13px;font-weight:700;color:#0F1117;margin-bottom:10px">🏠 Nemovitosti k prodeji</div>
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E5E7EB;border-radius:10px;overflow:hidden">
      <tr style="background:#F9FAFB">
        <td style="padding:8px 12px;font-size:10px;font-weight:600;color:#9CA3AF;text-transform:uppercase">Nemovitost</td>
        <td style="padding:8px 12px;font-size:10px;font-weight:600;color:#9CA3AF;text-transform:uppercase">Cena</td>
        <td style="padding:8px 12px;font-size:10px;font-weight:600;color:#9CA3AF;text-transform:uppercase">Agent</td>
      </tr>
      ${activeProps.map((p,i) => `
      <tr style="border-top:1px solid #F3F4F6;background:${i%2===0?'#fff':'#FAFAFA'}">
        <td style="padding:10px 12px;font-size:12px;font-weight:500;color:#111827">${p.name}</td>
        <td style="padding:10px 12px;font-size:12px;font-weight:600;color:#6366F1">${(p.price/1000000).toFixed(2).replace('.',',')} M Kč</td>
        <td style="padding:10px 12px;font-size:12px;color:#6B7280">${p.agent.split(' ')[0]}</td>
      </tr>
      `).join('')}
    </table>
  </td></tr>

  <!-- Holešovice monitoring -->
  <tr><td style="padding:20px 32px 0">
    <div style="font-size:13px;font-weight:700;color:#0F1117;margin-bottom:4px">📍 Nové nabídky — Praha Holešovice</div>
    <div style="font-size:11px;color:#9CA3AF;margin-bottom:10px">Monitoring Sreality.cz + Bezrealitky · aktualizováno dnes ráno</div>
    ${holesovice.map(h => `
    <div style="padding:10px 12px;border:1px solid #E5E7EB;border-radius:8px;margin-bottom:6px">
      <div style="font-size:13px;font-weight:500;color:#111827">${h.name}</div>
      <div style="font-size:12px;color:#6366F1;font-weight:600;margin-top:2px">${h.price} · ${h.size} · <span style="color:#9CA3AF">${h.source}</span></div>
    </div>
    `).join('')}
  </td></tr>

  <!-- CTA -->
  <tr><td style="padding:24px 32px">
    <a href="https://bohemia-reality.vercel.app" style="display:block;text-align:center;background:linear-gradient(135deg,#6366F1,#818CF8);color:#fff;text-decoration:none;padding:14px;border-radius:12px;font-size:14px;font-weight:600">
      Otevřít PEPA Back Office →
    </a>
  </td></tr>

  <!-- Footer -->
  <tr><td style="padding:16px 32px;border-top:1px solid #F3F4F6;text-align:center">
    <div style="font-size:11px;color:#9CA3AF">Bohemia Reality s.r.o. · PEPA Back Office Agent · Ranní report 8:00</div>
    <div style="font-size:11px;color:#9CA3AF;margin-top:4px">Tento email dostáváš každý pracovní den automaticky</div>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

export default async function handler(req, res) {
  // Allow manual trigger via GET or scheduled via cron
  try {
    // Get all users from Supabase
    const { data: users, error } = await sb.auth.admin.listUsers();
    
    if (error) throw error;

    const results = [];
    for (const user of users.users) {
      if (!user.email) continue;
      
      const { data, error: emailError } = await resend.emails.send({
        from: 'PEPA Back Office <onboarding@resend.dev>',
        to: user.email,
        subject: `☀️ Ranní briefing — ${new Date().toLocaleDateString('cs-CZ', {weekday:'long', day:'numeric', month:'long'})}`,
        html: generateEmailHTML(user.email),
      });

      if (emailError) {
        results.push({ email: user.email, status: 'error', error: emailError });
      } else {
        results.push({ email: user.email, status: 'sent', id: data.id });
      }
    }

    res.status(200).json({ success: true, sent: results.length, results });
  } catch (err) {
    console.error('Morning report error:', err);
    res.status(500).json({ error: err.message });
  }
}
