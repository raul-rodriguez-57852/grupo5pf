/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.edusis.apirest.service.impl;

import com.edusis.apirest.dao.AddonDao;
import com.edusis.apirest.domain.Addon;
import com.edusis.apirest.generic.GenericServiceImpl;
import com.edusis.apirest.service.AddonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Naim Saadi
 */

@Service
public class AddonServiceImpl extends GenericServiceImpl<Addon, Long> implements AddonService {
    
    @Autowired
    private AddonDao addonDao;
       
}
