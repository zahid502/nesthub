export interface ColorTheme {
  primary: string;
  primaryDark: string;
  extremePrimaryWhite: string;
  primaryBackground: string;
  ligtPrimaryBackground: string;
  onPrimaryDark: string;
  onExtremePrimary: string;
  primaryDarkWhite: string;
  primaryLightGray: string;
  secondary: string;
  background: string;
  surface: string;
  redWhite: string;
  onRedWhite: string;
  secondaryWhite: string;
  surfaceBorder: string;
  error: string;
  onPrimary: string;
  onSurface: string;
  grayWhite: string;
  ligtGrayWhite: string;
  darkGrayWhite: string;
  surfaceDark: string;
  surfaceWhite: string;
  surfaceLight: string;
  blackWhite: string;
  chatSender: string;
  chatReciver: string;
  primaryBlack: string;
  onSurfaceLight: string;
  onSecondary: string;
  onBackground: string;
  onError: string;
  toolbarBackground: string;
  toolbarIcon: string;
  tabBackground: string;
  lightColor: string;
  highlightColor: string;
  backgroundColor: string;
}

export interface SpacingTheme {
  base: number;
  double: number;
  rootPadding: number;
}

export interface Dimensions {
  normalIconSize: number;
  mediumIconSize: number;
  largeIconSize: number;
  normalFontSize: number;
  xsmallFontSize: number;
  smallFontSize: number;
  headingFontSize: number;
  mediumHeadingFontSize: number;
}

export interface Theme {
  id: string;
  color: ColorTheme;
  spacing: SpacingTheme;
  dimensions: Dimensions;
}
