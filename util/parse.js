import SimpleMarkdown from 'simple-markdown';
import hljs from 'highlight.js';

const rules = Object.assign(
    SimpleMarkdown.defaultRules,
    {
        code: {
            order: 0,
            match: function(source) {
                return /^`{3}([\S]+)?\n([\s\S]+)\n`{3}/.exec(source);
            },
            parse: function(capture, parse, state) {
                return {
                    content: capture[2],
                    language: capture[1]
                };
            },
            react: function(node, output) {
                return (
                    <pre>
                        <code className={`hljs language-${ node.language || 'js' }`} dangerouslySetInnerHTML={{ __html: node.language ? hljs.highlight(node.content, { language: node.language }).value : hljs.highlightAuto(node.content).value }}></code>
                    </pre>
                );
            }
        }
    }
);
const rawBuiltParser = SimpleMarkdown.parserFor(rules);

export function parse (text) {
    // return SimpleMarkdown.defaultBlockParse(text);
    return rawBuiltParser(text + '\n\n', { inline: false });
}

export function format (text) {
    return SimpleMarkdown.defaultReactOutput(parse(text));
}