/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.edusis.apirest.specs;

import com.edusis.apirest.domain.Asignatura;
import com.edusis.apirest.domain.QTarea;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import java.util.List;

/**
 *
 * @author Naim Saadi
 */
public class TareaSpecs {
    
    private static final QTarea T = QTarea.tarea;
    
    public static BooleanExpression isActive() {
        return T.isActive.eq(Boolean.TRUE);
    }
    
    public static BooleanExpression byAsignatura(Asignatura asignatura){
        return T.asignatura.eq(asignatura).and(T.isActive.eq(Boolean.TRUE));
    }
    
    public static BooleanExpression byAsignaturas(List<Asignatura> asignaturas){
        return T.asignatura.in(asignaturas).and(T.isActive.eq(Boolean.TRUE));
    }
    
    public static OrderSpecifier byFechaDesc(){
        return T.fechaLimite.desc();
    }
    
}
