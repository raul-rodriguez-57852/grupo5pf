/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.edusis.apirest.generic;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Facundo Raviolo
 * @param <T> Tipo de clase que representa la entidad gestionada.
 * @param <K> Tipo de dato que se utiliza como ID. Habitualmente de tipo Long.
 */

@Service
public abstract class GenericServiceImpl<T, K> implements GenericService<T, K> {

    @Autowired
    private GenericDao<T, K> dao;

    public GenericServiceImpl(GenericDao<T, K> dao) {
        this.dao = dao;
    }
    
    public GenericServiceImpl() {
        
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED)
    public List<T> getAll() {
        return dao.findAll();
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED)
    public void deleteById(K id) {
        dao.deleteById(id);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED)    
    public T get(K id) {
        return dao.findById(id);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED)
    public void delete(T entity) {
        dao.delete(entity);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED)
    public void save(T entity) {
        dao.save(entity);
    }
    
}
