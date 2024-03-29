/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.edusis.apirest.service.impl;

import com.edusis.apirest.dao.PlantillaGrillaDao;
import com.edusis.apirest.domain.plantillas.PlantillaGrilla;
import com.edusis.apirest.generic.GenericServiceImpl;
import com.edusis.apirest.service.PlantillaGrillaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Facundo Raviolo
 */

@Service
public class PlantillaGrillaServiceImpl extends GenericServiceImpl<PlantillaGrilla, Long> implements PlantillaGrillaService {
    
    @Autowired
    private PlantillaGrillaDao plantillaGrillaDao;
        
}
