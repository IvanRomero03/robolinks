import { Flex, Heading, HStack, Image, useColorMode } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { TopRight } from "./TopRight";

export const TopNavBar = () => {
  const router = useRouter();
  const { colorMode } = useColorMode();

  return (
    <>
      <Head>
        <title>RoboLinks</title>
        <meta
          name="description"
          content="Link shortener and administrator for RoBorregos"
          property="description"
        />
        <meta
          name="keywords"
          content="Links Shortener RoBorregos RoboLinks"
          property="keywords"
        />
        <meta name="author" content="RoBorregos" property="author" />
        <meta name="image" content="./favicon.ico" property="image" />
        <link rel="icon" href="./favicon.ico" />
      </Head>
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
            src={
              "https://bfmvwivyerrefrhrlmxx.supabase.co/storage/v1/object/public/imagenes/Logo_blanco.png"
            }
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
          <TopRight />
        </HStack>
      </Flex>
    </>
  );
};
