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
@DiscriminatorValue(value=Plantilla.DTYPE_PREGUNTAS)
public class PlantillaPreguntas extends Plantilla {
    
    @NotNull
    private Integer segundos;
    
    @OneToMany(mappedBy = "plantillaPreguntas", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Pregunta> preguntas;

    public Integer getSegundos() {
        return segundos;
    }

    public void setSegundos(Integer segundos) {
        this.segundos = segundos;
    }

    public List<Pregunta> getPreguntas() {
        return preguntas;
    }

    public void setPreguntas(List<Pregunta> preguntas) {
        this.preguntas = preguntas;
    }
    
    public void addPregunta(Pregunta pregunta) {
        if (preguntas == null) {
            preguntas = new ArrayList<Pregunta>();
        }
        pregunta.setPlantillaPreguntas(this);
        preguntas.add(pregunta);
    }
    
}
