/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.edusis.apirest.service.impl;

import com.edusis.apirest.dao.DetalleTareaMultimediaDao;
import com.edusis.apirest.domain.DetalleTareaMultimedia;
import com.edusis.apirest.generic.GenericServiceImpl;
import com.edusis.apirest.service.DetalleTareaMultimediaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Naim Saadi
 */

@Service
public class DetalleTareaMultimediaServiceImpl extends GenericServiceImpl<DetalleTareaMultimedia, Long> implements DetalleTareaMultimediaService {
    
    @Autowired
    private DetalleTareaMultimediaDao detalleTareaMultimediaDao;

    
}
