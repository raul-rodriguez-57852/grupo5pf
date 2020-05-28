/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.edusis.apirest.generic;

import java.util.List;

/**
 *
 * @author Facundo Raviolo
 * @param <T> Tipo de clase que representa la entidad gestionada.
 * @param <K> Tipo de dato que se utiliza como ID. Habitualmente de tipo Long.
 */

public interface GenericService<T, K> {
    public void save(T entity) ;
    public void delete(T entity);
    public T get(K id);
    public void deleteById(K id);
    public List<T> getAll();
}