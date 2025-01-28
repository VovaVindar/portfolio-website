import { forwardRef, useState } from "react";
import styles from "../SelectedClients.module.css";
import { CLIENTS } from "@/constants/clients";
import ChangeText from "@/components/Global/ChangeText";
import { useHoverCapable } from "@/hooks/utils/useHoverCapable";
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

  return (
    <div ref={ref} className={`${styles["client-container"]}`}>
      <div>
        <Link
          href={client.link}
          target="_blank"
          aria-label={`Visit ${client.name} project page (opens in new tab)`}
        >
          <h1
            className={`mf-hidden`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {client.name}
          </h1>
        </Link>
        <ChangeText text={hoverText} className={"text-header-3 mf-hidden"} />
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
