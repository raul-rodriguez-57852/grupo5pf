/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.edusis.apirest.specs;

import com.edusis.apirest.domain.QBonus;
import com.querydsl.core.types.dsl.BooleanExpression;

/**
 *
 * @author manue
 */
public class BonusSpecs {
    
    private static final QBonus B = QBonus.bonus;
    
    public static BooleanExpression isPreset() {
        return B.isBonusPreset.eq(Boolean.TRUE);
    }
} 
    