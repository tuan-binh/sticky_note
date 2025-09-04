import { useEffect, useState } from 'react';

import FormNote from './FormNote';
import NoteItem from './NoteItem';
import { SaveOutlined } from '@ant-design/icons';

export interface Note {
  id: number;
  notes: string;
}

function MyStickyNote() {
  const [notes, setNotes] = useState<Note[]>(() =>
    JSON.parse(localStorage.getItem('notes') || '[]'),
  );

  const [textNode, setTextNode] = useState<string>('');
  const [isEdit, setIsEdit] = useState<number>(-1);
  const [errors, setErrors] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value === '') {
      setErrors('Nội dung ghi chú không được bỏ trống');
    } else {
      setErrors('');
    }
    setTextNode(e.target.value);
  };

  const handleSave = () => {
    if (textNode === '') {
      setErrors('Nội dung ghi chú không được bỏ trống');
    } else if (errors === '') {
      if (isEdit === -1) {
        const newNote = {
          id: new Date().getTime(),
          notes: textNode,
        };
        setNotes([newNote, ...notes]);
      } else {
        const newNode = {
          id: isEdit,
          notes: textNode,
        };
        setNotes(
          notes.map((item) => {
            if (item.id === isEdit) {
              return newNode;
            } else {
              return item;
            }
          }),
        );
      }
    }

    setTextNode('');
  };

  const handleDelete = (id: number) => {
    setNotes(notes.filter((item) => item.id != id));
  };

  const handleShowEdit = (id: number) => {
    const dataEdit = notes.find((item) => item.id === id);
    if (dataEdit) {
      setTextNode(dataEdit.notes);
      setErrors('');
      setIsEdit(id);
    }
  };

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  return (
    <div className="w-[300px]">
      {/* header */}
      <div className="py-[10px] px-[10px] bg-[#ffc53d] rounded-t-[8px]">
        <div className="flex justify-between">
          <h3 className="font-semibold">STICKY NOTE</h3>
          <SaveOutlined className="hover:cursor-pointer" onClick={handleSave} />
        </div>
        <FormNote handleChange={handleChange} value={textNode} />
        <p className="text-red-500 text-[14px] font-semibold text-center mt-[5px]">
          {errors}
        </p>
      </div>

      {/* body */}
      <div className="h-[400px] bg-[#202020] rounded-b-[8px] flex flex-col p-[10px] gap-[10px] overflow-y-auto">
        {notes.map((item) => (
          <NoteItem
            key={item.id}
            item={item}
            handleDelete={handleDelete}
            handleShowEdit={handleShowEdit}
          />
        ))}
      </div>
    </div>
  );
}

export default MyStickyNote;
