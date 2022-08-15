/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.edusis.apirest.domain.plantillas;

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
@Table(name="Categoria")
public class Categoria extends GenericEntity {

    @ManyToOne
    @JsonIgnore
    private PlantillaCategorias plantillaCategorias;

    private String nombre;
    
    @OneToMany(mappedBy = "categoria", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RespuestaCategoria> respuestas;

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public List<RespuestaCategoria> getRespuestas() {
        return respuestas;
    }

    public void setRespuestas(List<RespuestaCategoria> respuestas) {
        this.respuestas = respuestas;
    }

    public PlantillaCategorias getPlantillaCategorias() {
        return plantillaCategorias;
    }

    public void setPlantillaCategorias(PlantillaCategorias plantillaCategorias) {
        this.plantillaCategorias = plantillaCategorias;
    }
    
    public void addRespuesta(RespuestaCategoria respuesta) {
        if (respuestas == null) {
            respuestas = new ArrayList<>();
        }
        respuesta.setCategoria(this);
        respuestas.add(respuesta);
    }

    
}
