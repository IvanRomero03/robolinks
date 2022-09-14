import {
  IconButton,
  Image,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Button,
  Avatar,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { useRouter } from "next/router";
import { deleteCookie, getCookie, hasCookie } from "cookies-next";
import { useState, useEffect } from "react";
import client from "../../client";
import { useQuery } from "@tanstack/react-query";

export const TopRight = () => {
  const router = useRouter();
  const idUser = getCookie("RoboLinks");

  const { data, isLoading, isError } = useQuery(["user"], async () => {
    const { data } = await client.get("/User/getUser?idUser=" + idUser);
    return data;
  });
  return (
    <>
      <HStack>
        <Avatar src={data?.picUrl ?? ""} name={data?.username ?? ""} />
        <ColorModeSwitcher />
        <Menu>
          <MenuButton>
            <IconButton
              icon={<HamburgerIcon />}
              aria-label="Menu"
              variant="ghost"
              color="white"
            />
          </MenuButton>
          {idUser ? (
            <MenuList>
              <MenuItem
                onClick={() => {
                  router.push("/user/" + idUser);
                }}
              >
                <Text>Profile</Text>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  deleteCookie("RoboLinks");
                  router.push("/login");
                }}
              >
                <Text>Sign Out</Text>
              </MenuItem>
            </MenuList>
          ) : (
            <MenuList>
              <MenuItem
                onClick={() => {
                  router.push("/login");
                }}
              >
                <Text>Log In</Text>
              </MenuItem>
            </MenuList>
          )}
        </Menu>
      </HStack>
    </>
  );
};
