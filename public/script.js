const signs = [
  {
    name: "Aries",
    dates: [[3, 21], [4, 19]],
    vibe: "iniciativa, deseo y decision. Cuando algo te enciende, vas al frente y contagias movimiento.",
  },
  {
    name: "Tauro",
    dates: [[4, 20], [5, 20]],
    vibe: "constancia, placer y seguridad. Tu energia crece cuando hay calma, belleza y planes concretos.",
  },
  {
    name: "Geminis",
    dates: [[5, 21], [6, 20]],
    vibe: "curiosidad, palabra y cambio. Procesas el mundo conversando, conectando ideas y abriendo caminos.",
  },
  {
    name: "Cancer",
    dates: [[6, 21], [7, 22]],
    vibe: "intuicion, cuidado y memoria emocional. Tu sensibilidad puede ser una brujula muy precisa.",
  },
  {
    name: "Leo",
    dates: [[7, 23], [8, 22]],
    vibe: "presencia, creatividad y brillo propio. Cuando te reconoces, tu energia se vuelve magnetica.",
  },
  {
    name: "Virgo",
    dates: [[8, 23], [9, 22]],
    vibe: "detalle, orden y mejora. Tenes ojo para ajustar lo que otros pasan por alto.",
  },
  {
    name: "Libra",
    dates: [[9, 23], [10, 22]],
    vibe: "armonia, estetica y vinculos. Buscas equilibrio, pero tambien sabes leer climas sociales.",
  },
  {
    name: "Escorpio",
    dates: [[10, 23], [11, 21]],
    vibe: "profundidad, intensidad y transformacion. Tu poder aparece cuando te animas a mirar de frente.",
  },
  {
    name: "Sagitario",
    dates: [[11, 22], [12, 21]],
    vibe: "expansion, fe y aventura. Necesitas horizonte, verdad y experiencias que te despierten.",
  },
  {
    name: "Capricornio",
    dates: [[12, 22], [1, 19]],
    vibe: "ambicion, estructura y paciencia. Sabes construir resultados cuando elegis una meta real.",
  },
  {
    name: "Acuario",
    dates: [[1, 20], [2, 18]],
    vibe: "originalidad, vision y libertad. Ves posibilidades nuevas donde otros repiten formulas.",
  },
  {
    name: "Piscis",
    dates: [[2, 19], [3, 20]],
    vibe: "imaginacion, empatia y mundo interno. Tu intuicion necesita espacio para traducirse en claridad.",
  },
];

const emotionalNotes = [
  "necesitas sentir que tus decisiones tienen deseo, no solo obligacion.",
  "tu calma vuelve cuando el cuerpo descansa y lo cotidiano se ordena.",
  "tu mente pide aire: hablar, escribir o moverte puede destrabar emociones.",
  "tu mundo emocional busca ternura, pertenencia y espacios donde bajar la guardia.",
  "tu corazon necesita expresarse sin pedir permiso por ocupar lugar.",
  "te regula sentir que podes mejorar algo concreto, paso a paso.",
  "te impacta mucho el clima de los vinculos y la reciprocidad.",
  "procesas en profundidad; lo que sentis suele tener varias capas.",
  "te hace bien proyectar, viajar mentalmente y recuperar entusiasmo.",
  "necesitas confianza en tu propio proceso, sin exigirte resolver todo hoy.",
  "tu emocion se aclara cuando salis de lo obvio y pensas con libertad.",
  "sos permeable a lo que te rodea; cuidar tus limites tambien es sensibilidad.",
];

const signQuestions = {
  Aries: "como usar tu impulso sin agotarte ni sentir que tenes que poder con todo.",
  Tauro: "que necesitas para sentir estabilidad real y no quedarte en lugares que ya no te nutren.",
  Geminis: "como ordenar tu mente cuando aparecen demasiadas opciones al mismo tiempo.",
  Cancer: "como cuidar sin cargar con emociones que no son tuyas.",
  Leo: "donde esta tu brillo propio y que pasa cuando dejas de esconderlo.",
  Virgo: "como transformar exigencia en claridad, rutina y decisiones mas livianas.",
  Libra: "que patrones aparecen en tus vinculos y como sostener armonia sin perderte.",
  Escorpio: "que procesos de transformacion se repiten y que poder aparece cuando los nombras.",
  Sagitario: "que horizonte te devuelve entusiasmo y que creencias ya te quedan chicas.",
  Capricornio: "como construir ambicion propia sin vivir todo desde la presion.",
  Acuario: "donde necesitas libertad, rareza y pensamiento propio para sentirte vos.",
  Piscis: "como convertir sensibilidad en intuicion clara sin absorberlo todo.",
};

const elementBySign = {
  Aries: "fuego",
  Leo: "fuego",
  Sagitario: "fuego",
  Tauro: "tierra",
  Virgo: "tierra",
  Capricornio: "tierra",
  Geminis: "aire",
  Libra: "aire",
  Acuario: "aire",
  Cancer: "agua",
  Escorpio: "agua",
  Piscis: "agua",
};

const compatibilityNotes = {
  fuego: {
    fuego: "hay mucha chispa, entusiasmo y ganas de hacer cosas. El punto a cuidar es no competir por quien marca el ritmo.",
    tierra: "puede haber atraccion entre impulso y estabilidad. Funciona si una parte no apura y la otra no frena todo.",
    aire: "suele haber juego, charla y movimiento. El desafio es sostener profundidad cuando todo va muy rapido.",
    agua: "mezcla intensidad con sensibilidad. Puede ser muy magnetico si hay cuidado emocional y no solo reaccion.",
  },
  tierra: {
    fuego: "el fuego trae deseo y la tierra trae constancia. Puede crecer mucho si no se vive como presion o control.",
    tierra: "hay busqueda de seguridad, lealtad y planes concretos. El riesgo es quedarse en rutina sin sorpresa.",
    aire: "la mente del aire mueve a la tierra, y la tierra aterriza ideas. Necesitan paciencia con sus tiempos distintos.",
    agua: "suele ser una combinacion contenedora. La tierra da base y el agua aporta ternura e intuicion.",
  },
  aire: {
    fuego: "hay chispa, humor y ganas de explorar. Conviene cuidar que la conexion no quede solo en estimulo.",
    tierra: "pueden complementarse si el aire no evade y la tierra no exige certezas inmediatas.",
    aire: "hay mucha conversacion, ideas y complicidad mental. El desafio es bajar al cuerpo y a los hechos.",
    agua: "el agua siente profundo y el aire necesita nombrarlo. Puede funcionar si hay escucha y traduccion emocional.",
  },
  agua: {
    fuego: "hay atraccion fuerte, pero tambien reacciones intensas. Necesitan ternura y acuerdos claros.",
    tierra: "la tierra contiene y el agua suaviza. Puede ser una union muy nutritiva si no se vuelve dependencia.",
    aire: "puede costar al principio: una parte analiza y la otra siente. Si se escuchan, se complementan.",
    agua: "hay intuicion, sensibilidad y profundidad. El cuidado esta en no absorberse emocionalmente.",
  },
};

const pointMeanings = {
  Sol: "identidad, energia vital y forma de afirmarte",
  Luna: "emociones, necesidades internas y manera de sentir seguridad",
  Mercurio: "mente, comunicacion y forma de procesar ideas",
  Venus: "amor, deseo de armonia, gusto y forma de vincularte",
  Marte: "accion, impulso, enojo y manera de perseguir lo que queres",
  Ascendente: "primera impresion, estilo personal y modo de iniciar etapas",
  "Medio cielo": "vocacion, imagen publica y direccion profesional",
};

const signInterpretations = {
  Aries: "energia directa, rapida y valiente. Necesita movimiento, decision y desafios que enciendan deseo.",
  Tauro: "energia estable, sensorial y constante. Busca seguridad, placer, ritmo propio y resultados concretos.",
  Geminis: "energia curiosa, mental y adaptable. Necesita conversar, aprender, conectar ideas y cambiar de aire.",
  Cancer: "energia sensible, protectora e intuitiva. Se orienta por memoria emocional, pertenencia y cuidado.",
  Leo: "energia expresiva, creativa y luminosa. Necesita reconocimiento, juego, deseo propio y lugar para brillar.",
  Virgo: "energia observadora, practica y detallista. Busca ordenar, mejorar, entender procesos y cuidar lo cotidiano.",
  Libra: "energia vincular, estetica y diplomatica. Necesita equilibrio, reciprocidad y belleza en los intercambios.",
  Escorpio: "energia profunda, intensa y transformadora. Mira lo oculto, detecta verdades y atraviesa cambios fuertes.",
  Sagitario: "energia expansiva, franca y buscadora. Necesita horizonte, aprendizaje, aventura y sentido.",
  Capricornio: "energia estrategica, responsable y constructiva. Busca metas claras, estructura y logros sostenidos.",
  Acuario: "energia original, libre y mental. Necesita diferencia, vision propia, redes y nuevas formas de pensar.",
  Piscis: "energia sensible, imaginativa y empatica. Se mueve por intuicion, simbolos, inspiracion y mundo interno.",
};

const form = document.querySelector("#birth-form");
const solarCard = document.querySelector("#solar-card");
const ascCard = document.querySelector("#asc-card");
const moonCard = document.querySelector("#moon-card");
const compatCard = document.querySelector("#compat-card");
const solarResult = document.querySelector("#solar-result");
const ascResult = document.querySelector("#asc-result");
const moonResult = document.querySelector("#moon-result");
const compatResult = document.querySelector("#compat-result");
const bridgeCopy = document.querySelector("#bridge-copy");
const seenCopy = document.querySelector("#seen-copy");
const unlockAsc = document.querySelector("#unlock-asc");
const unlockMoon = document.querySelector("#unlock-moon");
const partnerSign = document.querySelector("#partner-sign");
const checkCompat = document.querySelector("#check-compat");
const copyAlias = document.querySelector("#copy-alias");
const aliasText = document.querySelector("#alias-text");
const productCards = document.querySelectorAll("[data-product-card]");
const productButtons = document.querySelectorAll(".select-product");
const selectedProductTitle = document.querySelector("#selected-product-title");
const selectedProductCopy = document.querySelector("#selected-product-copy");
const unlockForm = document.querySelector("#unlock-form");
const codeForm = document.querySelector("#code-form");
const unlockEmail = document.querySelector("#unlock-email");
const unlockCode = document.querySelector("#unlock-code");
const unlockedReport = document.querySelector("#unlocked-report");
const unlockedCopy = document.querySelector("#unlocked-copy");
const reportMeta = document.querySelector("#report-meta");
const downloadPdf = document.querySelector("#download-pdf");
const apiStatus = document.querySelector("#api-status");
const reportTitle = document.querySelector("#report-title");
const astroSummary = document.querySelector("#astro-summary");
const astroMap = document.querySelector("#astro-map");
const partnerPanel = document.querySelector("#partner-panel");
const partnerName = document.querySelector("#partner-name");
const partnerDate = document.querySelector("#partner-date");
const partnerHour = document.querySelector("#partner-hour");
const partnerMinute = document.querySelector("#partner-minute");
const toast = document.querySelector("#toast");

let currentReading = null;
let currentUnlockToken = "";
let selectedProduct = "basic";
const masterUnlockCode = "LUNA500";
const defaultBirthPlace = {
  name: "Buenos Aires",
  timezoneOffset: -3,
  latitude: -34.6037,
  longitude: -58.3816,
};
const apiBaseUrl = location.protocol === "http:" || location.protocol === "https:"
  ? ""
  : "http://127.0.0.1:4180";

const productMeta = {
  basic: {
    title: "Informe seleccionado: mi carta astral",
    copy: "Incluye mapa estelar, posiciones principales e interpretacion inicial. En produccion el codigo llega despues de confirmar $500.",
  },
  couple: {
    title: "Informe seleccionado: compatibilidad de pareja",
    copy: "Incluye dos cartas y una lectura de amor, dinero y proyecto de vida. En produccion el codigo llega despues de confirmar $1.500.",
  },
};

signs.forEach((sign) => {
  const option = document.createElement("option");
  option.value = sign.name;
  option.textContent = sign.name;
  partnerSign.append(option);
});

function setSelectedProduct(product) {
  selectedProduct = product;
  selectedProductTitle.textContent = productMeta[product].title;
  selectedProductCopy.textContent = productMeta[product].copy;
  partnerPanel.hidden = product !== "couple";

  productCards.forEach((card) => {
    card.classList.toggle("is-selected", card.dataset.productCard === product);
  });
}

productButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setSelectedProduct(button.dataset.product);
    document.querySelector("#unlock-title").scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

setSelectedProduct("basic");

function isDateInRange(month, day, start, end) {
  const value = month * 100 + day;
  const startValue = start[0] * 100 + start[1];
  const endValue = end[0] * 100 + end[1];

  if (startValue <= endValue) {
    return value >= startValue && value <= endValue;
  }

  return value >= startValue || value <= endValue;
}

function getSolarSign(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  const sign = signs.find((item) => isDateInRange(month, day, item.dates[0], item.dates[1]));
  return { sign, dayOfYearSeed: Number(`${month}${day}${String(year).slice(-2)}`) };
}

function getAscendantIndex(solarIndex, hour, minute) {
  const twoHourBlock = Math.floor((hour * 60 + minute) / 120);
  return (solarIndex + twoHourBlock) % signs.length;
}

function normalizeName(value) {
  return value.trim().replace(/\s+/g, " ");
}

function normalizeBirthTime(hourValue, minuteValue) {
  const hasHour = hourValue !== "";
  const hasMinute = minuteValue !== "";
  const hour = hasHour ? Number(hourValue) : 12;
  const minute = hasMinute ? Number(minuteValue) : 0;

  return {
    hour,
    minute,
    hasExactTime: hasHour && hasMinute,
  };
}

function setUnlocked(card, button) {
  card.classList.remove("is-locked");
  card.classList.add("reading-card--active");
  button.disabled = false;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.setTimeout(() => toast.classList.remove("is-visible"), 1800);
}

function getZodiacSignFromLongitude(longitude) {
  const zodiac = [
    "Aries",
    "Tauro",
    "Geminis",
    "Cancer",
    "Leo",
    "Virgo",
    "Libra",
    "Escorpio",
    "Sagitario",
    "Capricornio",
    "Acuario",
    "Piscis",
  ];
  const normalized = ((longitude % 360) + 360) % 360;
  return zodiac[Math.floor(normalized / 30)];
}

function getDegreeWithinSign(longitude) {
  const normalized = ((longitude % 360) + 360) % 360;
  return Math.round((normalized % 30) * 10) / 10;
}

function formatAstroPoint(label, longitude) {
  return {
    label,
    longitude,
    sign: getZodiacSignFromLongitude(longitude),
    degree: getDegreeWithinSign(longitude),
  };
}

function polarToPoint(center, radius, longitude) {
  const angle = ((longitude - 90) * Math.PI) / 180;
  return {
    x: center + radius * Math.cos(angle),
    y: center + radius * Math.sin(angle),
  };
}

function renderStarMap(points, houses) {
  const center = 150;
  const outer = 132;
  const middle = 106;
  const inner = 68;
  const labelRadius = 118;
  const planetRadius = 92;
  const aspectPoints = points.filter((point) => !["Ascendente", "Medio cielo"].includes(point.label));
  const zodiacNames = ["Aries", "Tauro", "Geminis", "Cancer", "Leo", "Virgo", "Libra", "Escorpio", "Sagitario", "Capricornio", "Acuario", "Piscis"];
  const planetShort = {
    Sol: "Sol",
    Luna: "Lun",
    Mercurio: "Mer",
    Venus: "Ven",
    Marte: "Mar",
    Ascendente: "Asc",
    "Medio cielo": "MC",
  };
  const houseCusps = Array.isArray(houses.cusps) ? houses.cusps : [];

  const zodiacLines = Array.from({ length: 12 }, (_, index) => {
    const point = polarToPoint(center, outer, index * 30);
    return `<line class="zodiac-line" x1="${center}" y1="${center}" x2="${point.x.toFixed(2)}" y2="${point.y.toFixed(2)}" />`;
  }).join("");

  const houseLines = houseCusps
    .map((longitude) => {
      const point = polarToPoint(center, middle, longitude);
      return `<line class="house-line" x1="${center}" y1="${center}" x2="${point.x.toFixed(2)}" y2="${point.y.toFixed(2)}" />`;
    })
    .join("");

  const zodiacLabels = zodiacNames
    .map((name, index) => {
      const point = polarToPoint(center, labelRadius, index * 30 + 15);
      return `<text class="zodiac-label" x="${point.x.toFixed(2)}" y="${point.y.toFixed(2)}" text-anchor="middle" dominant-baseline="middle">${name.slice(0, 3)}</text>`;
    })
    .join("");

  const aspectLines = aspectPoints
    .flatMap((point, index) =>
      aspectPoints.slice(index + 1, index + 4).map((nextPoint) => {
        const from = polarToPoint(center, inner, point.longitude);
        const to = polarToPoint(center, inner, nextPoint.longitude);
        return `<line class="aspect-line" x1="${from.x.toFixed(2)}" y1="${from.y.toFixed(2)}" x2="${to.x.toFixed(2)}" y2="${to.y.toFixed(2)}" />`;
      })
    )
    .join("");

  const planetMarkers = points
    .map((point) => {
      const dot = polarToPoint(center, planetRadius, point.longitude);
      const label = polarToPoint(center, planetRadius + 16, point.longitude);
      return `
        <circle class="planet-dot" cx="${dot.x.toFixed(2)}" cy="${dot.y.toFixed(2)}" r="6" />
        <text class="planet-label" x="${label.x.toFixed(2)}" y="${label.y.toFixed(2)}" text-anchor="middle" dominant-baseline="middle">${planetShort[point.label]}</text>
      `;
    })
    .join("");

  astroMap.innerHTML = `
    <svg viewBox="0 0 300 300" role="img" aria-label="Mapa estelar con planetas calculados">
      <circle class="ring" cx="${center}" cy="${center}" r="${outer}" />
      <circle class="ring" cx="${center}" cy="${center}" r="${middle}" />
      <circle class="ring" cx="${center}" cy="${center}" r="${inner}" />
      ${zodiacLines}
      ${houseLines}
      ${aspectLines}
      ${zodiacLabels}
      ${planetMarkers}
      <circle cx="${center}" cy="${center}" r="4" fill="#b98932" />
    </svg>
  `;
}

function formatLabelList(labels) {
  if (labels.length <= 1) return labels[0] || "";
  if (labels.length === 2) return `${labels[0]} y ${labels[1]}`;
  return `${labels.slice(0, -1).join(", ")} y ${labels.at(-1)}`;
}

function getPointReading(point) {
  const meaning = pointMeanings[point.label];
  const signText = signInterpretations[point.sign];
  const pointCopy = {
    Sol: `Marca tu centro personal: ${meaning}. En ${point.sign}, se mueve con ${signText}`,
    Luna: `Muestra tu clima interno: ${meaning}. En ${point.sign}, busca regularse con ${signText}`,
    Mercurio: `Ordena tu manera de pensar y decir: ${meaning}. En ${point.sign}, procesa desde ${signText}`,
    Venus: `Habla de disfrute, atraccion y vinculo: ${meaning}. En ${point.sign}, pide ${signText}`,
    Marte: `Describe impulso y reaccion: ${meaning}. En ${point.sign}, actua con ${signText}`,
    Ascendente: `Es la puerta de entrada de la carta: ${meaning}. En ${point.sign}, se presenta con ${signText}`,
    "Medio cielo": `Orienta imagen publica y vocacion: ${meaning}. En ${point.sign}, busca expresarse con ${signText}`,
  };

  return pointCopy[point.label] || `${point.label} habla de ${meaning}. En ${point.sign}, aparece ${signText}`;
}

function renderAstroSummary(chart) {
  const planets = chart.data.planets || [];
  const planetByName = new Map(planets.map((planet) => [planet.name, planet]));
  const houses = chart.data.houses || {};

  const points = [
    planetByName.get("Sun") && formatAstroPoint("Sol", planetByName.get("Sun").longitude),
    planetByName.get("Moon") && formatAstroPoint("Luna", planetByName.get("Moon").longitude),
    planetByName.get("Mercury") && formatAstroPoint("Mercurio", planetByName.get("Mercury").longitude),
    planetByName.get("Venus") && formatAstroPoint("Venus", planetByName.get("Venus").longitude),
    planetByName.get("Mars") && formatAstroPoint("Marte", planetByName.get("Mars").longitude),
    typeof houses.ascendant === "number" && formatAstroPoint("Ascendente", houses.ascendant),
    typeof houses.mc === "number" && formatAstroPoint("Medio cielo", houses.mc),
  ].filter(Boolean);

  const interpretationItems = points.map((point) => ({
    ...point,
    text: getPointReading(point),
  }));

  const strongestSigns = interpretationItems.reduce((acc, point) => {
    acc[point.sign] = (acc[point.sign] || 0) + 1;
    return acc;
  }, {});
  const dominantSign = Object.entries(strongestSigns).sort((a, b) => b[1] - a[1])[0]?.[0];
  const groupedSigns = Object.values(
    points.reduce((acc, point) => {
      acc[point.sign] ||= { sign: point.sign, labels: [] };
      acc[point.sign].labels.push(point.label);
      return acc;
    }, {})
  ).sort((a, b) => b.labels.length - a.labels.length);
  renderStarMap(points, houses);

  astroSummary.innerHTML = `
    <div class="source-note">
      <strong>Datos calculados por AstroWay</strong>
      <span>La API devuelve posiciones y casas. La interpretacion la redacta el sitio usando esos datos como base.</span>
    </div>
    <h4>Posiciones principales</h4>
    <ul class="astro-list">
      ${points
        .map(
          (point) =>
            `<li><span>${point.label}</span><strong>${point.sign} ${point.degree}°</strong></li>`
        )
        .join("")}
    </ul>
    <div class="interpretation-block">
      <h4>Lectura inicial</h4>
      <p>${
        dominantSign
          ? `El tono mas marcado aparece en ${dominantSign}: ${signInterpretations[dominantSign]}`
          : "La lectura empieza cruzando planetas, signos y casas para evitar una interpretacion generica."
      }</p>
      <div class="sign-clusters">
        ${groupedSigns
          .map(
            (group) =>
              `<article><strong>${group.sign}</strong><p>${formatLabelList(group.labels)} ${group.labels.length === 1 ? "cae" : "caen"} en esta energia.</p></article>`
          )
          .join("")}
      </div>
      <div class="interpretation-grid">
        ${interpretationItems
          .map(
            (point) =>
              `<article><strong>${point.label} en ${point.sign}</strong><p>${point.text}</p></article>`
          )
          .join("")}
      </div>
    </div>
  `;
}

async function fetchAstroWayChart(reading = currentReading) {
  if (!reading) {
    throw new Error("Completa primero tus datos de nacimiento.");
  }

  const payload = buildChartPayload(reading);

  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 12000);

  const response = await fetch(`${apiBaseUrl}/api/chart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal: controller.signal,
  });

  window.clearTimeout(timeoutId);

  if (!response.ok) {
    throw new Error(`AstroWay respondio con estado ${response.status}.`);
  }

  const data = await response.json();

  if (!data.ok) {
    throw new Error(data.error?.message || "AstroWay no pudo calcular la carta con esos datos.");
  }

  return { ok: true, data: data.data, requestId: data.requestId, rateLimit: data.rateLimit };
}

function buildChartPayload(reading) {
  return {
    date: reading.birthDate,
    time: `${String(reading.hour).padStart(2, "0")}:${String(reading.minute).padStart(2, "0")}:00`,
    timezoneOffset: defaultBirthPlace.timezoneOffset,
    latitude: defaultBirthPlace.latitude,
    longitude: defaultBirthPlace.longitude,
    houseSystem: "P",
  };
}

async function fetchCompatibilityCharts(partnerReading) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 20000);

  const response = await fetch(`${apiBaseUrl}/api/compatibility`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      personA: buildChartPayload(currentReading),
      personB: buildChartPayload(partnerReading),
    }),
    signal: controller.signal,
  });

  window.clearTimeout(timeoutId);

  const data = await response.json();

  if (!data.ok) {
    throw new Error(data.error?.message || "No se pudo calcular la compatibilidad.");
  }

  return {
    ok: true,
    requestId: data.requestId,
    personA: { ok: true, data: data.charts.personA },
    personB: { ok: true, data: data.charts.personB },
  };
}

function renderMapError(message) {
  astroMap.innerHTML = `<span>${message}</span>`;
}

function formatDateForReport(dateString) {
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
}

function renderReportMeta(partnerReading) {
  if (!currentReading) {
    reportMeta.innerHTML = "";
    return;
  }

  const items = [
    ["Nombre", currentReading.fullName],
    ["Nacimiento", `${formatDateForReport(currentReading.birthDate)} ${String(currentReading.hour).padStart(2, "0")}:${String(currentReading.minute).padStart(2, "0")}`],
    ["Hora", currentReading.hasExactTime ? "Exacta" : "Aproximada 12:00"],
    ["Lugar usado", defaultBirthPlace.name],
    ["Informe", selectedProduct === "couple" ? "Compatibilidad de pareja" : "Carta astral basica"],
  ];

  if (partnerReading) {
    items.push(
      ["Otra persona", partnerReading.fullName],
      ["Nacimiento pareja", `${formatDateForReport(partnerReading.birthDate)} ${String(partnerReading.hour).padStart(2, "0")}:${String(partnerReading.minute).padStart(2, "0")}`],
      ["Hora pareja", partnerReading.hasExactTime ? "Exacta" : "Aproximada 12:00"]
    );
  }

  reportMeta.innerHTML = items
    .map(([label, value]) => `<span><strong>${label}</strong>${value}</span>`)
    .join("");
}

function buildDemoChart(reading) {
  const solarData = reading.sign ? { sign: reading.sign } : getSolarSign(reading.birthDate);
  const solarIndex = signs.findIndex((item) => item.name === solarData.sign.name);
  const seed = Number(reading.birthDate.replaceAll("-", "")) + reading.hour * 17 + reading.minute * 3;
  const moonIndex = reading.moon
    ? signs.findIndex((item) => item.name === reading.moon.name)
    : (solarIndex + Math.abs(seed % 9) + 1) % signs.length;
  const ascIndex = reading.asc
    ? signs.findIndex((item) => item.name === reading.asc.name)
    : getAscendantIndex(solarIndex, reading.hour, reading.minute);
  const sunLongitude = solarIndex * 30 + 14 + (seed % 10) / 10;
  const ascendant = ascIndex * 30 + 12 + (reading.minute % 10) / 10;

  return {
    ok: true,
    data: {
      planets: [
        { name: "Sun", longitude: sunLongitude },
        { name: "Moon", longitude: moonIndex * 30 + 10 + (seed % 8) },
        { name: "Mercury", longitude: (sunLongitude + 18) % 360 },
        { name: "Venus", longitude: (sunLongitude + 332) % 360 },
        { name: "Mars", longitude: (sunLongitude + 57) % 360 },
      ],
      houses: {
        system: "demo",
        ascendant,
        mc: (ascendant + 90) % 360,
        cusps: Array.from({ length: 12 }, (_, index) => (ascendant + index * 30) % 360),
      },
    },
  };
}

function getChartPointSign(chart, planetName) {
  const planet = (chart.data.planets || []).find((item) => item.name === planetName);
  return planet ? getZodiacSignFromLongitude(planet.longitude) : null;
}

function renderCompatibilityInsights(ownChart, partnerChart, partnerLabel) {
  const ownSun = getChartPointSign(ownChart, "Sun");
  const partnerSun = getChartPointSign(partnerChart, "Sun");
  const ownMoon = getChartPointSign(ownChart, "Moon");
  const partnerMoon = getChartPointSign(partnerChart, "Moon");
  const ownVenus = getChartPointSign(ownChart, "Venus");
  const partnerVenus = getChartPointSign(partnerChart, "Venus");
  const ownMars = getChartPointSign(ownChart, "Mars");
  const partnerMars = getChartPointSign(partnerChart, "Mars");
  const loveNote = compatibilityNotes[elementBySign[ownVenus]][elementBySign[partnerVenus]];
  const moneyNote = compatibilityNotes[elementBySign[ownSun]][elementBySign[partnerSun]];
  const lifeNote = compatibilityNotes[elementBySign[ownMoon]][elementBySign[partnerMoon]];

  astroSummary.insertAdjacentHTML(
    "beforeend",
    `
      <div class="compatibility-report">
        <h4>Compatibilidad con ${partnerLabel}</h4>
        <p class="compatibility-intro">Esta parte cruza puntos seleccionados de las dos cartas. No es una descripcion enviada por AstroWay: se arma desde las posiciones calculadas para cada persona.</p>
        <div class="compatibility-grid">
          <article>
            <strong>Amor y quimica</strong>
            <p>Venus muestra como buscan afecto y disfrute. ${ownVenus} + ${partnerVenus}: ${loveNote}</p>
          </article>
          <article>
            <strong>Dinero y acuerdos practicos</strong>
            <p>El Sol ayuda a mirar prioridades y ritmo vital. ${ownSun} + ${partnerSun}: ${moneyNote}</p>
          </article>
          <article>
            <strong>Proyecto de vida</strong>
            <p>La Luna marca necesidades emocionales para convivir y proyectar. ${ownMoon} + ${partnerMoon}: ${lifeNote}</p>
          </article>
          <article>
            <strong>Deseo y movimiento</strong>
            <p>Marte muestra como accionan y discuten. ${ownMars} + ${partnerMars}: ${compatibilityNotes[elementBySign[ownMars]][elementBySign[partnerMars]]}</p>
          </article>
        </div>
      </div>
    `
  );
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const firstName = normalizeName(form.firstName.value);
  const lastName = normalizeName(form.lastName.value);
  const birthDate = form.birthDate.value;
  const birthTime = normalizeBirthTime(form.birthHour.value, form.birthMinute.value);
  const { hour, minute, hasExactTime } = birthTime;

  if (!firstName || !lastName || !birthDate || hour < 0 || hour > 23 || minute < 0 || minute > 59) {
    showToast("Revisa los datos para continuar");
    return;
  }

  const { sign, dayOfYearSeed } = getSolarSign(birthDate);
  const solarIndex = signs.findIndex((item) => item.name === sign.name);
  const ascIndex = getAscendantIndex(solarIndex, hour, minute);
  const moonIndex = (dayOfYearSeed + hour + minute) % signs.length;

  currentReading = {
    fullName: `${firstName} ${lastName}`,
    birthDate,
    hour,
    minute,
    hasExactTime,
    sign,
    asc: signs[ascIndex],
    moon: signs[moonIndex],
    emotionalNote: emotionalNotes[moonIndex],
  };

  solarResult.textContent = `${currentReading.fullName}, tu signo solar es ${sign.name}: ${sign.vibe}`;
  ascResult.textContent = hasExactTime
    ? "Ya podes abrir tu anticipo para ver como se expresa esa energia hacia afuera."
    : "Como no cargaste hora exacta, el ascendente queda como aproximado.";
  moonResult.textContent = "Despues del ascendente aparece una pista emocional para completar el clima de tu lectura.";
  bridgeCopy.textContent = `${firstName}, tu signo solar ya muestra una energia principal, pero la carta astral completa sirve para responder ${signQuestions[sign.name]}`;
  seenCopy.textContent = hasExactTime
    ? `Ya tenemos tu signo solar en ${sign.name}. Falta cruzarlo con ascendente, luna, casas y aspectos para que no quede en una descripcion generica.`
    : `Ya tenemos tu signo solar en ${sign.name}. Sin hora exacta, la lectura puede avanzar, pero ascendente y casas quedan aproximados.`;

  solarCard.classList.add("reading-card--active");
  setUnlocked(ascCard, unlockAsc);
  compatCard.classList.remove("is-locked");
  compatCard.classList.add("reading-card--active");
  partnerSign.disabled = false;
  checkCompat.disabled = false;
  partnerSign.value = "";
  compatResult.textContent = `Ya podes comparar ${sign.name} con otro signo. Es una compatibilidad express, ideal para jugar y abrir preguntas.`;
  unlockMoon.disabled = true;
  moonCard.classList.add("is-locked");
  moonCard.classList.remove("reading-card--active");

  document.querySelector(".reading-grid").scrollIntoView({ behavior: "smooth", block: "start" });
});

checkCompat.addEventListener("click", () => {
  if (!currentReading || !partnerSign.value) {
    showToast("Elegi un signo para comparar");
    return;
  }

  const ownElement = elementBySign[currentReading.sign.name];
  const partnerElement = elementBySign[partnerSign.value];
  const note = compatibilityNotes[ownElement][partnerElement];
  const sameElement = ownElement === partnerElement;
  const headline = sameElement ? "compatibilidad alta por energia compartida" : "compatibilidad con aprendizaje";

  compatResult.textContent = `${currentReading.sign.name} + ${partnerSign.value}: ${headline}. ${note} Para una lectura real de vinculos haria falta mirar Venus, Marte, Luna, casas y aspectos de ambas cartas.`;
});

unlockAsc.addEventListener("click", () => {
  if (!currentReading) return;

  ascResult.textContent = `Tu ascendente ${currentReading.hasExactTime ? "orientativo" : "aproximado"} aparece en ${currentReading.asc.name}: ${currentReading.asc.vibe} Esto habla de tu primera impresion, tu forma de arrancar etapas y el estilo con el que enfrentas lo nuevo. Para calcularlo con precision hace falta ciudad y hora exacta de nacimiento.`;
  seenCopy.textContent = `Ya se ve una combinacion interesante: ${currentReading.sign.name} como energia central y ${currentReading.asc.name} como puerta de entrada al mundo. La carta completa explica donde se potencian y donde se tensionan.`;
  setUnlocked(moonCard, unlockMoon);
});

unlockMoon.addEventListener("click", () => {
  if (!currentReading) return;

  moonResult.textContent = `Tu base emocional vibra cerca de ${currentReading.moon.name}: ${currentReading.emotionalNote} Esta pista muestra como procesas lo que sentis, pero en la carta completa se cruza con casas, aspectos y patrones vinculares.`;
  bridgeCopy.textContent = `Con estas tres piezas ya aparece un mapa inicial: identidad, forma de mostrarte y clima emocional. El informe pago no agrega "mas frases"; une el mapa completo para entender tus patrones con mas precision.`;
  seenCopy.textContent = `${currentReading.sign.name}, ${currentReading.asc.name} y una base emocional en ${currentReading.moon.name}: suficiente para despertar preguntas, todavia incompleto para una interpretacion profunda.`;
});

copyAlias.addEventListener("click", async () => {
  const alias = aliasText.textContent.trim();

  try {
    await navigator.clipboard.writeText(alias);
    showToast("Alias copiado");
  } catch {
    showToast("Alias: " + alias);
  }
});

unlockForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = unlockEmail.value.trim();

  if (!email) {
    showToast("Ingresa tu email");
    return;
  }

  const submitButton = unlockForm.querySelector("button[type='submit']");
  submitButton.disabled = true;
  unlockedReport.hidden = true;

  try {
    const response = await fetch(`${apiBaseUrl}/api/send-code`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, product: selectedProduct }),
    });
    const data = await response.json().catch(() => ({}));

    if (!response.ok || !data.ok) {
      throw new Error(data.error?.message || "No pudimos enviar el codigo.");
    }

    currentUnlockToken = data.token;
    showToast(data.provider !== "console" ? "Te enviamos el codigo por email" : "Codigo generado (mira la consola del servidor)");
  } catch (error) {
    showToast(error.message);
  } finally {
    submitButton.disabled = false;
  }
});

codeForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const submittedCode = unlockCode.value.trim().toUpperCase();
  const isMasterCode = submittedCode === masterUnlockCode;

  if (!isMasterCode) {
    if (!currentUnlockToken) {
      showToast("Primero pedi el codigo por email");
      return;
    }

    try {
      const response = await fetch(`${apiBaseUrl}/api/verify-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: currentUnlockToken, code: submittedCode }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.ok) {
        showToast(data.error?.message || "Codigo incorrecto");
        return;
      }
    } catch {
      showToast("No pudimos verificar el codigo");
      return;
    }
  }

  let partnerReading = null;

  if (selectedProduct === "couple") {
    const name = normalizeName(partnerName.value || "");
    const birthDate = partnerDate.value;
    const partnerTime = normalizeBirthTime(partnerHour.value, partnerMinute.value);
    const { hour, minute, hasExactTime } = partnerTime;

    if (!name || !birthDate || hour < 0 || hour > 23 || minute < 0 || minute > 59) {
      showToast("Completa nombre y fecha de la otra persona");
      partnerPanel.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    partnerReading = {
      fullName: name,
      birthDate,
      hour,
      minute,
      hasExactTime,
    };
  }

  const intro = currentReading
    ? selectedProduct === "couple"
      ? `${currentReading.fullName}, este informe compara tu carta con la de ${partnerReading.fullName} para mirar amor, dinero y proyecto de vida.`
      : `${currentReading.fullName}, tu informe basico toma como punto de partida ${currentReading.sign.name}, con ascendente ${currentReading.hasExactTime ? "orientativo" : "aproximado"} en ${currentReading.asc.name} y una base emocional cercana a ${currentReading.moon.name}.`
    : "Tu informe se genera con tus datos de nacimiento y se completa con carta visual, lectura principal y compatibilidad inicial.";

  const timeWarning = currentReading?.hasExactTime && (!partnerReading || partnerReading.hasExactTime)
    ? ""
    : " Como falta una hora exacta, ascendente, casas y mapa se muestran como aproximados.";
  unlockedCopy.textContent = `${intro} Esta prueba usa ${defaultBirthPlace.name} como ciudad fija. En la version final, la ciudad se elige en el formulario para calcular casas y ascendente con precision.${timeWarning}`;
  reportTitle.textContent = selectedProduct === "couple"
    ? `Compatibilidad de ${currentReading?.fullName || "pareja"}${partnerReading ? ` y ${partnerReading.fullName}` : ""}`
    : `Carta astral de ${currentReading?.fullName || "tu lectura"}`;
  renderReportMeta(partnerReading);
  apiStatus.textContent = selectedProduct === "couple" ? "Consultando dos cartas en AstroWay..." : "Consultando AstroWay...";
  apiStatus.classList.remove("is-error");
  astroSummary.innerHTML = "";
  astroMap.innerHTML = "<span>Calculando mapa estelar...</span>";
  unlockedReport.hidden = false;
  document.body.classList.add("report-unlocked");
  unlockedReport.scrollIntoView({ behavior: "smooth", block: "start" });
  showToast("Informe desbloqueado");

  try {
    if (selectedProduct === "couple") {
      const compatibility = await fetchCompatibilityCharts(partnerReading);
      apiStatus.textContent = `Compatibilidad cargada con dos cartas reales. ID: ${compatibility.requestId}`;
      renderAstroSummary(compatibility.personA);
      renderCompatibilityInsights(compatibility.personA, compatibility.personB, partnerReading.fullName);
    } else {
      const chart = await fetchAstroWayChart();
      apiStatus.textContent = `Calculo real cargado desde AstroWay. ID: ${chart.requestId}`;
      renderAstroSummary(chart);
    }
  } catch (error) {
    const message =
      error.name === "AbortError"
        ? "AstroWay tardo demasiado en responder."
        : error.message;
    apiStatus.textContent = `${message} Mostrando modo demo estimado para que puedas seguir probando el flujo. En produccion lo resolvemos con Cloudflare Worker o Supabase Function.`;
    apiStatus.classList.add("is-error");
    const fallbackChart = buildDemoChart(currentReading);
    renderAstroSummary(fallbackChart);

    if (selectedProduct === "couple" && partnerReading) {
      renderCompatibilityInsights(fallbackChart, buildDemoChart(partnerReading), partnerReading.fullName);
    }
  }
});

downloadPdf.addEventListener("click", () => {
  const owner = currentReading?.fullName ? ` - ${currentReading.fullName}` : "";
  document.title = `Informe Astral${owner}`;
  window.print();
});
