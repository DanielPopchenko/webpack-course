// TODO: here we are building a babel plugin to remove data-testid from our html --->
// ! ---> while working with produnction version, in the development mode we will need them

import { PluginItem } from '@babel/core';

export const removeDataTestIdBabelPlugin = (): PluginItem => {
  return {
    visitor: {
      Program(path, state) {
        const forbiddenProps = state.opts.props || [];
        path.traverse({
          JSXIdentifier(current) {
            const nodeName = current.node.name;
            if (forbiddenProps.includes(nodeName)) {
              current.parentPath.remove();
            }
          },
        });
      },
    },
  };
};
