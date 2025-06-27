import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import 'ckeditor5/ckeditor5.css';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    height?: string;
    className?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, placeholder = 'Write here...', disabled = false, height, className = '' }) => {
    const editorConfig = {
        toolbar: {
            items: [
                'heading',
                '|',
                'bold',
                'italic',
                'underline',
                '|',
                'link',
                'bulletedList',
                'numberedList',
                '|',
                'outdent',
                'indent',
                '|',
                'blockQuote',
                'insertTable',
                '|',
                'sourceEditing',
                '|',
                'undo',
                'redo'
            ]
        },
        heading: {
            options: [
                { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' }
            ]
        },
        placeholder,
        ...(height && {
            extraPlugins: [],
        })
    };

    return (
        <div className={`rich-text-editor ${className}`}>
            <CKEditor
                editor={ClassicEditor as any}
                data={value}
                config={editorConfig as any}
                disabled={disabled}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    onChange(data);
                }}
                onReady={(editor) => {
                    // Apply custom height if provided
                    if (height) {
                        const editableElement = editor.ui.getEditableElement();
                        if (editableElement) {
                            editableElement.style.minHeight = height;
                        }
                    }
                }}
                onError={(error, { willEditorRestart }) => {
                    console.error('CKEditor error:', error);
                    if (willEditorRestart) {
                        console.log('Editor will restart');
                    }
                }}
            />
        </div>
    );
};

export default RichTextEditor;