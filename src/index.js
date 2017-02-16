import syntax from 'babel-plugin-syntax-dynamic-import';
import * as t from 'babel-types';

function buildPromiseHandler() {
  return t.functionExpression(undefined, [], t.blockStatement([
    t.returnStatement(
      t.callExpression(
        t.identifier('require'),
        [t.identifier('modulePath')],
      ),
    ),
  ]));
}

function buildRequireAsync(scope, id) {
  const decl = t.functionExpression(
    t.identifier('requireAsync'),
    [t.identifier('modulePath')],
    t.blockStatement([
      t.returnStatement(
          t.callExpression(
            t.memberExpression(
              t.callExpression(t.memberExpression(t.identifier('Promise'), t.identifier('resolve')), []),
              t.identifier('then'),
            ),
            [
              buildPromiseHandler(),
            ],
          ),
        ),
    ]),
  );

  scope.push({
    id,
    init: decl,
  });
}

export default () => ({
  inherits: syntax,
  name: 'import-node',
  visitor: {
    CallExpression(path, state) {
      if (path.node.callee.type === 'Import') {
        if (!state.file.requireAsyncIdentityForImportDynamic) {
          /* eslint-disable no-param-reassign */
          state.file.requireAsyncIdentityForImportDynamic = state.file.scope.generateUidIdentifier('requireAsync');
          /* eslint-enable no-param-reassign */
          buildRequireAsync(state.file.scope, state.file.requireAsyncIdentityForImportDynamic);
        }

        path.replaceWith(
          t.callExpression(
            state.file.requireAsyncIdentityForImportDynamic,
            path.node.arguments,
          ),
        );
      }
    },
  },
});
