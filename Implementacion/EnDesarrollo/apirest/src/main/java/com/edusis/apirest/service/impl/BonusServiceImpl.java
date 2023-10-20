/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.edusis.apirest.service.impl;

import com.edusis.apirest.dao.BonusDao;
import com.edusis.apirest.domain.Bonus;
import com.edusis.apirest.generic.GenericServiceImpl;
import com.edusis.apirest.service.BonusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author manue
 */
@Service
public class BonusServiceImpl extends GenericServiceImpl<Bonus, Long> implements BonusService {

    @Autowired
    private BonusDao bonusDao;
}
