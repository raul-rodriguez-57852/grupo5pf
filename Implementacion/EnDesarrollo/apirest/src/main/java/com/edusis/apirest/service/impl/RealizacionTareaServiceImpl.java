/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.edusis.apirest.service.impl;

import com.edusis.apirest.dao.RealizacionTareaDao;
import com.edusis.apirest.domain.Alumno;
import com.edusis.apirest.domain.RealizacionTarea;
import com.edusis.apirest.domain.Tarea;
import com.edusis.apirest.generic.GenericServiceImpl;
import com.edusis.apirest.service.RealizacionTareaService;
import com.edusis.apirest.specs.RealizacionTareaSpecs;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Naim Saadi
 */

@Service
public class RealizacionTareaServiceImpl extends GenericServiceImpl<RealizacionTarea, Long> implements RealizacionTareaService {
    
    @Autowired
    private RealizacionTareaDao realizacionTareaDao;
    
    @Override
    public Integer getEstrellasGanadas(Alumno alumno, Tarea tarea, RealizacionTarea realizacion){
        
        Optional realizacionOpt = realizacionTareaDao.findOne(RealizacionTareaSpecs.byAlumno(alumno).
                and(RealizacionTareaSpecs.byTarea(tarea)).
                and(RealizacionTareaSpecs.puntajeMaximo()));
        
        RealizacionTarea realizacionAnterior = realizacionOpt.isPresent()? (RealizacionTarea)realizacionOpt.get() : null;
        
        if(realizacionAnterior == null){
            Double estrellasD = realizacion.getPuntajeObtenido() / 20;
            Integer estrellas = estrellasD.intValue();
            realizacion.setMayorPuntaje(true);
            return estrellas;
        }
        
        if(realizacionAnterior.getPuntajeObtenido() >= realizacion.getPuntajeObtenido()){
            realizacion.setMayorPuntaje(false);
            return 0;
        }else{
            Double estrellasAntD = realizacionAnterior.getPuntajeObtenido() / 20;
            Integer estrellasAnt = estrellasAntD.intValue();
            
            Double estrellasD = realizacion.getPuntajeObtenido() / 20;
            Integer estrellas = estrellasD.intValue();
            
            Integer estrellasGanadas = estrellas - estrellasAnt;
            
            realizacion.setMayorPuntaje(true);
            realizacionAnterior.setMayorPuntaje(false);
            realizacionTareaDao.save(realizacionAnterior);
            
            return estrellasGanadas;
            
        }
        
    }
    
}
