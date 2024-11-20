interface HighlightProps {
  text: string;
  highlight: string;
}

export const Highlight: React.FC<HighlightProps> = ({ text, highlight }) => {
  if (!highlight.trim()) {
    return <span>{text}</span>;
  }

  const regex = new RegExp(`(${highlight})`, 'gi');
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, i) => (
        regex.test(part) ? (
          <span key={i} style={{ backgroundColor: 'blue' }}>
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      ))}
    </span>
  );
};