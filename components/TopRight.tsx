import {
  IconButton,
  Image,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

export const TopRight = ({ picUrl = "http://github.com/RoBorregos.png" }) => {
  return (
    <>
      <HStack spacing={4}>
        <Image src={picUrl} alt="logo" boxSize="50px" borderRadius={"50%"} />
        <Menu>
          <MenuButton>
            <IconButton
              aria-label="Menu"
              icon={<Image src={picUrl} alt="logo" boxSize="50px" />}
              size="lg"
              variant="ghost"
              colorScheme={"blue"}
            />
          </MenuButton>
          <MenuList>
            <MenuItem>asd</MenuItem>
            <MenuItem>asd</MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </>
  );
};
