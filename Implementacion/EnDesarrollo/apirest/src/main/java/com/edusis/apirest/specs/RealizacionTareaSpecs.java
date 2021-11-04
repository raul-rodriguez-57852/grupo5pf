/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.edusis.apirest.specs;

import com.edusis.apirest.domain.Alumno;
import com.edusis.apirest.domain.Asignatura;
import com.edusis.apirest.domain.Curso;
import com.edusis.apirest.domain.QRealizacionTarea;
import com.edusis.apirest.domain.QTarea;
import com.edusis.apirest.domain.Tarea;
import com.querydsl.core.types.dsl.BooleanExpression;
import java.util.List;

/**
 *
 * @author Naim Saadi
 */
public class RealizacionTareaSpecs {
    
    private static final QRealizacionTarea R = QRealizacionTarea.realizacionTarea;
    
    public static BooleanExpression byTareasAndAlumno(List<Tarea> tareas, Alumno alumno){
        return R.tarea.in(tareas).and(R.alumno.eq(alumno));
    }
    
    public static BooleanExpression byTareas(List<Tarea> tareas){
        return R.tarea.in(tareas);
    }
    
    public static BooleanExpression byTarea(Tarea tarea){
        return R.tarea.eq(tarea);
    }
    
}
