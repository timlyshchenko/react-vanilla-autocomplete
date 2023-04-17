import { Option } from './types';

interface Country {
  name: { common: string };
}

const makeUrl = (searched: string) =>
  `https://restcountries.com/v3.1/name/${searched}?fields=name`;

export const searchCountries = async (searched: string): Promise<Option[]> => {
  const res = await fetch(makeUrl(searched));

  if (res.status === 404) {
    return [];
  }

  const data: Country[] = await res.json();

  return data.map(it => ({
    id: it.name.common,
    text: it.name.common,
  }));
};
