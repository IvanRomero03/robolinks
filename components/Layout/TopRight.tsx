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
import { deleteCookie } from "cookies-next";
type props = {
  picUrl?: string;
  idUser?: string;
  username?: string;
};

export const TopRight = ({ picUrl = "", username, idUser }: props) => {
  const router = useRouter();
  return (
    <>
      <HStack>
        <Avatar src={picUrl} name={username ?? ""} />
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
