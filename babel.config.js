module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@images': './src/assets/images',
          '@audios': './src/assets/audios',
          '@hooks': './src/hooks',
          '@redux': './src/redux',
          '@app-configs': './src/configs',
          '@app-interfaces': './src/interfaces',
          '@app-types': './src/types',
          '@constants': './src/constants/index.ts',
          '@components': './src/components',
          '@dtos-models': ['./src/data/models/dtos'],
          '@domain-models': ['./src/data/models/domain'],
          '@responses': ['./src/data/models/responses'],
          '@mappers': ['./src/data/mappers'],
          '@routes': './src/routes',
          '@screens': './src/screens',
          '@services': './src/services/',
          '@theme': './src/theme',
          '@app-utils': './src/utils',
        },
        extensions: ['.js', '.ts', '.tsx', '.ios.js', '.android.js'],
      },
    ],
    'react-native-reanimated/plugin'
  ],
};
