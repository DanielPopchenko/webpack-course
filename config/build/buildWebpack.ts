import webpack from 'webpack';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import buildDevServer from './buildDevServer';
import buildLoaders from './buildLoaders';
import buildPlugins from './buildPlugins';
import buildResolvers from './buildResolvers';
import { IBuildOptions } from './types/build.types';

export default function buildWebpack(options: IBuildOptions): webpack.Configuration {
  const { mode, paths } = options;
  const isDevMode = mode === 'development';

  return {
    // ! with the help of environment variables we can pass some dynamic configuration
    mode: mode ?? 'development',
    // ! route to the entry file of our App
    entry: paths.entry,
    output: {
      path: paths.output,
      // ! now we`ll have dynamic filename, it will be changed when we change somthing in the file
      // ? It is needed to prevent caching in the browser
      filename: '[name].[contenthash].js',
      // ! when we call npm run build, every time the file will be removed, and then added again
      clean: true,
    },
    plugins: buildPlugins(options),

    // ! module
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(options),
    devServer: isDevMode ? buildDevServer(options) : undefined,
    devtool: isDevMode ? 'eval-cheap-module-source-map' : 'source-map',
  };
}
