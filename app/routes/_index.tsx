import { useState } from "react";
import type { MetaFunction } from "@remix-run/node";
import logo from "../images/logo.png";
import { useLoaderData } from "@remix-run/react";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { FaPlay } from "react-icons/fa";
import { motion } from "framer-motion";
import { LyricsModal } from "~/components/LyricsModal";
import { songsList } from "~/data/songs";
import { Song } from "~/models/Song";

export const meta: MetaFunction = () => {
  return [
    { title: "Sol e Pimenta" },
    { name: "description", content: "Bem vindos ao nosso bar!" },
  ];
};

export const loader = async () => {
  return {
    songs: songsList,
  };
};

export default function Index() {
  const { songs } = useLoaderData<typeof loader>();
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);

  return (
    <div className="flex flex-col gap-4">
      <header className="w-full bg-black">
        <div className="max-w-screen-lg mx-auto">
          <motion.img
            className="mx-auto"
            src={logo}
            alt="Sol e Pimenta Lounge Bar"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </header>
      <div className="max-w-screen-xl mx-auto gap-4 flex flex-col">
        <div className="flex-col flex gap-2">
          <h1 className="text-center text-cyan-700 text-3xl font-bold">
            Catálogo de músicas
          </h1>
          <p className="font-bold text-center gap">
            Seja bem-vindo ao catálogo de músicas do Sol e Pimenta Lounge Bar.
          </p>
        </div>
        <ul className="flex flex-wrap gap-2">
          {songs.map((song, index) => (
            <motion.div
              key={song.code}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className="w-44 h-44 flex flex-col justify-between bg-gray-700 text-white hover:bg-gray-600 transition-colors"
                key={song.code}
              >
                <CardHeader className="p-2">
                  <h2>{song.title}</h2>
                </CardHeader>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaPlay
                    className="text-white text-3xl mx-auto cursor-pointer"
                    onClick={() => setSelectedSong(song)}
                  />
                </motion.div>
                <CardContent className="p-2">
                  <div className="flex justify-between">
                    <p className="font-semibold">{song.artist}</p>
                    <p>{song.genre}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </ul>

        {selectedSong && (
          <LyricsModal
            isOpen={!!selectedSong}
            onClose={() => setSelectedSong(null)}
            song={selectedSong}
          />
        )}
      </div>
    </div>
  );
}
