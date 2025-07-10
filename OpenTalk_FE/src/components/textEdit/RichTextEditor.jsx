import React, { useState, useRef } from "react";
import "./RichTextEditor.css";
import {MdFormatClear} from "react-icons/md";
import { FaBold, FaItalic, FaUnderline, FaListUl, FaListOl, FaAlignLeft, FaAlignCenter, FaAlignRight, FaAlignJustify, FaLink, FaImage, FaEraser } from "react-icons/fa";

const CustomTextEditor = () => {
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState("regular");
    const editorRef = useRef(null);

    const handleCommand = (command) => {
        document.execCommand(command, false, null);
    };

    const handleSubmit = () => {
        const content = editorRef.current.innerHTML;
        console.log("Title:", title);
        console.log("Priority:", priority);
        console.log("Content HTML:", content);
    };

    return (
        <div className="editor-container">
            <input
                className="editor-title"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <div className="editor-priority">
                <label>
                    <input
                        type="radio"
                        value="regular"
                        checked={priority === "regular"}
                        onChange={() => setPriority("regular")}
                    />
                    Regular
                </label>
                <label style={{ marginLeft: "20px" }}>
                    <input
                        type="radio"
                        value="urgent"
                        checked={priority === "urgent"}
                        onChange={() => setPriority("urgent")}
                    />
                    Urgent
                </label>
            </div>

            <div className="editor-toolbar">
                {/* Heading */}
                <select
                    className="heading-select"
                    onChange={(e) => handleCommand("formatBlock", e.target.value)}
                >
                    <option value="p">Paragraph</option>
                    <option value="h1">Heading 1</option>
                    <option value="h2">Heading 2</option>
                    <option value="h3">Heading 3</option>
                    <option value="pre">Code Block</option>
                </select>

                {/* Format */}
                <button onClick={() => handleCommand("bold")} title="Bold"><FaBold /></button>
                <button onClick={() => handleCommand("italic")} title="Italic"><FaItalic /></button>
                <button onClick={() => handleCommand("underline")} title="Underline"><FaUnderline /></button>

                {/* List */}
                <button onClick={() => handleCommand("insertUnorderedList")} title="Bullet List"><FaListUl /></button>
                <button onClick={() => handleCommand("insertOrderedList")} title="Numbered List"><FaListOl /></button>

                {/* Alignment */}
                <button onClick={() => handleCommand("justifyLeft")} title="Align Left"><FaAlignLeft /></button>
                <button onClick={() => handleCommand("justifyCenter")} title="Align Center"><FaAlignCenter /></button>
                <button onClick={() => handleCommand("justifyRight")} title="Align Right"><FaAlignRight /></button>
                <button onClick={() => handleCommand("justifyFull")} title="Justify"><FaAlignJustify /></button>

                {/* Insert */}
                <button
                    onClick={() => {
                        const url = prompt("Enter URL:");
                        if (url) handleCommand("createLink", url);
                    }}
                    title="Insert Link"
                >
                    <FaLink />
                </button>

                <button
                    onClick={() => {
                        const url = prompt("Enter image URL:");
                        if (url) handleCommand("insertImage", url);
                    }}
                    title="Insert Image"
                >
                    <FaImage />
                </button>

                {/* Clear Format */}
                <button onClick={() => handleCommand("removeFormat")} title="Clear Format"><FaEraser /></button>
            </div>

            <div
                ref={editorRef}
                className="editor-content"
                contentEditable
                suppressContentEditableWarning
                placeholder="Type text here..."
            ></div>

            <div className="editor-actions">
                <button className="submit-btn" onClick={handleSubmit}>Submit</button>
                <button className="cancel-btn">Cancel</button>
            </div>
        </div>
    );
};

export default CustomTextEditor;
