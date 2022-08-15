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
 * @author nsaado
 */
@Entity
@Table(name="PreguntaVF")
public class PreguntaVF extends GenericEntity {

    @ManyToOne
    @JsonIgnore
    private PlantillaVF plantillaVF;

    private String pregunta;
    
    private Boolean respuesta;

    public String getPregunta() {
        return pregunta;
    }

    public void setPregunta(String pregunta) {
        this.pregunta = pregunta;
    }

    public PlantillaVF getPlantillaVF() {
        return plantillaVF;
    }

    public void setPlantillaVF(PlantillaVF plantillaVF) {
        this.plantillaVF = plantillaVF;
    }

    public Boolean getRespuesta() {
        return respuesta;
    }

    public void setRespuesta(Boolean respuesta) {
        this.respuesta = respuesta;
    }

    
}
