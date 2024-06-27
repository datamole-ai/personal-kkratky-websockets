export const getRandomName = () => {
  const ANIMALS = [
    "turtle",
    "crocodile",
    "chameleon",
    "giraffe",
    "bear",
    "peacock",
    "rabbit",
    "elephant",
    "seahorse",
    "jellyfish",
  ];

  return "anonymous " + ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
};
