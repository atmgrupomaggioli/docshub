import * as clack from '@clack/prompts';
import { cancelMessage, docsHubGradient } from './resources';
import { fetchAndGetContent } from './file';
import { guessHintsUrl } from '@/globals';

interface GuessItem {
  word: string;
  hint: string;
}

export const GMode = 'game';

export async function startGame() {
  let guess: GuessItem[] = [];
  try {
    const guessString = await fetchAndGetContent(guessHintsUrl, 'Failed to fetch WordHints.ts');
    const correctedString = guessString.replace(/[‘’]/g, "'").replace(/[“”]/g, '"');
    guess = JSON.parse(correctedString);
  } catch (error) {
    clack.cancel(`🧙‍♂️ I couldn't guess the questions, you're not fit to be here, young apprentice.`);
    process.exit(0);
  }

  guess = shuffleArray(guess);
  if (guess.length === 0) {
    clack.cancel(`🧙‍♂️ I couldn't guess the questions, you're not fit to be here, young apprentice.`);
    process.exit(0);
  }

  const totalQuestions = guess.length;
  let correctAnswers = 0;
  let failedAttempts = 0;
  let currentQuestionIndex = 0;

  clack.log.step(
    'Welcome to the secret word guessing game!\n 🎮 Only the bravest will unlock the mystery of the universe! May the Force be with you!',
  );

  while (failedAttempts < 5 && currentQuestionIndex < totalQuestions) {
    const currentQuestion = guess[currentQuestionIndex];
    const secretWord = currentQuestion.word;
    const hint = currentQuestion.hint;

    const userGuess = await clack.text({
      message: hint,
    });

    if (clack.isCancel(userGuess)) {
      clack.cancel(cancelMessage);
      process.exit(0);
    }

    if (userGuess === secretWord) {
      correctAnswers++;
      clack.log.success(`🎉 **DING DING DING**! You've cracked the code! The word was: "${secretWord}". You're a true wizard! 🔮`);
    } else {
      failedAttempts++;
      clack.log.warn(`⚔️ Oops! That’s not the correct word, try again. You have ${5 - failedAttempts} attempts left. Don’t let the dark side win!`);
    }

    clack.log.info(
      `🚀 Progress: ${correctAnswers} out of ${totalQuestions} correct. ⚡️ You've made ${failedAttempts} failed attempts. Keep going, Jedi!`,
    );
    currentQuestionIndex++;

    if (correctAnswers === totalQuestions) {
      clack.outro(
        docsHubGradient(
          `🎉 **You did it!** You defeated the game with ${correctAnswers} out of ${totalQuestions} correct answers! 🏆 You’re the ultimate champion, May the code be with you!`,
        ),
      );
      process.exit(0);
    }
  }

  if (failedAttempts === 5) {
    clack.log.error(
      `💥 Oh no, you’ve failed too many times! You got ${correctAnswers} out of ${totalQuestions} correct. The Empire has won this round...`,
    );
  } else {
    clack.log.error(
      `💥 Mission complete, but not all questions were conquered. You got ${correctAnswers} out of ${totalQuestions} right. The Force is strong with you—next time, victory will be yours! ✨`,
    );
  }

  const playAgain = await clack.confirm({
    message: '🚀 Ready for another round? The universe of knowledge awaits, brave one!',
  });

  if (clack.isCancel(playAgain) || !playAgain) {
    clack.cancel('Thanks for playing, Code Master! May your syntax be ever clean! 👋');
    process.exit(0);
  }

  if (playAgain === true) {
    await startGame();
  } else {
    clack.cancel('Thanks for playing, Code Master! May your syntax be ever clean! 👋');
    process.exit(0);
  }
}

function shuffleArray(array: GuessItem[]) {
  return array.sort(() => Math.random() - 0.5);
}
