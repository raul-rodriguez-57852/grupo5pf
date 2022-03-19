/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.edusis.apirest.service.impl;

import com.edusis.apirest.dao.PlantillaPreguntasDao;
import com.edusis.apirest.domain.plantillas.PlantillaPreguntas;
import com.edusis.apirest.generic.GenericServiceImpl;
import com.edusis.apirest.service.PlantillaPreguntasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Facundo Raviolo
 */

@Service
public class PlantillaPreguntasServiceImpl extends GenericServiceImpl<PlantillaPreguntas, Long> implements PlantillaPreguntasService {
    
    @Autowired
    private PlantillaPreguntasDao plantillaPreguntasDao;
    
    
}
