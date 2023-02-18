import { Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect } from "react";
import client from "../client";
import { GetServerSideProps } from "next";
import { lookup } from "geoip-lite";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const short = context.params.short;
  String(short).replaceAll("%20", " ");
  const response = await client.get(`/Link/getByShort?short=${short}`);
  if (response.data.error != null) {
    console.log("error");
    return {
      notFound: true,
    };
  }
  const url = response?.data?.url;
  const idLink = response?.data?.idLink;
  try {
    console.log("antes de geo");
    const ip =
      context?.req?.headers["x-forwarded-for"] ||
      context?.req?.socket?.remoteAddress ||
      null;
    const geo = lookup(ip);
    console.log("GeoInfo", geo);
    const call = await client.post("/Visit/createVisit", {
      idLink: idLink,
      country: geo?.country || "Unknown",
      ip: ip,
    });
  } catch (error) {
    console.log(error);
  }
  return {
    props: {
      linkUrl: url,
      idLink: idLink,
      test: "test",
    },
  };
};

export const LinkPage = ({
  linkUrl,
  idLink,
  test,
}: {
  linkUrl: string;
  idLink: number;
  error: boolean;
  test: string;
}) => {
  const router = useRouter();
  // const { short } = router.query;
  // String(short).replaceAll("%20", " ");
  // const { data, isLoading, isError } = useQuery(
  //   ["linkName", short],
  //   async () => await client.get(`/Link/getByShort?short=${short}`)
  // );
  console.log(test);

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
        idLink: idLink,
        country: ipResponse?.data?.country_name,
        ip: ipResponse?.data?.IPv4,
      });
      window.location.replace(linkUrl);
    };
    if (idLink && linkUrl) {
      load();
    }
  }, []);

  return <Spinner />;
};

export default LinkPage;
