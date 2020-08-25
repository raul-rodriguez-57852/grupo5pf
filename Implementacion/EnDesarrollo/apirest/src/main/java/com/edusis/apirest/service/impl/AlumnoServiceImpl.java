/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.edusis.apirest.service.impl;

import com.edusis.apirest.dao.AlumnoDao;
import com.edusis.apirest.domain.Alumno;
import com.edusis.apirest.generic.GenericDao;
import com.edusis.apirest.generic.GenericServiceImpl;
import com.edusis.apirest.service.AlumnoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

/**
 *
 * @author Facundo Raviolo
 */

@Service
public class AlumnoServiceImpl extends GenericServiceImpl<Alumno, Long> implements AlumnoService {
    
    @Autowired
    private AlumnoDao alumnoDao;
    
//    public AlumnoServiceImpl() {
//    }
//    
//    @Autowired
//    public AlumnoServiceImpl(@Qualifier("alumnoDaoImpl") GenericDao<Alumno, Long> dao) {
//        super(dao);
//        this.alumnoDao = (AlumnoDao) dao;
//    }
    
}
