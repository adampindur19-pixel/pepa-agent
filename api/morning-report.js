const RESEND_API_KEY = process.env.RESEND_API_KEY;

const properties = [
  {name:'Byt 3+kk, Vinohrady', price:'8,90 M', status:'k prodeji', agent:'Markéta'},
  {name:'Rodinný dům, Průhonice', price:'15,50 M', status:'k prodeji', agent:'Markéta'},
  {name:'Penthouse, Pankrác', price:'19,50 M', status:'k prodeji', agent:'Tomáš'},
  {name:'Byt 2+1, Dejvice', price:'7,10 M', status:'rezervace', agent:'Jana'},
];

const alerts = [
  '⚠️ ABC Invest čeká na odpověď — deadline pátek',
  '⚠️ Vila Průhonice 7 měsíců v nabídce — zvážit snížení ceny',
  '⚠️ MUDr. Vlček — nový lead bez přiřazeného agenta',
];

const holesovice = [
  {name:'Byt 2+kk, Osadní 12', price:'6 200 000 Kč', size:'54 m²'},
  {name:'Byt 3+1, Dělnická 8', price:'8 900 000 Kč', size:'78 m²'},
  {name:'Byt 1+kk, Přístavní 3', price:'4 100 000 Kč', size:'32 m²'},
];

export default async function handler(req, res) {
  const date = new Date().toLocaleDateString('cs-CZ', {
    weekday:'long', day:'numeric', month:'long', year:'numeric'
  });

  const html = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#F0F2F8;font-family:Arial,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 20px">
<tr><td align="center">
<table width="520" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 8px 32px rgba(99,102,241,.12)">

  <tr><td style="background:linear-gradient(135deg,#6366F1,#818CF8);padding:28px 32px">
    <div style="font-size:11px;color:rgba(255,255,255,.7);letter-spacing:3px;text-transform:uppercase;margin-bottom:6px">BACK OFFICE AGENT</div>
    <div style="font-size:24px;color:#fff;font-weight:700;margin-bottom:4px">☀️ Ranní briefing</div>
    <div style="font-size:13px;color:rgba(255,255,255,.75)">${date}</div>
  </td></tr>

  <tr><td style="padding:24px 32px 0">
    <table width="100%" cellpadding="0" cellspacing="0"><tr>
      <td style="text-align:center;padding:14px;background:#F8F9FF;border-radius:12px"><div style="font-size:26px;font-weight:700;color:#6366F1">3</div><div style="font-size:10px;color:#9CA3AF;text-transform:uppercase">K prodeji</div></td>
      <td width="10"></td>
      <td style="text-align:center;padding:14px;background:#F0FDF4;border-radius:12px"><div style="font-size:26px;font-weight:700;color:#10B981">43 M</div><div style="font-size:10px;color:#9CA3AF;text-transform:uppercase">Hodnota Kč</div></td>
      <td width="10"></td>
      <td style="text-align:center;padding:14px;background:#FFFBEB;border-radius:12px"><div style="font-size:26px;font-weight:700;color:#F59E0B">${holesovice.length}</div><div style="font-size:10px;color:#9CA3AF;text-transform:uppercase">Nové Praha</div></td>
      <td width="10"></td>
      <td style="text-align:center;padding:14px;background:#FEF2F2;border-radius:12px"><div style="font-size:26px;font-weight:700;color:#EF4444">${alerts.length}</div><div style="font-size:10px;color:#9CA3AF;text-transform:uppercase">Alerty</div></td>
    </tr></table>
  </td></tr>

  <tr><td style="padding:20px 32px 0">
    <div style="font-size:13px;font-weight:700;color:#111;margin-bottom:10px">⚠️ Prioritní úkoly</div>
    ${alerts.map(a=>`<div style="padding:10px 12px;background:#FEF9F0;border-left:3px solid #F59E0B;border-radius:0 8px 8px 0;margin-bottom:6px;font-size:13px;color:#374151">${a}</div>`).join('')}
  </td></tr>

  <tr><td style="padding:20px 32px 0">
    <div style="font-size:13px;font-weight:700;color:#111;margin-bottom:10px">🏠 Aktivní portfolio</div>
    ${properties.filter(p=>p.status==='k prodeji').map(p=>`
    <div style="display:flex;justify-content:space-between;padding:10px 12px;border:1px solid #E5E7EB;border-radius:8px;margin-bottom:6px">
      <div style="font-size:13px;font-weight:500;color:#111">${p.name}</div>
      <div style="font-size:13px;font-weight:600;color:#6366F1">${p.price} Kč · ${p.agent}</div>
    </div>`).join('')}
  </td></tr>

  <tr><td style="padding:20px 32px 0">
    <div style="font-size:13px;font-weight:700;color:#111;margin-bottom:4px">📍 Nové nabídky — Praha Holešovice</div>
    <div style="font-size:11px;color:#9CA3AF;margin-bottom:10px">Monitoring trhu · aktualizováno dnes ráno v 8:00</div>
    ${holesovice.map(h=>`
    <div style="padding:10px 12px;border:1px solid #E5E7EB;border-radius:8px;margin-bottom:6px">
      <div style="font-size:13px;font-weight:500;color:#111">${h.name}</div>
      <div style="font-size:12px;color:#6366F1;font-weight:600;margin-top:2px">${h.price} · ${h.size}</div>
    </div>`).join('')}
  </td></tr>

  <tr><td style="padding:24px 32px">
    <a href="https://bohemia-reality.vercel.app" style="display:block;text-align:center;background:linear-gradient(135deg,#6366F1,#818CF8);color:#fff;text-decoration:none;padding:14px;border-radius:12px;font-size:14px;font-weight:600">Otevřít PEPA Back Office →</a>
  </td></tr>

  <tr><td style="padding:16px 32px;border-top:1px solid #F3F4F6;text-align:center">
    <div style="font-size:11px;color:#9CA3AF">Bohemia Reality s.r.o. · PEPA Back Office Agent · Ranní report 8:00</div>
  </td></tr>

</table></td></tr></table>
</body></html>`;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'PEPA Back Office <onboarding@resend.dev>',
        to: ['adam.pindur19@gmail.com'],
        subject: `☀️ Ranní briefing — ${date}`,
        html,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({ error: data });
    }

    return res.status(200).json({ success: true, id: data.id, message: 'Email odeslán!' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
