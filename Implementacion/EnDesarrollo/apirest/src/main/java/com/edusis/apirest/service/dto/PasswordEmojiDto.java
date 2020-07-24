/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.edusis.apirest.service.dto;

/**
 *
 * @author Facundo Raviolo
 */
public class PasswordEmojiDto {
    
    private Long emoji1Id;
    private Long emoji2Id;
    private Long emoji3Id;

    public Long getEmoji1Id() {
        return emoji1Id;
    }

    public void setEmoji1Id(Long emoji1Id) {
        this.emoji1Id = emoji1Id;
    }

    public Long getEmoji2Id() {
        return emoji2Id;
    }

    public void setEmoji2Id(Long emoji2Id) {
        this.emoji2Id = emoji2Id;
    }

    public Long getEmoji3Id() {
        return emoji3Id;
    }

    public void setEmoji3Id(Long emoji3Id) {
        this.emoji3Id = emoji3Id;
    }
    
}
