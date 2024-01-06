window.onload = function () {
  document.getElementById("inputText").addEventListener("input", processText);
};

function processText() {
  var inputText = document.getElementById("inputText").value;
  var outputText = inputText;

  if (document.getElementById("specialCharacters").checked) {
    outputText = handleSpecialCharacters(outputText);
  }
  if (document.getElementById("wordmap").checked) {
    outputText = applyWordMap(outputText);
  }
  if (document.getElementById("removeVowels").checked) {
    if (document.getElementById("removeVowelsCapitals").checked) {
      outputText = outputText.replace(/[aeiou]/gi, "");
    } else {
      outputText = outputText.replace(/[aeiou]/g, "");
    }
  }
  if (document.getElementById("removeSpaces").checked) {
    outputText = outputText.replace(/\u0020/g, "");
  }
  if (document.getElementById("removeLineBreaks").checked) {
    outputText = outputText.replace(/\r?\n|\r/g, "");
  }
  if (document.getElementById("fillerWords").checked) {
    outputText = removeFillerWords(outputText);
  }

  document.getElementById("outputText").value = outputText;
  document.getElementById("charCount").textContent = `Original: ${
    inputText.length
  } characters, Cleaned: ${
    inputText.length - outputText.length
  } characters, Outputbox: ${outputText.length} characters`;
}

function handleSpecialCharacters(text) {
  var specialCharacters = [
    "-",
    "—",
    "&",
    "_",
    ",",
    ".",
    "!",
    "?",
    ":",
    ";",
    "(",
    ")",
    "[",
    "]",
    "{",
    "}",
    '"',
    "'"
  ];
  specialCharacters.forEach((char) => {
    let regex = new RegExp(`[${char}]+`, "g");
    text = text.replace(regex, char);
  });
  return text;
}

function applyWordMap(text) {
  var wordMap = {
    about: "abt",
    after: "aftr",
    algorithm: "algo",
    all: "al",
    before: "b4",
    between: "btwn",
    communication: "comm",
    development: "dev",
    example: "ex",
    information: "info",
    international: "intl",
    organization: "org",
    people: "ppl",
    problem: "prblm",
    professional: "prof",
    system: "sys",
    technology: "tech",
    understand: "undrstd",
    without: "w/o",
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
    zero: "0"
  };
  return text
    .split(/\r?\n|\r/)
    .map((paragraph) =>
      paragraph
        .split(/\s+/)
        .map((word) => wordMap[word.toLowerCase()] || word)
        .join(" ")
    )
    .join("\n");
}

function removeFillerWords(text) {
  var fillerWords = [
    "basically",
    "actually",
    "honestly",
    "literally",
    "essentially",
    "frankly",
    "definitely",
    "probably",
    "maybe",
    "like",
    "just",
    "really",
    "very",
    "so",
    "quite",
    "somewhat",
    "rather",
    "almost",
    "approximately",
    "around",
    "nearly",
    "practically",
    "virtually",
    "sort of",
    "kind of",
    "more or less",
    "almost",
    "mostly",
    "often",
    "frequently",
    "generally",
    "usually",
    "typically",
    "regularly",
    "commonly",
    "ordinarily",
    "always",
    "never",
    "seldom",
    "rarely",
    "occasionally",
    "sometimes",
    "often",
    "always",
    "constantly",
    "continuously",
    "perpetually",
    "unceasingly"
  ];
  return text
    .split(/\r?\n|\r/)
    .map((paragraph) =>
      paragraph
        .split(/\s+/)
        .filter((word) => !fillerWords.includes(word.toLowerCase()))
        .join(" ")
    )
    .join("\n");
}
