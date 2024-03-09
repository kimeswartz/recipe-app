import React, { useEffect, useState } from "react";
import axios from "axios";
import { RecipeInterface } from "../interfaces/RecipeInterface";

/**
   * FRÅGOR
   * 1. Behöver vi ha "completed" i vårat interface för att få PATCH att fungera (jämför med våran todo-app)
   */

  // ==========> Börja med din PATCH metod här <==========
  // KOLLA PÅ ANDREES PUT-METOD I KLASSENS TODO APPLIKATION

  const [recipeData, setRecipe] = useState<RecipeInterface[]>([]);
  const URL = "https://sti-java-grupp4-s4yjx9.reky.se";

  const updateRecipe = async (recipeId: string) => {
    const recipeUpdate = recipeData.find((recipe) => recipe._id === recipeId)

    if(!recipeUpdate) {
      return
    }

    const requestBody = {
      completed: !recipeData.completed
    }

    const response = await axios.patch(`${URL}`, requestBody)

    if(response.status === 200) {
      const updateRecipeAfterRequest = recipeData.map((existingRecipe) => {

        if(existingRecipe._id !== recipeId) return existingRecipe

        return {
          ...existingRecipe
          completed:!recipeUpdate.completed
        }
      })
      setRecipe(updateRecipeAfterRequest)
    }
  }


// =======================================================================