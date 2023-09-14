import {colors} from '../constants';
import {ColorTheme, Dimensions, SpacingTheme, Theme} from '../interfaces';

const DEFAULT_DARK_COLOR_THEME: ColorTheme = {
  primary: colors.dark.primary,
  primaryDark: colors.dark.primaryDark,
  extremePrimaryWhite: colors.dark.extremePrimaryWhite,
  primaryBackground: colors.dark.primaryBackground,
  ligtPrimaryBackground: colors.dark.ligtPrimaryBackground,
  primaryDarkWhite: colors.dark.primaryDarkWhite,
  primaryLightGray: colors.dark.primaryLightGray,
  secondary: colors.dark.secondary,
  background: colors.dark.background,
  redWhite: colors.dark.redWhite,
  secondaryWhite: colors.dark.secondaryWhite,
  surfaceBorder: colors.dark.surfaceBorder,
  surface: colors.dark.surface,
  surfaceDark: colors.dark.surfaceDark,
  surfaceWhite: colors.dark.surfaceWhite,
  surfaceLight: colors.dark.surfaceLight,
  grayWhite: colors.dark.grayWhite,
  darkGrayWhite: colors.dark.darkGrayWhite,
  ligtGrayWhite: colors.dark.ligtGrayWhite,
  blackWhite: colors.dark.blackWhite,
  chatSender: colors.dark.chatSender,
  chatReciver: colors.dark.chatReciver,
  primaryBlack: colors.dark.primaryBlack,
  error: colors.dark.error,
  onPrimary: colors.dark.onPrimary,
  onSecondary: colors.dark.onSecondary,
  onSurface: colors.dark.onSurface,
  onSurfaceLight: '#999999',
  onBackground: colors.dark.onBackground,
  onError: colors.dark.onError,
  onRedWhite: colors.dark.onRedWhite,
  onPrimaryDark: colors.dark.onPrimaryDark,
  onExtremePrimary: colors.dark.onExtremePrimary,
  //--------------------------------
  toolbarIcon: colors.dark.onPrimary,
  toolbarBackground: '#222222',
  tabBackground: colors.dark.background,
  lightColor: colors.dark.lightColor,
  highlightColor: colors.dark.highlightColor,
  backgroundColor: colors.dark.backgroundColor,
};

const DEFAULT_DARK_SPACING_THEME: SpacingTheme = {
  base: 8,
  double: 16,
  rootPadding: 12,
};

const DEFAULT_DARK_DIMENSTIONS: Dimensions = {
  largeIconSize: 48,
  mediumIconSize: 36,
  normalIconSize: 24,
  xsmallFontSize: 12,
  smallFontSize: 14,
  normalFontSize: 16,
  headingFontSize: 24,
  mediumHeadingFontSize: 20,
};

export const DEFAULT_DARK_THEME_ID = 'default-dark';
export const DEFAULT_DARK_THEME: Theme = {
  id: DEFAULT_DARK_THEME_ID,
  color: DEFAULT_DARK_COLOR_THEME,
  spacing: DEFAULT_DARK_SPACING_THEME,
  dimensions: DEFAULT_DARK_DIMENSTIONS,
};
