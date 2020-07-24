/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.edusis.apirest.domain;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

/**
 *
 * @author Naim Saadi
 */
@Entity
@DiscriminatorValue(value=Persona.DTYPE_PROFESOR)
public class Profesor extends Persona {

}
