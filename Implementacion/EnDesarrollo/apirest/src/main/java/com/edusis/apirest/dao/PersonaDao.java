/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.edusis.apirest.dao;

import com.edusis.apirest.domain.Persona;
import com.edusis.apirest.generic.GenericDao;

/**
 *
 * @author Naim Saadi
 * @param <T>
 */

public interface PersonaDao<T extends Persona> extends GenericDao<T, Long> {

}
