/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.edusis.apirest.utils;

import com.edusis.apirest.domain.Addon;
import com.edusis.apirest.domain.TipoAddon;
import com.edusis.apirest.service.AddonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

/**
 *
 * @author Facundo Raviolo
 */
@Component
public class CargaInicialUtils implements ApplicationListener<ApplicationReadyEvent> {
    
    @Autowired
    private AddonService addonService;
    
    @Override
    public void onApplicationEvent(final ApplicationReadyEvent event) {
        if (addonService.getAll().size() < 1) {
            Addon addon = new Addon();
            addon.setNombre("Camiseta Boca");
            addon.setCosto(5);
            addon.setTipo(TipoAddon.CAMISETA);
            addonService.save(addon);
            System.out.println("Addons cargados");
        }
    }
    
}
