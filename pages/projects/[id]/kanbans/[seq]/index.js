import { useRouter } from "next/router";

const Kanban = () => {
  const router = useRouter();
  const { id, seq } = router.query;

  return (
    <div>
      <div>{id}</div>
      <div>{seq}</div>
    </div>
  );
};

export default Kanban;
