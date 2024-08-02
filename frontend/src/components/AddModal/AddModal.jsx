import React, { useState } from 'react'
import './addModal.css'
import { Box } from '@chakra-ui/react';

const AddModal = ({ closeModel }) => {

    const [inputs, setInputs] = useState({
        french: '',
        arabic: '',
        ok: '',

    });

    return (
        <Box className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <Box bg={"gray.dark"} className="form border-2 mt-4 mb-8 bg-slate-900 border-slate-600">
                <p className="title">Add Word</p>
                <div className="flexo">
                    <label>
                        <input required="" placeholder="" type="text" className="input bg-slate-900"
                            value={inputs.french}
                            onChange={(e) => setInputs({ ...inputs, french: e.target.value })}
                        />
                        <span>French</span>
                    </label>
                    <label>
                        <input required="" placeholder="" type="text" className="input bg-slate-900"
                            value={inputs.arabic}
                            onChange={(e) => setInputs({ ...inputs, arabic: e.target.value })}
                        />
                        <span>Arabic</span>
                    </label>
                </div>
                <label>
                    <input required="" placeholder="" type="text" className="input bg-slate-900"
                        value={inputs.ok}
                        onChange={(e) => setInputs({ ...inputs, ok: e.target.value })}
                    />
                    <span>---</span>
                </label>

                <div className='flex justify-evenly items-center w-full gap-4'>
                    <button className="submit w-4/6" type='submit'>Add</button>
                    <button className='bg-slate-600 px-2 py-2 rounded-md hover:bg-slate-950' onClick={closeModel} >Cancel</button>
                </div>
            </Box>
        </Box>
    )
}

export default AddModal