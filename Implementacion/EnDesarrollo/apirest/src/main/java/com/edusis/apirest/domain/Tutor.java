/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.edusis.apirest.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.ArrayList;
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
    
    private String email;
    
    /////// GETTERS AND SETTERS ///////
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getEmail() {
        return this.email;
    }

    public List<Alumno> getAlumnos() {
        return alumnos;
    }

    private void setAlumnos(List<Alumno> alumnos) {
        this.alumnos = alumnos;
    }

    @Override
    public char getUserType() {
        return '0';
    }
    
    /**
    * @param  Asignatura a Asignatura object that will be added to Profesor
    * @return Profesor object itself so it can ve saved by its Service
    */
    public Tutor agregarAlumnosAlTutor(Alumno alumno) {
        if(!this.getAlumnos().isEmpty()) {
            if(!this.getAlumnos().contains(alumno)) {
                this.getAlumnos().add(alumno);
            }
        } else {
            ArrayList<Alumno> alumnos = new ArrayList<Alumno>();
            alumnos.add(alumno);
            this.setAlumnos(alumnos);
        }
        return this;
    }
    
    

}
