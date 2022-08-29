import {
  Flex,
  Box,
  Container,
  Button,
  Image,
  Code,
  Text,
  Heading,
  VStack,
  Link,
  HStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { isMobile } from "react-device-detect";
import { TopNavBar } from "../components/Layout/TopNavBar";
import client from "../client";
import { useQuery } from "@tanstack/react-query";

const LinkPage = () => {
  const router = useRouter();
  const { idLink } = router.query;
  const acutalId = String(idLink)?.substring(8, idLink.length);
  const { data, isLoading, error } = useQuery(["link", acutalId], () =>
    client.get(`/Link/getLink?idLink=${acutalId}`)
  );
  console.log(data);

  return (
    <>
      <VStack>
        <TopNavBar />
        <Container
          minW="100%"
          padding={isMobile ? "3.5rem" : "3rem"}
          background={"gray.700"}
          backdropBlur={"sm"}
          opacity={0}
        ></Container>
      </VStack>

      <Heading>Link: {idLink}</Heading>
      <Text>{data?.data?.title}</Text>
      <Text>{data?.data?.url}</Text>
      <Text>{data?.data?.description}</Text>
      <Text>{JSON.stringify(data?.data)}</Text>
    </>
  );
};

export default LinkPage;
