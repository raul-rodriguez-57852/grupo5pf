/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.edusis.apirest.service;

import com.edusis.apirest.domain.Alumno;
import com.edusis.apirest.domain.RealizacionTarea;
import com.edusis.apirest.domain.Tarea;
import com.edusis.apirest.generic.GenericService;

/**
 *
 * @author Naim Saadi
 */

public interface RealizacionTareaService extends GenericService<RealizacionTarea, Long> {
    
    Integer getEstrellasGanadas(Alumno alumno, Tarea tarea, RealizacionTarea realizacion);

}
