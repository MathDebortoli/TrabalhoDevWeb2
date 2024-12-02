package trabalho.dev.web.model.application;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import trabalho.dev.web.exceptions.TituloRestricaoException;
import trabalho.dev.web.model.dao.TituloDao;
import trabalho.dev.web.model.domain.TituloDomain;

import java.util.List;

@Service
public class TituloApplication {
    private final TituloDao dao;

    // Injeção de dependência usando @Autowired no construtor
    @Autowired
    public TituloApplication(TituloDao dao) {
        this.dao = dao;
    }

    public int addTitulo(TituloDomain titulo) {
        return dao.addTitulo(titulo);
    }

    public int removeTitulo(TituloDomain titulo) {
        try {
           return dao.removeTitulo(titulo);
        }
        catch (DataIntegrityViolationException e) {
            throw new TituloRestricaoException("Título com Restrição para Deletar!" + titulo);
        }
    }

    public int editTitulo(TituloDomain titulo) {
        return dao.editTitulo(titulo);
    }

    public List<TituloDomain> getTitulos() {
        return dao.getTitulos();
    }

    public  List<TituloDomain> getTituloByCategoria(String categoria) {
        return dao.getTitulosByCategoria(categoria);
    }

    public List<TituloDomain> getTitulosByAtor(String ator) {
        return dao.getTitulosByAtor(ator);
    }
}
