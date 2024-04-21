import { useEffect, useState } from "react";
import "./App.css";

import { Controls } from "./components/Controls";
import { CurrentlyReading } from "./components/CurrentlyReading";
import { PlayingState, createSpeechEngine } from "./lib/speech";
import { useSpeech } from "./lib/useSpeech";

const GET_CONTENT = "http://localhost:5174/content";

function App() {
  const [sentences, setSentences] = useState<string[]>([]);

  const {
    currentSentenceIdx,
    currentWordRange,
    play,
    pause,
    load,
    playbackState,
    parseContent,
  } = useSpeech(sentences);

  const loadData = () => {
    fetch(GET_CONTENT).then((data) => {
      data.json().then((content) => {
        let out = parseContent(content.content);
        setSentences(out);
        load(content.content);
      });
    });
  };

  /**
   * input: "<speak><s>This is a sentence.</s><s>This is another sentence</s></speak>",
   * sentences: ['This is a sentence.', 'This is another sentence']
   *
   * input: <speak><s>This is a sentence.</s><s>This is another sentence</s>Some more text</speak>
   * sentences: ['This is a sentence.', 'This is another sentence']
   *
   * input: <speak><s>This is a sentence.</s><s>This is another sentence</s>Some more text<s>This is a longer piece of content</s></speak>
   * sentences: ['This is a sentence.', 'This is another sentence', 'This is a longer piece of content']
   */

  // useEffect(() => {
  //   loadData();
  // }, []);

  return (
    <div className="App">
      <h1>Text to speech</h1>
      <div>
        <CurrentlyReading
          sentences={sentences}
          currentSentenceIdx={currentSentenceIdx.current}
          currentWordRange={currentWordRange}
        />
      </div>
      <div>
        <Controls
          play={play}
          pause={pause}
          loadNewContent={loadData}
          state={playbackState}
        />
      </div>
    </div>
  );
}

export default App;
