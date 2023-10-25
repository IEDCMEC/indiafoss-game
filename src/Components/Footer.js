import { Box } from "@chakra-ui/react";
import React from "react";
import iedclogo from '@/assets/iedc mec.png';
import Image from "next/image";
const Footer = () => {
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      position="absolute"
      bottom={"0"}
      width={"100vw"}
      minHeight={{ base: "50px", md: "100px" }}
    >
        {/* 400/115 */}
        <Image src={iedclogo} style={{height:'50px', width:'calc(400/115 * 50px)'}} alt=""/>
    </Box>
  );
};

export default Footer;
