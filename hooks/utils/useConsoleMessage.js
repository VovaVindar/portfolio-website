import { useLayoutEffect, useCallback, useState } from "react";

// Collection of memes
const memes = [
  {
    title: "Works on My Machine",
    art: `
╔══════════════════════════════╗
║                              ║
║   ✨ Works on My Machine ✨   ║
║   ------------------------   ║
║   Official Certificate       ║
║                              ║
║     ¯\\_(ツ)_/¯               ║
║                              ║
╚══════════════════════════════╝
`,
  },
  {
    title: "Not a Bug",
    art: `
╔═══════════════════════════╗
║                           ║
║   It's not a bug          ║
║   It's an undocumented    ║
║   feature                 ║
║          (⌐■_■)           ║
║                           ║
╚═══════════════════════════╝
`,
  },
  {
    title: "Tabs vs Spaces",
    art: `
╔═══════════════════════════╗
║                           ║
║   TABS VS SPACES          ║
║   The Holy War            ║
║                           ║
║   Tab Users:   (╯°□°)╯    ║
║   Space Users: (∩｀-´)⊃━☆  ║
║                           ║
╚═══════════════════════════╝
`,
  },
  {
    title: "Programmer's Prayer",
    art: `
╔═══════════════════════════╗
║                           ║
║   Dear Lord,              ║
║   Please let it work      ║
║   I promise I won't       ║
║   push directly to        ║
║   master again            ║
║           🙏              ║
║                           ║
╚═══════════════════════════╝
`,
  },
  {
    title: "Git Push Force",
    art: `
╔══════════════════════════════╗
║                              ║
║   git push --force           ║
║                              ║
║         (╯°□°)╯︵ ┻━┻        ║
║                              ║
║   Force push successful!     ║
║   (ノಠ益ಠ)ノ彡┻━┻             ║
║                              ║
╚══════════════════════════════╝
  `,
  },
  {
    title: "Hello World Evolution",
    art: `
╔═════════════════════════════════╗
║                                 ║
║  Evolution of Hello World:      ║
║  ------------------------       ║
║  Junior: console.log("Hello")   ║
║  Senior: <Hello {...props} />   ║
║  Lead: kubectl apply hello.yml  ║
║                                 ║
╚═════════════════════════════════╝
`,
  },
  {
    title: "Deploy to Production",
    art: `
╔══════════════════════════════╗
║                              ║
║    DEPLOYING TO PRODUCTION   ║
║                              ║
║         \\_[o_0]_/            ║
║                              ║
║    [pray] [hope] [panic]     ║
║                              ║
╚══════════════════════════════╝
`,
  },
  {
    title: "Merge Conflict",
    art: `
╔══════════════════════════════╗
║                              ║
║    MERGE CONFLICT (╯°□°)╯    ║
║                              ║
║    ≪≪≪≪≪≪≪ HEAD            ║
║    (ノಠ益ಠ)ノ彡┻━┻            ║
║    ≫≫≫≫≫≫≫ incoming         ║
║                              ║
║         ┬─┬ノ(º_ºノ)          ║
║                              ║
╚══════════════════════════════╝
`,
  },
  {
    title: "Angry Dev Life",
    art: `
╔══════════════════════════════╗
║                              ║
║    ANGRY DEVELOPER LIFE      ║
║                              ║
║    (╯‵□′)╯︵┻━┻  BUGS!       ║
║    ┻━┻ ︵ヽ(°□°)ﾉ︵ ┻━┻       ║
║    (ﾉಥ益ಥ）ﾉ ┻━┻  ERRORS!    ║
║    ┻━┻ミ＼(≧ﾛ≦＼)  HELP!      ║
║                              ║
╚══════════════════════════════╝
  `,
  },
  {
    title: "Code Review Moods",
    art: `
╔══════════════════════════════╗
║                              ║
║    CODE REVIEW MOODS         ║
║                              ║
║    (◔_◔) What is this?       ║
║    (ಠ_ಠ) Seriously?          ║
║    (≖_≖ ) Did you test?      ║
║    (╬ Ò﹏Ó) Rewrite this!    ║
║    (-_-;) *heavy sigh*       ║
║                              ║
╚══════════════════════════════╝
    `,
  },
  {
    title: "Ultimate Table Flip",
    art: `
╔══════════════════════════════╗
║                              ║
║    WHEN NOTHING WORKS        ║
║                              ║
║    ┻━┻ ︵ヽ(°□°)ﾉ︵ ┻━┻       ║
║    ┻━┻ ︵    ︵ ┻━┻           ║
║    ┻━┻ ︵ ┻━┻  ︵ ┻━┻         ║
║    ┻━┻ ︵┻━┻┻━┻︵ ┻━┻         ║
║    (ﾉ°□°)ﾉ ︵ ┻━┻┻━┻┻━┻       ║
║                              ║
╚══════════════════════════════╝
    `,
  },
  {
    title: "Code Review Saga",
    art: `
╔══════════════════════════════╗
║                              ║
║    CODE REVIEW SAGA          ║
║                              ║
║    (｡♥‿♥｡) Submit PR         ║
║    (⊙_⊙)？ First comment     ║
║    (╬ಠ益ಠ) Changes needed    ║
║    (ノಠ益ಠ)ノ Rewrite all     ║
║    (╯︵╰,) PR Rejected       ║
║                              ║
╚══════════════════════════════╝
    `,
  },
  {
    title: "Developer Fantasy",
    art: `
╔══════════════════════════════╗
║                              ║
║    DEVELOPER FANTASY         ║
║                              ║
║    ⚔️(◣_◢)⚔️   Warrior Dev    ║
║    ⊂(○⌒∇⌒○)⊃ Healer QA       ║
║    (∩^o^)⊃━☆ Wizard PM       ║
║    †=(:3」∠)_ Dead Intern    ║
║    (:3/L)~ Coffee Runner     ║
║                              ║
╚══════════════════════════════╝
    `,
  },
  {
    title: "Developer Forecast",
    art: `
╔══════════════════════════════╗
║                              ║
║    DEVELOPER FORECAST        ║
║                              ║
║    ☀ ヽ(◔ᴗ◔)ﾉ Clear Code     ║
║    ☂ (｀㊥益㊥) Bug Storm     ║
║    ⚡ (⊙﹏⊙) Power Issue      ║
║    ❆ (◞‸◟；) Server Frozen    ║
║    ☠ (×_×;） System Down     ║
║                              ║
╚══════════════════════════════╝
    `,
  },
];

const styles = {
  greeting: [
    "color: #ffffff",
    "background-color: #d43552",
    "font-weight: bold",
    "padding: 4px",
  ].join(";"),
  message: ["font-weight: bold", "padding: 20px 0", "text-wrap: balance"].join(
    ";"
  ),
  meme: [
    "font-family: Consolas, `Courier New`, monospace",
    "white-space: pre",
  ].join(";"),
};

export const useConsoleMessage = (validRoute) => {
  const [isInitialized, setIsInitialized] = useState(false);

  // Track which meme indexes have been shown
  const [shownMemes, setShownMemes] = useState(new Set());

  // Function to show a new random meme
  const showNewMeme = useCallback(() => {
    // If we've shown all memes, reset the tracking
    if (shownMemes.size >= memes.length) {
      setShownMemes(new Set());
      console.log(
        "%cAll memes have been shown! Starting over...",
        "font-weight: bold"
      );
      return;
    }

    // Find a random meme that hasn't been shown yet
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * memes.length);
    } while (shownMemes.has(randomIndex));

    // Add this meme to shown memes
    setShownMemes((prev) => new Set(prev).add(randomIndex));

    // Show the meme
    console.log(`%c${memes[randomIndex].art}`, styles.meme);

    // Show all memes (for testing)
    /*for (let i = 0; i < memes.length; i++) {
      console.log(`%c${memes[i].art}`, styles.meme);
    }*/

    // Show meme count
    if (shownMemes.size < 2) {
      console.log(
        `%cI have ${
          memes.length - 1
        } more memes. Navigate through the website to see them.`,
        styles.message
      );
    } else {
      console.log(
        `%c${memes.length - shownMemes.size} memes remaining`,
        styles.message
      );
    }

    // Return the meme that was shown
    return memes[randomIndex];
  }, [shownMemes]);

  // Initial setup on mount
  useLayoutEffect(() => {
    if (!isInitialized && validRoute) {
      // Print greeting
      console.log(
        "%c< Crafted with love by me />%c\nFeel free to check out the source code or get in touch!",
        styles.greeting,
        styles.message
      );

      setIsInitialized(true);
    }
  }, [showNewMeme, shownMemes.size, isInitialized, validRoute]);

  return {
    showNewMeme,
  };
};
