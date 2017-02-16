import syntax from 'babel-plugin-syntax-dynamic-import';
import * as t from 'babel-types';

export default () => ({
  inherits: syntax,
  name: 'import-node',
  visitor: {
    CallExpression(path) {
      if (path.node.callee.type === 'Import') {
        path.replaceWith(
          t.callExpression(
            t.memberExpression(t.identifier('Promise'), t.identifier('resolve')),
            [t.callExpression(t.identifier('require'), path.node.arguments)],
          ),
        );
      }
    },
  },
});
