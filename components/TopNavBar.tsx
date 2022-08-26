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
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { TopRight } from "./TopRight";

export const TopNavBar = ({
  picUrl = "http://github.com/IvanRomero03.png",
}) => {
  const router = useRouter();

  return (
    // Flex to top
    <>
      <Flex
        w="100%"
        align={"center"}
        wrap="wrap"
        padding={"1.5rem"}
        justify="space-between"
        background={"gray.700"}
        position="fixed"
      >
        <a href="http://github.com/RoBorregos">
          <Image
            src={"http://github.com/RoBorregos.png"}
            alt="logo"
            boxSize="50px"
          />
        </a>
        <Heading>RoboLinks</Heading>
        <TopRight picUrl={picUrl} />
      </Flex>
    </>
  );
};
