/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.edusis.apirest.utils;

import java.util.Collection;
import org.springframework.util.CollectionUtils;

/**
 * Utilidades para asegurar que un valor cumpla ciertas condiciones
 * @author Naim Saadi
 */
public class AssertUtils {
    
    /**
     * Verifica una expression booleana, arroja {@code IllegalArgumentException} si
     * la prueba es falsa {@code false}.
     *
     * @param expression a boolean expression
     * @param message the exception message to use if the assertion fails
     * @throws IllegalArgumentException if expression is {@code false}
     */
    public static void isTrue(boolean expression, String message) {
        if (!expression) {
            throw new IllegalArgumentException(message);
        }
    }


    /**
     * Assert that an object is {@code null} .
     * <pre class="code">Assert.isNull(value, "The value must be null");</pre>
     *
     * @param object the object to check
     * @param message the exception message to use if the assertion fails
     * @throws IllegalArgumentException if the object is not {@code null}
     */
    public static void isNull(Object object, String message) {
        if (object != null) {
            throw new IllegalArgumentException(message);
        }
    }


    /**
     * Assert that an object is not {@code null} .
     * <pre class="code">Assert.notNull(clazz, "The class must not be
     * null");</pre>
     *
     * @param object the object to check
     * @param message the exception message to use if the assertion fails
     * @throws IllegalArgumentException if the object is {@code null}
     */
    public static void notNull(Object object, String message) {
        if (object == null) {
            throw new NullPointerException(message);
        }
    }

    /**
     * Assert that a collection has elements; that is, it must not be
     * {@code null} and must have at least one element.
     * <pre class="code">Assert.notEmpty(collection, "Collection must have
     * elements");</pre>
     *
     * @param collection the collection to check
     * @param message the exception message to use if the assertion fails
     * @throws IllegalArgumentException if the collection is {@code null} or has
     * no elements
     */
    public static void notEmpty(Collection collection, String message) {
        if (CollectionUtils.isEmpty(collection)) {
            throw new IllegalArgumentException(message);
        }
    }

    
}
