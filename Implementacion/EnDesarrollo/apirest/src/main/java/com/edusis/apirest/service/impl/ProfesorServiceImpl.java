/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.edusis.apirest.service.impl;

import com.edusis.apirest.dao.ProfesorDao;
import com.edusis.apirest.domain.Profesor;
import com.edusis.apirest.generic.GenericDao;
import com.edusis.apirest.generic.GenericServiceImpl;
import com.edusis.apirest.service.ProfesorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

/**
 *
 * @author Naim Saadi
 */

@Service
public class ProfesorServiceImpl extends GenericServiceImpl<Profesor, Long> implements ProfesorService {
    
    private ProfesorDao profesorDao;
    
    public ProfesorServiceImpl() {
    }
    
    @Autowired
    public ProfesorServiceImpl(@Qualifier("profesorDaoImpl") GenericDao<Profesor, Long> dao) {
        super(dao);
        this.profesorDao = (ProfesorDao) dao;
    }
    
}
