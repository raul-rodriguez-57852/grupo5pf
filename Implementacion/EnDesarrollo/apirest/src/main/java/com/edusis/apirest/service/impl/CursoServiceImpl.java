/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.edusis.apirest.service.impl;

import com.edusis.apirest.dao.CursoDao;
import com.edusis.apirest.domain.Curso;
import com.edusis.apirest.generic.GenericDao;
import com.edusis.apirest.generic.GenericServiceImpl;
import com.edusis.apirest.service.CursoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

/**
 *
 * @author Naim Saadi
 */

@Service
public class CursoServiceImpl extends GenericServiceImpl<Curso, Long> implements CursoService {
    
    @Autowired
    private CursoDao cursoDao;
    
//    public CursoServiceImpl() {
//    }
//    
//    @Autowired
//    public CursoServiceImpl(@Qualifier("cursoDaoImpl") GenericDao<Curso, Long> dao) {
//        super(dao);
//        this.cursoDao = (CursoDao) dao;
//    }
//    
}
