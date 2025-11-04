export default {
  app: {
    name: "ChemVision",
    tagline: "AI-driven Molecular Intelligence Platform",
  },
  modeSelection: {
    title: "Welcome to ChemVision",
    description:
      "Explore the world of chemical intelligence — visualize molecules in 3D or predict reaction outcomes using deep learning models. Choose your desired mode below to begin your experiment.",
    visualizeButton: "Visualize Molecule",
    predictButton: "Predict Reaction",
    footer: "© 2025 ChemVision – AI-driven Molecular Intelligence Platform",
  },
  visualize: {
    title: "Molecule Visualizer",
    subtitle:
      "Enter a SMILES string to view its molecular structure in 3D below.",
    label: "SMILES",
    button: "Visualize",
    loading: "Rendering molecule...",
    error: "Unable to visualize the molecule. Please check your SMILES input.",
  },
  predict: {
    title: "Reaction Predictor",
    subtitle:
      "Enter the reactant SMILES below to predict the reaction outcome.",
    reactantLabel: "Reactant",
    resultLabel: "Product",
    button: "Predict",
    loading: "Predicting reaction...",
    error:
      "Unable to predict. Please verify your input or try again later.",
  },
  navbar: {
    function: "Function",
    visualize: "Visualizer",
    predict: "Predictor",
    language: "Language",
    theme: "Theme",
    light: "Light Mode",
    dark: "Dark Mode",
    home: "Home",
  },
};
