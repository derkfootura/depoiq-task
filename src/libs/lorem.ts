export function generateLoremIpsum(sentenceCount: number = 3): string {
  const words = [
    "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
    "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
    "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud", "exercitation",
    "ullamco", "laboris", "nisi", "ut", "aliquip", "ex", "ea", "commodo", "consequat"
  ];

  const sentences = [];
  for (let i = 0; i < sentenceCount; i++) {
    const wordCount = Math.floor(Math.random() * 8) + 8; // 8 to 15 words per sentence
    const sentence = Array(wordCount).fill(0).map(() => words[Math.floor(Math.random() * words.length)]);
    sentence[0] = sentence[0].charAt(0).toUpperCase() + sentence[0].slice(1);
    sentences.push(sentence.join(' ') + '.');
  }

  return sentences.join(' ');
}
