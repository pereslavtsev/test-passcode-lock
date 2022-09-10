export type PasscodeButtonData =
  | {
      mainSymbol: string;
      additionalSymbols: Array<string>;
    }
  | { empty: boolean };

export const passcodeButtonsData: Array<PasscodeButtonData> = [
  { mainSymbol: '1', additionalSymbols: [] },
  { mainSymbol: '2', additionalSymbols: ['A', 'B', 'C'] },
  { mainSymbol: '3', additionalSymbols: ['D', 'E', 'F'] },
  { mainSymbol: '4', additionalSymbols: ['G', 'H', 'I'] },
  { mainSymbol: '5', additionalSymbols: ['J', 'K', 'L'] },
  { mainSymbol: '6', additionalSymbols: ['M', 'N', 'O'] },
  { mainSymbol: '7', additionalSymbols: ['P', 'Q', 'R', 'S'] },
  { mainSymbol: '8', additionalSymbols: ['T', 'U', 'V'] },
  { mainSymbol: '9', additionalSymbols: ['W', 'X', 'Y', 'Z'] },
  { empty: true },
  { mainSymbol: '0', additionalSymbols: [] },
  { empty: true },
];
