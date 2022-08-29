import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import client from "../../client";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@chakra-ui/react";

export const LinkPage = () => {
  const router = useRouter();
  const { title } = router.query;
  String(title).replace("%20", " ");
  const { data, isLoading, error } = useQuery(
    ["linkName", title],
    async () => await client.get(`/Link/getByName?title=${title}`)
  );
  useEffect(() => {
    if (data) {
      window.location.href = data?.data?.url;
    }
  }, [data]);
  return <Spinner />;
};

export default LinkPage;