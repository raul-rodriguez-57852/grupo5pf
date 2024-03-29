/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.edusis.apirest.domain;

import com.edusis.apirest.generic.SoftDeleteEntity;
import com.edusis.apirest.utils.AssertUtils;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.*;

/**
 *
 * @author Manuel
 */

@Entity
@Table(name= "Asignatura")
public class Asignatura extends SoftDeleteEntity {
    
    @NotNull
    @ManyToOne
    @JoinColumn(name="curso_id")
    private Curso curso;
    
    @NotNull
    private String nombre;

    @JsonIgnore
    @Lob
    private byte[] imagen;

    @NotNull
    @ManyToOne
    private Profesor creador;
    
    @ManyToMany
    @JoinTable(name="asignaturas_profesores",joinColumns = @JoinColumn(name= "asignatura_id"),
            inverseJoinColumns = @JoinColumn(name = "profesor_id"))
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

    public byte[] getImagen() {
        return imagen;
    }

    public void setImagen(byte[] imagen) {
        this.imagen = imagen;
    }

    public List<Profesor> getProfesores() {
        return profesores;
    }

    private void setProfesores(List<Profesor> profesores) {
        this.profesores = profesores;
    }

    public List<Tarea> getTareas() {
        return tareas;
    }

    public void setTareas(List<Tarea> tareas) {
        this.tareas = tareas;
    }
    
    /**
    * @param profe a Profesor object that will be added to Asignatura
    * @return the Asignatura object itself so it can ve saved by its Service
    */
    public Asignatura agregarProfesorToAsignatura(Profesor profe) {
        if(this.getProfesores() != null) {
            if(!this.getProfesores().contains(profe)) {
                this.getProfesores().add(profe);
            }
        } else {
            ArrayList<Profesor> profes = new ArrayList<Profesor>();
            profes.add(profe);
            this.setProfesores(profes);
        }
        return this;
    }
        
}
