/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.edusis.apirest.specs;

import com.edusis.apirest.domain.QDetalleTareaMultimedia;
import com.edusis.apirest.domain.Tarea;
import com.querydsl.core.types.dsl.BooleanExpression;

/**
 *
 * @author Naim Saadi
 */
public class DetalleTareaMultimediaSpecs {
    
    private static final QDetalleTareaMultimedia D = QDetalleTareaMultimedia.detalleTareaMultimedia;
    
    public static BooleanExpression byTarea(Tarea tarea){
        return D.tarea.eq(tarea);
    }
    
}
