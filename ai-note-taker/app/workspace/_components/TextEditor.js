import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Highlight from '@tiptap/extension-highlight';
import EditorExtension from './EditorExtension';

function TextEditor() {

    const FontSize = TextStyle.extend({
        addAttributes() {
            return {
                fontSize: {
                    default: '16px',
                    parseHTML: (element) => element.style.fontSize || '16px',
                    renderHTML: (attributes) => ({
                        style: `font-size: ${attributes.fontSize}`,
                    }),
                },
            };
        },
    });

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            FontSize,
            Highlight.configure({ multicolor: true }),
            Placeholder.configure({
                placeholder: 'Start taking your Notes here...'
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph']
            })
        ],
        editorProps: {
            attributes: {
                class: 'focus:outline-none h-screen p-5'
            }
        }
    });

    return (
        <div>
            <EditorExtension editor={editor} />
            <div>
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}

export default TextEditor;
