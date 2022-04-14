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
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;

/**
 *
 * @author Naim Saadi
 */
@Entity
@Table(name = "Tarea")
public class Tarea extends GenericEntity {

    @NotNull
    @ManyToOne
    private Asignatura asignatura;

    @NotNull
    private String nombre;

    @NotNull
    @ManyToOne
    private Profesor creador;

    private Double puntajeMaximo;

    @Temporal(javax.persistence.TemporalType.DATE)
    private Calendar fechaLimite;
    
    @OneToMany(mappedBy = "tarea", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<DetalleTarea> lineas;
    
    @OneToMany(mappedBy = "tarea")
    private List<RealizacionTarea> realizaciones;

    public void inicializarColeccion() {
        lineas = new ArrayList<DetalleTarea>();
    }

    public void addLinea(DetalleTarea linea) {
        if (linea != null) {
            linea.setTarea(this);
        }
        if (getLineas() == null) {
            inicializarColeccion();
        }
        getLineas().add(linea);
    }

    public void validar() {
        AssertUtils.notNull(nombre, "El nombre no puede ser nulo");
        AssertUtils.notNull(asignatura, "La asignatura no puede ser nula");
        AssertUtils.notNull(creador, "El creador no puede ser nulo");
    }

    // GETTERS AND SETTERS
    public Asignatura getAsignatura() {
        return asignatura;
    }

    public void setAsignatura(Asignatura asignatura) {
        this.asignatura = asignatura;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Profesor getCreador() {
        return creador;
    }

    public void setCreador(Profesor creador) {
        this.creador = creador;
    }

    public Double getPuntajeMaximo() {
        return puntajeMaximo;
    }

    public void setPuntajeMaximo(Double puntajeMaximo) {
        this.puntajeMaximo = puntajeMaximo;
    }

    public Calendar getFechaLimite() {
        return fechaLimite;
    }

    public void setFechaLimite(Calendar fechaLimite) {
        this.fechaLimite = fechaLimite;
    }

    public List<DetalleTarea> getLineas() {
        return lineas;
    }

    public void setLineas(List<DetalleTarea> lineas) {
        if (lineas != null) {
            this.lineas.clear();
            this.lineas.addAll(lineas);
            lineas.forEach((linea) -> {
                linea.setTarea(this);
            });
        }
    }

}
