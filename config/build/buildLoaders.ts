import { ModuleOptions } from 'webpack';
import { IBuildOptions } from './types/build.types';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshTypeScript from 'react-refresh-typescript';
import { buildBabelLoader } from './babel/buildBabelLoader';

export default function buildLoaders(options: IBuildOptions): ModuleOptions['rules'] {
  const isDevMode = options.mode === 'development';

  const cssLoaderWithModules = {
    loader: 'css-loader',
    options: {
      modules: {
        localIdentName: isDevMode ? '[path][name]__[local]' : '[hash:base64:8]',
      },
    },
  };

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      // Creates `style` nodes from JS strings
      isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
      // Translates CSS into CommonJS
      cssLoaderWithModules,
      // Compiles Sass to CSS
      'sass-loader',
    ],
  };

  // ! allows to load svgs
  const svgrLoader = {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          icon: true,
          svgoConfig: {
            plugins: [
              {
                name: 'convertColors',
                params: {
                  currentColor: true,
                },
              },
            ],
          },
        },
      },
    ],
  };

  // ! this allows us to process images
  const assetsLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
  };

  const tsLoader = {
    // ? --- ts-loader can work with jsx out of the box
    // !? --- if we used js we would have configure babel-loader
    // ! regular expression what file type we will use
    test: /\.tsx?$/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          getCustomTransformers: () => ({
            // ! in the development mode ---> HMR
            before: [isDevMode && ReactRefreshTypeScript()].filter(Boolean),
          }),
          transpileOnly: true,
        },
      },
    ],
    // ! we do not process node_modules folder
    exclude: /node_modules/,
  };

  // ! --- Also we can confidure babel with the help of babel.config.json file ---
  // TODO: now we moved the code in the other function, to easily configure babel
  const babelLoader = buildBabelLoader(options);

  return [
    // ! The order matters
    assetsLoader,
    svgrLoader,
    scssLoader,
    // tsLoader,
    babelLoader,
  ];
}
