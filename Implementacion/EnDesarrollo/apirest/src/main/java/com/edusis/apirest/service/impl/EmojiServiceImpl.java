/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.edusis.apirest.service.impl;

import com.edusis.apirest.dao.EmojiDao;
import com.edusis.apirest.domain.Emoji;
import com.edusis.apirest.generic.GenericDao;
import com.edusis.apirest.generic.GenericServiceImpl;
import com.edusis.apirest.service.EmojiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

/**
 *
 * @author Facundo Raviolo
 */

@Service
public class EmojiServiceImpl extends GenericServiceImpl<Emoji, Long> implements EmojiService {
    
    @Autowired
    private EmojiDao emojiDao;
    
//    public EmojiServiceImpl() {
//    }
//    
//    @Autowired
//    public EmojiServiceImpl(@Qualifier("emojiDaoImpl") GenericDao<Emoji, Long> dao) {
//        super(dao);
//        this.emojiDao = (EmojiDao) dao;
//    }
    
}
