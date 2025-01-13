import { forwardRef } from "react";
import styles from "../SelectedClients.module.css";

const ClientItem = forwardRef(({ client }, ref) => (
  <div
    ref={ref}
    data-cursor-text={client.description}
    className={`${styles["client-container"]} mf-exclusion`}
  >
    <div>
      <h1>{client.name}</h1>
      <span className="text-header-3">{client.services}</span>
    </div>
  </div>
));

const ClientsList = ({ clientsOnscroll }) => (
  <>
    {[
      {
        name: "Aya Muse",
        services: "Web, Dev",
        description: "Description 1",
      },
      {
        name: "Paradigm",
        services: "Web, Product, Brand, Deck, Dev",
        description: "Description 2",
      },
      {
        name: "Dolce & Gabbana",
        services: "Web, Metaverse",
        description: "Description 3",
      },
      { name: "Cognition", services: "Web", description: "Description 4" },
      {
        name: "Align Fund",
        services: "Web, Brand, Dev",
        description: "Description 5",
      },
      {
        name: "Endex AI",
        services: "Web, Brand, Dev",
        description: "Description 6",
      },
      {
        name: "Rove Card",
        services: "Web, Graphic, App, Deck",
        description: "Description 7",
      },
      {
        name: "PRJCTR Institute",
        services: "Mentoring",
        description: "Description 8",
      },
      {
        name: "Twitch",
        services: "Game UI, Graphic",
        description: "Description 9",
      },
      {
        name: "Blackster",
        services: "Web, Brand, Deck, Dev",
        description: "Description 10",
      },
      {
        name: "Jon-Paul Wheatley",
        services: "Web",
        description: "Description 11",
      },
    ].map((client, index) => (
      <ClientItem
        key={client.name}
        client={client}
        ref={(el) => (clientsOnscroll.current[index + 1] = el)}
      />
    ))}
  </>
);

export default ClientsList;
