import React, { useContext, useEffect, useState } from 'react'
import { Button, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { SearchTermContext } from '../../SearchTermContext/SearchTermContext'
import { handleDelete } from '../../Api/DeleteWord'
import { WordsContext } from '../../wordsContext/WordsContext'


const Words = () => {
    const { searchValue } = useContext(SearchTermContext)
    const { words, setWords } = useContext(WordsContext)



    useEffect(() => {
        fetch("http://localhost:7000")
            .then((res) => res.json())
            .then((data) => {
                setWords(data.filter((xr) => xr.fr.toLowerCase().includes(searchValue) || xr.darija.toLowerCase().includes(searchValue)));
            });
    }, [searchValue, words])



    return (
        <>
            <TableContainer>
                <Table size='md'>
                    <Thead >
                        <Tr borderBottom={"2px"}>
                            <Th borderRight={"1px"}>French</Th>
                            <Th>Arabic</Th>
                            <Th >Commun sounds</Th>
                            <Th>Changed F_A</Th>
                            <Th>Changed A_F</Th>
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {words.map((word, index) => (
                            <Tr key={index}>
                                <Td borderRight={"1px"}>{word.fr}</Td>
                                <Td>{word.darija}</Td>
                                <Td >{word.not_changed}</Td>
                                <Td>{word.changed} </Td>
                                <Td>{word.changedA_F}</Td>
                                <Td>
                                    <Button>edit</Button>
                                    <Button onClick={() => handleDelete(word.id)}>Delete</Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>



        </>
    )
}

export default Words