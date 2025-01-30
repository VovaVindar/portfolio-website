import styles from "./SelectedClients.module.css";
import Clients from "@/components/Home/SelectedClients/Clients";
import ClientsSubheader from "@/components/Home/SelectedClients/ClientsSubheader";
import { useClientsScrollAnimations } from "@/hooks/animations/scroll/useClientsScrollAnimations";

const SelectedClients = () => {
  const clientsOnscroll = useClientsScrollAnimations();

  return (
    <section className={styles["clients"]}>
      <div className="text-body-1">
        <ClientsSubheader clientsOnscroll={clientsOnscroll} />
      </div>
      <div>
        <Clients clientsOnscroll={clientsOnscroll} />
      </div>
    </section>
  );
};

export default SelectedClients;

SelectedClients.whyDidYouRender = true;
