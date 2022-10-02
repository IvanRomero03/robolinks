import { Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect } from "react";
import client from "../client";

export const LinkPage = () => {
  const router = useRouter();
  const { short } = router.query;
  String(short).replaceAll("%20", " ");
  const { data, isLoading, isError } = useQuery(
    ["linkName", short],
    async () => await client.get(`/Link/getByShort?short=${short}`)
  );

  const getlocation = async () => {
    try {
      const response = await client.get("https://geolocation-db.com/json/");
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const load = async () => {
      const ipResponse = await getlocation();
      const call = await client.post("/Visit/createVisit", {
        idLink: data?.data?.idLink,
        country: ipResponse?.data?.country_name,
        ip: ipResponse?.data?.IPv4,
      });
      window.location.replace(data?.data?.url);
    };
    if (data) {
      load();
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      router.push("/404/404");
    }
  }, [isError]);

  return <Spinner />;
};

export default LinkPage;
