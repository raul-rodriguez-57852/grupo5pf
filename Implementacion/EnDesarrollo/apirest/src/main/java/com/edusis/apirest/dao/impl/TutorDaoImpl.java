/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.edusis.apirest.dao.impl;

import com.edusis.apirest.dao.TutorDao;
import com.edusis.apirest.domain.Tutor;
import com.edusis.apirest.generic.GenericDaoImpl;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Naim Saadi
 */

@Repository
public class TutorDaoImpl extends GenericDaoImpl<Tutor, Long> implements TutorDao {

}
