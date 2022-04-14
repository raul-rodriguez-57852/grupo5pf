/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.edusis.apirest.domain;

import com.edusis.apirest.generic.GenericEntity;
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
@Table(name="RealizacionTarea")
public class RealizacionTarea extends GenericEntity {

    @NotNull
    @ManyToOne
    private Tarea tarea;
    
    @Temporal(javax.persistence.TemporalType.TIMESTAMP)
    private Calendar fecha;
    
    @NotNull
    @ManyToOne
    private Alumno alumno;
    
    @NotNull
    private Double puntajeObtenido;
    
    @OneToMany(mappedBy = "realizacion", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<RealizacionTareaDetalle> detalles;
    
    private Boolean mayorPuntaje;
    
    //////////////////// CUSTOM ///////////////////////
    
    public void calcularPorcentaje(){
        if(detalles == null){
            return;
        }
        int contador = 0;
        double acumulador = 0;
        for (RealizacionTareaDetalle detalle : detalles) {
            detalle.calcularPorcentaje();
            if(detalle.getPuntajePorcentaje() != null){
                acumulador += detalle.getPuntajePorcentaje();
            }
            contador++;
        }
        puntajeObtenido = acumulador / contador;
    }
    
    public void inicializarColeccion() {
        detalles = new ArrayList<RealizacionTareaDetalle>();
    }

    public void addDetalle(RealizacionTareaDetalle detalle) {
        if (detalle != null) {
            detalle.setRealizacion(this);
        }
        if (getDetalles() == null) {
            inicializarColeccion();
        }
        getDetalles().add(detalle);
    }

    public Tarea getTarea() {
        return tarea;
    }

    public void setTarea(Tarea tarea) {
        this.tarea = tarea;
    }

    public Calendar getFecha() {
        return fecha;
    }

    public void setFecha(Calendar fecha) {
        this.fecha = fecha;
    }

    public Alumno getAlumno() {
        return alumno;
    }

    public void setAlumno(Alumno alumno) {
        this.alumno = alumno;
    }

    public Double getPuntajeObtenido() {
        return puntajeObtenido;
    }

    public void setPuntajeObtenido(Double puntajeObtenido) {
        this.puntajeObtenido = puntajeObtenido;
    }

    public Boolean getMayorPuntaje() {
        return mayorPuntaje;
    }

    public void setMayorPuntaje(Boolean mayorPuntaje) {
        this.mayorPuntaje = mayorPuntaje;
    }

    public List<RealizacionTareaDetalle> getDetalles() {
        return detalles;
    }

    public void setDetalles(List<RealizacionTareaDetalle> detalles) {
        if (detalles != null) {
            this.detalles.clear();
            this.detalles.addAll(detalles);
            detalles.forEach((detalle) -> {
                detalle.setRealizacion(this);
            });
        }
    }
    
    
    
    
}
