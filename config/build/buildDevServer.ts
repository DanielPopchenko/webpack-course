import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { IBuildOptions } from './types/build.types';

export default function buildDevServer(options: IBuildOptions): DevServerConfiguration {
  return {
    port: options.port ?? 3300,
    open: true,
    // ! To let react-router-dom work
    historyApiFallback: true,
    hot: true,
  };
}
