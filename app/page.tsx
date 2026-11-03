import Image from "next/image";
import styles from "./page.module.css";
import PageUI from "@/lib/ui/page";

export default function Home() {
  return (
    <div className={styles.page}>
      <PageUI />
    </div>
  );
}
