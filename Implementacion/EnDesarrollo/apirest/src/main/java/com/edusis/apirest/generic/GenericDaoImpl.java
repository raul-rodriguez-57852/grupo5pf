/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.edusis.apirest.generic;

import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaQuery;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Facundo Raviolo
 * @param <T> Tipo de clase que representa la entidad gestionada.
 * @param <K> Tipo de dato que se utiliza como ID. Habitualmente de tipo Long.
 */

@SuppressWarnings("unchecked")
@Repository
public abstract class GenericDaoImpl<T, K extends Serializable> implements GenericDao<T, K> {

    @Autowired
    private EntityManager entityManager;

    protected Session currentSession() {
        return entityManager.unwrap(Session.class);
    }

    protected Class<? extends T> daoType;

    public GenericDaoImpl() {
        Type t = getClass().getGenericSuperclass();
        ParameterizedType pt = (ParameterizedType) t;
        daoType = (Class) pt.getActualTypeArguments()[0];
    }

    @Override
    public List<T> findAll() {      
        CriteriaQuery query = currentSession().getCriteriaBuilder().createQuery(daoType);
        query.from(daoType);
        List<T> resultados = currentSession().createQuery(query).getResultList();
        return resultados;
    }

    @Override
    public void deleteById(K id) {
        currentSession().delete(currentSession().get(daoType, id));
    }

    @Override
    public T findById(K id) {
        return (T) currentSession().get(daoType, id);
    }

    @Override
    public void delete(T entity) {
        currentSession().delete(entity);        
    }

    @Override
    public void save(T entity) {
        currentSession().saveOrUpdate(entity);
    }
    
}
