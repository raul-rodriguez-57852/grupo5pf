/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.edusis.apirest.domain;

import com.edusis.apirest.generic.GenericEntity;
import com.sun.istack.NotNull;
import java.util.Objects;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 *
 * @author Facundo Raviolo
 */
@Entity
@Table(name="Addon")
public class Addon extends GenericEntity {
    
    private static final long serialVersionUID = 6529685098267757690L;
    
    @NotNull
    private String nombre;
    
    @NotNull
    private String iconoURL;
    
    @NotNull
    private Integer costo;
    
    // GETTERS && SETTERS

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getIconoURL() {
        return iconoURL;
    }

    public void setIconoURL(String iconoURL) {
        this.iconoURL = iconoURL;
    }

    public Integer getCosto() {
        return costo;
    }

    public void setCosto(Integer costo) {
        this.costo = costo;
    }
    
    @Override
    public int hashCode() {
        return getId().hashCode();
    }
 
    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Addon other = (Addon) obj;
        return Objects.equals(getId(), other.getId());
    }
    
}
