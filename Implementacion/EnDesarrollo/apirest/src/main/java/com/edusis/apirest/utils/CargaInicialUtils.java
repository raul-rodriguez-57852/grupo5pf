/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.edusis.apirest.utils;

import com.edusis.apirest.domain.Addon;
import com.edusis.apirest.domain.Bonus;
import com.edusis.apirest.domain.Emoji;
import com.edusis.apirest.domain.TipoAddon;
import com.edusis.apirest.service.AddonService;
import com.edusis.apirest.service.BonusService;
import com.edusis.apirest.service.EmojiService;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

/**
 *
 * @author Facundo Raviolo
 */
@Component
public class CargaInicialUtils implements ApplicationListener<ApplicationReadyEvent> {
    
    @Autowired
    private AddonService addonService;
    @Autowired
    private EmojiService emojiService;
    @Autowired
    private BonusService bonusService;

    @Override
    public void onApplicationEvent(final ApplicationReadyEvent event) {
        if (addonService.getAll().size() < 1) {
            for (int i = 1; i < 4; i++) {
                Addon addon = new Addon();
                addon.setNombre(String.valueOf(i));
                addon.setIconoURL("assets/img/addons/anteojos-" + i + ".png");
                addon.setTipo(TipoAddon.ANTEOJOS);
                addon.setCosto(i * 2);
                addonService.save(addon);
            }
            for (int i = 1; i < 7; i++) {
                Addon addon = new Addon();
                addon.setNombre(String.valueOf(i));
                addon.setIconoURL("assets/img/addons/casaca-" + i + ".png");
                addon.setTipo(TipoAddon.CAMISETA);
                addon.setCosto(i * 2);
                addonService.save(addon);
            }
            for (int i = 1; i < 7; i++) {
                Addon addon = new Addon();
                addon.setNombre(String.valueOf(i));
                addon.setIconoURL("assets/img/addons/fondo-" + i + ".png");
                addon.setTipo(TipoAddon.FONDO);
                addon.setCosto(i * 2);
                addonService.save(addon);
            }
            for (int i = 1; i < 4; i++) {
                Addon addon = new Addon();
                addon.setNombre(String.valueOf(i));
                addon.setIconoURL("assets/img/addons/gorra-" + i + ".png");
                addon.setTipo(TipoAddon.SOMBRERO);
                addon.setCosto(i * 2);
                addonService.save(addon);
            }
        }
        if (emojiService.getAll().size() < 1) {
            for (int i = 1; i < 9; i++) {
                Emoji emoji = new Emoji();
                emoji.setNombre(String.valueOf(i));
                emoji.setIconoURL("assets/img/emojis/" + i + ".png");
                emojiService.save(emoji);
            }
        }
        
        if (bonusService.getAll().size() < 1) {
            
            List<String> nombres = new ArrayList<>();
            
            nombres.add("");
            nombres.add("El Jefe");
            nombres.add("Profesxr, Eres tu?");
            nombres.add("Tiempo Extra");
            nombres.add("Como en tu casa");
            
            
            List<String> descripciones = new ArrayList<>();
            
            descripciones.add("");
            descripciones.add("Podra elejir donde te quieres sentar!");
            descripciones.add("Te podes sentar en el asiento de la profe");
            descripciones.add("Tenes 5 minutos extra de recreo!");
            descripciones.add("Podras ir al baño sin pedir permiso");
            
            
            for (int i = 1; i < 5; i++) {
                Bonus bonus = new Bonus();
                bonus.setNombre(nombres.get(i));
                bonus.setImagen("assets/img/bonus/bonus-" + i + ".png");
                bonus.setDescripcion(descripciones.get(i));
                bonus.setIsBonusPreset(Boolean.TRUE);
                bonusService.save(bonus);          
            }
            
        }

    }
    
}
