/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.edusis.apirest.domain.plantillas;

import com.sun.istack.NotNull;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.OneToMany;

/**
 *
 * @author Facundo Raviolo
 */

@Entity
@DiscriminatorValue(value=Plantilla.DTYPE_PASAPALABRA)
public class PlantillaPasapalabra extends Plantilla {
    
    @NotNull
    private Integer segundos;

    @OneToMany(mappedBy = "plantillaPasapalabra", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PreguntaPasapalabra> preguntas;

    public Integer getSegundos() {
        return segundos;
    }

    public void setSegundos(Integer segundos) {
        this.segundos = segundos;
    }

    public List<PreguntaPasapalabra> getPreguntas() {
        return preguntas;
    }

    public void setPreguntas(List<PreguntaPasapalabra> preguntas) {
        this.preguntas = preguntas;
    }
    
    public void addPregunta(PreguntaPasapalabra pregunta) {
        if (preguntas == null) {
            preguntas = new ArrayList<PreguntaPasapalabra>();
        }
        pregunta.setPlantillaPasapalabra(this);
        preguntas.add(pregunta);
    }

}
