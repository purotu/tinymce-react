import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import './App.css';
import showdown from 'showdown';

export default function App() {
  const editorRef = useRef(null);

  const toMarkdown = (content) => {
    const converter = new showdown.Converter();
    return converter.makeMarkdown(content);
  };

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const logMd = () => {
    if (editorRef.current) {
      console.log(toMarkdown(editorRef.current.getContent({ format: 'markdown' })));
    }
  }

  return (
    <>
      <Editor
        tinymceScriptSrc='/tinymce/tinymce.min.js'
        licenseKey='gpl'
        onInit={(_evt, editor) => editorRef.current = editor}
        initialValue='<p>This is the initial content of the editor.</p>'
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
      <button onClick={log}>Log editor content</button>
      <button onClick={logMd}>Log markdown</button>
    </>
  );
}