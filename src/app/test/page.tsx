"use client";
import React, { useRef } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import SunEditorCore from "suneditor/src/lib/core";

const Page: React.FC = () => {
  const editorRef = useRef<SunEditorCore | null>(null);
  const [content, setContent] = React.useState("");
  const getSunEditorInstance = (editor: SunEditorCore) => {
    editorRef.current = editor;
  };

  return (
    <div>
      <SunEditor
        getSunEditorInstance={getSunEditorInstance}
        setDefaultStyle="height: 600px; font-size: 16px;"
        autoFocus
        defaultValue={content}
        onChange={setContent}
        setOptions={{
          buttonList: [
            [
              "undo",
              "redo",
              "removeFormat",
              "link",
              "image",
              "video",
              "bold",
              "underline",
              "italic",
              "strike",
              "fontColor",
              "hiliteColor",
              "outdent",
              "indent",
              "align",
              "table",
              "font",
              "fontSize",
              "formatBlock",
              "fullScreen",
              "codeView",
              "preview",
              "print",
              "save",
              "list",
            ],
          ],
        }}
      />
    </div>
  );
};

export default Page;
