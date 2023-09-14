import {colors} from '../constants';
import {ColorTheme, Dimensions, SpacingTheme, Theme} from '../interfaces';

const DEFAULT_LIGHT_COLOR_THEME: ColorTheme = {
  primary: colors.light.primary,
  primaryDark: colors.light.primaryDark,
  extremePrimaryWhite: colors.light.extremePrimaryWhite,
  primaryBackground: colors.light.primaryBackground,
  ligtPrimaryBackground: colors.light.ligtPrimaryBackground,
  primaryDarkWhite: colors.light.primaryDarkWhite,
  primaryLightGray: colors.light.primaryLightGray,
  secondary: colors.light.secondary,
  background: colors.light.background,
  redWhite: colors.light.redWhite,
  secondaryWhite: colors.light.secondaryWhite,
  surfaceBorder: colors.light.surfaceBorder,
  surface: colors.light.surface,
  surfaceDark: colors.light.surfaceDark,
  surfaceWhite: colors.light.surfaceWhite,
  surfaceLight: colors.light.surfaceLight,
  grayWhite: colors.light.grayWhite,
  darkGrayWhite: colors.light.darkGrayWhite,
  ligtGrayWhite: colors.light.ligtGrayWhite,
  blackWhite: colors.light.blackWhite,
  chatSender: colors.light.chatSender,
  chatReciver: colors.light.chatReciver,
  primaryBlack: colors.light.primaryBlack,
  error: colors.light.error,
  onPrimary: colors.light.onPrimary,
  onSecondary: colors.light.onSecondary,
  onSurface: colors.light.onSurface,
  onSurfaceLight: '#999999',
  onBackground: colors.light.onBackground,
  onError: colors.light.onError,
  onRedWhite: colors.light.onRedWhite,
  onPrimaryDark: colors.light.onPrimaryDark,
  onExtremePrimary: colors.light.onExtremePrimary,
  //-------------------------
  tabBackground: colors.white,
  toolbarIcon: colors.white,
  toolbarBackground: colors.light.primary,
  lightColor: colors.light.lightColor,
  highlightColor: colors.light.highlightColor,
  backgroundColor: colors.light.backgroundColor,
};

const DEFAULT_LIGHT_SPACING_THEME: SpacingTheme = {
  base: 8,
  double: 16,
  rootPadding: 12,
};

const DEFAULT_LIGHT_DIMENSTIONS: Dimensions = {
  largeIconSize: 48,
  mediumIconSize: 36,
  normalIconSize: 24,
  xsmallFontSize: 12,
  smallFontSize: 14,
  normalFontSize: 16,
  headingFontSize: 24,
  mediumHeadingFontSize: 20,
};

export const DEFAULT_LIGHT_THEME_ID = 'default-light';
export const DEFAULT_LIGHT_THEME: Theme = {
  id: DEFAULT_LIGHT_THEME_ID,
  color: DEFAULT_LIGHT_COLOR_THEME,
  spacing: DEFAULT_LIGHT_SPACING_THEME,
  dimensions: DEFAULT_LIGHT_DIMENSTIONS,
};
