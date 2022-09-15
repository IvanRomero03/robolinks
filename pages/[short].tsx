import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import client from "../client";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@chakra-ui/react";

export const LinkPage = () => {
  const router = useRouter();
  const { short } = router.query;
  String(short).replaceAll("%20", " ");
  const { data, isLoading, isError } = useQuery(
    ["linkName", short],
    async () => await client.get(`/Link/getByShort?short=${short}`)
  );

  useEffect(() => {
    if (data) {
      window.location.replace(data?.data?.url);
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
