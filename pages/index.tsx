import React, { useState } from "react";
import { Code, Container, Spacer, VStack, Box, Flex } from "@chakra-ui/react";
import { TopNavBar } from "../components/Layout/TopNavBar";
import { LinkComponent } from "../components/Link/LinkComponent";
// idea https://excalidraw.com/#json=myQ7PbofUoi1ufoU6SZ65,jLB2YW1xcTTW4qktRK4V1w
export default function Home() {
  return (
    <>
      <VStack>
        <TopNavBar />
        <Container
          minW="100%"
          padding={"3rem"}
          background={"gray.700"}
          backdropBlur={"sm"}
          opacity={0}
        ></Container>
      </VStack>
      <VStack m="2%">
        <LinkComponent idLink="1" />
      </VStack>
    </>
  );
}
