import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import type { Note } from './MyStickyNote';

interface Props {
  item: Note;
  handleDelete: (id: number) => void;
  handleShowEdit: (id: number) => void;
}

function NoteItem({ item, handleDelete, handleShowEdit }: Props) {
  return (
    <div className="flex justify-between items-start bg-[#333333] hover:bg-[#414141] transition-all text-white p-[10px] border-t-[2px] border-t-[#ffc53d] rounded-[2px] text-[14px]">
      <div className="w-full text-wrap">{item.notes}</div>
      <div className="flex gap-[5px]">
        <EditOutlined
          className="hover:cursor-pointer"
          onClick={() => handleShowEdit(item.id)}
        />

        <DeleteOutlined
          className="hover:cursor-pointer"
          onClick={() => handleDelete(item.id)}
        />
      </div>
    </div>
  );
}

export default NoteItem;
