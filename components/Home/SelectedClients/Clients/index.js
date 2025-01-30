import { forwardRef, useState } from "react";
import styles from "../SelectedClients.module.css";
import { CLIENTS } from "@/constants/clients";
import ChangeText from "@/components/Global/ChangeText";
import { useHoverCapable } from "@/hooks/core/useHoverCapable";
import Link from "next/link";

const ClientItem = forwardRef(({ client }, ref) => {
  const isHoverCapable = useHoverCapable();

  const [hoverText, setHoverText] = useState(client.services);

  // Hover text logic
  const handleMouseEnter = () => {
    if (isHoverCapable) {
      setHoverText("Open Project");
    }
  };
  const handleMouseLeave = () => {
    if (isHoverCapable) {
      setHoverText(client.services);
    }
  };
  const handleFocus = () => {
    if (isHoverCapable) {
      setHoverText("Open Project");
    }
  };

  return (
    <div ref={ref} className={`${styles["client-container"]}`}>
      <div>
        <Link
          href={client.link}
          target="_blank"
          aria-label={`Visit ${client.name} project page`}
          aria-description="opens in new tab"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onFocus={handleFocus}
          onBlur={handleMouseLeave}
        >
          <h2 className={`mf-hidden text-header-1`}>{client.name}</h2>
        </Link>
        <ChangeText
          text={hoverText}
          className={"text-header-3 mf-hidden"}
          aria-live="off"
        />
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

ClientsList.whyDidYouRender = true;
