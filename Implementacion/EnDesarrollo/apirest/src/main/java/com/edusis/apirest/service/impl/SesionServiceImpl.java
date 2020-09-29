/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.edusis.apirest.service.impl;

import com.edusis.apirest.dao.SesionDao;
import com.edusis.apirest.domain.Sesion;
import com.edusis.apirest.generic.GenericServiceImpl;
import com.edusis.apirest.service.SesionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Manu Frana
 */

@Service
public class SesionServiceImpl extends GenericServiceImpl<Sesion, Long> implements SesionService {
    
    @Autowired
    private SesionDao sesionDao;
    
}
