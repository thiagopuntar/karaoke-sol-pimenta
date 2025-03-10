import { SearchResult } from "~/models/SearchResult";
import { ArtistTile } from "../ArtistTile";
import { ResultSongTile } from "../ResultSongTile";
import { Link } from "@remix-run/react";
import { Container } from "../Container";
import { SectionTitle } from "../SectionTitle";

type Props = {
  loading: boolean;
  results: SearchResult | null;
};

export const ResultList = ({ results, loading }: Props) => {
  if (loading || !results) {
    return <div>Carregando...</div>;
  }

  const { songsResult, artistsResult } = results;

  return (
    <section>
      {artistsResult.length === 0 && songsResult.length === 0 ? (
        <p className="text-center text-lg mt-8">Nenhum resultado encontrado</p>
      ) : (
        <Container>
          {artistsResult.length > 0 && <SectionTitle>Artistas</SectionTitle>}
          <ul className="grid gap-2">
            {artistsResult.map((result) => (
              <li>
                <Link to={`/artist/${result.name}`}>
                  <ArtistTile artist={result} />
                </Link>
              </li>
            ))}
          </ul>
          {songsResult.length > 0 && <SectionTitle>Músicas</SectionTitle>}
          <ul className="grid gap-6">
            {songsResult.map((result) => (
              <li>
                <ResultSongTile song={result} />
              </li>
            ))}
          </ul>
        </Container>
      )}
    </section>
  );
};
