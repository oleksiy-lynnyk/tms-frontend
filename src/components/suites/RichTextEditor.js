import React from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import './editor.css';

const RichTextEditor = ({ value, onChange }) => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    if (!editor) return <div>Editor not ready</div>;

    return (
        <div className="rich-editor">
            <EditorContent editor={editor} />
        </div>
    );
};

export default RichTextEditor;
