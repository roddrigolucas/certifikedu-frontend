import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { BoldIcon } from 'lucide-react'; // Ícone para o botão

interface TextEditorProps {
  value: string;
  onChange: (html: string) => void;
}

export const TiptapTextEditor = ({ value, onChange }: TextEditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'min-h-[15rem] border border-input rounded-md px-3 py-2 text-sm focus:outline-none',
      },
    },
  });

  if (!editor) {
    return null;
  }

  const toggleBold = () => editor.chain().focus().toggleBold().run();

  return (
    <div className="rounded-md border border-input">
      <div className="flex rounded-t-md border-b bg-gray-50 p-1">
        <button
          type="button"
          onClick={toggleBold}
          className={`rounded p-2 ${editor.isActive('bold') ? 'bg-blue-200' : 'hover:bg-gray-200'}`}
        >
          <BoldIcon className="size-4" />
        </button>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
};
