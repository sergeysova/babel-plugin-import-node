import syntax from 'babel-plugin-syntax-dynamic-import';
import * as t from 'babel-types';

export default () => ({
  inherits: syntax,
  visitor: {
    CallExpression(path) {
      if (path.node.callee.type === 'Import') {
        path.replaceWith(
          t.callExpression(
            t.memberExpression(t.identifier('System'), t.identifier('import')),
            path.node.arguments,
          ),
        );
      }
    },
  },
});
