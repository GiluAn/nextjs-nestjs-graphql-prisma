export const colors = {
  white: '#FFFFFF',
  blue700: '#1a56db',
  blue800: '#1E429F',
  blue300: '#A4CAFE',
};

export type ButtonColorType = 'primary' | 'red';

export const buttonColors: {
  [color in ButtonColorType]: {
    background: string;
    color: string;
    hover: string;
    focus: string;
  };
} = {
  primary: {
    background: colors.blue700,
    color: colors.white,
    hover: colors.blue800,
    focus: colors.blue300,
  },
  red: {
    background: colors.blue700,
    color: colors.white,
    hover: colors.blue800,
    focus: colors.blue300,
  },
};
