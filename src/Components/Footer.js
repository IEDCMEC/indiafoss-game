import { Box, Icon } from "@chakra-ui/react";
import React from "react";
import iedclogo from "@/assets/iedc mec.png";
import Image from "next/image";
import meclogo from "@/assets/mec logo.png";
import InstagramIcon from "@/utils/InstagramIcon";
import TwitterIcon from "@/utils/TwitterIcon";
import MetaIcon from "@/utils/MetaIcon";
import LinkedinIcon from "@/utils/LinkedinIcon";

const Footer = () => {
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      position="absolute"
      backgroundColor="#c2d0dd"
      bottom={"0"}
      width={"100vw"}
      minHeight={{ base: "50px", md: "100px" }}
      mb={"0px"}
    >
      <Box
        display={"flex"}
        alignItems="center"
        justifyContent={"space-between"}
        width={{ base: "95vw", md: "85vw" }}
        flexDirection={{ base: "column", md: "row" }}
        height="100px"
      >
        <Image
          src={iedclogo}
          style={{ height: "50px", width: "calc(400/115 * 50px)" }}
          alt=""
        />
        <Box
          display={"flex"}
          alignItems="center"
          justifyContent={"center"}
          width={{ base: "95vw", md: "40vw" }}
          flexDirection={"column"}
          height={"100%"}
        >
          <Box
            w="45%"
            display={"flex"}
            alignItems="center"
            justifyContent={"space-between"}
            marginRight={"65px"}
            flexDirection={"row"}
            mb={"10px"}
            height={"30%"}
          >
            <Icon
              viewBox="0 0 200 200"
              height={"1.4em"}
              width="1.4em"
              cursor={"pointer"}
              color="black.500"
            >
              <InstagramIcon height={200} width={200} />
            </Icon>
            <Icon
              viewBox="0 0 200 200"
              height={"1.4em"}
              width="1.4em"
              cursor={"pointer"}
              color="black.500"
            >
              <TwitterIcon height={200} width={200} />
            </Icon>
            <Icon
              viewBox="0 0 200 200"
              height={"1.4em"}
              width="1.4em"
              cursor={"pointer"}
              color="black.500"
            >
              <MetaIcon height={200} width={200} />
            </Icon>
            <Icon
              viewBox="0 0 200 200"
              height={"1.4em"}
              width="1.4em"
              cursor={"pointer"}
              color="black.500"
            >
              <LinkedinIcon height={200} width={200} />
            </Icon>
          </Box>
          <p
            style={{
              textAlign: "center",
              fontSize: "1.3rem",
              color: "black",
              marginRight: "65px",
            }}
          >
            Made with 💙 MEC
          </p>
        </Box>
        <Image
          src={meclogo}
          style={{ height: "60px", width: "calc(340/170 * 60px)" }}
          alt=""
        />
      </Box>
    </Box>
  );
};

export default Footer;
