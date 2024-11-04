package trabalho.dev.web.exceptions;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.Instant;

@ControllerAdvice
public class TituloResourceExceptionHandler {
    @ExceptionHandler(TituloRestricaoException.class)
    public ResponseEntity<ErroPadrao>
    ItemNaoEncontradoHandle(TituloRestricaoException e, HttpServletRequest req) {
        ErroPadrao err = new ErroPadrao();
        err.setError("Titulo com Restrição para Deletar!");
        err.setMessage("Faz o L com a mão");
        err.setPath(req.getRequestURI());

        err.setStatus(HttpStatus.NOT_FOUND.value());

        err.setTimestamp(Instant.now());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(err);
    }
}

