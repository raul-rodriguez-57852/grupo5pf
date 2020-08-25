/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.edusis.apirest.generic;

import com.querydsl.core.types.Predicate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Facundo Raviolo
 * @param <T> Tipo de clase que representa la entidad gestionada.
 * @param <K> Tipo de dato que se utiliza como ID. Habitualmente de tipo Long.
 */
@Repository
public interface GenericDao<T,K> extends JpaRepository<T,K>, QuerydslPredicateExecutor  {
//    public void save(T entity) ;
//    public void delete(T entity);
//    public T findById(K id);
//    public void deleteById(K id);
//    public List<T> findAll();
//    public List<T> findAll(Predicate pdct);
}