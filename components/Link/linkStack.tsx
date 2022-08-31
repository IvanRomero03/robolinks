import { Spinner, Stack, VStack, Text, HStack } from "@chakra-ui/react";
import React from "react";
import { LinkComponent } from "./LinkComponent";
import { useQuery } from "@tanstack/react-query";
import client from "../../client";
import { isMobile } from "react-device-detect";

const LinkStack = ({ search, tags, idUser }) => {
  const { data, isLoading, isError, isFetching } = useQuery(["links"], () =>
    client.post("/Link/searchLinks", {
      search: search,
      tags: tags,
    })
  );

  const chunk = (arr, size) =>
    Array.from({ length: Math.ceil(arr?.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );
  const chunkedData = chunk(data?.data, isMobile ? 1 : 3);

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
              <HStack key={index} justify={"left"} w="90%" spacing={16}>
                {chunk.map((link) => (
                  <LinkComponent
                    key={link.idLink}
                    idLink={link.idLink}
                    idUser={idUser}
                  />
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
