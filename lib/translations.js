import translations from "../translations.json";

export default function Translations(word, language) {
  const translated = translations[word][language];

  return translated;
}
