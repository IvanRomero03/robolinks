import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import client from "../client";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@chakra-ui/react";

export const LinkPage = () => {
  const router = useRouter();
  const { title } = router.query;
  String(title).replace("%20", " ");
  const { data, isLoading, isError } = useQuery(
    ["linkName", title],
    async () => await client.get(`/Link/getByName?title=${title}`)
  );

  const load = async () => {
    if (!title) {
      router.push("/404/404");
    }
    const response = await client.get(`/Link/getByName?title=${title}`);

    if (
      response.status !== 200 ||
      response.data.data === null ||
      response.data.data === undefined ||
      response.data.data == "undefined"
    ) {
      router.push("/404/404");
      return;
    }

    window.location.href = data?.data?.url;
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (data) {
      window.location.href = data?.data?.url;
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
