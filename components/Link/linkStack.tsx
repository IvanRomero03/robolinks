import { Spinner, Stack } from "@chakra-ui/react";
import React from "react";
import { LinkComponent } from "./LinkComponent";
import { useQuery } from "@tanstack/react-query";
import client from "../../client";

const LinkStack = ({ search, tags }) => {
  const { data, isLoading, isError, isFetching } = useQuery(["links"], () =>
    client.post("/Link/searchLinks", {
      search: search,
      tags: tags,
    })
  );
  console.log("LinkStack", isFetching);
  console.log(data);
  return (
    <Stack m="2%" spacing={8}>
      {isLoading ? (
        <Spinner />
      ) : (
        data.data?.map((link) => <LinkComponent idLink={link.idLink} />)
      )}
    </Stack>
  );
};

export default LinkStack;
