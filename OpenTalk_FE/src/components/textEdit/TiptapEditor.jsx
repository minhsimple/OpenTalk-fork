import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import './TiptapEditor.css';
import { FaListUl, FaListOl } from "react-icons/fa";
import { MdFormatClear } from "react-icons/md";


const TiptapEditor = () => {
    const editor = useEditor({
        extensions: [StarterKit, Underline, Link],
        content: '<p>Hello World! 👋</p>',
    });

    const handleSubmit = () => {
        console.log('HTML Output:', editor?.getHTML());
    };

    return (
        <div className="editor-wrapper">
            <div className="toolbar">
                <button onClick={() => editor?.chain().focus().toggleBold().run()}>B</button>
                <button onClick={() => editor?.chain().focus().toggleItalic().run()}>I</button>
                <button onClick={() => editor?.chain().focus().toggleUnderline().run()}>U</button>
                <button onClick={() => editor?.chain().focus().toggleBulletList().run()}>
                    <FaListUl />
                </button>
                <button onClick={() => editor?.chain().focus().toggleOrderedList().run()}>
                    <FaListOl />
                </button>
                <button onClick={() => editor?.chain().focus().unsetAllMarks().run()}>
                    <MdFormatClear />
                </button>
            </div>


            <EditorContent editor={editor} className="editor-content" />

            <div className="actions">
                <button onClick={handleSubmit} className="submit-btn">Submit</button>
                <button className="cancel-btn">Cancel</button>
            </div>
        </div>
    );
};

export default TiptapEditor;
