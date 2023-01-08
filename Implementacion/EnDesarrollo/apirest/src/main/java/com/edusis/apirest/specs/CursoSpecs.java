/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.edusis.apirest.specs;

import com.edusis.apirest.domain.QCurso;
import com.edusis.apirest.domain.Profesor;
import com.edusis.apirest.domain.Alumno;

import com.querydsl.core.types.dsl.BooleanExpression;

/**
 *
 * @author manue
 */
public class CursoSpecs {
    
    private static final QCurso C = QCurso.curso;
    
    public static BooleanExpression isActive() {
        return C.isActive.eq(Boolean.TRUE);
    }
    
    public static BooleanExpression byProfesor(Profesor profe){
        return C.profesores.contains(profe).and(C.isActive.eq(Boolean.TRUE));
    }
    
    public static BooleanExpression byAlumno(Alumno alumno){
        return C.alumnos.contains(alumno).and(C.isActive.eq(Boolean.TRUE));
    }

} 
  