import { forwardRef, useState } from "react";
import styles from "../SelectedClients.module.css";
import { CLIENTS } from "@/constants/clients";
import { useProjectHoverAnimations } from "@/hooks/animations/hover/useProjectHoverAnimations";

const ClientItem = forwardRef(({ client }, ref) => {
  const [hoverText, setHoverText] = useState(client.services);

  const { elementRef, displayText } = useProjectHoverAnimations(hoverText);

  // Hover text logic
  const handleMouseEnter = () => {
    setHoverText("Open Project");
  };

  const handleMouseLeave = () => {
    setHoverText(client.services);
  };

  return (
    <div ref={ref} className={`${styles["client-container"]}`}>
      <div>
        <h1
          className={`mf-hidden`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {client.name}
        </h1>
        <span ref={elementRef} className="text-header-3 mf-hidden">
          {displayText}
        </span>
      </div>
    </div>
  );
});

ClientItem.displayName = "ClientItem";

const ClientsList = ({ clientsOnscroll }) => {
  return (
    <>
      {CLIENTS.list.map((client, index) => (
        <ClientItem
          key={client.name}
          client={client}
          ref={(el) => (clientsOnscroll.current[index + 1] = el)}
        />
      ))}
    </>
  );
};

export default ClientsList;
