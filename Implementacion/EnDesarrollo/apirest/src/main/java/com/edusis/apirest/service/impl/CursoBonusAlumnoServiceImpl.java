/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.edusis.apirest.service.impl;

import com.edusis.apirest.dao.CursoBonusAlumnoDao;
import com.edusis.apirest.domain.CursoBonusAlumno;
import com.edusis.apirest.generic.GenericServiceImpl;
import com.edusis.apirest.service.CursoBonusAlumnoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Manuel Frana
 */
@Service
public class CursoBonusAlumnoServiceImpl extends GenericServiceImpl<CursoBonusAlumno, Long> implements CursoBonusAlumnoService {

    @Autowired
    private CursoBonusAlumnoDao cursoBonusAlumno;
}
