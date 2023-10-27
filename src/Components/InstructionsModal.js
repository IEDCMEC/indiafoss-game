import React from "react";
import { howtoPlayData } from "../data/howtoplayData";
import { Modal, ModalContent } from "@chakra-ui/react";

function InstructionsModal({ open, handleClose }) {
  return (
    <Modal isOpen={open} onClose={handleClose} size={"xl"}>
      <ModalContent
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          padding: "2rem",
        }}
        sx={{ "&::-webkit-scrollbar": { display: "none" } }}
      >
        <div
          style={{
            fontSize: "1.5rem",
            fontWeight: "700",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Instructions
        </div>
        {howtoPlayData.map((play, index) => {
          return (
            <p
              style={{
                fontSize: "1.1rem",
              }}
              key={index}
            >
              {index + 1}
              {" . "}
              {play}
            </p>
          );
        })}
      </ModalContent>
    </Modal>
  );
}

export default InstructionsModal;
