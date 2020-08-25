/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.edusis.apirest.service.impl;

import com.edusis.apirest.dao.TutorDao;
import com.edusis.apirest.domain.Tutor;
import com.edusis.apirest.generic.GenericDao;
import com.edusis.apirest.generic.GenericServiceImpl;
import com.edusis.apirest.service.TutorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

/**
 *
 * @author Naim Saadi
 */

@Service
public class TutorServiceImpl extends GenericServiceImpl<Tutor, Long> implements TutorService {
    
    @Autowired
    private TutorDao tutorDao;
    
//    public TutorServiceImpl() {
//    }
//    
//    @Autowired
//    public TutorServiceImpl(@Qualifier("tutorDaoImpl") GenericDao<Tutor, Long> dao) {
//        super(dao);
//        this.tutorDao = (TutorDao) dao;
//    }
    
}
