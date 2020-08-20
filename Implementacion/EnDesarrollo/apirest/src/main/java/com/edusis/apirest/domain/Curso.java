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
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.CascadeType;
import javax.persistence.OneToMany;
import static org.hibernate.engine.internal.Cascade.cascade;



/**
 *
 * @author Manuel
 */

@Entity
@Table(name="Curso")
public class Curso extends GenericEntity{
    
    @NotNull
    private String nombre;
    
    private String iconoURL;
    
    @NotNull
    @ManyToOne
    private Profesor creador;
    
    @ManyToMany(mappedBy = "cursos")
    private List<Profesor> profesores;
    
    @JsonIgnore
    @OneToMany(mappedBy="curso")
    private List<Asignatura> asignaturas;
    
    @JsonIgnore
    @ManyToMany(mappedBy = "cursos")
    private List<Alumno> alumnos;

    public List<Asignatura> getAsignaturas() {
        return asignaturas;
    }
    
    public void validar(){
        AssertUtils.notNull(nombre, "El nombre no puede ser nulo");
        AssertUtils.notNull(creador, "El creador no puede ser nulo");
    }
    
    
    ///////// GETTERS AND SETTERS //////////

    public void setAsignaturas(List<Asignatura> asignaturas) {
        this.asignaturas = asignaturas;
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

    public Profesor getCreador() {
        return creador;
    }

    public void setCreador(Profesor creador) {
        this.creador = creador;
    }

    public List<Profesor> getProfesores() {
        return profesores;
    }

    public void setProfesores(List<Profesor> profesores) {
        this.profesores = profesores;
    }

    public List<Alumno> getAlumnos() {
        return alumnos;
    }

    public void setAlumnos(List<Alumno> alumnos) {
        this.alumnos = alumnos;
    }
    
}
