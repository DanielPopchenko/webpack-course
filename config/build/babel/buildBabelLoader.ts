import { IBuildOptions } from '../types/build.types';
import { Configuration } from 'webpack';
import { removeDataTestIdBabelPlugin } from './removeDataTestIdBabelPlugin';

export const buildBabelLoader = ({ mode }: IBuildOptions) => {
  const isDevMode = mode === 'development';
  const isProdMode = mode === 'production';

  const plugins = [];

  if (isProdMode) {
    plugins.push([
      removeDataTestIdBabelPlugin,
      {
        props: ['data-testid'],
      },
    ]);
  }

  return {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          // ! BABEL PRESETS
          '@babel/preset-env',
          '@babel/preset-typescript',
          [
            '@babel/preset-react',
            {
              // ! this configuration prevents us from React is not found error.
              runtime: isDevMode ? 'automatic' : 'classic',
            },
          ],
        ],
        plugins: plugins.length ? plugins : undefined,
      },
    },
  };
};
