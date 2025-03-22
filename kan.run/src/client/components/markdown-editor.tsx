'use client'

import { useState, useEffect, type KeyboardEvent, useRef } from 'react'
import ReactMarkdown from 'react-markdown'

interface MarkdownEditorProps {
  content: string
  onChange: (content: string) => void
  height?: number
  placeholder?: string
}

export default function MarkdownEditor({
  content,
  onChange,
  height = 400,
  placeholder = 'Markdownを入力してください...',
}: MarkdownEditorProps) {
  const [visibleHeight, setVisibleHeight] = useState<number>(height)
  const [viewMode, setViewMode] = useState<'edit' | 'preview' | 'split'>('split')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // リサイズハンドラーはマウント時に一度だけセットアップ
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const updateHeight = () => {
        setVisibleHeight(window.innerHeight - 160)
      }
      
      updateHeight()
      window.addEventListener('resize', updateHeight)
      return () => window.removeEventListener('resize', updateHeight)
    }
  }, [])

  // テキスト編集用の関数
  const insertText = (before: string, after: string = '') => {
    const textarea = textareaRef.current
    if (!textarea) return
    
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.substring(start, end)
    
    const newText = content.substring(0, start) + 
                   before + selectedText + after + 
                   content.substring(end)
    
    onChange(newText)
    
    // カーソル位置を調整
    setTimeout(() => {
      textarea.focus()
      // 選択テキストがない場合はカーソルを brackets/markup の間に設定
      if (start === end) {
        textarea.selectionStart = textarea.selectionEnd = start + before.length
      } else {
        // 選択テキストがある場合は、全体を選択状態にする
        textarea.selectionStart = start
        textarea.selectionEnd = end + before.length + after.length
      }
    }, 0)
  }
  
  const addIndent = () => {
    const textarea = textareaRef.current
    if (!textarea) return
    
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    
    // 選択範囲を含む行を全て取得
    const lines = content.split('\n')
    let startLineIdx = 0
    let endLineIdx = 0
    let currentPos = 0
    
    for (let i = 0; i < lines.length; i++) {
      const lineLength = lines[i].length + 1 // +1 for newline
      
      if (currentPos <= start && start < currentPos + lineLength) {
        startLineIdx = i
      }
      
      if (currentPos <= end && end <= currentPos + lineLength) {
        endLineIdx = i
        break
      }
      
      currentPos += lineLength
    }
    
    // インデント追加
    let newLines = [...lines]
    for (let i = startLineIdx; i <= endLineIdx; i++) {
      newLines[i] = '  ' + newLines[i]
    }
    
    // 文字位置を計算
    let startOffset = 0
    for (let i = 0; i < startLineIdx; i++) {
      startOffset += 2
    }
    
    let endOffset = 0
    for (let i = 0; i < endLineIdx; i++) {
      endOffset += 2
    }
    
    const newText = newLines.join('\n')
    onChange(newText)
    
    // カーソル位置を調整
    setTimeout(() => {
      textarea.focus()
      textarea.selectionStart = start + 2
      textarea.selectionEnd = end + endOffset + (startLineIdx === endLineIdx ? 2 : 0)
    }, 0)
  }
  
  const removeIndent = () => {
    const textarea = textareaRef.current
    if (!textarea) return
    
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    
    // 選択範囲を含む行を全て取得
    const lines = content.split('\n')
    let startLineIdx = 0
    let endLineIdx = 0
    let currentPos = 0
    
    for (let i = 0; i < lines.length; i++) {
      const lineLength = lines[i].length + 1 // +1 for newline
      
      if (currentPos <= start && start < currentPos + lineLength) {
        startLineIdx = i
      }
      
      if (currentPos <= end && end <= currentPos + lineLength) {
        endLineIdx = i
        break
      }
      
      currentPos += lineLength
    }
    
    // インデント削除
    let newLines = [...lines]
    let startOffset = 0
    let endOffset = 0
    
    for (let i = startLineIdx; i <= endLineIdx; i++) {
      const line = newLines[i]
      const indentMatch = line.match(/^( {2}|\t)/)
      
      if (indentMatch) {
        const indentLength = indentMatch[0].length
        newLines[i] = line.substring(indentLength)
        
        if (i === startLineIdx) {
          startOffset = Math.min(indentLength, start - currentPos)
        }
        
        if (i === endLineIdx) {
          endOffset += indentLength
        }
      }
      
      currentPos += line.length + 1
    }
    
    const newText = newLines.join('\n')
    onChange(newText)
    
    // カーソル位置を調整
    setTimeout(() => {
      textarea.focus()
      textarea.selectionStart = Math.max(0, start - startOffset)
      textarea.selectionEnd = Math.max(0, end - endOffset)
    }, 0)
  }

  // 箇条書きの自動継続機能
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      const textarea = e.currentTarget;
      const { selectionStart } = textarea;
      const lines = content.split('\n');
      
      // 現在の行を取得
      let currentLineIdx = 0;
      let currentPos = 0;
      for (let i = 0; i < lines.length; i++) {
        currentPos += lines[i].length + 1; // +1 for the newline
        if (currentPos > selectionStart) {
          currentLineIdx = i;
          break;
        }
      }
      
      const currentLine = lines[currentLineIdx];
      
      // 箇条書きのパターンをチェック
      const bulletPattern = /^(\s*)(-|\*|\+|\d+\.)\s+/;
      const match = currentLine.match(bulletPattern);
      
      if (match) {
        e.preventDefault();
        
        const [, indent, bullet] = match;
        const bulletPrefix = indent + (bullet === '1.' ? '2. ' : bullet === '2.' ? '3. ' : bullet + ' ');
        
        // 現在の行が空の箇条書きならば（「- 」だけの行）、箇条書きを終了する
        if (currentLine.trim() === match[0].trim()) {
          // 空の箇条書き行を削除し、インデントのみ残す
          const beforeCursor = content.substring(0, selectionStart - match[0].length);
          const afterCursor = content.substring(selectionStart);
          onChange(beforeCursor + '\n' + indent + afterCursor);
          
          // カーソル位置を調整
          setTimeout(() => {
            textarea.selectionStart = textarea.selectionEnd = beforeCursor.length + 1 + indent.length;
          }, 0);
        } else {
          // 次の行も箇条書きにする
          const beforeCursor = content.substring(0, selectionStart);
          const afterCursor = content.substring(selectionStart);
          onChange(beforeCursor + '\n' + bulletPrefix + afterCursor);
          
          // カーソル位置を調整
          setTimeout(() => {
            textarea.selectionStart = textarea.selectionEnd = beforeCursor.length + 1 + bulletPrefix.length;
          }, 0);
        }
      }
    }
  };

  return (
    <div className="markdown-editor">
      <div className="editor-toolbar">
        <button 
          className={viewMode === 'edit' ? 'active' : ''} 
          onClick={() => setViewMode('edit')}
        >
          編集
        </button>
        <button 
          className={viewMode === 'preview' ? 'active' : ''} 
          onClick={() => setViewMode('preview')}
        >
          プレビュー
        </button>
        <button 
          className={viewMode === 'split' ? 'active' : ''} 
          onClick={() => setViewMode('split')}
        >
          分割表示
        </button>
      </div>

      {(viewMode === 'edit' || viewMode === 'split') && (
        <div className="formatting-toolbar">
          <button onClick={() => insertText('**', '**')} title="太字 (Ctrl+B)">
            <b>B</b>
          </button>
          <button onClick={() => insertText('*', '*')} title="イタリック (Ctrl+I)">
            <i>I</i>
          </button>
          <button onClick={() => insertText('[', '](url)')} title="リンク">
            🔗
          </button>
          <button onClick={() => insertText('![alt text](', ')')} title="画像">
            🖼️
          </button>
          <button onClick={() => insertText('# ')} title="見出し1">
            H1
          </button>
          <button onClick={() => insertText('## ')} title="見出し2">
            H2
          </button>
          <button onClick={() => insertText('### ')} title="見出し3">
            H3
          </button>
          <button onClick={() => insertText('- ')} title="箇条書き">
            •
          </button>
          <button onClick={() => insertText('1. ')} title="番号付きリスト">
            1.
          </button>
          <button onClick={() => insertText('```\n', '\n```')} title="コードブロック">
            {'</>'}
          </button>
          <button onClick={addIndent} title="インデント追加 (Tab)">
            ⇥
          </button>
          <button onClick={removeIndent} title="インデント削除 (Shift+Tab)">
            ⇤
          </button>
        </div>
      )}

      <div className="editor-container" style={{height: `${visibleHeight}px`}}>
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className="editor-pane" style={{
            width: viewMode === 'split' ? '50%' : '100%',
            height: '100%'
          }}>
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="editor-textarea"
              style={{
                height: '100%',
                width: '100%',
                padding: '1rem',
                resize: 'none',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            />
          </div>
        )}
        
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className="preview-pane" style={{
            width: viewMode === 'split' ? '50%' : '100%',
            height: '100%',
            padding: '1rem',
            overflow: 'auto',
            border: viewMode === 'split' ? '1px solid #ccc' : 'none',
            borderRadius: '4px'
          }}>
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        )}
      </div>

      <style jsx>{`
        .markdown-editor {
          display: flex;
          flex-direction: column;
          width: 100%;
        }
        
        .editor-toolbar {
          display: flex;
          margin-bottom: 0.5rem;
        }
        
        .editor-toolbar button {
          padding: 0.5rem 1rem;
          margin-right: 0.5rem;
          border: 1px solid #ccc;
          background: #f5f5f5;
          border-radius: 4px;
          cursor: pointer;
        }
        
        .editor-toolbar button.active {
          background: #e0e0e0;
          font-weight: bold;
        }
        
        .formatting-toolbar {
          display: flex;
          margin-bottom: 0.5rem;
          flex-wrap: wrap;
        }
        
        .formatting-toolbar button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          margin-right: 0.25rem;
          margin-bottom: 0.25rem;
          border: 1px solid #ccc;
          background: #f5f5f5;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
        }
        
        .formatting-toolbar button:hover {
          background: #e0e0e0;
        }
        
        .editor-container {
          display: flex;
          width: 100%;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}
