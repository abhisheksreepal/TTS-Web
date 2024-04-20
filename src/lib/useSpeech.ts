import { useState } from "react";

import { PlayingState, createSpeechEngine } from "./speech";

/*
  @description
  Implement a custom useSpeech hook that uses a speech engine defined in 'speech.ts'
  to play the sentences that have been fetched and parsed previously.
  
  This hook should return react friendly controls for playing, and pausing audio as well as provide information about
  the currently read word and sentence
*/
const useSpeech = (sentences: Array<string>) => {
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);
  const [currentWordRange, setCurrentWordRange] = useState<[number, number]>([
    0, 0,
  ]);

  const [playbackState, setPlaybackState] =
    useState<PlayingState>("initialized");

  const onStateUpdate = (state: PlayingState) => {
    setPlaybackState(state);
  };

  const { play, pause, state, cancel, load } = createSpeechEngine({
    onBoundary: () => {},
    onEnd: () => {},
    onStateUpdate: onStateUpdate,
  });

  return {
    currentSentenceIdx,
    currentWordRange,
    playbackState,
    play,
    pause,
    load,
  };
};

export { useSpeech };
