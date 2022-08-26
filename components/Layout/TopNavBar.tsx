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
        minW="100%"
        align={"center"}
        wrap="wrap"
        padding={"1.5rem"}
        justify="space-between"
        background={"gray.700"}
        position="fixed"
        backdropBlur={"sm"}
        opacity={0.9}
        zIndex={1}
      >
        <a href="http://github.com/RoBorregos">
          <Image
            src={"http://github.com/RoBorregos.png"}
            alt="logo"
            boxSize="50px"
            opacity={1.5}
          />
        </a>
        <Heading opacity={1}>RoboLinks</Heading>
        <TopRight picUrl={picUrl} />
      </Flex>
    </>
  );
};
