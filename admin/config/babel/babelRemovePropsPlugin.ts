import { PluginItem } from '@babel/core';

export default function babelRemovePropsPlugin(): PluginItem {
    return {
        visitor: {
            Program(path, state) {
                const forbidden = state.opts.props || [];
                path.traverse({
                    JSXIdentifier(currentNode) {
                        const nodeName = currentNode.node.name;
                        if (forbidden.includes(nodeName)) {
                            currentNode.parentPath.remove();
                        }
                    },
                });
            },
        },
    };
}
