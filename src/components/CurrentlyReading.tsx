/**
 * Implement the CurrentlyReading component here
 * This component should have the following,
 * - A container tag with text containing all sentences supplied
 * - A p tag containing the current sentence with testID "current-sentence"
 * - A span tag inside the p tag containing the current word with testID "current-word"
 *
 * See example.gif for an example of how the component should look like, feel free to style it however you want as long as the testID exists
 */
export const CurrentlyReading = ({
  currentWordRange,
  currentSentenceIdx,
  sentences,
}: {
  currentWordRange: [number, number];
  currentSentenceIdx: number;
  sentences: string[];
}) => {
  // console.log(`${sentences[currentSentenceIdx]}`);
  // console.log(`-- 0 - ${currentWordRange[0]}---`);

  // console.log(sentences[currentSentenceIdx]?.substring(0, currentWordRange[0]));
  // console.log(`-- ${currentWordRange[0]}- ${currentWordRange[1]} --`);
  // console.log(
  //   sentences[currentSentenceIdx]?.substring(
  //     currentWordRange[0],
  //     currentWordRange[0] + currentWordRange[1]
  //   )
  // );
  // console.log(`-- ${currentWordRange[1]}- lenght --`);
  // console.log(
  //   sentences[currentSentenceIdx]?.substring(
  //     currentWordRange[0] + currentWordRange[1]
  //   )
  // );
  return (
    <>
      <div data-testid="currently-reading" className="currently-reading">
        {
          <p data-testid="current-sentence" className="currently-reading-text">
            {sentences[currentSentenceIdx]?.substring(0, currentWordRange[0])}
            <span data-testid="current-word" className="currentword">
              {sentences[currentSentenceIdx]?.substring(
                currentWordRange[0],
                currentWordRange[0] + currentWordRange[1]
              )}
            </span>
            {sentences[currentSentenceIdx]?.substring(
              currentWordRange[0] + currentWordRange[1]
            )}
          </p>
        }
      </div>
      <p>
        {sentences.map((sentence, index) => {
          return <span key={index}>{sentence}</span>;
        })}
      </p>
    </>
  );
};
