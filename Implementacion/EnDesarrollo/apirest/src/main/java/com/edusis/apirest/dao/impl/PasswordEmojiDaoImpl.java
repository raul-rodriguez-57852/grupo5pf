/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.edusis.apirest.dao.impl;

import com.edusis.apirest.dao.PasswordEmojiDao;
import com.edusis.apirest.domain.PasswordEmoji;
import com.edusis.apirest.generic.GenericDaoImpl;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Facundo Raviolo
 */

@Repository
public class PasswordEmojiDaoImpl extends GenericDaoImpl<PasswordEmoji, Long> implements PasswordEmojiDao {

}
