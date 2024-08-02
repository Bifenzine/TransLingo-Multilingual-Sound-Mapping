import { Badge, Flex, Grid, Input, Text } from "@chakra-ui/react"
import Words from "../Words/Words"
import { useContext, useState } from "react"
import { SearchTermContext } from "../../SearchTermContext/SearchTermContext"
import { WordsContext } from "../../wordsContext/WordsContext"

const SearchBar = () => {
    const { searchValue, setSearchValue } = useContext(SearchTermContext)
    const { words, setWords } = useContext(WordsContext)

    const countOccurrences = (letter) => {
        let notChangedCount = 0;
        let changedCount = 0;

        words.forEach(word => {
            word.not_changed.split(',').forEach(char => {
                if (char === letter) notChangedCount++;
            });

            word.changed.split(',').forEach(char => {
                if (char === letter) changedCount++;
            });
        });

        return { notChangedCount, changedCount };
    };

    const handleLetterSearch = (e) => {
        const letter = e.target.value;
        const { notChangedCount, changedCount } = countOccurrences(letter);
        console.log(`Occurrences in not_changed: ${notChangedCount}`);
        console.log(`Occurrences in changed: ${changedCount}`);

    };

    return (
        <>
            <Grid mb={10} w={"full"} justifyContent={"Center"}>
                <Input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} mb={10} w={600} variant="flushed"
                    placeholder='Search' />
                <Flex gap={5}>
                    <Words />
                    <Grid alignItems={"start"}>

                        <Input mb={1} w={100} variant="flushed"
                            placeholder='letter' onChange={handleLetterSearch} />



                        <Text fontSize='xs' fontWeight='bold'>
                            COMMUN SOUNDS :
                            <Badge ml='1' fontSize='0.8em' colorScheme='green'>
                                1
                            </Badge>
                        </Text>


                        <Text fontSize='xs' fontWeight='bold'>
                            CHANGED F_A :
                            <Badge ml='1' fontSize='0.8em' colorScheme='green'>
                                2
                            </Badge>
                        </Text>




                    </Grid>
                </Flex>
            </Grid>
        </>
    );
};

export default SearchBar;