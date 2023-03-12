/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.edusis.apirest.specs;

import com.edusis.apirest.domain.Curso;
import com.edusis.apirest.domain.Profesor;
import com.edusis.apirest.domain.QAsignatura;
import com.querydsl.core.types.dsl.BooleanExpression;

/**
 *
 * @author Naim Saadi
 */
public class AsignaturaSpecs {
    
    private static final QAsignatura A = QAsignatura.asignatura;
    
    public static BooleanExpression byCurso(Curso curso){
        return A.curso.eq(curso).and(A.isActive.eq(Boolean.TRUE));
    }
    
    public static BooleanExpression byCreador(Profesor profe){
        return A.creador.eq(profe).and(A.isActive.eq(Boolean.TRUE));
    }
    
    public static BooleanExpression isActive() {
        return A.isActive.eq(Boolean.TRUE);
    }
}
