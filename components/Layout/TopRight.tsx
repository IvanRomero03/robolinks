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
type props = {
  picUrl: string;
  username?: string;
};

export const TopRight = ({
  picUrl = "http://github.com/RoBorregos.png",
  username,
}: props) => {
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
          <MenuList>
            <MenuItem>
              <Text>Profile</Text>
            </MenuItem>
            <MenuItem>
              <Text>Sign Out</Text>
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </>
  );
};
