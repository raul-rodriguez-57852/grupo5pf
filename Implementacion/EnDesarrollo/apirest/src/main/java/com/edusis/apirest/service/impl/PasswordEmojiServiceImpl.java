/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.edusis.apirest.service.impl;

import com.edusis.apirest.dao.PasswordEmojiDao;
import com.edusis.apirest.domain.PasswordEmoji;
import com.edusis.apirest.generic.GenericDao;
import com.edusis.apirest.generic.GenericServiceImpl;
import com.edusis.apirest.service.PasswordEmojiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

/**
 *
 * @author Facundo Raviolo
 */

@Service
public class PasswordEmojiServiceImpl extends GenericServiceImpl<PasswordEmoji, Long> implements PasswordEmojiService {
    
    private PasswordEmojiDao passwordEmojiDao;
    
    public PasswordEmojiServiceImpl() {
    }
    
    @Autowired
    public PasswordEmojiServiceImpl(@Qualifier("passwordEmojiDaoImpl") GenericDao<PasswordEmoji, Long> dao) {
        super(dao);
        this.passwordEmojiDao = (PasswordEmojiDao) dao;
    }
    
}
