/**
 * Prevents Next.js from removing styles during page transitions
 * This fixes the flash of unstyled content during route changes
 *
 * Works by:
 * 1. Removing data-n-p attributes from stylesheet links
 * 2. Removing media="x" attributes from style elements
 *
 * See: https://github.com/vercel/next.js/issues/17464
 */

import { useEffect } from "react";

export function usePreventStyleRemoval() {
  useEffect(() => {
    try {
      // Remove data-n-p from existing stylesheets
      Array.from(
        document.querySelectorAll('head > link[rel="stylesheet"][data-n-p]')
      ).forEach((node) => {
        node.removeAttribute("data-n-p");
      });

      const mutationHandler = (mutations) => {
        mutations.forEach(({ target }) => {
          try {
            if (
              target.nodeName === "STYLE" &&
              target.getAttribute("media") === "x"
            ) {
              target.removeAttribute("media");
            }
          } catch (err) {
            console.warn("Error handling style mutation:", err);
          }
        });
      };

      const observer = new MutationObserver(mutationHandler);
      observer.observe(document.head, {
        subtree: true,
        attributeFilter: ["media"],
      });

      return () => {
        observer.disconnect();
      };
    } catch (err) {
      console.warn("Error setting up style removal prevention:", err);
    }
  }, []);
}
