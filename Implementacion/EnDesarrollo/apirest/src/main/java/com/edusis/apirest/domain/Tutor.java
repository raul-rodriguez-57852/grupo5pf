/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.edusis.apirest.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.List;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.OneToMany;

/**
 *
 * @author Naim Saadi
 */
@Entity
@DiscriminatorValue(value=Persona.DTYPE_TUTOR)
public class Tutor extends Persona {
    
    @JsonIgnore
    @OneToMany(mappedBy = "tutor")
    private List<Alumno> alumnos;
    
    /////// GETTERS AND SETTERS ///////

    public List<Alumno> getAlumnos() {
        return alumnos;
    }

    public void setAlumnos(List<Alumno> alumnos) {
        this.alumnos = alumnos;
    }
    
    

}
