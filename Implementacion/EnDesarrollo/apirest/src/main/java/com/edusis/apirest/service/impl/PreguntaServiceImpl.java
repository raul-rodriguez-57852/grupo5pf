/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.edusis.apirest.service.impl;

import com.edusis.apirest.dao.PreguntaDao;
import com.edusis.apirest.domain.plantillas.Pregunta;
import com.edusis.apirest.generic.GenericDao;
import com.edusis.apirest.generic.GenericServiceImpl;
import com.edusis.apirest.service.PreguntaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

/**
 *
 * @author Facundo Raviolo
 */

@Service
public class PreguntaServiceImpl extends GenericServiceImpl<Pregunta, Long> implements PreguntaService {
    
    @Autowired
    private PreguntaDao preguntaDao;
 
    
}
