import Scrollbar from "@/components/Global/Scrollbar";
import { useContact } from "@/context/ScrollbarContext";
import { useRouter } from "next/router";

export default function CTA({ className }) {
  const { contactOpen, setContactOpen } = useContact();
  const router = useRouter();
  const isHomePage = router.pathname === "/";

  const handleClick = async () => {
    setContactOpen(false);
    const { startLenis } = await import("@/components/Global/SmoothScrolling");
    startLenis();
  };

  // Determine the props based on state
  const getScrollbarProps = () => {
    if (contactOpen) {
      // State 2: Close contact popover
      return {
        text: "Close",
        onClick: handleClick,
        href: undefined,
      };
    } else if (!isHomePage) {
      // State 3: On any page except home, show "Close" that links to home
      return {
        text: "Close",
        onClick: undefined,
        href: "/",
      };
    } else {
      // State 1: On homepage, open contact popover
      return {
        text: "Contact",
        onClick: undefined,
        href: "mailto:vovavindar@gmail.com",
      };
    }
  };

  const props = getScrollbarProps();

  return (
    <Scrollbar
      text={props.text}
      href={props.href}
      onClick={props.onClick}
      className={className}
    />
  );
}
