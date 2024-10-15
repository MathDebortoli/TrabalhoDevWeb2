package trabalho.dev.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import trabalho.dev.web.model.application.DiretorApplication;
import trabalho.dev.web.model.domain.DiretorDomain;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/Diretor")

public class DiretorController {
     private final DiretorApplication apl;

    @Autowired
    public DiretorController(DiretorApplication apl) {

        this.apl = apl;
    }

    @PostMapping("/Cadastrar")
    public ResponseEntity<DiretorDomain> postCadastrarDiretor(@RequestBody DiretorDomain diretor ) {
        apl.addDiretor(diretor);
        return ResponseEntity.ok(diretor);
    }

    @PostMapping("/Remover")
    public ResponseEntity<DiretorDomain>  postRemoveDiretor(@RequestBody DiretorDomain diretor) {
        apl.removeDiretor(diretor);
        return ResponseEntity.ok(diretor);
    }

    @PostMapping("/Editar")
    public ResponseEntity<DiretorDomain>  postEditarDiretor(@RequestBody DiretorDomain diretor) {
        apl.editDiretor(diretor);
        return ResponseEntity.ok(diretor);
    }

    @GetMapping("/Listar")
    public ResponseEntity<List<DiretorDomain>> getDiretores() {
        List<DiretorDomain> diretores = apl.getDiretores();
        return ResponseEntity.ok(diretores);
    }
}
