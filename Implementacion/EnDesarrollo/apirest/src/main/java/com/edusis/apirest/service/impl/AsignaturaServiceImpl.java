/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.edusis.apirest.service.impl;

import com.edusis.apirest.dao.AsignaturaDao;
import com.edusis.apirest.domain.Asignatura;
import com.edusis.apirest.generic.GenericDao;
import com.edusis.apirest.generic.GenericServiceImpl;
import com.edusis.apirest.service.AsignaturaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

/**
 *
 * @author Naim Saadi
 */

@Service
public class AsignaturaServiceImpl extends GenericServiceImpl<Asignatura, Long> implements AsignaturaService {
    
    @Autowired
    private AsignaturaDao asignaturaDao;
    
//    public AsignaturaServiceImpl() {
//    }
//    
//    @Autowired
//    public AsignaturaServiceImpl(@Qualifier("asignaturaDaoImpl") GenericDao<Asignatura, Long> dao) {
//        super(dao);
//        this.asignaturaDao = (AsignaturaDao) dao;
//    }
    
}
