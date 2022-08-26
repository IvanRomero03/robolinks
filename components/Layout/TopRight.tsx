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
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

export const TopRight = ({ picUrl = "http://github.com/RoBorregos.png" }) => {
  return (
    <>
      <HStack spacing={4}>
        <Image
          src={picUrl}
          alt="logo"
          boxSize="50px"
          borderRadius={"50%"}
          opacity={1}
        />
        <Menu>
          <MenuButton>
            <IconButton icon={<HamburgerIcon />} aria-label="Menu" />
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
