/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.edusis.apirest.domain.plantillas;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.Lob;
import javax.persistence.OneToMany;

/**
 *
 * @author Facundo Raviolo
 */
@Entity
@DiscriminatorValue(value=Plantilla.DTYPE_GRILLA)
public class PlantillaGrilla extends Plantilla {

    @Lob
    @JsonIgnore
    private byte[] imagen;
            
    private Integer cantidadFilas;
    
    private Integer cantidadColumnas;

    @OneToMany(mappedBy = "plantillaGrilla", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CeldaGrilla> celdas;

    public byte[] getImagen() {
        return imagen;
    }

    public void setImagen(byte[] imagen) {
        this.imagen = imagen;
    }

    public Integer getCantidadFilas() {
        return cantidadFilas;
    }

    public void setCantidadFilas(Integer cantidadFilas) {
        this.cantidadFilas = cantidadFilas;
    }

    public Integer getCantidadColumnas() {
        return cantidadColumnas;
    }

    public void setCantidadColumnas(Integer cantidadColumnas) {
        this.cantidadColumnas = cantidadColumnas;
    }

    public List<CeldaGrilla> getCeldas() {
        return celdas;
    }

    public void setCeldas(List<CeldaGrilla> celdas) {
        this.celdas = celdas;
    }
    
    public void addCelda(CeldaGrilla celda) {
        if (celdas == null) {
            celdas = new ArrayList<CeldaGrilla>();
        }
        celda.setPlantillaGrilla(this);
        celdas.add(celda);
    }
            
}
