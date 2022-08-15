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
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 *
 * @author Facundo Raviolo
 */
@Entity
@Table(name="RespuestaCategoria")
public class RespuestaCategoria extends GenericEntity {

    @ManyToOne
    @JsonIgnore
    private Categoria categoria;
    
    @NotNull
    private String respuesta;
    

    public String getRespuesta() {
        return respuesta;
    }

    public void setRespuesta(String respuesta) {
        this.respuesta = respuesta;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }
    
}
