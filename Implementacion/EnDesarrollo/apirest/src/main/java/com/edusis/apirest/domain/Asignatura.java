/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.edusis.apirest.domain;

import com.edusis.apirest.generic.GenericEntity;
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
    
    private String avatar;
    
    @NotNull
    private Profesor creador;
    
    @ManyToMany(mappedBy="asignaturas")
    private List<Profesor> profesores;


    public Profesor getCreador() {
        return creador;
    }

    /**
     * Falta Atributo Tareas
     *
     * @return 
     */
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

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public List<Profesor> getProfesores() {
        return profesores;
    }

    public void setProfesores(List<Profesor> profesores) {
        this.profesores = profesores;
    }
    
    /**
     * Falta Atributo Tareas.
     */
    
    
    
    
}
