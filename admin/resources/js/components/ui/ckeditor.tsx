import React, { useEffect, useRef } from 'react';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';

interface CKEditorProps {
    label?: string;
    name: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    required?: boolean;
    placeholder?: string;
    height?: number;
    className?: string;
    config?: any;
}

declare global {
    interface Window {
        ClassicEditor: any;
    }
}

export default function CKEditor({
                                     label = 'Description',
                                     name,
                                     value,
                                     onChange,
                                     error,
                                     required = false,
                                     placeholder = 'Enter description...',
                                     height = 200,
                                     className = '',
                                     config = {}
                                 }: CKEditorProps) {
    const editorRef = useRef<HTMLDivElement>(null);
    const editorInstanceRef = useRef<any>(null);

    useEffect(() => {
        let isMounted = true;

        const initializeEditor = async () => {
            if (!editorRef.current || editorInstanceRef.current) return;

            try {
                // Load CKEditor if not already loaded
                if (!window.ClassicEditor) {
                    await loadCKEditor();
                }

                if (!isMounted) return;

                const defaultConfig = {
                    placeholder,
                    toolbar: [
                        'heading',
                        '|',
                        'bold',
                        'italic',
                        '|',
                        'bulletedList',
                        'numberedList',
                        '|',
                        'outdent',
                        'indent',
                        '|',
                        'blockQuote',
                        'insertTable',
                        '|',
                        'link',
                        '|',
                        'undo',
                        'redo'
                    ],
                    heading: {
                        options: [
                            { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                            { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                            { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                            { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
                            { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' }
                        ]
                    },
                    table: {
                        contentToolbar: [
                            'tableColumn',
                            'tableRow',
                            'mergeTableCells',
                            'tableCellProperties',
                            'tableProperties'
                        ]
                    },
                    image: {
                        toolbar: [
                            'imageTextAlternative',
                            'imageStyle:inline',
                            'imageStyle:block',
                            'imageStyle:side'
                        ]
                    },
                    link: {
                        decorators: {
                            openInNewTab: {
                                mode: 'manual',
                                label: 'Open in a new tab',
                                attributes: {
                                    target: '_blank',
                                    rel: 'noopener noreferrer'
                                }
                            }
                        }
                    },
                    ...config
                };

                const editor = await window.ClassicEditor.create(editorRef.current, defaultConfig);

                if (!isMounted) {
                    editor.destroy();
                    return;
                }

                editorInstanceRef.current = editor;

                // Set initial data
                if (value) {
                    editor.setData(value);
                }

                // Listen for changes
                editor.model.document.on('change:data', () => {
                    const data = editor.getData();
                    onChange(data);
                });

                // Set editor height
                const editingView = editor.editing.view;
                editingView.change(writer => {
                    writer.setStyle('min-height', `${height}px`, editingView.document.getRoot());
                });

            } catch (error) {
                console.error('Error initializing CKEditor:', error);
            }
        };

        initializeEditor();

        return () => {
            isMounted = false;
            if (editorInstanceRef.current) {
                editorInstanceRef.current.destroy();
                editorInstanceRef.current = null;
            }
        };
    }, []);

    // Update editor data when value prop changes
    useEffect(() => {
        if (editorInstanceRef.current && value !== editorInstanceRef.current.getData()) {
            editorInstanceRef.current.setData(value);
        }
    }, [value]);

    const loadCKEditor = (): Promise<void> => {
        return new Promise((resolve, reject) => {
            if (window.ClassicEditor) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://cdn.ckeditor.com/ckeditor5/39.0.1/classic/ckeditor.js';
            script.async = true;

            script.onload = () => {
                resolve();
            };

            script.onerror = () => {
                reject(new Error('Failed to load CKEditor'));
            };

            document.head.appendChild(script);
        });
    };

    return (
        <div className={`grid gap-2 ${className}`}>
            <Label htmlFor={name}>
                {label} {required && <span className="text-red-500">*</span>}
            </Label>

            <div className={`border rounded-md ckeditor-wrapper ${error ? 'border-red-500' : 'border-gray-300'}`}>
                <div
                    ref={editorRef}
                    className="ckeditor-container"
                />
            </div>

            {error && <InputError message={error} />}

            {/* Add some basic CKEditor styling using a style tag without jsx */}
            <style dangerouslySetInnerHTML={{
                __html: `
                    .ckeditor-wrapper .ck-editor__editable {
                        border: none !important;
                        box-shadow: none !important;
                    }

                    .ckeditor-wrapper .ck-editor__editable:focus {
                        border: none !important;
                        box-shadow: none !important;
                    }

                    .ckeditor-wrapper .ck.ck-editor {
                        border: none !important;
                    }

                    .ckeditor-wrapper .ck.ck-editor__main > .ck-editor__editable {
                        background: white;
                        border-radius: 0 0 6px 6px;
                    }

                    .ckeditor-wrapper .ck.ck-editor__top {
                        border-radius: 6px 6px 0 0;
                    }
                `
            }} />
        </div>
    );
}
