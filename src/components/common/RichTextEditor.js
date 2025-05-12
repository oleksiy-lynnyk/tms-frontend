import React from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const RichTextEditor = ({ value, onChange }) => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: value,
        onUpdate: ({ editor }) => onChange(editor.getHTML()),
    });

    React.useEffect(() => {
        return () => {
            if (editor) {
                editor.destroy();
            }
        };
    }, [editor]);

    if (!editor) return <div>Editor loading...</div>;

    return (
        <div className="rich-editor">
            <EditorContent editor={editor} />
        </div>
    );
};

export default RichTextEditor;
