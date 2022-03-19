/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.edusis.apirest.service.impl;

import com.edusis.apirest.dao.PlantillaPasapalabraDao;
import com.edusis.apirest.domain.plantillas.PlantillaPasapalabra;
import com.edusis.apirest.generic.GenericServiceImpl;
import com.edusis.apirest.service.PlantillaPasapalabraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Facundo Raviolo
 */

@Service
public class PlantillaPasapalabraServiceImpl extends GenericServiceImpl<PlantillaPasapalabra, Long> implements PlantillaPasapalabraService {
    
    @Autowired
    private PlantillaPasapalabraDao plantillaPasapalabraDao;
    
}
