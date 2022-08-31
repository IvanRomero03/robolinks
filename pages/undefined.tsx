import { useRouter } from "next/router";

const undefinedPage = () => {
  const router = useRouter();
  router.push("/");
};

export default undefinedPage;
