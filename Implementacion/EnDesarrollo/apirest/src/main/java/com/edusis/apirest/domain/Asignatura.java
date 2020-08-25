/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.edusis.apirest.domain;

import com.edusis.apirest.generic.GenericEntity;
import com.edusis.apirest.utils.AssertUtils;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 *
 * @author Manuel
 */

@Entity
@Table(name= "Asignatura")
public class Asignatura extends GenericEntity {
    
    @NotNull
    @ManyToOne
    @JoinColumn(name="curso_id")
    private Curso curso;
    
    @NotNull
    private String nombre;
    
    private String iconoURL;
    
    @NotNull
    @ManyToOne
    private Profesor creador;
    
    @ManyToMany(mappedBy="asignaturas")
    private List<Profesor> profesores;
    
    @JsonIgnore
    @OneToMany(mappedBy = "asignatura")
    private List<Tarea> tareas;
    
    
    public void validar(){
        AssertUtils.notNull(nombre, "El nombre no puede ser nulo");
        AssertUtils.notNull(creador, "El creador no puede ser nulo");
        AssertUtils.notNull(curso, "El curso no puede ser nulo");
    }


    public Profesor getCreador() {
        return creador;
    }

    public void setCreador(Profesor creador) {
        this.creador = creador;
    }

    public Curso getCurso() {
        return curso;
    }

    public void setCurso(Curso curso) {
        this.curso = curso;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getIconoURL() {
        return iconoURL;
    }

    public void setIconoURL(String iconoURL) {
        this.iconoURL = iconoURL;
    }

    public List<Profesor> getProfesores() {
        return profesores;
    }

    public void setProfesores(List<Profesor> profesores) {
        this.profesores = profesores;
    }

    public List<Tarea> getTareas() {
        return tareas;
    }

    public void setTareas(List<Tarea> tareas) {
        this.tareas = tareas;
    }
       
    
        
}
