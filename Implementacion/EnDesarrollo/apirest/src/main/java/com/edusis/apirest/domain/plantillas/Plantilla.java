/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.edusis.apirest.domain.plantillas;

import com.edusis.apirest.domain.Profesor;
import com.edusis.apirest.generic.GenericEntity;
import com.edusis.apirest.utils.AssertUtils;
import com.sun.istack.NotNull;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 *
 * @author Facundo Raviolo
 */
@Entity
@Table(name="Plantilla")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "dtype")
public class Plantilla extends GenericEntity {

    public static final String DTYPE_PREGUNTAS = "PREGUNTAS";
    public static final String DTYPE_PASAPALABRA = "PASAPALABRA";
    public static final String DTYPE_GRILLA = "GRILLA";

    @NotNull
    private String nombre;
    
    private Integer puntajeMaximo;
    
    @NotNull
    @ManyToOne
    private Profesor creador;

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Integer getPuntajeMaximo() {
        return puntajeMaximo;
    }

    public void setPuntajeMaximo(Integer puntajeMaximo) {
        this.puntajeMaximo = puntajeMaximo;
    }

    public Profesor getCreador() {
        return creador;
    }

    public void setCreador(Profesor creador) {
        this.creador = creador;
    }
    
    public void validar(){
        AssertUtils.notNull(nombre, "El nombre no puede ser nulo");
        AssertUtils.notNull(creador, "El creador no puede ser nulo");
    }

}
