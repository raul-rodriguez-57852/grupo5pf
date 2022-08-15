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
 * @author Naim Saadi
 */
@Entity
@DiscriminatorValue(value=Plantilla.DTYPE_CATEGORIAS)
public class PlantillaCategorias extends Plantilla {
    
    @NotNull
    private Integer segundos;
    
    @OneToMany(mappedBy = "plantillaCategorias", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Categoria> categorias;

    public Integer getSegundos() {
        return segundos;
    }

    public void setSegundos(Integer segundos) {
        this.segundos = segundos;
    }

    public List<Categoria> getCategorias() {
        return categorias;
    }

    public void setCategorias(List<Categoria> categorias) {
        this.categorias = categorias;
    }
    
    public void addCategoria(Categoria categoria) {
        if (categorias == null) {
            categorias = new ArrayList<>();
        }
        categoria.setPlantillaCategorias(this);
        categorias.add(categoria);
    }
    
    @Override
    public void validar(){
        super.validar();
        AssertUtils.notNull(segundos, "Los segundos no puede ser nulos");
        AssertUtils.notNull(categorias, "Las categorias no pueden ser nulas");
        AssertUtils.isTrue(categorias.size() <= 3, "No pueden crearse mas de 3 categorías");
    }
    
}
