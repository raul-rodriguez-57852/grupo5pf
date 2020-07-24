/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.edusis.apirest.domain;

import com.edusis.apirest.generic.GenericEntity;
import com.sun.istack.NotNull;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 *
 * @author Manuel
 */
@Entity
@Table(name="Documento")
public class Documento extends GenericEntity {

    @NotNull
    private TipoDocumento tipo;
    
    @NotNull
    private String numero;

    public TipoDocumento getTipo() {
        return tipo;
    }

    public void setTipo(TipoDocumento tipo) {
        this.tipo = tipo;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    @Override
    public String toString() {
        return tipo + ": " +  numero;
    }

    public Documento(TipoDocumento tipo, String numero) {
        this.tipo = tipo;
        this.numero = numero;
    }
    
    public Documento() {}
    
}
