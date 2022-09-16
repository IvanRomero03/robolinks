import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import client from "../client";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@chakra-ui/react";
import useReactIpLocation from "react-ip-details";

export const LinkPage = () => {
  const router = useRouter();
  const { short } = router.query;
  String(short).replaceAll("%20", " ");
  const { data, isLoading, isError } = useQuery(
    ["linkName", short],
    async () => await client.get(`/Link/getByShort?short=${short}`)
  );

  const { ipResponse, errorMessage } = useReactIpLocation({
    numberToConvert: 100,
  });

  useEffect(() => {
    if ((data && ipResponse) || (data && errorMessage)) {
      const call = client.post("/Visit/createVisit", {
        idLink: data?.data?.idLink,
        country: ipResponse.country_name,
        ip: ipResponse.IPv4,
      });
      window.location.replace(data?.data?.url);
    }
  }, [data, ipResponse]);

  useEffect(() => {
    if (isError) {
      router.push("/404/404");
    }
  }, [isError]);

  return <Spinner />;
};

export default LinkPage;
