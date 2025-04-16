import { OctoCollection } from "../components/OctoCollection";
import { OctocatState } from "../api/types/OctocatState";
import { useFetchOctocats } from "../api/hooks/useFetchOctocats";
import { FunctionComponent, ReactElement } from "react";
import { useUser } from "../auth/UserContextProvider";
import { useNavigate } from "react-router-dom";
import { useToggleOwnedCat } from "../api/hooks/useToggleOwnedCat";
import styled from "styled-components";
import { Box } from "@primer/react";

const Headline = styled.h1`
  padding-left: 16px;
`;

const Home: FunctionComponent = (): ReactElement => {
  const { isLoggedIn } = useUser();
  const { status, data, error } = useFetchOctocats();
  const mutation = useToggleOwnedCat();
  const navigate = useNavigate();

  const handleToggleOctocat = (octocat: OctocatState) => {
    if (!isLoggedIn) {
      navigate("login");
      return;
    }
    mutation.mutate(octocat);
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "error") {
    console.error("[Home.tsx]: Error in Home-Component:", error);
    return <p>There was an Error, please try again later!</p>;
  }

  return (
    <>
      <Headline>All Rockets available</Headline>
      <Box
        bg="lightblue"
        borderWidth="1px"
        borderStyle="solid"
        borderColor="border.default"
        borderRadius={2}
        p={3}
        px={4}
        fontSize={3}
        fontWeight="bold"
      >
        Sign-up now and get 10% off your first flight!
      </Box>
      <OctoCollection
        octoItems={data ?? []}
        onToggleOctocat={handleToggleOctocat}
      />
    </>
  );
};

export { Home };
