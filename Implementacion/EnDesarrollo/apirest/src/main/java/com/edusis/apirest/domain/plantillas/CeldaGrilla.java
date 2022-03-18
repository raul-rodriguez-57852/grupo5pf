/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.edusis.apirest.domain.plantillas;

import com.edusis.apirest.generic.GenericEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 *
 * @author Facundo Raviolo
 */
@Entity
@Table(name="CeldaGrilla")
public class CeldaGrilla extends GenericEntity {

    @ManyToOne
    @JsonIgnore
    private PlantillaGrilla plantillaGrilla;
    
    private Integer fila;
    
    private Integer columna;
    
    private String valorCorrecto;

    public PlantillaGrilla getPlantillaGrilla() {
        return plantillaGrilla;
    }

    public void setPlantillaGrilla(PlantillaGrilla plantillaGrilla) {
        this.plantillaGrilla = plantillaGrilla;
    }

    public Integer getFila() {
        return fila;
    }

    public void setFila(Integer fila) {
        this.fila = fila;
    }

    public Integer getColumna() {
        return columna;
    }

    public void setColumna(Integer columna) {
        this.columna = columna;
    }

    public String getValorCorrecto() {
        return valorCorrecto;
    }

    public void setValorCorrecto(String valorCorrecto) {
        this.valorCorrecto = valorCorrecto;
    }
    
}
