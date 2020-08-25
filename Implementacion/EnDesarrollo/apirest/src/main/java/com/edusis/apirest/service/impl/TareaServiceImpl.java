/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.edusis.apirest.service.impl;

import com.edusis.apirest.dao.TareaDao;
import com.edusis.apirest.domain.Tarea;
import com.edusis.apirest.generic.GenericDao;
import com.edusis.apirest.generic.GenericServiceImpl;
import com.edusis.apirest.service.TareaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

/**
 *
 * @author Naim Saadi
 */

@Service
public class TareaServiceImpl extends GenericServiceImpl<Tarea, Long> implements TareaService {
    
    @Autowired
    private TareaDao tareaDao;
    
//    public TareaServiceImpl() {
//    }
//    
//    @Autowired
//    public TareaServiceImpl(@Qualifier("tareaDaoImpl") GenericDao<Tarea, Long> dao) {
//        super(dao);
//        this.tareaDao = (TareaDao) dao;
//    }
    
}
