/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.edusis.apirest.specs;

import com.edusis.apirest.domain.Curso;
import com.edusis.apirest.domain.Profesor;
import com.edusis.apirest.domain.QPlantilla;
import com.querydsl.core.types.dsl.BooleanExpression;

/**
 *
 * @author Naim Saadi
 */
public class PlantillaSpecs {
    
    private static final QPlantilla P = QPlantilla.plantilla;
    
    public static BooleanExpression byCreador(Profesor profesor){
        return P.creador.eq(profesor);
    }
}
