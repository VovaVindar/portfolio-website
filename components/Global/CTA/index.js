import Scrollbar from "@/components/Global/Scrollbar";
import { useContact } from "@/context/ScrollbarContext";

export default function ContactScrollbar({ className }) {
  const { contactOpen, setContactOpen } = useContact();

  const handleClick = async () => {
    setContactOpen(false);
    const { startLenis } = await import("@/components/Global/SmoothScrolling");
    startLenis();
  };

  return (
    <Scrollbar
      text={contactOpen ? "Close" : "Contact"}
      href={contactOpen ? undefined : "mailto:vovavindar@gmail.com"}
      onClick={contactOpen ? handleClick : undefined}
      className={className}
    />
  );
}
