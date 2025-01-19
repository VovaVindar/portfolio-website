import { forwardRef } from "react";
import styles from "../SelectedClients.module.css";
import { CLIENTS } from "@/constants/clients";

const ClientItem = forwardRef(({ client }, ref) => (
  <div ref={ref} className={`${styles["client-container"]} mf-hidden`}>
    <div>
      <h1>{client.name}</h1>
      <span className="text-header-3">{client.services}</span>
    </div>
  </div>
));

ClientItem.displayName = "ClientItem";

const ClientsList = ({ clientsOnscroll }) => (
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

export default ClientsList;
