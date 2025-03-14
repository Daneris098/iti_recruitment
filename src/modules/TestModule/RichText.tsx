import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import { useForm } from '@mantine/form';
import { useRef, useEffect, useState } from 'react';
import { Button, Text } from '@mantine/core';

export default function Index() {
    const formRef = useRef<HTMLFormElement>(null);

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            content: '',
        },
        validate: {
            content: (value) => (!value.trim() || value === '<p></p>' ? 'Content is required' : null),
        },
    });

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link,
            Superscript,
            SubScript,
            Highlight,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
        ],
        content: form.values.content,
        onUpdate: ({ editor }) => {
            form.setFieldValue('content', editor.getHTML());
        },
    });

    const onSubmit = async () => {
        const isValid = form.validate();

        if (!isValid.hasErrors) {
            alert('Form submitted successfully');
        }
    };

    return (
        <form ref={formRef} onSubmit={form.onSubmit(onSubmit)} className="flex flex-col gap-5">
            <div className="flex flex-col">
                <Text className="text-gray-500 font-medium">Job Description</Text>

                <div className={`border ${form.errors.content ? 'border-red-500' : 'border-gray-300'} rounded-md transition-colors duration-200 relative`}>
                    {/* ✅ Add key to force re-creation */}
                    <RichTextEditor editor={editor}>
                        <RichTextEditor.Toolbar sticky >
                            <RichTextEditor.ControlsGroup>
                                <RichTextEditor.Bold />
                                <RichTextEditor.Italic />
                                <RichTextEditor.Underline />
                                <RichTextEditor.Strikethrough />
                                <RichTextEditor.ClearFormatting />
                                <RichTextEditor.Highlight />
                                <RichTextEditor.Code />
                            </RichTextEditor.ControlsGroup>

                            <RichTextEditor.ControlsGroup>
                                <RichTextEditor.H1 />
                                <RichTextEditor.H2 />
                                <RichTextEditor.H3 />
                                <RichTextEditor.H4 />
                            </RichTextEditor.ControlsGroup>

                            <RichTextEditor.ControlsGroup>
                                <RichTextEditor.Blockquote />
                                <RichTextEditor.Hr />
                                <RichTextEditor.BulletList />
                                <RichTextEditor.OrderedList />
                                <RichTextEditor.Subscript />
                                <RichTextEditor.Superscript />
                            </RichTextEditor.ControlsGroup>

                            <RichTextEditor.ControlsGroup>
                                <RichTextEditor.Link />
                                <RichTextEditor.Unlink />
                            </RichTextEditor.ControlsGroup>

                            <RichTextEditor.ControlsGroup>
                                <RichTextEditor.AlignLeft />
                                <RichTextEditor.AlignCenter />
                                <RichTextEditor.AlignJustify />
                                <RichTextEditor.AlignRight />
                            </RichTextEditor.ControlsGroup>

                            <RichTextEditor.ControlsGroup>
                                <RichTextEditor.Undo />
                                <RichTextEditor.Redo />
                            </RichTextEditor.ControlsGroup>
                        </RichTextEditor.Toolbar>

                        <RichTextEditor.Content />
                    </RichTextEditor>
                    {form.errors.content && (
                        <Text className='absolute' color="red" size="sm">
                            {form.errors.content}
                        </Text>
                    )}
                </div>

                <Button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white w-[10%] self-end"
                    radius="md"
                >
                    Submit
                </Button>
            </div>
        </form>
    );
}
