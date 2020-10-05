/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.edusis.apirest.domain;

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
@Table(name="PreguntaPasapalabra")
public class PreguntaPasapalabra extends GenericEntity {
    
    @ManyToOne
    @JsonIgnore
    private PlantillaPasapalabra plantillaPasapalabra;
    
    private String letra;
    
    private String pregunta;
    
    // TRUE: empiezaCon - FALSE: contiene
    private Boolean empiezaCon;
    
    private String respuestaCorrecta;

    public PlantillaPasapalabra getPlantillaPasapalabra() {
        return plantillaPasapalabra;
    }

    public void setPlantillaPasapalabra(PlantillaPasapalabra plantillaPasapalabra) {
        this.plantillaPasapalabra = plantillaPasapalabra;
    }

    public String getLetra() {
        return letra;
    }

    public void setLetra(String letra) {
        this.letra = letra;
    }

    public String getPregunta() {
        return pregunta;
    }

    public void setPregunta(String pregunta) {
        this.pregunta = pregunta;
    }

    public Boolean getEmpiezaCon() {
        return empiezaCon;
    }

    public void setEmpiezaCon(Boolean empiezaCon) {
        this.empiezaCon = empiezaCon;
    }

    public String getRespuestaCorrecta() {
        return respuestaCorrecta;
    }

    public void setRespuestaCorrecta(String respuestaCorrecta) {
        this.respuestaCorrecta = respuestaCorrecta;
    }

}
