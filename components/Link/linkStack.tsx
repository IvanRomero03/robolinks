import { Spinner, Stack, VStack, Text, HStack } from "@chakra-ui/react";
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
  const chunk = (arr, size) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );
  const chunkedData = chunk(data?.data, 3);

  return (
    <>
      <VStack>
        {isLoading ? (
          <Spinner />
        ) : isError ? (
          <Text>Error</Text>
        ) : (
          <>
            {chunkedData.map((chunk, index) => (
              <HStack key={index}>
                {chunk.map((link) => (
                  <LinkComponent key={link.idLink} idLink={link.idLink} />
                ))}
              </HStack>
            ))}
          </>
        )}
      </VStack>
    </>
  );
};

export default LinkStack;
