import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { Song } from "~/models/Song";

interface LyricsModalProps {
  isOpen: boolean;
  onClose: () => void;
  song: Song | null;
}

export function LyricsModal({ isOpen, onClose, song }: LyricsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <AnimatePresence>
        {isOpen && (
          <DialogContent className="sm:max-w-[425px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
            >
              <DialogHeader>
                <DialogTitle className="text-xl font-bold">
                  {song?.title} - {song?.artist}
                </DialogTitle>
              </DialogHeader>
              <div className="mt-4 whitespace-pre-line">{song?.lyrics}</div>
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  );
}
