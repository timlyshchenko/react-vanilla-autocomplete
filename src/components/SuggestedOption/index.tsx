import { cn, findTextCoordinates } from '../../utils';

import './style.css';

interface SuggestedOptionProps {
  text: string;
  searched: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export const SuggestedOption = ({
  text,
  searched,
  isSelected,
  onClick,
}: SuggestedOptionProps) => {
  const [startIndex, endIndex] =
    findTextCoordinates(text, searched) ?? [];

  return (
    <div
      className={cn('autocomplete-suggestion', isSelected && 'selected-suggestion')}
      onClick={onClick}
    >
      {startIndex != null ? (
        <>
          {text.slice(0, startIndex)}
          <span className="highlighted">{text.slice(startIndex, endIndex)}</span>
          {text.slice(endIndex)}
        </>
      ) : text}
    </div>
  )
};
