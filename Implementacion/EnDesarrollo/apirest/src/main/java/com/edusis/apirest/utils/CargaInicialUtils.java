/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.edusis.apirest.utils;

import com.edusis.apirest.domain.Addon;
import com.edusis.apirest.domain.Emoji;
import com.edusis.apirest.domain.TipoAddon;
import com.edusis.apirest.service.AddonService;
import com.edusis.apirest.service.EmojiService;
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

    }
    
}
