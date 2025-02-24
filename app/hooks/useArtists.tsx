import { useEffect, useState } from "react";
import { db } from "~/indexedDb/db";
import { Artist } from "~/models/Artist";
import { Country } from "~/models/Country";

export const useArtists = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(new Set<Country>());

  useEffect(() => {
    db.fetchAndStoreData()
      .then(() => db.getArtists())
      .then(setArtists)
      .finally(() => setLoading(false));
  }, []);

  const handleCountryFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = event.target;
    const newFilter = new Set(filter);
    if (checked) {
      newFilter.add(name as Country);
    } else {
      newFilter.delete(name as Country);
    }

    const country =
      newFilter.size === 1 ? Array.from(newFilter.values())[0] : undefined;
    db.getArtists(country).then(setArtists);
    setFilter(newFilter);
  };

  const filters = {
    national: filter.has("Nacional"),
    international: filter.has("Internacional"),
    search: "",
  };

  return {
    artists,
    loading,
    filters,
    handleCountryFilter,
  };
};
