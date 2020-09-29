/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.edusis.apirest.domain;

import com.edusis.apirest.generic.GenericEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 *
 * @author Facundo Raviolo
 */
@Entity
@Table(name="Pregunta")
public class Pregunta extends GenericEntity {

    @ManyToOne
    @JsonIgnore
    private PlantillaPreguntas plantillaPreguntas;

    private String pregunta;
    
    @OneToMany(mappedBy = "pregunta", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Respuesta> respuestas;

    public String getPregunta() {
        return pregunta;
    }

    public void setPregunta(String pregunta) {
        this.pregunta = pregunta;
    }

    public List<Respuesta> getRespuestas() {
        return respuestas;
    }

    public void setRespuestas(List<Respuesta> respuestas) {
        this.respuestas = respuestas;
    }

    public PlantillaPreguntas getPlantillaPreguntas() {
        return plantillaPreguntas;
    }

    public void setPlantillaPreguntas(PlantillaPreguntas plantillaPreguntas) {
        this.plantillaPreguntas = plantillaPreguntas;
    }
    
    public void addRespuesta(Respuesta respuesta) {
        if (respuestas == null) {
            respuestas = new ArrayList<Respuesta>();
        }
        respuesta.setPregunta(this);
        respuestas.add(respuesta);
    }

    
}
