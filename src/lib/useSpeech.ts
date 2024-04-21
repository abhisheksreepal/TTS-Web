import { useEffect, useRef, useState } from "react";

import { PlayingState, SpeechEngine, createSpeechEngine } from "./speech";

/*
  @description
  Implement a custom useSpeech hook that uses a speech engine defined in 'speech.ts'
  to play the sentences that have been fetched and parsed previously.
  
  This hook should return react friendly controls for playing, and pausing audio as well as provide information about
  the currently read word and sentence
*/
const useSpeech = (sentences: Array<string>) => {
  let currentSentenceIdx = useRef(0);

  const [currentWordRange, setCurrentWord] = useState<[number, number]>([0, 0]);

  const sentencesArray = useRef(sentences);
  let queToPlay = useRef(sentences);
  const [playbackState, setPlaybackState] =
    useState<PlayingState>("initialized");

  const onStateUpdate = (state: PlayingState) => {
    setPlaybackState(state);
  };

  const onBoundary = (e: SpeechSynthesisEvent) => {
    setCurrentWord([e.charIndex, e.charLength]);
    console.log(`range - ${e.charIndex}, ${e.charLength}`);
    // console.log(`sentence idx  - ${currentSentenceIdx.current}`);
    checkIfWordCrossedSentences(e.charIndex, e.charLength);
  };

  const checkIfWordCrossedSentences = (index: number, length: number) => {
    if (
      sentencesArray.current.length > 0 &&
      sentencesArray.current[currentSentenceIdx.current].length -
        index -
        length >
        0
    ) {
    } else {
      if (currentSentenceIdx.current < sentencesArray.current.length - 1) {
        ++currentSentenceIdx.current;
      }
    }
  };

  const engine = useRef<SpeechEngine>();

  useEffect(() => {
    createEngine();
  }, []);

  const createEngine = () => {
    const eng = createSpeechEngine({
      onBoundary: onBoundary,
      onEnd: () => {
        setCurrentWord([0, 0]);
        anyMoreToPlay();
      },
      onStateUpdate: onStateUpdate,
    });
    engine.current = eng;
  };

  const anyMoreToPlay = () => {
    console.log(`play more and ${queToPlay.current.length}`);
    if (queToPlay.current.length > 0) {
      const item = queToPlay.current.shift();
      console.log(`playing  ${item} on engine ${engine.current}`);
      if (!engine.current) {
        createEngine();
      }
      engine.current?.load(item!);
      engine.current?.play();
    }
  };

  const play = () => {
    if (!engine.current) {
      createEngine();
    }
    engine.current?.play();
  };

  const pause = () => {
    if (!engine.current) {
      createEngine();
    }
    engine.current?.pause();
  };

  const load = (data: string) => {
    if (!engine.current) {
      createEngine();
    }
    sentencesArray.current = parseContent(data);
    queToPlay.current = sentencesArray.current.map((item) => {
      return item;
    });
    currentSentenceIdx.current = 0;
    setCurrentWord([0, 0]);
    engine.current?.load(queToPlay.current.shift()!);
  };

  const parseContent = (data: string) => {
    let out: string[] = [];
    let test = data.match(/<s>.*<\/s>/g);
    // const test = data.split("<s>");
    if (test && test.length > 0) {
      out = test[0].split("<s>");
    }
    out = out
      .filter((item) => {
        return item !== "";
      })
      .map((item) => {
        return item.replace("</s>", "");
      });

    return out;
  };

  return {
    currentSentenceIdx,
    currentWordRange,
    playbackState,
    play,
    pause,
    load,
    parseContent,
  };
};

export { useSpeech };
