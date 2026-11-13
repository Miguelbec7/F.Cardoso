(() => {
  const SIZES = ["Pequeno", "Médio", "Grande"];
  const eur = n => n.toLocaleString("pt-PT", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
  const $ = id => document.getElementById(id);

  // ---- Dados de preços (fonte única para tabelas e calculadora) ----
  // group: [frente+costas+nome, só frente] quando há preço de grupo (10+)
  const ADULT = [
    { id: "tshirt", name: "T-shirt clássica", note: "Algodão 190 g", prices: [11.9, 14.9, 16.9], group: [11.5, 9.9] },
    { id: "oversize", name: "T-shirt oversize", prices: [19.9, 22.9, 26.9] },
    { id: "manga", name: "Manga comprida", prices: [14.9, 17.9, null] },
    { id: "sweat", name: "Sweat sem capuz", prices: [24.9, 29.9, 34.9], group: [22.9, 20.9] },
    { id: "capuz", name: "Sweat com capuz", prices: [29.9, 32.9, 36.9], group: [26.9, 24.9] },
  ];
  const KIDS = [
    { id: "body", name: "Body de bebé", note: "3 a 24 meses", prices: [12.9], show: "12,90 €", photo: "—" },
    { id: "sweatbebe", name: "Sweat de bebé", note: "6 a 24 meses", prices: [17.9], show: "17,90 €", photo: "—" },
    { id: "tshirtk", name: "T-shirt criança", prices: [10.9, 12.9, 14.9], show: "10,90 · 12,90 · 14,90 €", photo: "12,90 a 14,90 €" },
    { id: "sweatk", name: "Sweat criança", prices: [19.9], show: "19,90 €", photo: "21,90 €" },
    { id: "capuzk", name: "Sweat criança com capuz", prices: [24.9], show: "24,90 €", photo: "—" },
  ];
  const MUGS = [
    { id: "m-nome", name: "Caneca com nome", prices: [8.9], mug: true },
    { id: "m-foto", name: "Caneca com foto", prices: [9.9], mug: true },
    { id: "m-design", name: "Caneca com design completo", prices: [11.9], mug: true },
  ];

  // ---- Tabelas ----
  const cell = v => v == null ? '<td class="na">—</td>' : `<td>${eur(v)}</td>`;
  const label = p => `<th scope="row">${p.name}${p.note ? `<small>${p.note}</small>` : ""}</th>`;

  $("tab-adulto").innerHTML = `<div class="tablewrap"><table>
    <thead><tr><th>Peça</th>${SIZES.map(s => `<th>${s}</th>`).join("")}</tr></thead>
    <tbody>${ADULT.map(p => `<tr>${label(p)}${p.prices.map(cell).join("")}</tr>`).join("")}</tbody>
  </table></div>`;

  $("tab-crianca").innerHTML = `<div class="tablewrap"><table>
    <thead><tr><th>Peça</th><th>Preço</th><th>Com fotografia</th></tr></thead>
    <tbody>${KIDS.map(p => `<tr>${label(p)}<td>${p.show}</td><td${p.photo === "—" ? ' class="na"' : ""}>${p.photo}</td></tr>`).join("")}</tbody>
  </table></div>
  <p class="sub" style="margin-top:12px">T-shirt criança: Pequeno · Médio · Grande.</p>`;

  const tabs = document.querySelectorAll(".tabs [role=tab]");
  tabs.forEach(t => t.addEventListener("click", () => {
    tabs.forEach(x => x.setAttribute("aria-selected", x === t));
    document.querySelectorAll(".tabpanel").forEach(p => p.hidden = p.id !== "tab-" + t.dataset.tab);
  }));

  // ---- Calculadora ----
  const groups = [
    ["Adulto", ADULT.map(p => ({ ...p, kid: false }))],
    ["Bebé e criança", KIDS.map(p => ({ ...p, kid: true }))],
    ["Canecas", MUGS],
  ];
  const all = groups.flatMap(g => g[1]);
  const piece = $("c-piece"), size = $("c-size"), qty = $("c-qty");
  const extra = $("c-extra"), nameX = $("c-name"), photo = $("c-photo");

  piece.innerHTML = groups.map(([g, items]) =>
    `<optgroup label="${g}">${items.map(p => `<option value="${p.id}">${p.name}</option>`).join("")}</optgroup>`).join("");

  const cur = () => all.find(p => p.id === piece.value);

  function fillSizes() {
    const p = cur();
    if (p.prices.length === 1) {
      size.innerHTML = '<option value="0">Tamanho único</option>';
      size.disabled = true;
    } else {
      size.disabled = false;
      size.innerHTML = SIZES.map((s, i) =>
        `<option value="${i}"${p.prices[i] == null ? " disabled" : ""}>${s}</option>`).join("");
      size.value = String(p.prices.findIndex(v => v != null));
    }
    const isMug = !!p.mug;
    [extra, nameX, photo].forEach(c => { c.disabled = isMug; if (isMug) c.checked = false; });
    const noPhoto = p.photo === "—";
    photo.disabled = isMug || noPhoto; if (noPhoto) photo.checked = false;
  }

  function calc() {
    const p = cur(), i = Number(size.value) || 0;
    const n = Math.max(1, Math.min(500, parseInt(qty.value, 10) || 1));
    let unit = p.prices[i], hint = "";

    if (p.mug && n >= 10) {
      unit = 7.9; hint = "Preço de grupo aplicado (10 ou mais).";
    } else if (n >= 10 && p.group) {
      const full = extra.checked && nameX.checked;
      unit = p.group[full ? 0 : 1];
      hint = full ? "Preço de grupo: frente + costas + nome." : "Preço de grupo: só frente. Marca desenho extra e nome para frente + costas + nome.";
    } else {
      if (extra.checked) unit += p.kid ? 4 : 5;
      if (nameX.checked) unit += 2;
      if (photo.checked) unit += 2;
      if (n >= 10 && !p.mug) hint = "Para 10 ou mais peças, pede-nos o preço de grupo.";
    }
    $("c-total").textContent = eur(unit * n);
    $("c-hint").textContent = hint || (n > 1 ? `${eur(unit)} por peça.` : "");
    return { p, i, n, unit, total: unit * n };
  }

  function message() {
    const { p, i, n, total } = calc();
    const bits = [`Olá! Gostava de pedir: ${n}× ${p.name}`];
    if (p.prices.length > 1) bits.push(`desenho ${SIZES[i].toLowerCase()}`);
    const ex = [];
    if (extra.checked) ex.push("desenho extra");
    if (nameX.checked) ex.push("nome");
    if (photo.checked) ex.push("a partir de fotografia");
    if (ex.length) bits.push(ex.join(", "));
    return `${bits.join(", ")}. Estimativa: ${eur(total)}.`;
  }

  [piece].forEach(e => e.addEventListener("change", () => { fillSizes(); calc(); }));
  [size, qty, extra, nameX, photo].forEach(e => e.addEventListener("input", calc));

  $("calc").addEventListener("submit", async ev => {
    ev.preventDefault();
    const msg = message(), out = $("c-msg"), c = window.CONTACT || {};
    if (c.whatsapp) {
      window.open(`https://wa.me/${c.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
      out.textContent = "";
    } else {
      try { await navigator.clipboard.writeText(msg); out.textContent = "Pedido copiado. Cola-o numa mensagem para nós."; }
      catch { out.textContent = msg; }
    }
  });

  // ---- Contactos no rodapé ----
  const c = window.CONTACT || {};
  if (c.whatsapp) $("link-wa").href = `https://wa.me/${c.whatsapp}`;
  if (c.instagram) $("link-ig").href = `https://instagram.com/${c.instagram}`;
  $("link-wa").hidden = !c.whatsapp;
  $("link-ig").hidden = !c.instagram;

  fillSizes(); calc();
})();
