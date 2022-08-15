/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.edusis.apirest.domain.plantillas;

import com.edusis.apirest.utils.AssertUtils;
import com.sun.istack.NotNull;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.OneToMany;

/**
 *
 * @author nsaadi
 */
@Entity
@DiscriminatorValue(value=Plantilla.DTYPE_VERDADEROFALSO)
public class PlantillaVF extends Plantilla {
    
    @NotNull
    private Integer segundos;
    
    @OneToMany(mappedBy = "plantillaVF", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PreguntaVF> preguntas;

    public Integer getSegundos() {
        return segundos;
    }

    public void setSegundos(Integer segundos) {
        this.segundos = segundos;
    }

    public List<PreguntaVF> getPreguntas() {
        return preguntas;
    }

    public void setPreguntas(List<PreguntaVF> preguntas) {
        this.preguntas = preguntas;
    }
    
    public void addPregunta(PreguntaVF pregunta) {
        if (preguntas == null) {
            preguntas = new ArrayList<>();
        }
        pregunta.setPlantillaVF(this);
        preguntas.add(pregunta);
    }
    
    @Override
    public void validar(){
        super.validar();
        AssertUtils.notNull(segundos, "Los segundos no puede ser nulos");
        AssertUtils.notNull(preguntas, "Las categorias no pueden ser nulas");
    }
    
}
