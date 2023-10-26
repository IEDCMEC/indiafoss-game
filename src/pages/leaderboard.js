import { Box, Text } from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  const fetchLeaderBoard = async () => {
    const res = await axios.get("/api/leaderboard");

    if (res.status === 200) setLeaderboard(res.data);
    else console.log(res.data);
  };

  useEffect(() => {
    fetchLeaderBoard();
  }, []);
  console.log(leaderboard.data);
  return (
    // <>
    //   <p>{JSON.stringify(leaderboard)}</p>
    // </>
    <Box
      display={"flex"}
      alignItems="center"
      justifyContent={"center"}
      flexDirection={"column"}
      backgroundColor="#c2d0dd"
      minHeight={"100vh"}
    >
      <Text fontSize={"2.5rem"} fontWeight={"600"} color={"black"} mb={"50px"}>
        Leaderboard
      </Text>
      <TableContainer>
        <Table
          variant="simple"
          size={'md'}
          colorScheme="blue"
          // border={1}
          sx={{
            width: "85vw",
            // border: "1px solid black",
            // borderRadius: "10px",
          }}
        >
          <Thead>
            <Tr backgroundColor='#094074'>
              <Th border={'2px solid #094074'} color={'white'}>Name</Th>
              <Th border={'2px solid #094074'} color={'white'}>Score</Th>
              <Th border={'2px solid #094074'} color={'white'}>Time Taken</Th>
            </Tr>
          </Thead>
          <Tbody>
            {leaderboard.data !== undefined &&
              leaderboard.data.map((value, index) => {
                return (
                  <Tr key={index}>
                    <Th border={'2px solid #094074'} color='black'>{value.name}</Th>
                    <Th border={'2px solid #094074'} color='black'>{value.score}</Th>
                    <Th border={'2px solid #094074'} color='black'>{value.time_taken}</Th>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Leaderboard;
