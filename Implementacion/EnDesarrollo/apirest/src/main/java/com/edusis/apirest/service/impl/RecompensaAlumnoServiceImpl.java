package com.edusis.apirest.service.impl;

import com.edusis.apirest.dao.RecompensaAlumnoDao;
import com.edusis.apirest.domain.RecompensaAlumno;
import com.edusis.apirest.generic.GenericServiceImpl;
import com.edusis.apirest.service.RecompensaAlumnoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RecompensaAlumnoServiceImpl extends GenericServiceImpl<RecompensaAlumno, Long> implements RecompensaAlumnoService {

    @Autowired
    private RecompensaAlumnoDao recompensaAlumnoDao;

}