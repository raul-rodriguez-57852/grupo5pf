/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.edusis.apirest.domain;

import com.edusis.apirest.generic.GenericEntity;
import com.sun.istack.NotNull;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 *
 * @author Naim Saadi
 */
@Entity
@Table(name="RealizacionTareaDetalle")
public class RealizacionTareaDetalle extends GenericEntity {
    
    @NotNull
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="realizacion_id")
    private RealizacionTarea realizacion;
    
    @NotNull
    @ManyToOne
    private Plantilla plantilla;
    
    @NotNull
    private Double puntajeObtenido;
    
    private Double puntajePorcentaje;

    //////////////////// CUSTOM ///////////////////////
    
    public void calcularPorcentaje(){
        if(plantilla == null || puntajeObtenido == null || plantilla.getPuntajeMaximo() == null){
            return;
        }
        puntajePorcentaje = (puntajeObtenido*  100)  /  plantilla.getPuntajeMaximo();
    }
    
    public RealizacionTarea getRealizacion() {
        return realizacion;
    }

    protected void setRealizacion(RealizacionTarea realizacion) {
        this.realizacion = realizacion;
    }

    public Plantilla getPlantilla() {
        return plantilla;
    }

    public void setPlantilla(Plantilla plantilla) {
        this.plantilla = plantilla;
    }

    public Double getPuntajeObtenido() {
        return puntajeObtenido;
    }

    public void setPuntajeObtenido(Double puntajeObtenido) {
        this.puntajeObtenido = puntajeObtenido;
    }

    public Double getPuntajePorcentaje() {
        return puntajePorcentaje;
    }

    public void setPuntajePorcentaje(Double puntajePorcentaje) {
        this.puntajePorcentaje = puntajePorcentaje;
    }
    
    

}
