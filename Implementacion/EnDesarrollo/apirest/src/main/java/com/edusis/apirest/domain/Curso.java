/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.edusis.apirest.domain;

import com.edusis.apirest.generic.SoftDeleteEntity;
import com.edusis.apirest.utils.AssertUtils;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.sun.istack.NotNull;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;



/**
 *
 * @author Manuel
 */

@Entity
@Table(name="Curso")
public class Curso extends SoftDeleteEntity {
    
    @NotNull
    private String nombre;
    
    private String iconoURL;
    
    @NotNull
    @ManyToOne
    private Profesor creador;
    
    @JsonIgnoreProperties(value = {"Curso", "hibernateLazyInitializer"})
    @ManyToMany
    @JoinTable(name="cursos_profesores",joinColumns = @JoinColumn(name= "curso_id"),
            inverseJoinColumns = @JoinColumn(name = "profesor_id"))
    private List<Profesor> profesores;
    
//    @JsonIgnoreProperties(value = {"Curso", "hibernateLazyInitializer"})
    @JsonIgnore
    @OneToMany(mappedBy="curso")
    private List<Asignatura> asignaturas;
    
    @JsonIgnoreProperties(value = {"Curso", "hibernateLazyInitializer"})
    @ManyToMany
    @JoinTable(name="cursos_alumnos",joinColumns = @JoinColumn(name= "curso_id"),
            inverseJoinColumns = @JoinColumn(name = "alumno_id"))
    private List<Alumno> alumnos;
    
    @JsonIgnoreProperties(value = {"Curso", "hibernateLazyInitializer"})
    private String codigo;

    
    
    public void validar(){
        AssertUtils.notNull(nombre, "El nombre no puede ser nulo");
        AssertUtils.notNull(creador, "El creador no puede ser nulo");
    }
    
    
    ///////// GETTERS AND SETTERS //////////

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public List<Asignatura> getAsignaturas() {
        return asignaturas;
    }
    
    private void setAsignaturas(List<Asignatura> asignaturas) {
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

    private void setProfesores(List<Profesor> profesores) {
        this.profesores = profesores;
    }

    public List<Alumno> getAlumnos() {
        return alumnos;
    }

    private void setAlumnos(List<Alumno> alumnos) {
        this.alumnos = alumnos;
    }
    
    /**
    * @param  Alumno an Alumno object that will be added to Curso
    * @return      the Curso object itself so it can ve saved by its Service
    */
    public Curso agregarAlumnoAlCurso(Alumno alumno) {
        if(!this.alumnos.isEmpty()) {
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
    
    /**
    * @param  Profesor a Profesor object that will be added to Curso
    * @return      the Curso object itself so it can ve saved by its Service
    */
    public Curso agregarProfesorAlCurso(Profesor profe) {
        if(!this.profesores.isEmpty()) {
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
    
    /**
    * @param  Asignatura a Asignatura object that will be added to Curso
    * @return      the Curso object itself so it can ve saved by its Service
    */
    public Curso agregarAsignaturaAlCurso(Asignatura asignatura) {
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
    
}
