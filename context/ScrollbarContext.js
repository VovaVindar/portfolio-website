import { createContext, useContext, useState, useMemo } from "react";

const ScrollContext = createContext();
const ContactContext = createContext();

export function ScrollbarProvider({ children }) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [contactOpen, setContactOpen] = useState(false);

  const scrollValue = useMemo(
    () => ({
      scrollPosition,
      setScrollPosition,
    }),
    [scrollPosition]
  );

  const contactValue = useMemo(
    () => ({
      contactOpen,
      setContactOpen,
    }),
    [contactOpen]
  );

  return (
    <ScrollContext.Provider value={scrollValue}>
      <ContactContext.Provider value={contactValue}>
        {children}
      </ContactContext.Provider>
    </ScrollContext.Provider>
  );
}

export function useScroll() {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error("useScroll must be used within a ScrollbarProvider");
  }
  return context;
}

export function useContact() {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error("useContact must be used within a ScrollbarProvider");
  }
  return context;
}
