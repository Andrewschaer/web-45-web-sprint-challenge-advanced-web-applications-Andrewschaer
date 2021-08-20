import React, { useEffect, useState } from "react";
import axiosWithAuth from "../helpers/axiosWithAuth";
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import fetchColorService from '../services/fetchColorService';

const BubblePage = () => {
  const [colors, setColors] = useState([]);
  const [editing, setEditing] = useState(false);

  useEffect(()=>{
    fetchColorService()
      .then(res=> {
        setColors(res.data);
      });
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
            return res.data
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
     console.log(colorToDelete.id)
    axiosWithAuth()
      .delete(`/colors/${colorToDelete.id}`)
      .then(res=>{
        setColors(colors.filter((color) => color.id !== Number(res.data)));
      })
      .catch(err=>{
        console.log('There was an error deleting the color - please try again', err)
      })
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
