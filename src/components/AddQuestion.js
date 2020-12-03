import React from 'react'
import {useState} from 'react';
import db from '../firebase';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import { v4 as uuidv4 } from 'uuid';

import { makeStyles } from '@material-ui/core/styles';
import { useEventCallback } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
      },
    },
    button: {
      margin: theme.spacing(1),
    }
  }))
export default function AddQuestion() {
    const classes = useStyles();

    const [question,setQuestion] = useState([
        {id : uuidv4(), question: ""},
    ]);

    const [option,setOption] = useState([
        {id : uuidv4(), option: ""},
    ]); 

    const sendQuestion = (e) => {
        e.preventDefault();
        db.collection('Questions').add({
            Question: question
            });
        setQuestion("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("questions",question);
    };

    const handleChangeInput = (id ,event) => {
        const newquestion = question.map( i => {
            if(id === i.id)
            {i[event.target.name] = event.target.value;}
            return i;
        })
        setQuestion(newquestion);
    }

    const handleAddQuestion = () => {
        setQuestion([...question,{id:uuidv4(),Question:''}])
    }
    const handleAddOption = () => {
        setOption([...option,{id:uuidv4(),Option:''}])
    }


    const handleRemoveFields = id => {
        const values = [...question];
        values.splice(values.findIndex(value => value.id === id),1);
        setQuestion(values);
    }
    return (
        <div>
            <Container>
                <h1>Add question</h1>
                <form className={classes.root} onSubmit = {handleSubmit}>
                {
                    question.map(question=> (
                        <div>
                            <TextField
                            name = "Question"
                            label="Question"
                            variant = "filled"
                            value = {question}
                            onChange = {event => handleChangeInput(question.id,event)}
                            />
                        <IconButton disabled = {question.length === 1} onClick ={ () => handleRemoveFields()}>
                        <RemoveIcon/>
                        </IconButton>
                        
                        <IconButton onClick ={ handleAddQuestion}>
                        <AddIcon/>
                        </IconButton>  

                           
                        </div>
                    ),
                    option.map(option => (
                       <div> <TextField
                            name = "Option"
                            label="Option"
                            value = {option}
                            onChange = {event => handleChangeInput(option.id,event)}
                            />
                        <IconButton disabled = {option.length === 1} onClick ={ () => handleRemoveFields()}>
                        <RemoveIcon/>
                        </IconButton>
                        <IconButton onClick ={ handleAddOption}>
                        <AddIcon/>
                        </IconButton> </div>
                    )

                    )
                    )
                }
                <Button className={classes.button}
                        variant = "contained"
                        color = "primary"
                        type = "submit"
                        onClick = {handleSubmit}>submit</Button>
                </form>
            </Container>
        </div>
    )
}
