package trabalho.dev.web.model.application;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import trabalho.dev.web.model.dao.AtorDao;
import trabalho.dev.web.model.dao.DiretorDao;
import trabalho.dev.web.model.domain.AtorDomain;
import trabalho.dev.web.model.domain.DiretorDomain;

import java.util.List;
@Service
public class DiretorApplication {
    private final DiretorDao dao;

    // Injeção de dependência usando @Autowired no construtor
    @Autowired
    public DiretorApplication(DiretorDao dao) {
        this.dao = dao;
    }

    public int addDiretor(DiretorDomain diretor) {
        return dao.addDiretor(diretor);
    }

    public int removeDiretor(DiretorDomain diretor) {
        return dao.removeDiretor(diretor);
    }

    public int editDiretor(DiretorDomain diretor) {
        return dao.editDiretor(diretor);
    }

    public List<DiretorDomain> getDiretores() {
        return dao.getDiretores();
    }
}

