package com.edusis.apirest.service.impl;

import com.edusis.apirest.dao.BonusCursoDao;
import com.edusis.apirest.domain.BonusCurso;
import com.edusis.apirest.generic.GenericServiceImpl;
import com.edusis.apirest.service.BonusCursoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BonusCursoServiceImpl extends GenericServiceImpl<BonusCurso, Long> implements BonusCursoService {

    @Autowired
    private BonusCursoDao bonusCursoDao;

}