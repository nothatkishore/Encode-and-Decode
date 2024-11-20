import React, { useState } from 'react';
import TextField from "@mui/material/TextField";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { Button } from '@mui/material';
import axios from 'axios';


const App = () => {
  const [mode, setMode] = useState("Encode");
  const [algo, setAlgo] = useState("");
  const [text, setText] = useState("");
  const [Result, setResult] = useState("")


  const handleAlgoChange = (event) => {
    const selectedAlgo = event.target.value;
    setAlgo(selectedAlgo);
  };

  const handleModeChange = (event) => {
    const selectedMode = event.target.value;
    setMode(selectedMode);
  };

  const handleText = (event) => {
    const updatedText = event.target.value;
    setText(updatedText);
  }

  const handleSubmit = async () => {
    try {

      const data = { text }

      const meth = mode == "encode" ? "encrypt": "decrypt";
      const url = `encode-and-decode-production.up.railway.app/${algo}/${meth}`;
      const response = await axios.post(url, data);
      console.log(response.data);
      setResult(response.data.status);

    } catch (error) {
      console.log(error);
      setResult("Server error");
    }
  };

  return (
    <div className='h-screen flex flex-col'>

      {/* Header */}
      <header className='bg-blue-50 p-4 shadow-lg'>
        <div className='container mx-auto shadow-sm bg-white flex justify-center rounded-lg'>
          <div className='p-4 text-2xl text-slate-600 font-medium sm:p-6 sm:text-4xl'>
            Encode
            <span className='text-blue-300'> and</span> Decode
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='flex-1 flex flex-col sm:flex-row bg-slate-100'>

        {/* Input Section */}
        <div className="h-2/5 sm:w-2/5 sm:h-full p-4 sm:p-8 flex items-start">

          <div className='flex-1 flex flex-col'>
            <div className='my-4 py-10'>
              <h1 className='text-3xl font-semibold text-gray-600 text-center'>
                {
                  mode == "encode" ? "Plaintext" : "Ciphertext"
                }
              </h1>
            </div>
            <div className='flex-1'>
              <TextField
                id="outlined-multiline-static"
                label={mode}
                placeholder={`Enter value to be ${mode.toLowerCase()}d`}
                multiline
                rows={20}
                className='w-full'
                value={text}
                onChange={handleText}
              />
            </div>
          </div>
        </div>

        {/* Middle Section for Options */}
        <div className="bg-gray-100 shadow-lg border rounded-3xl my-5 
          flex-1 p-4 sm:p-8 flex flex-col justify-center gap-10">

          <div className='flex justify-center'>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="mode-radio-buttons-group-label"
                name="mode-radio-buttons-group"
                value={mode}
                onChange={handleModeChange}
                className='flex gap-7'
              >
                <FormControlLabel value="encode" control={<Radio />} label="Encode" />
                <FormControlLabel value="decode" control={<Radio />} label="Decode" />
              </RadioGroup>
            </FormControl>
          </div>

          <div>
            <FormControl fullWidth>
              <h1 className='mb-2 text-gray-700'>Select Algorithm</h1>
              <Select
                className="w-full"
                labelId="algorithm-select-label"
                id="algorithm-select"
                value={algo}
                onChange={handleAlgoChange}
                defaultValue=''
              >
                <MenuItem value="aes">Advanced Encryption Standard (AES)</MenuItem>
                <MenuItem value="des">Data Encryption Standard (DES)</MenuItem>
                <MenuItem value="rc4">Rivest Cipher 4 (RC4)</MenuItem>
              </Select>
            </FormControl>
          </div>

          {/* Mode Selection */}

          <div className='flex justify-center'>
            <Button
              className='flex-1 !bg-slate-700 !p-2 !rounded-lg'
              variant='contained'
              onClick={handleSubmit}
            >
              {mode}
            </Button>

          </div>

        </div>

        {/* Output Section */}
        <div className="h-2/5 sm:w-2/5 sm:h-full p-4 sm:p-8 flex items-start">

          <div className='flex-1 flex flex-col'>
            <div className='my-4 py-10'>
              <h1 className='text-3xl font-semibold text-gray-600 text-center'>
                {
                  mode == "encode" ? "Ciphertext" : "Plaintext"
                }
              </h1>
            </div>
            <div className='flex-1'>
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={20}
                className="w-full !text-black .Mui-readOnly"
                value={Result}
              />
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default App;
