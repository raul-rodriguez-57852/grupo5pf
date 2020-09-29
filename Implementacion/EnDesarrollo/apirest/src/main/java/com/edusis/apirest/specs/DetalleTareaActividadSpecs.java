/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.edusis.apirest.specs;

import com.edusis.apirest.domain.Profesor;
import com.edusis.apirest.domain.QDetalleTareaActividad;
import com.edusis.apirest.domain.Tarea;
import com.querydsl.core.types.dsl.BooleanExpression;

/**
 *
 * @author Naim Saadi
 */
public class DetalleTareaActividadSpecs {
    
    private static final QDetalleTareaActividad D = QDetalleTareaActividad.detalleTareaActividad;
    
    public static BooleanExpression byTarea(Tarea tarea){
        return D.tarea.eq(tarea);
    }
    
    public static BooleanExpression byCreador(Profesor profesor){
        return D.creador.eq(profesor);
    }
    
}
