import React, { useEffect, useState } from "react";
import axiosWithAuth from "../helpers/axiosWithAuth";
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import fetchColorService from '../services/fetchColorService';

const BubblePage = () => {
  const [colors, setColors] = useState([]);
  const [editing, setEditing] = useState(false);

  useEffect(()=>{
    fetchColorService(setColors);
  }, []);

  const toggleEdit = (value) => {
    setEditing(value);
  };

  const saveEdit = (editColor, id) => {
    axiosWithAuth()
      .put(`/colors/${id}`, editColor)
      .then(res=>{
        setColors(colors.map(color =>{
          if (color.id === id) {
            return editColor
          } else {
            return color
          } 
        }))
      })
      .catch(err=>{
        console.log('There was an error saving your edited color - please try again', err)
      })
  };

  const deleteColor = (colorToDelete) => {
  };

  return (
    <div className="container">
      <ColorList colors={colors} editing={editing} toggleEdit={toggleEdit} saveEdit={saveEdit} deleteColor={deleteColor}/>
      <Bubbles colors={colors}/>
    </div>
  );
};

export default BubblePage;

//Task List:
//1. When the component mounts, make an axios call to retrieve all color data and push to state.
//2. Complete toggleEdit, saveEdit, deleteColor and functions
