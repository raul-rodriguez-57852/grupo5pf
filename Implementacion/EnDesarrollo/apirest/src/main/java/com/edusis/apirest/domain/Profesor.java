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

    public List<Curso> getCursos() {
        return cursos;
    }

    public void setCursos(List<Curso> cursos) {
        this.cursos = cursos;
    }

    public List<Asignatura> getAsignaturas() {
        return asignaturas;
    }

    public void setAsignaturas(List<Asignatura> asignaturas) {
        this.asignaturas = asignaturas;
    }

    
    
    /**
     * Falta atributo Cuenta
     * Falta atributo Actividades
     */
}
