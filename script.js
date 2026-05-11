// script.js
// ==========================================
// MICRO DETETIVE
// Projeto de extensão universitária UNIP Paraíso
// Criado por: Mayara Souza
// ==========================================

// ==========================================
// BANCO DE DADOS
// ==========================================

const microorganisms = [

// BACTERIA  
{
  id: "saureus",

  name: "Staphylococcus aureus",

  type: "bacteria",

  hint: "Comumente associado a infecções cutâneas, abscessos e intoxicação alimentar.",

  traits: {
    gram: "positivo",

    morphology: "cocos em cachos",

    catalase: "positivo",
    coagulase: "positivo",
    oxidase: "negativo"
  }
},

{
  id: "spyogenes",

  name: "Streptococcus pyogenes",

  type: "bacteria",

  hint: "Importante agente etiológico da faringite bacteriana e erisipela.",

  traits: {
    gram: "positivo",

    morphology: "cocos em cadeia",

    catalase: "negativo",
    coagulase: "negativo",
    oxidase: "negativo"
  }
},

{
  id: "ecoli",

  name: "Escherichia coli",

  type: "bacteria",

  hint: "Muito associado a infecções urinárias e microbiota intestinal.",

  traits: {
    gram: "negativo",

    morphology: "bacilo",

    catalase: "positivo",
    coagulase: "negativo",
    oxidase: "negativo"
  }
},

{
  id: "ngono",

  name: "Neisseria gonorrhoeae",

  type: "bacteria",

  hint: "Agente etiológico causador de uma IST.",

  traits: {
    gram: "negativo",

    morphology: "diplococo",

    catalase: "positivo",
    coagulase: "negativo",
    oxidase: "positivo"
  }
},

{
  id: "paeruginosa",

  name: "Pseudomonas aeruginosa",

  type: "bacteria",

  hint: "Frequentemente associada a infecções hospitalares e pacientes queimados.",

  traits: {
    gram: "negativo",

    morphology: "bacilo",

    catalase: "positivo",
    coagulase: "negativo",
    oxidase: "positivo"
  }
},

// FUNGOS 
{
  id: "albicans",

  name: "Candida albicans",

  type: "fungus",

  hint: "Fungo oportunista frequentemente associado à candidíase.",

  traits: {
    gram: "positivo",
    morphology: "levedura",
    germTube: "positivo",
    lactophenol: "ausente",
    urease: "negativo"
  }
},

{
  id: "neoformans",

  name: "Cryptococcus neoformans",

  type: "fungus",

  hint: "Fungo encapsulado associado à meningite em imunossuprimidos.",

  traits: {
    gram: "positivo",
    morphology: "levedura",
    germTube: "negativo",
    lactophenol: "ausente",
    urease: "positivo"
  }
},

{
  id: "aspergillus",

  name: "Aspergillus fumigatus",

  type: "fungus",

  hint: "Importante fungo filamentoso associado à aspergilose pulmonar.",

  traits: {
    gram: "variável",
    morphology: "filamentoso",
    germTube: "negativo",
    lactophenol: "hifas septadas",
    urease: "negativo"
  }
},

{
  id: "trichophyton",

  name: "Trichophyton rubrum",

  type: "fungus",

  hint: "Dermatófito frequentemente associado a micoses cutâneas.",

  traits: {
    gram: "variável",
    morphology: "filamentoso",
    germTube: "negativo",
    lactophenol: "macroconídios",
    urease: "positivo"
  }
}


];

// ==========================================
// DEFINIÇÃO DOS TESTES
// ==========================================

const tests = {

  // =====================
  // BACTÉRIA
  // =====================

  morphologyBacteria: {

    label: "Morfologia",

    property: "morphology",

    category: "bacteria",

    strategicValue: 8,

    resultText: value =>
      `🧪 Morfologia observada: ${value}`
  },

  gram: {
    label: "Gram",
    property: "gram",

    category: "universal",

    strategicValue: 10,

    resultText: value =>
      `🧪 Gram: ${value}`
  },

  catalase: {
    label: "Catalase",
    property: "catalase",

    category: "bacteria",

    strategicValue: 7,

    resultText: value =>
      `🧪 Catalase: ${value}`
  },

  oxidase: {
    label: "Oxidase",
    property: "oxidase",

    category: "bacteria",

    strategicValue: 6,

    resultText: value =>
      `🧪 Oxidase: ${value}`
  },

  coagulase: {
    label: "Coagulase",
    property: "coagulase",

    category: "bacteria",

    strategicValue: 4,

    resultText: value =>
      `🧪 Coagulase: ${value}`
  },

  // =====================
  // FUNGOS
  // =====================

  fungalMorphology: {
    label: "Morfologia",
    property: "morphology",

    category: "fungus",

    strategicValue: 10,

    resultText: value =>
      `🧪 Morfologia: ${value}`
  },

  germTube: {
    label: "Tubo Germinativo",
    property: "germTube",

    category: "fungus",

    strategicValue: 8,

    resultText: value =>
      `🧪 Tubo germinativo: ${value}`
  },

  lactophenol: {
    label: "Azul de Lactofenol",
    property: "lactophenol",

    category: "fungus",

    strategicValue: 7,

    resultText: value =>
      `🧪 Lactofenol: ${value}`
  },

  urease: {
    label: "Urease",
    property: "urease",

    category: "fungus",

    strategicValue: 6,

    resultText: value =>
      `🧪 Urease: ${value}`
  }

};

function detectKnownType() {

  const remaining =
    getRemainingSuspects();

  const types =
    [...new Set(
      remaining.map(r => r.type)
    )];

  // SE RESTOU APENAS UM TIPO

  if (types.length === 1) {
    return types[0];
  }

  return null;
}

function punishWrongCategory(testKey) {

  const knownType =
    detectKnownType();

  // AINDA NÃO SABE O TIPO

  if (!knownType) return;

  const testCategory =
    tests[testKey].category;

  // TESTE UNIVERSAL NÃO PUNE

  if (testCategory === "universal") {
    return;
  }

  // ESCOLHEU ERRADO

  if (testCategory !== knownType) {

    coins--;

    score -= 20;

    showPopup(
      "⚠️ Erro Conceitual",
      `Você já possuía evidências suficientes de que o microrganismo era do tipo "${knownType}". Esse teste não era apropriado.`
    );

    updateUI();

    if (coins <= 0) {
      gameOver();
    }
  }
}

// ==========================================
// GAME STATE
// ==========================================

let currentCase = null;

let suspects = [];

let eliminated = [];

let usedTests = [];

let currentTest = null;

let score = 100;

let coins = 3;

// ==========================================
// INICIAR
// ==========================================

function startGame() {

  generateCase();

  document
    .getElementById("intro-screen")
    .classList.add("hidden");

  document
    .getElementById("game-screen")
    .classList.remove("hidden");

  updateUI();

  renderTests();
}

// ==========================================
// GERAR CASO ALEATÓRIO
// ==========================================

function generateCase() {

  // ESCOLHE O CORRETO

  currentCase =
    randomItem(microorganisms);

  // PEGA DISTRAÇÕES

  const wrongOptions =
    shuffleArray(
      microorganisms.filter(
        m => m.id !== currentCase.id
      )
    ).slice(0, 3);

  suspects = shuffleArray([
    currentCase,
    ...wrongOptions
  ]);

  eliminated = [];

  usedTests = [];

  console.log(
    "CASO ATUAL:",
    currentCase.name
  );
}

// ==========================================
// TESTES DISPONÍVEIS
// ==========================================
function getAvailableTests() {

  const available = [];

  const remaining =
    getRemainingSuspects();

  Object.keys(tests).forEach(testKey => {

    if (usedTests.includes(testKey)) return;

    const test =
      tests[testKey];

    const property =
      test.property;

    // =========================
    // ORGANISMOS COMPATÍVEIS
    // =========================

    const compatible =
      remaining.filter(s => {

        // TESTE UNIVERSAL

        if (test.category === "universal") {
          return true;
        }

        return s.type === test.category;
      });

    // NENHUM COMPATÍVEL

    if (compatible.length === 0) return;

    // =========================
    // TODOS PRECISAM TER A TRAIT
    // =========================

    const everybodyHasTrait =
      compatible.every(
        s => s.traits[property] !== undefined
      );

    if (!everybodyHasTrait) return;

    // =========================
    // VALORES
    // =========================

    const values =
      compatible.map(
        s => s.traits[property]
      );

    // REMOVE DUPLICADOS

    const unique =
      [...new Set(values)];

    // TESTE SÓ É ÚTIL
    // SE DIFERENCIAR

    if (unique.length > 1) {

      available.push(testKey);

    }

  });

  return available;
}

// ==========================================
// RENDER TESTES
// ==========================================

function renderTests() {

  const container =
    document.getElementById("test-buttons");

  container.innerHTML = "";

  // SE SOBROU 1
  // FINALIZA

  const remaining =
    getRemainingSuspects();

  if (remaining.length === 1) {

    renderFinalQuestion();

    return;
  }

  const availableTests =
    getAvailableTests();

  availableTests.forEach(testKey => {

    const btn =
      document.createElement("button");

    btn.innerText =
      tests[testKey].label;

    btn.onclick =
      () => chooseTest(testKey);

    container.appendChild(btn);

  });
}

// ==========================================
// ESCOLHER TESTE
// ==========================================

function evaluateTestStrategy(testKey) {

  // SOMENTE NO PRIMEIRO TESTE

  if (usedTests.length > 0) return;

  const value =
    tests[testKey].strategicValue;

  // TESTE RUIM

  if (value <= 3) {

    coins--;

    score -= 10;

    showPopup(
      "⚠️ Estratégia Laboratorial Ruim",
      "Esse não foi um bom teste inicial para triagem. Você perdeu 1 moeda por desperdício de recursos laboratoriais."
    );

    updateUI();

    if (coins <= 0) {
      gameOver();
    }

    return;
  }

  // TESTE MÉDIO

  if (value <= 6) {

    showPopup(
      "🧪 Estratégia Moderada",
      "Esse teste funciona, mas existem opções melhores para iniciar uma identificação bacteriana."
    );

    return;
  }

  // TESTE ÓTIMO

  showPopup(
    "✅ Boa Estratégia",
    "Excelente escolha para iniciar a investigação microbiológica."
  );
}


function chooseTest(testKey) {
    
    punishWrongCategory(testKey);
    evaluateTestStrategy(testKey);
    currentTest = testKey;

  usedTests.push(testKey);

  const property =
    tests[testKey].property;

  const result =
    currentCase.traits[property];

  document
    .getElementById("result-card")
    .classList.remove("hidden");

  document
    .getElementById("test-result")
    .innerText =
      tests[testKey]
        .resultText(result);

  renderEliminationOptions(
    property,
    result
  );
}

// ==========================================
// RENDER ELIMINAÇÃO
// ==========================================

function renderEliminationOptions(
  property,
  result
) {

  const container =
    document.getElementById(
      "elimination-options"
    );

  container.innerHTML = "";

  getRemainingSuspects()
    .forEach(suspect => {

      const div =
        document.createElement("div");

      div.className =
        "checkbox-item";

      div.innerHTML = `
        <label>
          <input
            type="checkbox"
            value="${suspect.id}"
          >
          ${suspect.name}
        </label>
      `;

      container.appendChild(div);

    });
}

// ==========================================
// CONFIRMAR ELIMINAÇÃO
// ==========================================

function confirmElimination() {

  const checked =
    document.querySelectorAll(
      '#elimination-options input:checked'
    );

  const selected =
    Array.from(checked)
      .map(c => c.value);

  const property =
    tests[currentTest].property;

  const correctValue =
    currentCase.traits[property];

  // QUEM DEVERIA SER ELIMINADO

  const correctEliminations =
    getRemainingSuspects()
      .filter(s =>
        s.traits[property] !== correctValue
      )
      .map(s => s.id);

  // =========================
  // VERIFICA ERROS
  // =========================

  const wrongSelections =
    selected.filter(
      id => !correctEliminations.includes(id)
    );

  // SE ELIMINOU ALGUÉM ERRADO

  if (wrongSelections.length > 0) {

    coins--;

    score -= 15;

    showPopup(
      "❌ Atenção!",
      "Você eliminou um microrganismo que ainda poderia ser o correto."
    );

    updateUI();

    if (coins <= 0) {
      gameOver();
    }

    return;
  }

  // =========================
  // ACERTOU TODOS
  // =========================

  const selectedAll =
    arraysEqual(
      selected.sort(),
      correctEliminations.sort()
    );

  if (selectedAll) {

    selected.forEach(id => {

      if (!eliminated.includes(id)) {
        eliminated.push(id);
      }

    });

    score += 10;

    showPopup(
      "✅ Correto!",
      "Excelente interpretação laboratorial."
    );

    updateUI();

    renderTests();

    return;
  }

  // =========================
  // ACERTO PARCIAL
  // =========================

  selected.forEach(id => {

    if (!eliminated.includes(id)) {
      eliminated.push(id);
    }

  });

  showPopup(
    "⚠️ Está no caminho certo!",
    "Você eliminou corretamente alguns microrganismos, mas ainda existem outros que também deveriam ser descartados."
  );

  updateUI();

  renderTests();
}

// ==========================================
// FINAL
// ==========================================

function renderFinalQuestion() {

  document
    .getElementById("final-screen")
    .classList.remove("hidden");

  const container =
    document.getElementById(
      "final-options"
    );

  container.innerHTML = "";

  getRemainingSuspects()
    .forEach(suspect => {

      const btn =
        document.createElement("button");

      btn.className =
        "final-button";

      btn.innerText =
        suspect.name;

      btn.onclick =
        () => finishGame(suspect);

      container.appendChild(btn);

    });
}

// ==========================================
// FINALIZAR
// ==========================================

function finishGame(answer) {

  const feedback =
    document.getElementById(
      "final-feedback"
    );

  if (answer.id === currentCase.id) {

    feedback.innerHTML = `
      <h2 class="correct">
        🎉 Correto!
      </h2>

      <p>
        Você identificou:
      </p>

      <h3>
        ${currentCase.name}
      </h3>

      <p>
        Testes utilizados:
        ${usedTests.length}
      </p>

      <p>
        Pontuação final:
        ${score}
      </p>
    `;

  } else {

    feedback.innerHTML = `
      <h2 class="wrong">
        ❌ Incorreto
      </h2>

      <p>
        O correto era:
      </p>

      <h3>
        ${currentCase.name}
      </h3>
    `;
  }
}

// ==========================================
// UI
// ==========================================

function updateUI() {

  const possibleList =
    document.getElementById(
      "possible-list"
    );

  const eliminatedList =
    document.getElementById(
      "eliminated-list"
    );

  possibleList.innerHTML = "";
  eliminatedList.innerHTML = "";

  getRemainingSuspects()
    .forEach(s => {

      const li =
        document.createElement("li");

      li.innerText = s.name;

      possibleList.appendChild(li);

    });

  eliminated.forEach(id => {

    const micro =
      microorganisms.find(
        m => m.id === id
      );

    const li =
      document.createElement("li");

    li.innerText = micro.name;

    eliminatedList.appendChild(li);

  });

  document
    .getElementById("coins")
    .innerText = coins;

  document
    .getElementById("score")
    .innerText = score;
}

// ==========================================
// POPUP
// ==========================================

function showPopup(title, message) {

  document
    .getElementById("popup-title")
    .innerText = title;

  document
    .getElementById("popup-message")
    .innerText = message;

  document
    .getElementById("popup-overlay")
    .classList.remove("hidden");
}

function closePopup() {

  document
    .getElementById("popup-overlay")
    .classList.add("hidden");
}

// ==========================================
// GAME OVER
// ==========================================

function gameOver() {

  showPopup(
    "💀 Você foi demitido",
    "As moedas acabaram."
  );

  setTimeout(() => {

    location.reload();

  }, 2500);
}

// ==========================================
// HELPERS
// ==========================================

function getRemainingSuspects() {

  return suspects.filter(
    s => !eliminated.includes(s.id)
  );
}

function randomItem(array) {

  return array[
    Math.floor(
      Math.random() * array.length
    )
  ];
}

function shuffleArray(array) {

  return [...array]
    .sort(() => Math.random() - 0.5);
}

function arraysEqual(a, b) {

  return JSON.stringify(a)
    === JSON.stringify(b);
}

function showHintPopup() {

  showPopup(
    "💡 Dica Clínica",
    currentCase.hint
  );
}