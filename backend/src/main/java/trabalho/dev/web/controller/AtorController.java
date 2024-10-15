package trabalho.dev.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import trabalho.dev.web.model.application.AtorApplication;
import trabalho.dev.web.model.domain.AtorDomain;

import java.util.List;

@Controller
@RequestMapping("/Ator")
public class AtorController {

    private final AtorApplication apl;

    @Autowired
    public AtorController(AtorApplication apl) {
        this.apl = apl;
    }

    @PostMapping("/Cadastrar")
        public ResponseEntity<AtorDomain> postCadastrarAtor(@RequestBody AtorDomain ator ) {
        apl.addAtor(ator);
        return ResponseEntity.ok(ator);
    }

    @PostMapping("/Remover")
    public ResponseEntity<AtorDomain> delRemoverAtor(@RequestBody AtorDomain ator) {
        apl.removeAtor(ator);
        return ResponseEntity.ok(ator);
    }

    @PostMapping("/Editar")
    public ResponseEntity<AtorDomain> putEditarAtor(@RequestBody AtorDomain ator) {
        apl.editAtor(ator);
        return ResponseEntity.ok(ator);
    }

    @GetMapping("/Listar")
    public ResponseEntity<List<AtorDomain>> getAtores() {
        List<AtorDomain> atores = apl.getAtores();
        return ResponseEntity.ok(atores);
    }
}

