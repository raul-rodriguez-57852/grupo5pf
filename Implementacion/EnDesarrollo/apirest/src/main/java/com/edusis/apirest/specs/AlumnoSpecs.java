/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.edusis.apirest.specs;

import com.edusis.apirest.domain.QAlumno;
import com.edusis.apirest.domain.Tutor;

import com.querydsl.core.types.dsl.BooleanExpression;

/**
 *
 * @author manue
 */
public class AlumnoSpecs {
    
    private static final QAlumno A = QAlumno.alumno;
    
    public static BooleanExpression byTutor(Tutor tutor){
        return A.tutor.eq(tutor);
    }


} 

    