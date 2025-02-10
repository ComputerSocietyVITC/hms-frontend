interface IconButtonProps {
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
  customStyle?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  text,
  onClick,
  customStyle = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 px-5 py-2 rounded-full cursor-pointer text-base bg-[#1E1E1E] hover:bg-[#292929] border border-[#404040] text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all ${customStyle}`}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      {text}
    </button>
  );
};

export default IconButton;
