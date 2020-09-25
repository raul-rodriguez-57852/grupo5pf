/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.edusis.apirest.domain;

import com.edusis.apirest.generic.GenericEntity;
import com.sun.istack.NotNull;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 *
 * @author Facundo Raviolo
 */
@Entity
@Table(name="PlantillaPreguntas")
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
