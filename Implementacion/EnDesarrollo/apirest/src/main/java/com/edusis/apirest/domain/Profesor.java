/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.edusis.apirest.domain;

import com.edusis.apirest.domain.Asignatura;
import com.edusis.apirest.domain.Curso;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

/**
 *
 * @author Naim Saadi
 */
@Entity
@DiscriminatorValue(value=Persona.DTYPE_PROFESOR)
public class Profesor extends Persona {

    @ManyToMany
    @JsonIgnore
    @JoinTable(name="cursos_profesores",joinColumns = @JoinColumn(name= "profesor_id"),
            inverseJoinColumns = @JoinColumn(name = "curso_id"))
    private List<Curso> cursos;
    
    @ManyToMany
    @JsonIgnore
    @JoinTable(name="asignaturas_profesores",joinColumns = @JoinColumn(name= "profesor_id"),
            inverseJoinColumns = @JoinColumn(name = "asignatura_id"))
    private List<Asignatura> asignaturas;
    
    private String email;
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getEmail() {
        return this.email;
    }

    public List<Curso> getCursos() {
        return cursos;
    }

    public void setCursos(List<Curso> cursos) {
        this.cursos = cursos;
    }

    public List<Asignatura> getAsignaturas() {
        return asignaturas;
    }

    private void setAsignaturas(List<Asignatura> asignaturas) {
        this.asignaturas = asignaturas;
    }

    @Override
    public char getUserType() {
        return '1';
    }
    
    /**
    * @param  Asignatura a Asignatura object that will be added to Profesor
    * @return Profesor object itself so it can ve saved by its Service
    */
    public Profesor agregarAisgnaturaAlProfesor(Asignatura asignatura) {
        if(!this.getAsignaturas().isEmpty()) {
            if(!this.getAsignaturas().contains(asignatura)) {
                this.getAsignaturas().add(asignatura);
            }
        } else {
            ArrayList<Asignatura> asignaturas = new ArrayList<Asignatura>();
            asignaturas.add(asignatura);
            this.setAsignaturas(asignaturas);
        }
        return this;
    }

    
    
    /**
     * Falta atributo Cuenta
     * Falta atributo Actividades
     */
}
