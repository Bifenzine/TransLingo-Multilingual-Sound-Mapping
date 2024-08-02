import './App.css'
import { Box, Container } from "@chakra-ui/react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Home } from './pages';
import { SearchTermContext } from './SearchTermContext/SearchTermContext';
import { useState } from 'react';
import { WordsContext } from './wordsContext/WordsContext';

function App() {
	const [searchValue, setSearchValue] = useState("")
	const [words, setWords] = useState([])

	return (
		<>
			<WordsContext.Provider value={{ words, setWords }}>
				<SearchTermContext.Provider value={{ searchValue, setSearchValue }} >
					<Box position={"relative"} w='full' px={40}>


						<Home />



					</Box>
				</SearchTermContext.Provider>
			</WordsContext.Provider>
		</>
	)
}

export default App
