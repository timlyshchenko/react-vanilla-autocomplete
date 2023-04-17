import { KeyboardEvent, useState, useRef } from 'react';
import { Option } from '../../types';
import { useDebouncedFn } from '../../hooks/useDebounce';
import { InfoMessage } from '../InfoMessage';
import { SuggestedOption } from '../SuggestedOption';

import './style.css';

interface AutoCompleteProps {
  value: undefined | Option;
  debounceTime?: number;
  searchFn: (searched: string) => Option[] | Promise<Option[]>;
  onChange?: (selected: undefined | Option) => void;
  onError?: (err: unknown) => void;
}

interface SearchQuery {
  state: SearchState;
  options: Option[];
}

enum ActionKey {
  ArrowUp = 'ArrowUp',
  ArrowDown = 'ArrowDown',
  Enter = 'Enter',
}

enum SearchState {
  Pending = 'Pending',
  Error = 'Error',
  Success = 'Success',
}

const DEFAULT_DEBOUNCE_TIME = 1000;

// ideally components like this should be a part of some ui kit, internal or external and should know
// nothing about data from api. Data should be fetched, formatted and passed to this autocomplete
export const Autocomplete = ({
  value,
  debounceTime = DEFAULT_DEBOUNCE_TIME,
  searchFn,
  onChange,
  onError,
}: AutoCompleteProps) => {
  const [searched, setSearched] = useState('');
  const hasSearched = searched.length > 0;
  const [{ state, options }, setSearchQuery] = useState<SearchQuery>({
    state: SearchState.Success,
    options: [],
  });
  // -1 is used here to not confuse user with keyboard selection when the user haven't pressed any key yet
  const [highlightIndex, setHighlightIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearchQuery = useDebouncedFn(debounceTime, async (searched: string) => {
    try {
      setSearchQuery({
        state: SearchState.Success,
        options: await searchFn(searched),
      });
    } catch (err) {
      setSearchQuery({
        state: SearchState.Error,
        options: [],
      });
      onError?.(err);
    }
  });

  const handleSearch = (searched: string) => {
    setSearched(searched);

    if (searched) {
      setSearchQuery({
        state: SearchState.Pending,
        options: [],
      });
      handleSearchQuery(searched)
    } else {
      onChange?.(undefined);
    }
  };

  const handleChange = (option: Option) => {
    setSearched('');
    onChange?.(option);
    inputRef.current?.focus();
  };

  const handleKeyDown = (ev: KeyboardEvent<HTMLInputElement>) => {
    if (
      !options.length ||
      !Object.values(ActionKey).includes(ev.key as ActionKey)
    ) {
      return;
    }

    ev.preventDefault();

    if (ev.key === ActionKey.ArrowUp) {
      setHighlightIndex((prev) => (prev - 1 + options.length) % options.length);
    }

    if (ev.key === ActionKey.ArrowDown) {
      setHighlightIndex((prev) => (prev + 1) % options.length);
    }

    if (ev.key === ActionKey.Enter && options[highlightIndex]) {
      handleChange(options[highlightIndex]);
      setHighlightIndex(-1);
    }
  };

  // To make it prod ready (optional depend on project specs):
  // ToDo: ideally, I would also add hide suggestion on blur, this will provide better UX
  // ToDo: check small screen size behaviour and adjust responsive markup
  // ToDo?: improve a11y (other than keyboard navigation) (optional)
  // ToDo?: make this autocomplete more customizable (optional)
  return (
    <div className="autocomplete-container">
      <input
        className="autocomplete-input"
        type="text"
        ref={inputRef}
        value={searched || value?.text || ''}
        autoComplete="off"
        placeholder="Search for a country..."
        onChange={({ target }) => handleSearch(target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className="autocomplete-suggestion-section">
        {state === SearchState.Pending && (
          <InfoMessage>Loading...</InfoMessage>
        )}
        {state === SearchState.Error && (
          <InfoMessage type="error">Something went wrong</InfoMessage>
        )}
        {state === SearchState.Success && hasSearched && !options.length && (
          <InfoMessage>No results</InfoMessage>
        )}
        {state === SearchState.Success && hasSearched && (
          options.map((option, index) => (
            <SuggestedOption
              key={option.id}
              text={option.text}
              searched={searched}
              isSelected={index === highlightIndex}
              onClick={() => handleChange(option)}
            />
          ))
        )}
      </div>
    </div>
  );
};
