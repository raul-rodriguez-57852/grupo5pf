/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.edusis.apirest.controller;

import com.edusis.apirest.domain.Asignatura;
import com.edusis.apirest.domain.Curso;
import com.edusis.apirest.domain.DetalleTareaMultimedia;
import com.edusis.apirest.domain.Tarea;
import com.edusis.apirest.service.AsignaturaService;
import com.edusis.apirest.service.CursoService;
import com.edusis.apirest.service.DetalleTareaMultimediaService;
import com.edusis.apirest.service.ProfesorService;
import com.edusis.apirest.service.TareaService;
import com.edusis.apirest.service.dto.AsignaturaDto;
import com.edusis.apirest.service.dto.DetalleTareaMultimediaDto;
import com.edusis.apirest.service.dto.TareaDto;
import com.edusis.apirest.specs.AsignaturaSpecs;
import com.edusis.apirest.specs.TareaSpecs;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Naim Saadi
 */
@RestController
@CrossOrigin(origins = "*", methods= {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})
@RequestMapping("/tarea")
public class TareaController {
    
    @Autowired
    private CursoService cursoService;
    
    @Autowired
    private TareaService tareaService;
    
    @Autowired
    private ProfesorService profesorService;
    
    @Autowired
    private AsignaturaService asignaturaService;
    
    @Autowired
    private DetalleTareaMultimediaService detalleTareaMultimediaService;
    
    @PostMapping("guardarTarea")
    public ResponseEntity<Long> guardarTarea(@RequestBody TareaDto tareaDto) {
        Tarea tarea = tareaDto.getId() != null ? tareaService.get(tareaDto.getId()) : new Tarea();
        tarea.setNombre(tareaDto.getNombre());
        tarea.setCreador(profesorService.get(tareaDto.getCreadorId()));
        tarea.setPuntajeMaximo(tareaDto.getPuntajeMaximo());
        Asignatura asignatura = asignaturaService.get(tareaDto.getAsignaturaId());
        tarea.setAsignatura(asignatura);
        if(asignatura.getTareas() != null){
            if(!asignatura.getTareas().contains(tarea)){
                asignatura.getTareas().add(tarea);
                asignaturaService.save(asignatura);
            }
        } else{
            ArrayList<Tarea> tareas = new ArrayList<Tarea>();
            tareas.add(tarea);
            asignatura.setTareas(tareas);
            asignaturaService.save(asignatura);
        }
        tarea.validar();
        tareaService.save(tarea);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    @GetMapping("tarea")
    public Tarea getTarea (@RequestParam Long id) {
        return tareaService.get(id);
    }
    
    @DeleteMapping("eliminarTarea")
    public ResponseEntity<Long> eliminarTarea(@RequestParam Long id) {
        tareaService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    @GetMapping("tareas")
    public List<Tarea> getTareas(@RequestParam Long cursoId) {
        Curso curso = cursoService.get(cursoId);
        List<Asignatura> asignaturas =  asignaturaService.getAll(AsignaturaSpecs.byCurso(curso));
        return tareaService.getAll(TareaSpecs.byAsignaturas(asignaturas));
    }
    
    @PostMapping("guardarDetalleMultimedia")
    public ResponseEntity<Long> guardarDetalleMultimedia(@RequestBody DetalleTareaMultimediaDto detalleTareaMultimediaDto) {
        DetalleTareaMultimedia detalle = detalleTareaMultimediaDto.getId() != null ? detalleTareaMultimediaService.get(detalleTareaMultimediaDto.getId()) : new DetalleTareaMultimedia();
        detalle.setDescripcion(detalleTareaMultimediaDto.getDescripcion());
        Tarea tarea = tareaService.get(detalleTareaMultimediaDto.getIdTarea());
        tarea.addLinea(detalle);
        tarea.validar();
        tareaService.save(tarea);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    @GetMapping("detalleMultimedia")
    public DetalleTareaMultimedia getDetalleMultimedia (@RequestParam Long id) {
        return detalleTareaMultimediaService.get(id);
    }
    
}
