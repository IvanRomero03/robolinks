import { Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";

const undefinedPage = () => {
  const router = useRouter();
  router.push("/");
  return <Spinner />;
};

export default undefinedPage;
