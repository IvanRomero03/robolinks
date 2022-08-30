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
import { TopRight } from "./TopRight";
import { theme } from "../../styles/theme";
import { useColorMode } from "@chakra-ui/react";

export const TopNavBar = ({
  picUrl = "http://github.com/IvanRomero03.png",
}) => {
  const router = useRouter();
  const { colorMode } = useColorMode();

  return (
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
        <HStack minW="100%" justify={"space-between"}>
          <Image
            //src={colorMode == "dark" ? "Logo_blanco.png" : "Logo_negro.png"}
            src={"Logo_blanco.png"}
            alt="logo"
            maxH={"65px"}
            minH={"65px"}
            minW={"65px"}
            opacity={1.5}
            onClick={() => router.push("/")}
            cursor={"pointer"}
          />
          <Heading opacity={1} color={"white"}>
            RoboLinks
          </Heading>
          <TopRight picUrl={picUrl} />
        </HStack>
      </Flex>
    </>
  );
};
