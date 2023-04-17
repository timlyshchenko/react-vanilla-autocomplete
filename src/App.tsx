import { useState } from 'react';
import { Option } from './types';
import { searchCountries } from './api';
import { Autocomplete } from './components/Autocomplete';

import './App.css';

// this functionality of course will be somewhere else, I placed it in App component for simplicity
export const App = () => {
  const [selected, setSelected] = useState<Option>()

  return (
    <div className="App">
      <header className="App-header">
        <Autocomplete
          value={selected}
          onChange={setSelected}
          searchFn={searchCountries}
        />
        <div>Selected: {selected?.text ?? '-'}</div>
      </header>
    </div>
  );
};
