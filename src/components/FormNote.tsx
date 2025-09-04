interface Props {
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
}

function FormNote({ handleChange, value }: Props) {
  return (
    <div className="w-full mt-[5px] bg-[#333333] transition-all text-white rounded-[5px] text-[14px]">
      <textarea
        className="w-full outline-none resize-none p-[10px]"
        onChange={handleChange}
        value={value}
      ></textarea>
    </div>
  );
}

export default FormNote;
