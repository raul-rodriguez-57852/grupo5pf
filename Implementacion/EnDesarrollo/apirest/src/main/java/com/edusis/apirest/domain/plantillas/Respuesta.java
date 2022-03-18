/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.edusis.apirest.domain.plantillas;

import com.edusis.apirest.generic.GenericEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

/**
 *
 * @author Facundo Raviolo
 */
@Entity
@Table(name="Respuesta")
public class Respuesta extends GenericEntity {

    @ManyToOne
    @JsonIgnore
    private Pregunta pregunta;
    
    @NotNull
    private String respuesta;
    
    @NotNull
    private Boolean correcta;

    public String getRespuesta() {
        return respuesta;
    }

    public void setRespuesta(String respuesta) {
        this.respuesta = respuesta;
    }

    public Boolean getCorrecta() {
        return correcta;
    }

    public void setCorrecta(Boolean correcta) {
        this.correcta = correcta;
    }

    public Pregunta getPregunta() {
        return pregunta;
    }

    public void setPregunta(Pregunta pregunta) {
        this.pregunta = pregunta;
    }
    
}
