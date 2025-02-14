import { useAction } from 'convex/react';
import { Bold, Italic, Code, Underline, ArrowUp, ArrowDown, AlignLeft, AlignCenter, AlignRight, AlignJustify, List, ListOrdered, Highlighter, Sparkles } from 'lucide-react';
import React from 'react';
import { api } from '../../../convex/_generated/api';
import { useParams } from 'next/navigation';
import { chatSession } from '../../../configs/AIModel';


function EditorExtension({ editor }) {

  const {fileId} = useParams();
  const increaseFontSize = () => {
    const currentSize = parseInt(editor.getAttributes('textStyle').fontSize || '16', 10);
    editor.chain().focus().setMark('textStyle', { fontSize: `${currentSize + 2}px` }).run();
  };

  const decreaseFontSize = () => {
    const currentSize = parseInt(editor.getAttributes('textStyle').fontSize || '16', 10);
    if (currentSize > 10) { // Prevent too small text
      editor.chain().focus().setMark('textStyle', { fontSize: `${currentSize - 2}px` }).run();
    }
  };

  const SearchAI=useAction(api.myAction.search)

  const onAiClick=async()=>{
    const selectedText=editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to,
      ' '
    );
    console.log('selected Text:',selectedText);

    const result = await SearchAI({
      query:selectedText,
      fileId:fileId
    })
    
    const UnformattedAns = JSON.parse(result);
    let AllUnformattedAns='';

    UnformattedAns&&UnformattedAns.forEach(item=>{
      AllUnformattedAns=AllUnformattedAns + item.pageContent
    });
 
    console.log(AllUnformattedAns);
    const PROMPT ="For question :"+selectedText+" and with the given content as answer,"+"please give an appropriate adequately detailed answer by consolidating all the ideas a in HTML format. The answer content is:" + AllUnformattedAns;

    const AiModelResult=await chatSession.sendMessage(PROMPT);
    console.log(AiModelResult.response.text());
  }

  return editor&&(
    <div className='p-5'>
      <div className="control-group">
        <div className="button-group flex gap-3 relative">
          <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'text-blue-500' : ''}>
            <Bold />
          </button>
          <button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'text-blue-500' : ''}>
            <Italic />
          </button>
          <button onClick={() => editor.chain().focus().toggleCode().run()} className={`px-2 py-1 rounded ${editor.isActive('code') ? 'text-blue-500' : ''}`}>
            <Code />
          </button>
          <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={editor.isActive('underline') ? 'text-blue-500' : ''}>
            <Underline />
          </button>

          {/* ✅ Font Size Increase & Decrease */}
          <button onClick={increaseFontSize}>
            <ArrowUp />
          </button>
          <button onClick={decreaseFontSize}>
            <ArrowDown />
          </button>

          {/* ✅ Highlighter */}
          <button
            onClick={() => {
              if (editor.isActive('highlight')) {
                editor.chain().focus().unsetMark('highlight').run();
              } else {
                editor.chain().focus().setMark('highlight', { color: '#ffff00' }).run();
              }
            }}
            className={editor.isActive('highlight') ? 'text-blue-500' : ''}
          >
            <Highlighter />
          </button>

          {/* ✅ Ordered & Unordered Lists */}
          <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'text-blue-500' : ''}>
            <List />
          </button>
          <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? 'text-blue-500' : ''}>
            <ListOrdered />
          </button>

          {/* ✅ Text Alignment Options */}
          <button
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={`px-2 py-1 rounded ${editor.isActive({ textAlign: 'left' }) ? 'text-blue-500' : ''}`}
          >
            <AlignLeft />
          </button>

          <button
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={`px-2 py-1 rounded ${editor.isActive({ textAlign: 'center' }) ? 'text-blue-500' : ''}`}
          >
            <AlignCenter />
          </button>

          <button
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={`px-2 py-1 rounded ${editor.isActive({ textAlign: 'right' }) ? 'text-blue-500' : ''}`}
          >
            <AlignRight />
          </button>

          <button
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            className={`px-2 py-1 rounded ${editor.isActive({ textAlign: 'justify' }) ? 'text-blue-500' : ''}`}
          >
            <AlignJustify />
          </button>
          <button onClick={() => onAiClick()} 
            className={'hover:text-blue-500'}>
            <Sparkles />
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditorExtension;
